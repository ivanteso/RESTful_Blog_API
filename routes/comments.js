// Route do get, post, put and delete comments for every given comment id

const store = require('../data/store')

module.exports = {
  getComments(req, res) {
    // Return error if the post requested is not in the database or the comment
    // selected is not in the post
    if (!store.posts[req.params.id]) {
      return res.status(404).send("Post not found")
    } else if (store.posts[req.params.id].comments.length === 0) {
      return res.status(404).send("No comments available")
    } else {
      res.status(200).send(store.posts[req.params.id].comments)
    }
  },
  addComment(req, res) {
    // Return error if the post requested is not in the database
    if (!store.posts[req.params.id]) {
      return res.status(404).send('Error: impossibe to add a comment to te post. Post not found');
    }
    // Return error if try to add an empty comment
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
      return res.status(422).send('Error: the comment is empty, impossible to publish');
    }
    let allComments = store.posts[req.params.id].comments
    let newComment = req.body
    // Whitelist the key of the object
    let obj = {
      commentText: newComment.commentText
    }
    // Delete key and values if the user tries to send undefined/empty strings as values
    Object.entries(obj).forEach(([key, value]) => {
      if (value === undefined || value === '') {
        delete obj[key];
        delete obj[value];
      }
    })
    // Return the error after the comment sent by the user has been deleted
    if (obj.constructor === Object && Object.keys(obj).length === 0) {
      return res.status(422).send('Error: impossible to add the comment. Values not allowed');
    }
    // Push the comment in the last position of the array
    allComments.push(obj)
    // Send back the new array to the user
    res.status(200).send(allComments)
  },
  updateComment(req, res) {
    // Return error if the post requested is not in the database
    if (!store.posts[req.params.id]) {
      return res.status(404).send('Error: impossibe to add a comment to the post. Post not found');
    }
    // Return error if try to add an empty comment
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
      return res.status(422).send('Error: the comment is empty, impossible to publish');
    }
    let allComments = store.posts[req.params.id].comments
    let commentToUpdate = store.posts[req.params.id].comments[req.params.commentId]
    let updatedComment = req.body
    // Whitelist the key of the object
    let updObj = {
      commentText: updatedComment.commentText
    }
    // Delete key and values if the user tries to send undefined/empty strings as values
    Object.entries(updObj).forEach(([key, value]) => {
      if (value === undefined || value === '') {
        delete updObj[key];
        delete updObj[value];
      }
    })
    // Return the error after the comment sent by the user has been deleted
    if (updObj.constructor === Object && Object.keys(updObj).length === 0) {
      return res.status(422).send('Error: impossible to update the comment. Values not allowed');
    }
    commentToUpdate = updObj
    // Remove the old element and insert the new comments at its place
    allComments.splice(req.params.commentId, 1, commentToUpdate)
    // Send back the updated array
    res.status(200).send(allComments)
  },
  removeComment(req, res) {
    // Return error if the user tries to delete a comment that doesn't exist
    if (!store.posts[req.params.id].comments[req.params.commentId]) {
      return res.status(404).send('Error: impossibe to delete the comment. Post or comment not found');
    }
    // Splice out the comment to the array
    store.posts[req.params.id].comments.splice(req.params.commentId, 1)
    // Give the information about the comment deleted
    res.status(201).send(`Comment ${req.params.commentId} of post ${req.params.id} deleted`)
  }
}
