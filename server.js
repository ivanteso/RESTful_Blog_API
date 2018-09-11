const express = require('express')
const logger = require('morgan')
const errorhandler = require('errorhandler')
const bodyParser = require('body-parser')
const routes = require('./routes')

let app = express()
app.use(bodyParser.json())
app.use(logger('dev'))
app.use(errorhandler())

app.get('/posts', routes.posts.getPosts)
app.post('/posts', routes.posts.addPost)
app.put('/posts/:id', routes.posts.updatePost)
app.delete('/posts/:id', routes.posts.removePost)

app.get('/posts/:id/comments', routes.comments.getComments)
app.post('/posts/:id/comments', routes.comments.addComment)
app.put('/posts/:id/comments/:commentId', routes.comments.updateComment)
app.delete('/posts/:id/comments/:commentId', routes.comments.removeComment)

app.listen(3000)
