
This is a simple web page displaying the details of all the registered users.
Features:

User Profile:
Users information including their names,email,phone no.,website can be displayed in form of cards.
Posts:
Like Users: Authenticated users can like the users.
Edit Users: Users details can be edited by clicking on edit icon.
Delete Users: User can be deleted by clicking on delete icon.


Technologies Used:

Frontend:

React.js: For building the user interface.
Axios: For making HTTP requests.
Avatars by Dicebar for displaying the profile image of users.

Backend:

Node.js: For the server-side runtime environment.
Express.js: For building the RESTful API.
MongoDB: As the database to store user and post data.
Mongoose: For object data modeling (ODM) with MongoDB.

Authentication:

JWT: For secure authentication and authorization

## Prerequisites
## FRONTEND
[![React](https://img.shields.io/badge/React-%5E17.0.0-blue)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-%5E14.0.0-green)](https://nodejs.org/)

- [Node.js](https://nodejs.org/) installed on your machine.

## Getting Started

Follow these steps to set up and run the project locally.

### 1. Clone the Repository

```bash
git clone https://github.com/kshitiz11101/Bytive-Technologies
cd frontend
npm install
npm start
```

## BACKEND
## Setting Environment Variables
* Place the .env file in the root folder in Server.
* change the environament variable values according to the above database settings.

## Environment Variables
set these environment variables in the .env file
```bash
PORT=
JWT_SECRET_KEY=
MONGO_URL=

```

## Setting Project
```bash
cd backend
npm install
npm start
```
## Some Major Routes

## Register user

```bash
    route: http://localhost:8800/api-v1/auth/register
   request:
    "name": "Kshitiz Sharma",
      "email": "kshitiz@gmail.com",
      "password":"enter accordingly",
      "phone": "992939394",
      "website": "www.kshitizsharma.com",
    response:
  {
  "success": true,
  "message": "Account created successfully",
  "user": {
    "name": "Kshitiz Sharma",
    "email": "kshitiz@gmail.com",
    "phone": "992939394",
    "website": "www.kshitizsharma.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjZiMTMxNDk3ODc2YjYzODk3NGJlOTMiLCJpYXQiOjE3MTgyOTMyNjksImV4cCI6MTcxODM3OTY2OX0.r0PAyMWq0HeFu3WLTVIy9fV0aZlx-9P3GK6xlgicryw"

```
## Login

```bash
    route: http://localhost:8800/api-v1/auth/login
    request:
   {
       
    "email":"Sherwood@rosamond.me",
    "password":"123456"
    }
   {
  "success": true,
  "message": "Login successfully",
  "user": {
    "_id": "6664a945b10ab406bdc58389",
    "name": "Nicholas Runolfsdottir V",
    "email": "Sherwood@rosamond.me",
    "phone": "586.493.6943 x140",
    "website": "http://jacynthe.com",
    "__v": 0
  },


```
## get-users
```bash
route: http://localhost:8800/api-v1/users/


```
## edit-users
```bash
route: http://localhost:8800/api-v1/users/update-user
```
## delete-users
```bash
route: http://localhost:8800/api-v1/users/delete-user/:id

