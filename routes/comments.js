const store = require('../data/store')

module.exports = {
  getComments(req, res) {
    if (store.posts[req.params.id].comments.length === 0) {
      return res.status(404).send("No comments available")
    } else {
      res.status(200).send(store.posts[req.params.id].comments)
    }
  },
  addComment(req, res) {
    if (!store.posts[req.params.id]) {
      return res.status(404).send('Error: impossibe to add a comment to te post. Post not found');
    }
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
      return res.status(422).send('Error: the comment is empty');
    }
    let allComments = store.posts[req.params.id].comments
    let newComment = req.body
    let obj = {
      commentText: newComment.text
    }
    allComments.push(obj)
    res.status(200).send(allComments)
  },
  updateComment(req, res) {

  },
  removeComment(req, res) {

  }
}
