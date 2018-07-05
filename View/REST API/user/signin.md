# SignIn Page API

API for SignIn Page.

Url : `/MyEng/SignIn`

--------
## Direct to Welcome

**Describle** : When click button "Trang Chu" in Interface 

**URL** : `/MyEng/Welcome`

**Method** : `GET`

### **Success Response**

**Code** : `200 OK`

**Content** : Return File 'Welcome'

--------
## Direct to SignUp

**Describle** : When click button "Dang ki" in Interface 

**URL** : `/MyEng/SignUp`

**Method** : `GET`

### **Success Response**

**Code** : `200 OK`

**Content** : Return File 'SignUp'

--------
## Submit SignIn

**Describle** : When click button "Dang nhap" in Interface 

**URL** : `/MyEng/SignIn`

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
    "userId" : String
}
```

**Note** : After get response, callback function send a GET request to "MainPage" (see main.md)