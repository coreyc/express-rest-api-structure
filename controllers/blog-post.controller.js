const { blogService } = require('../services')

const { createBlogpost } = blogService

/*
 * call other services, or service functions here if you need to
*/
const postBlogpost = async (req, res, next) => {
  const {user, content} = req.body
  try {
    await createBlogpost(user, content)
    res.sendStatus(201)
    next()
  } catch(e) {
    console.log(e.message)
    res.send(500) && next(error)
  }
}

module.exports = {
  postBlogpost
}
