# CSV to JSON converter

This project is part of the Microsoft's __Introduction to NodeJS__ course. This project's purpose is to build a RESTful API to manage blog entries, like posts and comments. The REST API uses an in-memory store as database and the goal of the project was also to have a very small main file (server.js) which will allow to work easily on very large Express projects.

## Table of Contents

* [Application Features](#application)
* [Installation](#installation)
* [Instructions](#instructions)
* [Dependencies](#dependencies)
* [Contributing](#contributing)

## Application Features

The app is developed in NodeJS and use `express` and some other middleware like `body-parser`, `errorhandler` and `morgan`.
The Express application has the following REST API endpoints:

- __GET__ and __POST__ /posts
- __PUT__ and __DELETE__ /posts/:id/
- __GET__ and __POST__ /posts/:postId/comments
- __PUT__ and __DELETE__ /posts/:postId/comments/:commentId

## Installation

You can clone this repository or download it as a .zip file.
Once downloaded, you need to run `npm install` in your console to install all the npm dependencies.

## Instructions

To use the application you must use your terminal and navigate to the app's local folder and start the local server on port 3000, using `npm start`. This will result in starting the server at `http://localhost:3000`.
In order to test the API you can use [Postman](https://www.getpostman.com/), CURL or any other HTTP agent or tester. For example, the CRUD commands are
```
//posts post data
curl -H "Content-Type: application/json" -X POST -d '{"name": "Top 10 ES6 Features", "url":"http://webapplog.com/es6", "text": ""}'  "http://localhost:3000/posts"

//updates post data at specific id
curl -H 'Content-Type: application/json' -X PUT -d '{"name": "Top 10 ES6 Features Every Developer Must Know", "url":"http://webapplog.com/es6", "text": ""}' "http://localhost:3000/posts/0"

//gets post data
curl "http://localhost:3000/posts"

//deletes post data at specific id
curl -X DELETE "http://localhost:3000/posts/0"
```
The server has many safety checks implemented from scratch. For example, it doesn't allow the user to post empty values that may result in deleting the old values. The server has also a whitelist, so the user can't send to the server things that are not previously authorized.

An initial post is provided in `data/store.js` and it has this structure:
```
posts: [
    {name: 'Top 10 ES6 Features every Web Developer must know',
    url: 'https://webapplog.com/es6',
    text: 'This essay will give you a quick introduction to ES6. If you don’t know what is ES6, it’s a new JavaScript implementation.',
    comments: [
      text: 'Cruel…..var { house, mouse} = No type optimization at all',
      text: 'I think you’re undervaluing the benefit of ‘let’ and ‘const’.',
      text: '(p1,p2)=>{ … } ,i understand this ,thank you !'      
    ]
    }
  ]
  ```
  Other keys the user is allowed to create are `picture` and `verified`.
  
## Dependencies

This app is built with [NodeJS](https://nodejs.org/en/)
This app uses the following resources:

- [`express`](https://github.com/expressjs/express). Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
- [`body-parser`](https://github.com/expressjs/body-parser). Parse incoming request bodies in a middleware before your handlers, available under the `req.body` property.
- [`errorhandler`](https://github.com/expressjs/errorhandler). This middleware is only intended to be used in a development environment, as the full error stack traces and internal details of any object passed to this module will be sent back to the client when an error occurs.
- [`morgan`](https://github.com/expressjs/morgan). HTTP request logger middleware for node.js

## Contributing

All suggestions and tips will be more than appreciated but, as a general rule, no pull requests are normally accepted.
