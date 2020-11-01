const router = require('express').Router();
const httpStatus = require('http-status');
const authService = require('./auth.service');
const middleware = require('../../components/middleware-handler');
const { ResponseError } = require('../../components/error-handler');

router
  .route('/*')
  .post(
    middleware(async (req, res, next) => {
      const { login, password } = req.body;
      const token = await authService.getToken(login, password);
      res.json({ token });
      next();
    })
  )
  .get(
    middleware(async () => {
      throw new ResponseError(httpStatus.UNAUTHORIZED);
    })
  );

module.exports = router;
