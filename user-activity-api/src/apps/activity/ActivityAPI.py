from flask import Blueprint, jsonify, Response

from models.models import Activity
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
                    "start_date": "yyyy-mm-ddThh:mm:ssZ",
                    "end_date": "yyyy-mm-ddThh:mm:ssZ",
                    "total_inventory": "integer",
                    "activity_info": "string",
                    "create_time": "yyyy-mm-ddThh:mm:ssZ"
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
        temp = jsonify(
            activity_id=activity.activity_id, 
            activity_name=activity.activity_name, 
            start_date=activity.start_date, 
            end_date=activity.end_date, 
            total_inventory=activity.total_inventory, 
            remaining_inventory=activity.remaining_inventory, 
            activity_info=activity.activity_info, 
            created_time=activity.created_time, 
        )
        activity_list.append(temp)

    return jsonify(activity_list)



"""
    List specific activity
    @response
        success
            status code 200
            {
                "activity_id": "string",
                "activity_name": "string",
                "start_date": "yyyy-mm-ddThh:mm:ssZ",
                "end_date": "yyyy-mm-ddThh:mm:ssZ",
                "total_inventory": "integer",
                "remaining_inventory": "integer",
                "activity_info": "string",
                "created_time": "yyyy-mm-ddThh:mm:ssZ",
                "user_id": "integer"
            }
        error
            status code 500

"""
@activity_api.route('/<activity_id>', methods=['GET'])
def get_activity(activity_id):
    activity = Activity.query.filter_by(activity_id = activity_id).first()
    resp = jsonify(
        activity_id = activity.activity_id, 
        activity_name = activity.activity_name, 
        start_date = gmt_to_utc8(activity.start_date), 
        end_date = gmt_to_utc8(activity.end_date), 
        total_inventory = activity.total_inventory, 
        remaining_inventory = activity.remaining_inventory, 
        activity_info = activity.activity_info, 
        created_time = gmt_to_utc8(activity.created_time), 
        user_id=activity.user_id
        )
    return resp


"""
    Create activity
    @request
    {
        "activity_name": "string",
        "start_date": "yyyy-mm-ddThh:mm:ssZ",
        "end_date": "yyyy-mm-ddThh:mm:ssZ",
        "total_inventory": "integer",
        "remaining_inventory": "integer",
        "activity_info": "string"
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
            remaining_inventory = data['remaining_inventory'],
            activity_info = data['activity_info'],
            user_id = data['user_id']
        )
        db.session.add(activity)
        db.session.commit()
        activity_id = activity.activity_id

        # return Response(status=200)
        return str(utc8_to_gmt(data['start_date']))
    except Exception as e:
        print(e)
        return Response(status=500)
    return Response(status=500)