import requests
from datetime import datetime
import pytz
import sys
from environs import Env
import json


def gmt_to_utc8(time_str):
    time_format = "%Y-%m-%d %H:%M:%S"
    dt = datetime.strptime(str(time_str), time_format)
    gmt_dt = pytz.utc.localize(dt)
    tw = pytz.timezone('Asia/Taipei')
    utc8_dt = gmt_dt.astimezone(tw)
    utc_str = utc8_dt.replace(tzinfo=None)
    return str(utc_str)


def utc8_to_gmt(time_str):
    time_format = "%Y-%m-%d %H:%M:%S"
    old_dt = datetime.strptime(str(time_str), time_format)
    dt = pytz.timezone("Asia/Taipei").localize(old_dt)
    utc_dt = pytz.utc.normalize(dt.astimezone(pytz.utc))
    utc_str = utc_dt.replace(tzinfo=None)
    return str(utc_str)


def utc_to_str(time_utc):
    time_format = "%Y-%m-%d %H:%M:%S"
    dt = datetime.strptime(str(time_utc), time_format)
    return dt.strftime("%Y%m%d%H%M%S")


def str_to_gmt(time_str):
    time_format = "%Y%m%d%H%M%S"
    dt = datetime.strptime(str(time_str), time_format)
    return dt.strftime("%Y-%m-%d %H:%M:%S")


def reduce_remaining_inventory(activity_id):
    env = Env()
    env.read_env()
    USER_ACTIVITY_URL = env("USER_ACTIVITY_URL")

    # get remaining inventory
    activity_response = requests.request(
        "GET", f"{USER_ACTIVITY_URL}/{activity_id}")
    activity_json = json.loads(activity_response.text)
    remaining_inventory = activity_json['remaining_inventory']
    # print("remaining_inventory:",remaining_inventory, file=sys.stderr)

    # reduce_by_activity_id
    if remaining_inventory > 0:
        reduce_response = requests.request(
            "POST", f"{USER_ACTIVITY_URL}/{activity_id}")
        return reduce_response.status_code == 200
    else:
        return False
