const express = require('express');
const { fileMiddleware } = require('../../middlewares/books/fileMiddleware');

const { booksActions } = require('../../actions');

const apiBooksRouter = express.Router();

apiBooksRouter.get('/', (_, res, next) => {
  booksActions.list()
    .then((books) => res.status(200).json(books))
    .catch(next);
});

apiBooksRouter.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const book = await booksActions.getById({ id });

    await booksActions.incrementViewCount({ id });
    const counterState = await booksActions.getViewCount({ id });

    res.status(200).json({ ...book, viewCount: counterState[id] });
  } catch (error) {
    next(error);
  }
});

apiBooksRouter.post('/', fileMiddleware.single('fileBook'), (req, res, next) => {
  booksActions.add({
    ...req.body,
    fileBook: req.file ? `/${req.file.path}` : '',
  })
    .then((book) => res.status(200).json(book))
    .catch(next);
});

apiBooksRouter.put('/:id', fileMiddleware.single('fileBook'), (req, res, next) => {
  booksActions.edit({
    ...req.body,
    id: req.params.id,
    fileBook: req.file ? `/${req.file.path}` : '',
  })
    .then((book) => res.status(200).json(book))
    .catch(next);
});

apiBooksRouter.delete('/:id', (req, res, next) => {
  booksActions.delete({ id: req.params.id })
    .then(() => res.status(200).json('ok'))
    .catch(next);
});

apiBooksRouter.get('/:id/download', (req, res, next) => {
  booksActions.download({ id: req.params.id }, res, next);
});

exports.apiBooksRouter = apiBooksRouter;
