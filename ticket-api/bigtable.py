import datetime
from google.cloud import bigtable
from google.cloud.bigtable import column_family
from google.cloud.bigtable import row_filters

client = bigtable.Client(project="tictake", admin=True)
instance = client.instance("instance-tictake")

# bigtable
def create_table(table_id):
    print("Creating the {} table.".format(table_id))
    table = instance.table(table_id)
    print("Creating column family cf1 with Max Version GC rule...")
    # Create a column family with GC policy : most recent N versions
    # Define the GC policy to retain only the most recent 2 versions
    max_versions_rule = column_family.MaxVersionsGCRule(2)
    column_family_id = "cf1"
    column_families = {column_family_id: max_versions_rule}
    if not table.exists():
        table.create(column_families=column_families)
    else:
        print("Table {} already exists.".format(table_id))


def create_row(table_id, column_family_id):
    table = instance.table(table_id)
    print("Writing some greetings to the table.")
    greetings = ["Hello World!", "Hello Cloud Bigtable!", "Hello Python!"]
    rows = []
    column = "greeting".encode()
    for i, value in enumerate(greetings):
        row_key = "greeting{}".format(i).encode()
        row = table.direct_row(row_key)
        row.set_cell(
            column_family_id, column, value, timestamp=datetime.datetime.utcnow()
        )
        rows.append(row)
    table.mutate_rows(rows)