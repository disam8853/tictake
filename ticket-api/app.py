from flask import Flask, jsonify, request, Response
import bigtable
import utils


app = Flask(__name__)


@app.route('/ticket_api/', methods=['GET'])
def test_api():
    # bigtable.create_table("tictake")
    return jsonify(message='Hello, API')


@app.route('/add_ticket_order/', methods=['POST'])
def add_ticket_order():
    data = request.get_json()
    member = data['member']
    activity_id = data['activity_id']
    has_paid = data['has_paid']
    order_timestamp = utils.utc8_to_gmt(data['order_timestamp'])
    bigtable.create_order(member, activity_id, has_paid, order_timestamp)

    resp = jsonify(success="true")
    return resp

    # try:
    #     data = request.get_json()
    #     member = data['member']
    #     activity_id = data['activity_id']
    #     has_paid = data['has_paid']
    #     order_timestamp = utils.utc8_to_gmt(data['order_timestamp'])
    #     bigtable.create_order(member, activity_id, has_paid, order_timestamp)

    #     resp = jsonify(success="true")
    #     return resp
    # except Exception as e:
    #     print(e)
    #     return Response(status=500)
    # return Response(status=500)


if __name__ == '__main__':
    app.run(debug=True)
