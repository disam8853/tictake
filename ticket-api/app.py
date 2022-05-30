from flask import Flask, jsonify, request, Response
import bigtable
import utils


app = Flask(__name__)


@app.route('/ticket_api/', methods=['GET'])
def test_api():
    bigtable.create_table("tictake_test")
    return jsonify(message='Hello, API')


"""
    Create ticket order
    @request
    {
        "member":"string",
        "activity_id":"integer",
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
    Get ticket order by key
    @request
    {
        "key":"member#activity_id#order_timestamp(yyyymmddhhmmss)"
    }

    @response
        success
            status code 200
            {
                "member":"string",
                "activity_id":"integer",
                "has_paid":"1/0"
                "order_timestamp":"yyyy-mm-dd hh:mm:ss"
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
        # data = request.get_json()
        # key = data['key']
        res = bigtable.get_order_by_key(key)
        return res
    except Exception as e:
        print(e)
        return Response(status=500)


"""
    Get ticket order by key
    @request
    {
        "key":"member#activity_id#order_timestamp(yyyymmddhhmmss)"
    }

    @response
        success
            status code 200
            {
                "member":"string",
                "activity_id":"integer",
                "has_paid":"1/0"
                "order_timestamp":"yyyy-mm-dd hh:mm:ss"
            }
        error
            status code 200
            {
                "msg":"fail"
            }

"""
@app.route('/get_ticket/', methods=['GET'])
def get_ticket_by_query():
    member = request.args.get('member')
    activity_id = request.args.get('activity_id')
    res = bigtable.get_order_by_filter(member=member, activity_id=activity_id)
    return res
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
