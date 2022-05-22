from crypt import methods
from flask import Flask, make_response
from flask_sqlalchemy import SQLAlchemy

import config

db = SQLAlchemy()
app = Flask(__name__)
app.config.from_object(config)
 
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = "mysql+pymysql://user_name:password@IP:3306/db_name"
 
db.init_app(app)

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
    return




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
                    "activity_info": "string"
                },
            ]
        error
            status code 500

"""
@app.route('/api/v1/activity', methods=['GET'])
def create_activity():
    return



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
                "activity_info": "string"
            }
        error
            status code 500

"""
@app.route('/api/v1/activity/:activity_id', methods=['GET'])
def create_activity():
    return




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
   


    return


# create user, login, create activity
if __name__ == '__main__':
    app.run()