from flask import Flask, jsonify, request, Response
import bigtable
import utils
from urllib.parse import unquote


app = Flask(__name__)


@app.route('/test_api/', methods=['GET'])
def test_api():
    bigtable.create_table("tictake_test")
    return jsonify(message='Hello, API')


"""
    Create ticket order
    @request
    {
        "member":"string",
        "activity_id":"string",
        "order_timestamp":"yyyy-mm-dd hh:mm:ss"
    }

    @response
        success
            status code 200
            {
                "msg": "string"
            }
        error
            status code 500

"""


@app.route('/add_ticket_order/', methods=['POST'])
def add_ticket_order():
    try:
        data = request.get_json()
        member = data['member']
        activity_id = data['activity_id']
        order_timestamp = utils.utc8_to_gmt(data['order_timestamp'])
        key = bigtable.create_order(member, activity_id, order_timestamp)
        if key != "":
            return jsonify(msg=f"create order: {key} successfully")
        else:
            return Response(status=500)
    except Exception as e:
        print(e)
        return Response(status=500)


"""
    Update ticket order
    @request
        url: <BASE_URL>/get_ticket/<key>
        key:member#activity_id#order_timestamp(yyyymmddhhmmss)

    @response
        success
            status code 200
            {
                "msg": "string"
            }
        error
            status code 500

"""


@app.route('/ticket/<key>', methods=['PUT'])
def update_ticket_order(key):
    try:
        key = unquote(key)
        if key != "":
            res = bigtable.order_has_paid(key)
            return res
        else:
            return Response(status=500)
    except Exception as e:
        print(e)
        return Response(status=500)


"""
    Get ticket order by key
    @request
        url: <BASE_URL>/get_ticket/<key>
        key:"member#activity_id#order_timestamp(yyyymmddhhmmss)

    @response
        success
            status code 200
            {
                "member":"string",
                "activity_id":"string",
                "has_paid":"string" # 1:yes ; 0:no
                "order_timestamp":"yyyy-mm-dd hh:mm:ss"
            }
        error
            status code 200
            {
                "msg":"fail"
            }

"""


# @app.route('/get_ticket/', methods=['POST'])
# def get_ticket_by_key_post():
#     try:
#         data = request.get_json()
#         key = data['key']
#         res = bigtable.get_order_by_key(key)
#         return res
#     except Exception as e:
#         print(e)
#         return Response(status=500)


@app.route('/get_ticket/<key>', methods=['GET'])
def get_ticket_by_key(key):
    try:
        key = unquote(key)
        if key != "":
            res = bigtable.get_order_by_key(key)
            return res
        else:
            return Response(status=500)
    except Exception as e:
        print(e)
        return Response(status=500)


"""
    Get ticket order by query
    @request
        url: <BASE_URL>/search_ticket/?member=string&activity_id=integer

    @response
        success
            status code 200
            [{
                "member":"string",
                "activity_id":"string",
                "has_paid":"string" # 1:yes ; 0:no
                "order_timestamp":"yyyy-mm-dd hh:mm:ss"
            }]
        error
            status code 200
            []

"""
@app.route('/search_ticket/', methods=['GET'])
def get_ticket_by_query():
    member = request.args.get('member')
    activity_id = request.args.get('activity_id')
    res = bigtable.get_order_by_filter(member, activity_id)
    return res


if __name__ == '__main__':
    app.run(debug=True)
