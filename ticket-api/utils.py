from datetime import datetime, timezone
import pytz


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
    print(dt)
    return dt.strftime("%Y-%m-%d %H:%M:%S")
    # time_format = "%Y-%m-%d %H:%M:%S"
    # dt = datetime.strptime(str(time_utc), time_format)
    # return dt.strftime("%Y%m%d%H%M%S")
