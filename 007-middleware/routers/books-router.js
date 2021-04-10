const express = require('express');
const { fileMiddleware } = require('../middlewares/books/fileMiddleware');

const { booksActions } = require('../actions');

const booksRouter = express.Router();

booksRouter.get('/', (_, res) => {
  const books = booksActions.list();
  res.status(200).json(books);
});

booksRouter.get('/:id', (req, res) => {
  const book = booksActions.getById({ id: req.params.id });
  res.status(200).json(book);
});

booksRouter.post('/', fileMiddleware.single('file_book'), (req, res) => {
  const book = booksActions.add({
    ...req.body,
    fileBook: req.file ? req.file.path : '',
  });
  res.status(200).json(book);
});

booksRouter.put('/:id', fileMiddleware.single('file_book'), (req, res) => {
  const book = booksActions.edit({
    ...req.body,
    id: req.params.id,
    fileBook: req.file ? req.file.path : '',
  });
  res.status(200).json(book);
});

booksRouter.delete('/:id', (req, res) => {
  booksActions.delete({ id: req.params.id });
  res.status(200).json('ok');
});

booksRouter.get('/:id/download', (req, res, next) => {
  booksActions.download({ id: req.params.id }, res, next);
});

exports.booksRouter = booksRouter;
