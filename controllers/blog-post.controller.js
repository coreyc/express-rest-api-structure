const { blogService } = require('../services')

const { createBlogpost } = blogService

/*
 * call other imported services, or same service but different functions here if you need to
*/
const postBlogpost = async (req, res, next) => {
  const {user, content} = req.body
  try {
    await createBlogpost(user, content)
    // other service call (or same service, different function can go here)
    // i.e. - await generateBlogpostPreview()
    res.sendStatus(201)
    next()
  } catch(e) {
    console.log(e.message)
    res.sendStatus(500) && next(e)
  }
}

module.exports = {
  postBlogpost
}
