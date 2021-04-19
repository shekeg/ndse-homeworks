const express = require('express');

const { counterActions } = require('../actions/index');

const counterRouter = express.Router();

counterRouter.get('/:bookId', (req, res, next) => {
  const { bookId } = req.params;
  counterActions.getIncrement(bookId)
    .then((result) => { res.json(result); })
    .catch(next);
});

counterRouter.post('/:bookId/incr', (req, res, next) => {
  const { bookId } = req.params;
  counterActions.addIncrement(bookId)
    .then((result) => { res.json(result); })
    .catch(next);
});

exports.counterRouter = counterRouter;
