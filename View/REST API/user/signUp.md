# SignIn Page API

API for SignUp Page.

Url : `/MyEng/SignUp`

--------
## Direct to Welcome

**Describle** : When click button "Trang Chu" in Interface 

**URL** : `localhost:3000/MyEng/Welcome`

**Method** : `GET`

### **Success Response**

**Code** : `200 OK`

**Content** : Return File 'Welcome'

--------
## Direct to SignIn

**Describle** : When click button "Dang nhap" in Interface 

**URL** : `localhost:3000/MyEng/SignIn`

**Method** : `GET`

### **Success Response**

**Code** : `200 OK`

**Content** : Return File 'SignIn'

--------
## Submit SignUp

**Describle** : When click button "Dang ki" in Interface 

**URL** : `localhost:8080/MyEng/SignUp`

**Method** : `POST`

**Data constraints** : 
```
{
    ** Use the required form **
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

**Note** : After get response, callback function send a GET request to "MainPage" (see main.md)