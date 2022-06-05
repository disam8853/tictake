import datetime
from flask import jsonify
import utils
from google.cloud import bigtable
from google.cloud.bigtable import column_family
from google.cloud.bigtable import row_filters
from google.oauth2 import service_account
import sys

credentials = service_account.Credentials.from_service_account_file(
    'tictake-352113-f099decf2768.json')
client = bigtable.Client(project="tictake-352113", admin=True,
                         credentials=credentials)
instance = client.instance("instance-tictake")


def create_table(table_id):
    table = instance.table(table_id)
    # Create a column family with GC policy : most recent N versions
    # Define the GC policy to retain only the most recent 3 versions
    max_versions_rule = column_family.MaxVersionsGCRule(3)
    column_family_id = "activity"
    column_families = {column_family_id: max_versions_rule}
    if not table.exists():
        table.create(column_families=column_families)
    else:
        print("Table {} already exists.".format(table_id))


def delete_table(table_id):
    table = instance.table(table_id)
    print("Deleting the {} table.".format(table_id))
    table.delete()


def create_order(
        member,
        activity_id,
        order_timestamp,
        table_id="tictake",
        column_family_id="activity"):

    table = instance.table(table_id)
    rows = []
    timestamp = utils.utc_to_str(order_timestamp)
    row_key = "{}#{}#{}".format(member, activity_id, timestamp)
    row = table.direct_row(row_key.encode())

    utc_datetime = datetime.datetime.utcnow()
    row.set_cell(column_family_id, "activity_id".encode(), activity_id,
                 timestamp=utc_datetime)
    row.set_cell(column_family_id, "member".encode(), member,
                 timestamp=utc_datetime)
    row.set_cell(column_family_id, "has_paid".encode(),
                 "0", timestamp=utc_datetime)
    row.set_cell(column_family_id, "order_timestamp".encode(),
                 str(order_timestamp).encode(), timestamp=utc_datetime)
    rows.append(row)
    res = table.mutate_rows(rows)

    if res[0] is None:
        return ""
    else:
        return jsonify(key=row_key,
                       member=member,
                       activity_id=activity_id,
                       has_paid="0",
                       order_timestamp=order_timestamp)


def order_has_paid(
        key,
        table_id="tictake",
        column_family_id="activity"):

    table = instance.table(table_id)
    row = table.row(key)

    if row is not None:
        utc_datetime = datetime.datetime.utcnow()
        row.set_cell(column_family_id, "has_paid".encode(),
                     "1", timestamp=utc_datetime)
        row.commit()
        return jsonify(key=key,
                       has_paid="1")
    else:
        return ""


def get_order_by_key(
        key,
        table_id="tictake",
        column_family_id="activity"):

    table = instance.table(table_id)
    row_filter = row_filters.CellsColumnLimitFilter(1)
    row = table.read_row(key.encode(), row_filter)

    if row is not None:
        member_cell = row.cells[column_family_id]["member".encode()][0]
        activity_id_cell = row.cells[column_family_id]["activity_id".encode(
        )][0]
        has_paid_cell = row.cells[column_family_id]["has_paid".encode()][0]
        order_timestamp_cell = row.cells[column_family_id][
            "order_timestamp".encode()][0]

        return jsonify(key=key,
                       member=member_cell.value.decode("utf-8"),
                       activity_id=activity_id_cell.value.decode("utf-8"),
                       has_paid=has_paid_cell.value.decode("utf-8"),
                       order_timestamp=utils.gmt_to_utc8(order_timestamp_cell.value.decode("utf-8")))
    else:
        return jsonify(msg="fail")


def get_order_by_filter(
        member,
        activity_id,
        table_id="tictake",
        column_family_id="activity"):

    table = instance.table(table_id)
    # make regex
    key = ""
    if member is not None:
        key += "^"+member+"#"
    else:
        key += ".*#"

    if activity_id is not None:
        key += activity_id+"#"
    key += ".*"

    # filter data
    row_filter = row_filters.RowKeyRegexFilter(key.encode())
    partial_rows = table.read_rows(filter_=row_filter)
    rows = []
    for row in partial_rows:
        member_cell = row.cells[column_family_id][b"member"][0]
        activity_id_cell = row.cells[column_family_id][b"activity_id"][0]
        has_paid_cell = row.cells[column_family_id][b"has_paid"][0]
        order_timestamp_cell = row.cells[column_family_id][b"order_timestamp"][0]
        # add row to response
        add_row = {}
        add_row["key"] = row.row_key.decode("utf-8")
        add_row["member"] = member_cell.value.decode("utf-8")
        add_row["activity_id"] = activity_id_cell.value.decode("utf-8")
        add_row["has_paid"] = has_paid_cell.value.decode("utf-8")
        add_row["order_timestamp"] = utils.gmt_to_utc8(
            order_timestamp_cell.value.decode("utf-8"))
        rows.append(add_row)

    return jsonify(rows)
