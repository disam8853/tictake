import datetime
from google.cloud import bigtable
from google.cloud.bigtable import column_family
from google.cloud.bigtable import row_filters
from google.oauth2 import service_account


credentials = service_account.Credentials. from_service_account_file(
    'tictake-303073cdcbf0.json')
client = bigtable.Client(project="tictake", admin=True,
                         credentials=credentials)
instance = client.instance("instance-tictake")

# bigtable


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
    row = table.direct_row(row_key)
    dt = datetime.datetime.now()
    row.set_cell(column_family_id, "member".encode(), member,
                 timestamp=datetime.datetime.utcnow())
    row.set_cell(column_family_id, "has_paid".encode(),
                 has_paid, timestamp=datetime.datetime.utcnow())
    row.set_cell(column_family_id, "order_timestamp".encode(),
                 order_timestamp, timestamp=datetime.datetime.utcnow())
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
    pass
