from flask import Blueprint, jsonify, Response, make_response, request

from models.models import Activity, db
from utils import utc8_to_gmt, gmt_to_utc8 

activity_api = Blueprint('ActivityAPI', __name__)

"""
    List all activities, including on going and finished activities.
    @response
        success
            status code 200
            [
                {
                    "activity_id": "string",
                    "activity_name": "string",
                    "start_date": "yyyy-mm-dd hh:mm:ss+08:00",
                    "end_date": "yyyy-mm-dd hh:mm:ss+08:00",
                    "total_inventory": "integer",
                    "remaining_inventory": "integer",
                    "activity_info": "string",
                    "price": "integer",
                    "created_time": "yyyy-mm-dd hh:mm:ss+08:00",
                    "create_time": "yyyy-mm-dd hh:mm:ss+08:00"
                },
            ]
        error
            status code 500

"""
@activity_api.route('/', methods=['GET'])
def get_activities():
    activities = Activity.query.all()
    
    activity_list = []
    for activity in activities:
        temp = {
            "activity_id": activity.activity_id, 
            "activity_name": activity.activity_name, 
            "start_date": gmt_to_utc8(activity.start_date), 
            "end_date": gmt_to_utc8(activity.end_date), 
            "total_inventory": activity.total_inventory, 
            "remaining_inventory": activity.remaining_inventory, 
            "activity_info": activity.activity_info, 
            "price": activity.price,
            "created_time": gmt_to_utc8(activity.created_time), 
        }
        activity_list.append(temp)

    return make_response(jsonify(activity_list),200)


"""
    List specific activity
    @response
        success
            status code 200
            {
                "activity_id": "string",
                "activity_name": "string",
                "start_date": "yyyy-mm-dd hh:mm:ss+08:00",
                "end_date": "yyyy-mm-dd hh:mm:ss+08:00",
                "total_inventory": "integer",
                "remaining_inventory": "integer",
                "activity_info": "string",
                "price": "integer",
                "created_time": "yyyy-mm-dd hh:mm:ss+08:00",
                "user_id": "integer"
            }
        error
            status code 500

"""
@activity_api.route('/<activity_id>', methods=['GET'])
def get_activity(activity_id):
    try:
        activity = Activity.query.filter_by(activity_id = activity_id).first()
        resp = jsonify(
            activity_id = activity.activity_id, 
            activity_name = activity.activity_name, 
            start_date = gmt_to_utc8(activity.start_date), 
            end_date = gmt_to_utc8(activity.end_date), 
            total_inventory = activity.total_inventory, 
            remaining_inventory = activity.remaining_inventory, 
            activity_info = activity.activity_info, 
            price = activity.price,
            created_time = gmt_to_utc8(activity.created_time), 
            user_id=activity.user_id
            )
        return resp
    except Exception as e:
        print(e)
        return Response(status=500)


"""
    Reduce specific activity remaining inventory by its activity id
    @response
        success
            status code 200
        error
            status code 500
"""
@activity_api.route('/<activity_id>', methods=['POST'])
def reduce_by_activity_id(activity_id):
    try:
        activity = Activity.query.filter_by(activity_id=activity_id).first()
        activity.remaining_inventory = activity.remaining_inventory - 1

        db.session.commit()
        return Response(status=200)
    except Exception as e:
        print(e)
        return Response(status=500)


"""
    Create activity
    @request
    {
        "activity_name": "string",
        "start_date": "yyyy-mm-dd hh:mm:ss",
        "end_date": "yyyy-mm-dd hh:mm:ss",
        "total_inventory": "integer",
        "activity_info": "string",
        "price": "integer",
        "user_id:" "integer"
    }

    @response
        success
            status code 200
            {
                "activity_id": "string"
            }
        error
            status code 500

"""
@activity_api.route('/', methods=['POST'])
def create_activity():
    try:
        data = request.get_json()
        activity = Activity(
            activity_name = data['activity_name'], 
            start_date = utc8_to_gmt(data['start_date']),
            end_date = utc8_to_gmt(data['end_date']),
            total_inventory = data['total_inventory'],
            remaining_inventory = data['total_inventory'],
            activity_info = data['activity_info'],
            price = data['price'],
            user_id = data['user_id']
        )
        db.session.add(activity)
        db.session.commit()
        resp = jsonify(
            activity_id = activity.activity_id
        )

        return resp
    except Exception as e:
        print(e)
        return Response(status=500)


"""
    Delete specific activity
    @response
        success
            status code 200
            {
                "message": "delete activity id: <activity_id> successfully"
            }
        error
            status code 500
"""
@activity_api.route('/<activity_id>', methods=['DELETE'])
def delete_activity(activity_id):
    try: 
        deleted_activity = Activity.query.filter_by(activity_id=activity_id).one()
        db.session.delete(deleted_activity)
        db.session.commit()

        resp = jsonify(
            activity_id = f'delete activity id: {deleted_activity.activity_id} successfully'
        )

        return resp
    except Exception as e:
        print(e)
        return Response(status=500)
