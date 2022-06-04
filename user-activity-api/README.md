# user-activity-api

This API includes two services:
1. User service
2. Activity service

## User service
users can create account and login to check whether users are validate to access the resources

### Create account
##### HTTP Request URL
```
POST /api/v1/user/create
```
##### HTTP Request Body
```
{
    "first_name": "string",
    "last_name": "string",
    "email": "string",
    "password": "string"
}
```
##### HTTP Response Body
```
Http Status == 200
```

### Login
##### HTTP Request URL
```
POST /api/v1/user/login
```
##### HTTP Request Body
```
{
    "email": "string",
    "password": "string"
}
```
##### HTTP Response Body
```
Http Status == 200
```

## Activity service
Whenever creating a activity, the user_id in the request json file must exists in the user service
###  List all activities
##### HTTP Request URL
```
GET /api/v1/activity
```
##### HTTP Request Body
N/A
##### HTTP Response Body
```
[
    {
        "activity_id": "string",
        "activity_name": "string",
        "start_date": "yyyy-mm-dd hh:mm:ss+08:00",
        "end_date": "yyyy-mm-dd hh:mm:ss+08:00",
        "total_inventory": "integer",
        "remaining_inventory": "integer",
        "activity_info": "string",
        "price": "integer",
        "created_time": "yyyy-mm-dd hh:mm:ss+08:00",
        "create_time": "yyyy-mm-dd hh:mm:ss+08:00"
    },
]
```

### List specific activity
##### HTTP Request URL
```
GET /api/v1/activity/<activity_id>
```
##### HTTP Request Body
N/A
##### HTTP Response Body
```
{
    "activity_id": "string",
    "activity_name": "string",
    "start_date": "yyyy-mm-dd hh:mm:ss+08:00",
    "end_date": "yyyy-mm-dd hh:mm:ss+08:00",
    "total_inventory": "integer",
    "remaining_inventory": "integer",
    "activity_info": "string",
    "price": "integer",
    "created_time": "yyyy-mm-dd hh:mm:ss+08:00",
    "user_id": "integer"
}
```

###  Reduce specific activity remaining inventory by its activity id
##### HTTP Request URL
```
POST /api/v1/activity/<activity_id>
```
##### HTTP Request Body
N/A
##### HTTP Response Body
```
Http Status == 200
```

### Create activity
##### HTTP Request URL
```
POST /api/v1/activity/
```
##### HTTP Request Body
```
{
    "activity_name": "string",
    "start_date": "yyyy-mm-dd hh:mm:ss",
    "end_date": "yyyy-mm-dd hh:mm:ss",
    "total_inventory": "integer",
    "activity_info": "string",
    "price": "integer",
    "user_id:" "integer"
}
```
##### HTTP Response Body
```
Http Status == 200
{
    "activity_id": "string"
}
```

### Delete specific activity
##### HTTP Request URL
```
DELETE /api/v1/activity/<activity_id>
```
##### HTTP Request Body
N/A
##### HTTP Response Body
```
Http Status == 200
{
   "message": "delete activity id: <activity_id> successfully" 
}
```