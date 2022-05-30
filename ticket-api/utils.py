from datetime import datetime, timezone
import pytz

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
    utc_str = utc_dt.replace(tzinfo=None)
    return str(utc_str)

def utc_to_str(time_utc):
    time_format = "%Y-%m-%d %H:%M:%S"
    dt = datetime.strptime(str(time_utc), time_format)
    return dt.strftime("%Y%m%d%H%M%S")