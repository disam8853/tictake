import email
from flask import Blueprint, jsonify, Response, request, abort
from models.models import User, db

user_api = Blueprint('UserAPI', __name__)


"""
    User login, if login is failed, it will return 401
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
    try:
        email = request.json.get('email')
        password = request.json.get('password')
        user = User.query.filter_by(email = email).first()
        if not user or not user.verify_password(password):
            return Response(status=401)
        else:
            return Response(status=200)
    except Exception as e:
        print(e)
        return Response(status=500)



"""
    Create user, if email had existed, it will return 400
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
    first_name = request.json.get('first_name')
    last_name = request.json.get('last_name')
    email = request.json.get('email')
    password = request.json.get('password')

    if User.query.filter_by(email=email).first() is not None:
        abort(400)
    else:
        user = User(
            first_name = first_name,
            email = email,
        )
        if last_name is None:
            pass
        else:
            user.last_name = last_name
        user.hash_password(password)


        db.session.add(user)
        db.session.commit()
        return Response(status=200)