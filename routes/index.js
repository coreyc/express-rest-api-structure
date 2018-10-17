const express = require('express');

const controllers = require('../controllers');

const router = express.Router();
const {
  auth,
  home,
  publication,
} = controllers;

/**
 * Handles controller execution and responds to user (API version).
 * This way controllers are not attached to the API.
 * Web socket has a similar handler implementation.
 * @param promise Controller Promise.
 * @param params (req) => [params, ...].
 */
const controllerHandler = (promise, params) => async (req, res, next) => {
  const boundParams = params ? params(req, res, next) : [];
  try {
    const result = await promise(...boundParams);
    return res.json(result || { message: 'OK' });
  } catch (error) {
    return res.status(500) && next(error);
  }
};
const c = controllerHandler;

/**
 * Auth.
 */
router.post('/signin', c(auth.signin, (req, res, next) => [req, res, next]));
router.post('/signup', c(auth.signup, (req, res, next) => [req, res, next]));

/**
 * Home.
 */
router.get('/', c(home.hello));
router.get('/greet/:name', c(home.getGreeting, req => [req.params.name]));
router.post('/greet/', c(home.postGreeting, req => [req.body.name]));

/**
 * Publications.
 */
router.get('/publications', c(publication.getPublications));
router.post('/publications', c(publication.postPublication, req => [req.user, req.body.content]));

/**
 * Error-handler.
 */
router.use((err, req, res, _next) => {
  // Expected errors always throw ServerError.
  // Unexpected errors will either throw unexpected stuff or crash the application.
  if (Object.prototype.isPrototypeOf.call(ServerError.prototype, err)) {
    return res.status(err.status || 500).json({ error: err.message });
  }

  log.error('~~~ Unexpected error exception start ~~~');
  log.error(req);
  log.error(err);
  log.error('~~~ Unexpected error exception end ~~~');


  return res.status(500).json({ error: '⁽ƈ ͡ (ुŏ̥̥̥̥םŏ̥̥̥̥) ु' });
});

module.exports = router;
