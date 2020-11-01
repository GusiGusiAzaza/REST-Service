const router = require('express').Router();

const authService = require('./auth.service');
const { PERMITTED_PATHS } = require('../../common/config');
const middleware = require('../../components/middleware-handler');

router.route('*').all(
  middleware(async (req, res, next) => {
    const paths = PERMITTED_PATHS.split(',');
    const url = req.url.split('/')[1];
    const { authorization } = req.headers;

    authService.verify(url, paths, authorization);
    next();
  })
);

module.exports = router;
