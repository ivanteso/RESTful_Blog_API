// Exports the comment and post modules to use in server.js

const posts = require('./posts')
const comments = require('./comments')

module.exports = {posts, comments}
