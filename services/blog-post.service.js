const { blogpostDb } = require('../db')

const createBlogpost = async (user, content) => {
  const post = new Post()
  post.user = user
  post.content = content

  try {
    await post.validate()
    return post.save()
  } catch (e) {
    throw new Error(e.message)
  }
}

module.exports = {
  createBlogpost
}
