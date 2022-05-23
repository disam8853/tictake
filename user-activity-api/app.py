from crypt import methods
from datetime import datetime, timezone
import pytz
from environs import Env
from flask import Flask, make_response, jsonify, Response, request
from flask_sqlalchemy import SQLAlchemy


env = Env()
env.read_env()
app = Flask(__name__)

db = SQLAlchemy(app)

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = env("DATABASE_URI")
app.config['SQLALCHEMY_ECHO'] = True
app.config['SQLALCHEMY_ENGINE_OPTIONS'] = {
    "pool_pre_ping": True,
    "pool_recycle": 300,
    'pool_timeout': 900,
    'pool_size': 10,
    'max_overflow': 5,
}

def gmt_to_utc8(time_str):
    time_format = "%Y-%m-%d %H:%M:%S"
    now = datetime.strptime(str(time_str), time_format)
    now_utc = now.replace(tzinfo=timezone.utc)
    now_local = now_utc.astimezone()

    return str(now_local)

def utc8_to_gmt(time_str):
    time_format = "%Y-%m-%d %H:%M:%S"
    old_dt = datetime.strptime(str(time_str), time_format)
    dt = pytz.timezone("Asia/Taipei").localize(old_dt)
    utc_dt = pytz.utc.normalize(dt.astimezone(pytz.utc))

    return utc_dt

class User(db.Model):
    __tablename__ = 'user'
    user_id = db.Column(db.Integer, primary_key=True, nullable=False)
    first_name = db.Column(db.String(20), nullable=False)
    last_name = db.Column(db.String(20))
    email = db.Column(db.String(40), nullable=False)
    password = db.Column(db.String(64), nullable=False)
class Activity(db.Model):
    __tablename__ = 'activity'
    activity_id = db.Column(db.Integer, primary_key=True, nullable=False)
    activity_name = db.Column(db.String(30), nullable=False)
    start_date = db.Column(db.DateTime, nullable=False)
    end_date = db.Column(db.DateTime, nullable=False)
    total_inventory = db.Column(db.Integer, nullable=False)
    remaining_inventory = db.Column(db.Integer, nullable=False)
    activity_info = db.Column(db.String(300), nullable=False)
    created_time = db.Column(db.DateTime, default=datetime.utcnow(), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.user_id'), nullable=False)

@app.route('/api/v1/user', methods=['GET'])
def test():
    user = User.query.filter_by(user_id = 1).first()
    resp = jsonify(user_id=user.user_id)
    return resp


"""
    User login
    @request
    {
        "email": "string",
        "password": "string"
    }
    @response
        success
            status code 200
        error
            status code 500
"""
@app.route('/api/v1/user/login', methods=['POST'])
def login():
    # sql_cmd = """
    #     select *
    #     from product
    #     """

    # query_data = db.engine.execute(sql_cmd)
    # print(query_data)
    headers = {"Content-Type": "application/json"}
    return make_response(
        'Test worked!',
        200,
        headers=headers
    )



"""
    Create user
    @request
    {
        "first_name": "string",
        "last_name": "string",
        "email": "string",
        "password": "string" // store in sha256
    }
    @response
        success
            status code 200
        error
            status code 500
"""
@app.route('/api/v1/user/create', methods=['POST'])
def create_user():
    user = User(first_name = 'peter', email = 'peter@p.p', password = 'password')
    db.session.add(user)
    db.session.commit()
    return Response(status=200)




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
@app.route('/api/v1/activity', methods=['GET'])
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
@app.route('/api/v1/activity/<activity_id>', methods=['GET'])
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
@app.route('/api/v1/activity', methods=['POST'])
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


# create user, login, create activity
if __name__ == '__main__':
    app.run()