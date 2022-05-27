from flask import Flask, jsonify, request
from google.cloud import bigtable
from google.cloud.bigtable import column_family
from google.cloud.bigtable import row_filters
import bigtable


app = Flask(__name__)

@app.route('/ticket_api/', methods=['GET'])
def test_api():
    # bigtable.create_table("tictake")
    return jsonify(message='Hello, API')

@app.route('/ticket_api/', methods=['POST'])
def add_ticket_order():
    try:
        data = request.get_json()
        activity = Activity(
            activity_name = data['activity_name'], 
            start_date = utc8_to_gmt(data['start_date']),
            end_date = utc8_to_gmt(data['end_date']),
            total_inventory = data['total_inventory'],
            remaining_inventory = data['remaining_inventory'],
            activity_info = data['activity_info'],
            user_id = data['user_id']
        )
        db.session.add(activity)
        db.session.commit()
        activity_id = activity.activity_id
        resp = jsonify(
            activity_id = activity.activity_id
        )

        return resp
    except Exception as e:
        print(e)
        return Response(status=500)
    return Response(status=500)
    # return jsonify(message='Hello, API')

if __name__ == '__main__':
    app.run(debug=True)