const router = require('express').Router({ mergeParams: true });
const status = require('http-status');
const tasksService = require('./task.service');
const middleware = require('../../components/middleware-handler');
const Task = require('./task.model');

router.route('/').get(
  middleware(async (req, res, next) => {
    const tasks = await tasksService.getByBoardId(req.params.boardId);
    await res.json(tasks.map(Task.toResponse));
    next();
  })
);

router.route('/:taskId').get(
  middleware(async (req, res, next) => {
    const task = await tasksService.getByBoardIdAndId(
      req.params.boardId,
      req.params.taskId
    );
    await res.json(Task.toResponse(task));
    next();
  })
);

router.route('/').post(
  middleware(async (req, res, next) => {
    const task = await tasksService.create(req.body, req.params.boardId);
    await res.json(Task.toResponse(task));
    next();
  })
);

router.route('/:taskId').put(
  middleware(async (req, res, next) => {
    const task = await tasksService.editById(
      req.params.boardId,
      req.params.taskId,
      req.body
    );
    await res.json(Task.toResponse(task));
    next();
  })
);

router.route('/:taskId').delete(
  middleware(async (req, res, next) => {
    await tasksService.removeById(req.params.boardId, req.params.taskId);
    await res.sendStatus(status.NO_CONTENT);
    next();
  })
);

module.exports = router;
