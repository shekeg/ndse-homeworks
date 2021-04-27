const express = require('express');
const { fileMiddleware } = require('../../middlewares/books/fileMiddleware');

const { booksActions } = require('../../actions');

const apiBooksRouter = express.Router();

apiBooksRouter.get('/', (_, res, next) => {
  booksActions.list()
    .then((books) => res.status(200).json(books))
    .catch(next);
});

apiBooksRouter.get('/:id', (req, res, next) => {
  const { id } = req.params;
  const book = booksActions.getById({ id });
  booksActions.incrementViewCount({ id })
    .then(() => booksActions.getViewCount({ id }))
    .then((state) => {
      res.status(200).json({ ...book, viewCount: state[id] });
    })
    .catch(next);
});

apiBooksRouter.post('/', fileMiddleware.single('fileBook'), (req, res, next) => {
  booksActions.add({
    ...req.body,
    fileBook: req.file ? `/${req.file.path}` : '',
  })
    .then((book) => res.status(200).json(book))
    .catch(next);
});

apiBooksRouter.put('/:id', fileMiddleware.single('fileBook'), (req, res) => {
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
