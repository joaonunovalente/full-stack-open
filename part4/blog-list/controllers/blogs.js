const notesRouter = require('express').Router()
const Blog = require('../models/blog')


async function callback(request, response) {
  const blogs = await Blog.find({})
  response.json(blogs)
}

notesRouter.get('/', callback)

notesRouter.post('/', (request, response) => {
  const blog = new Blog(request.body)

  blog.save().then((result) => {
    response.status(201).json(result)
  })
})

module.exports = notesRouter