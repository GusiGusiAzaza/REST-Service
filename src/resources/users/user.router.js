const router = require('express').Router();
const status = require('http-status');
const User = require('./user.model');
const usersService = require('./user.service');
const middleware = require('../../components/middleware-handler');

router.route('/').get(
  middleware(async (req, res, next) => {
    const users = await usersService.getAll();
    await res.json(users.map(User.toResponse));
    next();
  })
);

router.route('/:id').get(
  middleware(async (req, res, next) => {
    const user = await usersService.getById(req.params.id);
    await res.json(User.toResponse(user));
    next();
  })
);

router.route('/').post(
  middleware(async (req, res, next) => {
    const user = await usersService.create(req.body);
    await res.status(status.OK).json(User.toResponse(user));
    next();
  })
);

router.route('/:id').put(
  middleware(async (req, res, next) => {
    const user = await usersService.editById(req.params.id, req.body);
    await res.json(User.toResponse(user));
    next();
  })
);

router.route('/:id').delete(
  middleware(async (req, res, next) => {
    await usersService.deleteOne(req.params.id);
    await res.sendStatus(status.NO_CONTENT);
    next();
  })
);

module.exports = router;
