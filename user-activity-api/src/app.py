from models.models import db
from environs import Env
from flask import Flask

from apps.activity.ActivityAPI import activity_api
from apps.user.UserAPI import user_api

env = Env()
env.read_env()
app = Flask(__name__)

app.register_blueprint(activity_api, url_prefix='/api/v1/activity')
app.register_blueprint(user_api, url_prefix='/api/v1/user')

db.init_app(app)

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

if __name__ == '__main__':
    app.run()
