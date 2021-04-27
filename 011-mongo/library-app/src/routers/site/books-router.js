const express = require('express');

const { fileMiddleware } = require('../../middlewares/books/fileMiddleware');

const { booksActions } = require('../../actions');

const siteBooksRouter = express.Router();

siteBooksRouter.get('/', (_, res, next) => {
  booksActions.list()
    .then((books) => res.render('books/index', { books }))
    .catch(next);
});

siteBooksRouter.get('/create', (_, res) => {
  res.render('books/create', {
    book: {},
  });
});

siteBooksRouter.post('/create', fileMiddleware.single('fileBook'), (req, res, next) => {
  booksActions.add({
    ...req.body,
    fileBook: req.file ? `/${req.file.path}` : '',
  })
    .then(() => res.redirect('/books'))
    .catch(next);
});

siteBooksRouter.get('/update/:id', (req, res, next) => {
  const { id } = req.params;
  const book = booksActions.getById({ id });
  booksActions.incrementViewCount({ id })
    .then(() => booksActions.getViewCount({ id }))
    .then((state) => {
      res.render('books/update', { book: { ...book, viewCount: state[id] } });
    })
    .catch(next);
});

siteBooksRouter.post('/update/:id', fileMiddleware.single('fileBook'), (req, res) => {
  const editableBook = booksActions.getById({ id: req.params.id });

  booksActions.edit({
    ...req.body,
    id: req.params.id,
    fileBook: req.file ? `/${req.file.path}` : editableBook.fileBook,
  });

  res.redirect('/books');
});

siteBooksRouter.post('/delete/:id', (req, res) => {
  booksActions.delete({ id: req.params.id });

  res.redirect('/books');
});

exports.siteBooksRouter = siteBooksRouter;
