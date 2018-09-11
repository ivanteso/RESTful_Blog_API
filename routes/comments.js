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
      return res.status(422).send('Error: the comment is empty, impossible to publish');
    }
    let allComments = store.posts[req.params.id].comments
    let newComment = req.body
    let obj = {
      commentText: newComment.commentText
    }
    Object.entries(obj).forEach(([key, value]) => {
      if (value === undefined || value === '') {
        delete obj[key];
        delete obj[value];
      }
    })
    allComments.push(obj)
    res.status(200).send(allComments)
  },
  updateComment(req, res) {
    if (!store.posts[req.params.id]) {
      return res.status(404).send('Error: impossibe to add a comment to the post. Post not found');
    }
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
      return res.status(422).send('Error: the comment is empty, impossible to publish');
    }
    let allComments = store.posts[req.params.id].comments
    let commentToUpdate = store.posts[req.params.id].comments[req.params.commentId]
    let updatedComment = req.body;
    let updObj = {
      commentText: updatedComment.commentText
    }
    Object.entries(updObj).forEach(([key, value]) => {
      if (value === undefined || value === '') {
        delete updObj[key];
        delete updObj[value];
      }
    })
    if (updObj.constructor === Object && Object.keys(updObj).length === 0) {
      return res.status(422).send('Error: impossible to update the comment. Values not allowed');
    }
    commentToUpdate = updObj
    allComments.splice(req.params.commentId, 1, commentToUpdate)
    res.status(200).send(allComments)
  },
  removeComment(req, res) {
    if (!store.posts[req.params.id].comments[req.params.commentId]) {
      return res.status(404).send('Error: impossibe to delete the comment. Post or comment not found');
    }
    store.posts[req.params.id].comments.splice(req.params.commentId, 1)
    res.status(201).send(`Comment ${req.params.commentId} of post ${req.params.id} deleted`)
  }
}
