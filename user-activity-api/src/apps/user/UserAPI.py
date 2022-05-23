from flask import Blueprint, jsonify, Response
from models.models import User, db

user_api = Blueprint('UserAPI', __name__)

@user_api.route('/', methods=['GET'])
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
@user_api.route('/login', methods=['POST'])
def login():
    # sql_cmd = """
    #     select *
    #     from product
    #     """

    # query_data = db.engine.execute(sql_cmd)
    # print(query_data)
    headers = {"Content-Type": "user_apilication/json"}
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
@user_api.route('/create', methods=['POST'])
def create_user():
    user = User(first_name = 'peter', email = 'peter@p.p', password = 'password')
    db.session.add(user)
    db.session.commit()
    return Response(status=200)