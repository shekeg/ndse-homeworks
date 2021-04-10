const express = require('express');

const { booksActions } = require('../actions');

const booksRouter = express.Router();

booksRouter.get('/', (_, res) => {
  const books = booksActions.list();
  res.status(200).json(books);
});

booksRouter.get('/:id', (req, res) => {
  try {
    const book = booksActions.getById({ id: req.params.id });
    res.status(200).json(book);
  } catch (err) {
    handleError(err, res);
  }
});

booksRouter.post('/', (req, res) => {
  try {
    const book = booksActions.add(req.body);
    res.status(200).json(book);
  } catch (err) {
    handleError(err, res);
  }
});

booksRouter.put('/:id', (req, res) => {
  try {
    const book = booksActions.edit({ ...req.body, id: req.params.id });
    res.status(200).json(book);
  } catch (err) {
    handleError(err, res);
  }
});

booksRouter.delete('/:id', (req, res) => {
  try {
    booksActions.delete({ id: req.params.id });
    res.status(200).json('ok');
  } catch (err) {
    handleError(err, res);
  }
});

function handleError(err, res) {
  if (err.message.includes('404')) {
    res.status(404).json(err.message);
  } else {
    res.status(500).json(err.message);
  }
}

exports.booksRouter = booksRouter;
