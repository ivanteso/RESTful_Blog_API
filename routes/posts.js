// Route do get, post, put and delete posts

const store = require('../data/store')

module.exports = {
  getPosts(req, res) {
    // Return error if there are no posts in the store array
    if (store.posts.length === 0) {
      return res.status(404).send("No posts available")
    } else {
      res.status(200).send(store.posts)
    }
  },
  addPost(req, res) {
    // Return error if try to add an empty post
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
      return res.status(422).send('Error: the post is empty');
    }
    let newPost = req.body
    let id = store.posts.length
    // Whitelist the keys of the new post
    let obj = {
        name: newPost.name,
        url: newPost.url,
        text: newPost.text,
        pictures: newPost.pictures,
        verified: newPost.verified,
        comments: newPost.comments
      }
    let i = obj.comments.length
    // Check if the key of every single comment object is 'commentText'. If not, splice it out at the given index
    while (i--) {
      if (!obj.comments[i].commentText) {
        obj.comments.splice(i, 1);
      }
    }
    // Delete key and values if the user tries to send undefined/empty strings as values
    Object.entries(obj).forEach(([key, value]) => {
      if (value === undefined || value === '') {
        delete obj[key];
        delete obj[value];
      }
    })
    // Return the error after the post sent by the user has been deleted
    if (obj.constructor === Object && Object.keys(obj).length === 0) {
      return res.status(422).send('Error: impossible to create the new post. Values not allowed');
    }
    // Push the new post into the store array
    store.posts.push(obj)
    // Send back to the user the info regarding the new post created
    let result = JSON.stringify(store.posts[id], null, 2)
    res.status(200).send(`Post created:\n\n ${result}`)
  },
  updatePost(req, res) {
    // Return error if the post requested is not in the database
    if (!store.posts[req.params.id]) {
      return res.status(404).send('Error: impossibe to update the post. Original post not found');
    }
    let updatedPost = req.body;
    // Whitelist the key of the object
    let updObj = {
      name: updatedPost.name,
      url: updatedPost.url,
      text: updatedPost.text,
      picture: updatedPost.picture,
      verified: updatedPost.verified
    }
    // Delete key and values if the user tries to send undefined/empty strings as values
    Object.entries(updObj).forEach(([key, value]) => {
      if (value === undefined || value === '') {
        delete updObj[key];
        delete updObj[value];
      }
    })
    // Return the error after the post sent by the user has been deleted
    if (updObj.constructor === Object && Object.keys(updObj).length === 0) {
      return res.status(422).send('Error: impossible to update the post. Values not allowed');
    }
    // Merge the two posts
    let merged = {...store.posts[req.params.id], ...updObj}
    // Switch the old post with the merged one into the store array
    store.posts[req.params.id] = merged;
    res.status(200).send(store.posts[req.params.id])
  },
  removePost(req, res) {
    // Return error if the user tries to delete a post that doesn't exist
    if (!store.posts[req.params.id]) {
      return res.status(404).send('Error: impossibe to delete the post. Post not found');
    }
    store.posts.splice(req.params.id, 1)
    // Give the information about the post deleted
    res.status(201).send(`Post ${req.params.id} deleted`)
  }
}
