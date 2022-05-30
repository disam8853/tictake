import datetime
from flask import jsonify
import utils
from google.cloud import bigtable
from google.cloud.bigtable import column_family
from google.cloud.bigtable import row_filters
from google.oauth2 import service_account

credentials = service_account.Credentials.from_service_account_file(
    'tictake-303073cdcbf0.json')
client = bigtable.Client(project="tictake", admin=True,
                         credentials=credentials)
instance = client.instance("instance-tictake")
# set GOOGLE_APPLICATION_CREDENTIALS=C:\Users\GOOD\Desktop\碩班\110-2\分散式\tictake\ticket-api\tictake-303073cdcbf0.json


def create_table(table_id):
    print("Creating the {} table.".format(table_id))
    table = instance.table(table_id)
    print("Creating column family activity with Max Version GC rule...")
    # Create a column family with GC policy : most recent N versions
    # Define the GC policy to retain only the most recent 3 versions
    max_versions_rule = column_family.MaxVersionsGCRule(3)
    column_family_id = "activity"
    column_families = {column_family_id: max_versions_rule}
    if not table.exists():
        table.create(column_families=column_families)
    else:
        print("Table {} already exists.".format(table_id))


def create_order(
        member,
        activity_id,
        order_timestamp,
        table_id="tictake",
        column_family_id="activity"):
    table = instance.table(table_id)
    print("Got table.")
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
                 0, timestamp=utc_datetime)
    row.set_cell(column_family_id, "order_timestamp".encode(),
                 str(order_timestamp).encode(), timestamp=utc_datetime)
    rows.append(row)
    res = table.mutate_rows(rows)
    print(res)
    if res[0] is None:
        return ""
    else:
        return row_key

    # row_keys = [
    #     b"row_key_1",
    #     b"row_key_2",
    # ]
    # col_name = b"test"
    # rows = []
    # for i, row_key in enumerate(row_keys):
    #     value = "value_{}".format(i).encode()
    #     row = table.row(row_key)
    #     row.set_cell(
    #         column_family_id, col_name, value, timestamp=datetime.datetime.utcnow()
    #     )
    #     rows.append(row)
    # response = table.mutate_rows(rows)
    # # validate that all rows written successfully
    # for i, status in enumerate(response):
    #     if status.code != 0:
    #         print("Row number {} failed to write".format(i))


def order_has_paid(
        member,
        activity_id,
        has_paid,
        order_timestamp,
        table_id="tictake",
        column_family_id="activity"):
    pass


def get_order_by_key(
        key,
        table_id="tictake",
        column_family_id="activity"):

    table = instance.table(table_id)
    print("Getting a single row by row key.")
    row_filter = row_filters.CellsColumnLimitFilter(1)
    row = table.read_row(key.encode(), row_filter)

    if row is not None:
        member_cell = row.cells[column_family_id]["member".encode()][0]
        activity_id_cell = row.cells[column_family_id]["activity_id".encode(
        )][0]
        has_paid_cell = row.cells[column_family_id]["has_paid".encode()][0]
        order_timestamp_cell = row.cells[column_family_id][
            "order_timestamp".encode()][0]

        return jsonify(member=member_cell.value.decode("utf-8"),
                       activity_id=activity_id_cell.value.decode("utf-8"),
                       has_paid=has_paid_cell.value,
                       order_timestamp=utils.gmt_to_utc8(order_timestamp_cell.value.decode("utf-8")))
    else:
        return jsonify(msg="fail")


def get_order_by_filter(
        member="",
        activity_id="",
        table_id="tictake",
        column_family_id="activity"):

    table = instance.table(table_id)
    print("Getting a single greeting by row key.")
    key = "{}#{}#{}".format(member, activity_id, order_timestamp).encode()
    row_filter = row_filters.CellsColumnLimitFilter(1)
    row = table.read_row(key, row_filter)

    member_cell = row.cells[column_family_id]["member".encode()][0]
    activity_id_cell = row.cells[column_family_id]["activity_id".encode()][0]
    has_paid_cell = row.cells[column_family_id]["has_paid".encode()][0]
    order_timestamp_cell = row.cells[column_family_id][
        "order_timestamp".encode()][0]

    return jsonify(member=member_cell.value.decode("utf-8"),
                   activity_id=activity_id_cell.value.decode("utf-8"),
                   has_paid=has_paid_cell.value,
                   order_timestamp=utils.gmt_to_utc8(order_timestamp_cell.value.decode("utf-8")))
