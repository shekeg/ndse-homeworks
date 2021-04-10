const express = require('express');
const { fileMiddleware } = require('../../middlewares/books/fileMiddleware');

const { booksActions } = require('../../actions');

const apiBooksRouter = express.Router();

apiBooksRouter.get('/', (_, res) => {
  const books = booksActions.list();
  res.status(200).json(books);
});

apiBooksRouter.get('/:id', (req, res) => {
  const book = booksActions.getById({ id: req.params.id });
  res.status(200).json(book);
});

apiBooksRouter.post('/', fileMiddleware.single('file_book'), (req, res) => {
  const book = booksActions.add({
    ...req.body,
    fileBook: req.file ? `/${req.file.path}` : '',
  });
  res.status(200).json(book);
});

apiBooksRouter.put('/:id', fileMiddleware.single('file_book'), (req, res) => {
  const book = booksActions.edit({
    ...req.body,
    id: req.params.id,
    fileBook: req.file ? `/${req.file.path}` : '',
  });
  res.status(200).json(book);
});

apiBooksRouter.delete('/:id', (req, res) => {
  booksActions.delete({ id: req.params.id });
  res.status(200).json('ok');
});

apiBooksRouter.get('/:id/download', (req, res, next) => {
  booksActions.download({ id: req.params.id }, res, next);
});

exports.apiBooksRouter = apiBooksRouter;
