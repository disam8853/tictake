import argparse

from google.cloud import bigtable
from google.oauth2 import service_account



def main(project_id="project-id", instance_id="instance-id", table_id="test"):
    credentials = service_account.Credentials. from_service_account_file('tictake-303073cdcbf0.json')

    # Create a Cloud Bigtable client.
    client = bigtable.Client(project=project_id, credentials=credentials)

    # Connect to an existing Cloud Bigtable instance.
    instance = client.instance(instance_id)

    # Open an existing table.
    table = instance.table(table_id)
    print("Bigtable connecting test finished.")

    # row_key = "r1"
    # row = table.read_row(row_key.encode("utf-8"))

    # column_family_id = "cf1"
    # column_id = "c1".encode("utf-8")
    # value = row.cells[column_family_id][column_id][0].value.decode("utf-8")

    # print("Row key: {}\nData: {}".format(row_key, value))


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description=__doc__, formatter_class=argparse.ArgumentDefaultsHelpFormatter
    )
    parser.add_argument("project_id", help="Your Cloud Platform project ID.")
    parser.add_argument(
        "instance_id", help="ID of the Cloud Bigtable instance to connect to."
    )
    parser.add_argument(
        "--table", help="Existing table used in the quickstart.", default="my-table"
    )

    args = parser.parse_args()
    main(args.project_id, args.instance_id, args.table)