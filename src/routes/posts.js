const express = require('express')
const mongoose = require('mongoose')
const { verify } = require('../token')

const router = express.Router()

const Post = mongoose.model('Post')

router.get('/', async (request, response) => {
  try {
    const posts = await Post.find()
    response.send(posts)
  } catch(e) {
    response.status(500).send({ message: e.message })
  }
})

router.get('/:id', async (request, response) => {
  try {
    const post = await Post.findById(request.params.id)
    response.send(post)
  } catch(e) {
    response.status(500).send({ message: e.message })
  }
})

router.post('/', async (request, response) => {
  try {
    const token = request.headers.authorization
    verify(token)
    const post = new Post({
      title: request.body.title,
      body: request.body.body
    })
    await post.save()
    response.send(post)
  } catch(e) {
    response.status(400).send({ message: e.message })
  }
})

router.patch('/:id', async (request, response) => {
  try {
    const token = request.headers.authorization
    verify(token)
    const post = await Post.findByIdAndUpdate(
      request.params.id,
      request.body,
      { new: true },
    )
    response.send(post)
  } catch(e) {
    response.status(400).send({ message: e.message })
  }
})

router.delete('/:id', async (request, response) => {
  try {
    const token = request.headers.authorization
    verify(token)
    await Post.findByIdAndDelete(request.params.id)
    response.send({ message: 'Post deleted' })
  } catch(e) {
    response.status(400).send({ message: e.message })
  }
})

module.exports = router