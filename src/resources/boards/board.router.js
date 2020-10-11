const router = require('express').Router();
const status = require('http-status');
const boardsService = require('./board.service');
const middleware = require('../../common/middleware-handler');

router.route('/').get(
  middleware(async (req, res, next) => {
    const boards = await boardsService.getAll();
    await res.json(boards);
    next();
  })
);

router.route('/:id').get(
  middleware(async (req, res, next) => {
    const board = await boardsService.getById(req.params.id);
    await res.json(board);
    next();
  })
);

router.route('/').post(
  middleware(async (req, res, next) => {
    const board = await boardsService.create(req.body);
    await res.status(status.OK).json(board);
    next();
  })
);

router.route('/:id').put(
  middleware(async (req, res, next) => {
    const board = await boardsService.editById(req.params.id, req.body);
    await res.json(board);
    next();
  })
);

router.route('/:id').delete(
  middleware(async (req, res, next) => {
    await boardsService.removeById(req.params.id);
    await res.sendStatus(status.NO_CONTENT);
    next();
  })
);

module.exports = router;
