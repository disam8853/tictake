import datetime
from flask import jsonify
from google.cloud import bigtable
from google.cloud.bigtable import column_family
from google.cloud.bigtable import row_filters
from google.oauth2 import service_account

# https://cloud.google.com/bigtable/docs/samples-python-hello
# https://googleapis.dev/python/bigtable/latest/index.html

credentials = service_account.Credentials. from_service_account_file(
    'tictake-303073cdcbf0.json')
client = bigtable.Client(project="tictake", admin=True,
                         credentials=credentials)
instance = client.instance("instance-tictake")


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
        has_paid,
        order_timestamp,
        table_id="tictake",
        column_family_id="activity"):

    table = instance.table(table_id)
    # print("Writing some greetings to the table.")
    # greetings = ["Hello World!", "Hello Cloud Bigtable!", "Hello Python!"]
    # rows = []
    # for i, value in enumerate(greetings):
    row_key = "{}#{}#{}".format(member, activity_id, order_timestamp).encode()
    print(row_key)
    row = table.direct_row(row_key)
    utc_datetime = datetime.datetime.utcnow()
    row.set_cell(column_family_id, "activity_id".encode(), activity_id,
                 timestamp=utc_datetime)
    row.set_cell(column_family_id, "member".encode(), member,
                 timestamp=utc_datetime)
    row.set_cell(column_family_id, "has_paid".encode(),
                 has_paid, timestamp=utc_datetime)
    row.set_cell(column_family_id, "order_timestamp".encode(),
                 str(order_timestamp).encode(), timestamp=utc_datetime)
    # rows.append(row)
    table.mutate_rows(row)
    # table.mutate_rows(rows)


def order_has_paid(
        member,
        activity_id,
        has_paid,
        order_timestamp,
        table_id="tictake",
        column_family_id="activity"):
    pass


def get_order(
        member,
        activity_id,
        has_paid,
        order_timestamp,
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
    order_timestamp_cell = row.cells[column_family_id]["order_timestamp".encode()][0]
    return jsonify(member=member_cell.value.decode("utf-8"),
                   activity_id=activity_id_cell.value.decode("utf-8"),
                   has_paid=has_paid_cell.value.decode("utf-8"),
                   order_timestamp=order_timestamp_cell.value.decode("utf-8"))
