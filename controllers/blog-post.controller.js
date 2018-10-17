const { blogService } = require('../services')

const { requireAuthentication } = auth
const { createBlogpost } = blogService

// in route, split off the req, or just pass req, res in here?
function postBlogpost(user, content) {
  requireAuthentication(user)
  return createBlogpost(user, content)
}

module.exports = {
  postBlogpost
}
