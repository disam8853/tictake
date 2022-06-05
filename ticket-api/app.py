from flask import Flask, jsonify, request, Response
import bigtable
import utils
from urllib.parse import unquote


app = Flask(__name__)


@app.route('/test_api/', methods=['GET'])
def test_api():
    # bigtable.delete_table("tictake")
    bigtable.create_table("tictake")
    return jsonify(message='Create table successfully')


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
                "activity_id": "string",
                "has_paid": "string", # 1:yes ; 0:no
                "key": "member#activity_id#yyyymmddhhmmss",
                "member": "string",
                "order_timestamp": "yyyy-mm-dd hh:mm:ss"
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
        res = bigtable.create_order(member, activity_id, order_timestamp)
        if res != "":
            return res
        else:
            return Response(status=500)
    except Exception as e:
        print(e)
        return Response(status=500)


"""
    Create ticket order by key
    @request
    {
        "key":"member#activity_id#yyyymmddhhmmss"
    }
    # Please provide the timestamp in GMT format

    @response
        success
            status code 200
            {
                "activity_id": "string",
                "has_paid": "string", # 1:yes ; 0:no
                "key": "member#activity_id#yyyymmddhhmmss",
                "member": "string",
                "order_timestamp": "yyyy-mm-dd hh:mm:ss"
            }
        error
            status code 500

"""
@app.route('/ticket/', methods=['POST'])
def add_ticket_by_key():
    data = request.get_json()
    keys = data['key'].split('#')
    if len(keys) == 3 and len(keys[0]) > 0 and len(keys[1]) > 0 and len(keys[2]) == 14:
        res = bigtable.create_order(keys[0], keys[1], utils.str_to_gmt(keys[2]))
        if res != "":
            return res
        else:
            return Response(status=500)
    else:
        return Response(status=500)


"""
    Update ticket order [PUT]
    @request
        url: <BASE_URL>/ticket/<key>
        key:member#activity_id#order_timestamp(yyyymmddhhmmss)
        # Please use URL encode before sending a request

    @response
        success
            status code 200
            {
                "activity_id": "string",
                "has_paid": "string", # 1:yes ; 0:no
                "key": "member#activity_id#yyyymmddhhmmss",
                "member": "string",
                "order_timestamp": "yyyy-mm-dd hh:mm:ss"
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
                "activity_id": "string",
                "has_paid": "string", # 1:yes ; 0:no
                "key": "member#activity_id#yyyymmddhhmmss",
                "member": "string",
                "order_timestamp": "yyyy-mm-dd hh:mm:ss"
            }
        error
            status code 200
            {
                "msg":"fail"
            }

"""
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
        query: can use both `member` and `activity_id` or only use one of them

    @response
        success
            status code 200
            [
                {
                    "activity_id": "string",
                    "has_paid": "string",  # 1:yes ; 0:no
                    "key": "member#activity_id#yyyymmddhhmmss",
                    "member": "string",
                    "order_timestamp": "yyyy-mm-dd hh:mm:ss"
                },
                ...
            ]
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
