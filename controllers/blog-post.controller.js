const { blogService } = require('../services');

const { requireAuthentication } = auth;
const { createBlogpost } = blogService;

function postBlogpost(user, content) {
  requireAuthentication(user);
  return createBlogpost(user, content);
}

module.exports = {
  postBlogpost
};
