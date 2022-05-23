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

    return utc_dt