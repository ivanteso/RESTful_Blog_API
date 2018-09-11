const store = require('../data/store')

module.exports = {
  getPosts(req, res) {
    if (store.posts.length === 0) {
      return res.status(404).send("No posts available")
    } else {
      res.status(200).send(store.posts)
    }
  },
  addPost(req, res) {
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
      return res.status(422).send('Error: the post is empty');
    }
    let newPost = req.body
    let id = store.posts.length
    let obj = {
        name: newPost.name,
        url: newPost.url,
        text: newPost.text,
        comments: newPost.comments
      }
    store.posts.push(obj)
    let result = JSON.stringify(store.posts[id], null, 2)
    res.status(200).send(`Post created:\n\n ${result}`)
  },
  updatePost(req, res) {
    if (!store.posts[req.params.id]) {
      return res.status(404).send('Error: impossibe to update the post. Original post not found');
    }
    let updatedPost = req.body;
    let updObj = {
      name: updatedPost.name,
      url: updatedPost.url,
      picture: updatedPost.picture,
      text: updatedPost.text,
      comments: updatedPost.comments,
      verified: updatedPost.verified
    }
    Object.entries(updObj).forEach(([key, value]) => {
      if (value === undefined) {
        delete updObj[key];
        delete updObj[value];
      }
    })
    let merged = {...store.posts[req.params.id], ...updObj}
    store.posts[req.params.id] = merged;
    res.status(200).send(store.posts[req.params.id])
  },
  removePost(req, res) {
    store.posts.splice(req.params.id, 1)
    res.status(201).send(`Post ${req.params.id} deleted`)
  }
}
