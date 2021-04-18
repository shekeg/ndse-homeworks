const express = require('express');

const { counterActions } = require('../actions/index');

const counterRouter = express.Router();

counterRouter.get('/:bookId', (req, res) => {
  const { bookId } = req.params;
  counterActions.getIncrement(bookId)
    .then((result) => { res.json(result); });
});

counterRouter.post('/:bookId/incr', (req, res) => {
  const { bookId } = req.params;
  counterActions.addIncrement(bookId)
    .then((result) => { res.json(result); });
});

exports.counterRouter = counterRouter;
