# SignUp Page API

API for SignUp Page.

Url : `/MyEng/SignUp`

Default host : `http://localhost:8080` 

--------
## Direct to Welcome

**Describle** : When click button "Trang Chu" in Interface 

**URL** : `/MyEng/Welcome`

**Method** : `GET`

### **Success Response**

**Code** : `200 OK`

**Content** : Return File 'Welcome'

--------
## Direct to SignIn

**Describle** : When click button "Dang nhap" in Interface 

**URL** : `MyEng/SignIn`

**Method** : `GET`

### **Success Response**

**Code** : `200 OK`

**Content** : Return File 'SignIn'

--------
## Submit SignUp

**Describle** : When click button "Dang ki" in Interface 

**URL** : `localhost:8080/api/user/signup`

**Method** : `POST`

**Data constraints** : 
```
{
    username: string,
    email: string,
    password: string,
    displayName: string,
    birthday: string,   **pattern YYYY-MM-DD**
    livingIn: string,
    gender: string,     ** value : ["Nam", "Nu"] **
    job: string,
    file : input File
}
```

### **Success Response**

**Code** : `200 OK`

**Content** : 
```
{
    "errCode": 200,
    "msg": "Success",
    "data": {
        "user": {
            "_id": "5a02d2842d0e2a22c02eb728",
            "username": "tungdd",
            "email": "hihi@gmail.com",
            "password": "#####",
            "displayName": "Bandle gunner",
            "birthday": "1996-09-26",
            "livingIn": "Hanoi",
            "gender": "1",
            "isBlock": 0,
            "avatar": "/hihi",
            "job": "Student",
            "streak": 0,
            "current_level": 0,
            "current_topic_Id": "",
            "current_course_Id": "",
            "__v": 0
        }
    }
}
```
### **Failure Response**

**Code** : `400`

**Content** : 
```
    { errCode: 400, msg: 'User already exists' }
```
-----

**Code** : `413`

**Content** : 
```
    {errCode: 413, msg: "Unsupported media type" }
```
-------

**Note** : After get response, callback function send a GET request to "MainPage" (see main.md)