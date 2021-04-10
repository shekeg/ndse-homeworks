const express = require('express');
const { fileMiddleware } = require('../../middlewares/books/fileMiddleware');

const { booksActions } = require('../../actions');

const siteBooksRouter = express.Router();

siteBooksRouter.get('/', (_, res) => {
  const books = booksActions.list();
  res.render('books/index', { books });
});

siteBooksRouter.get('/create', (_, res) => {
  res.render('books/create', {
    book: {},
  });
});

siteBooksRouter.post('/create', fileMiddleware.single('file_book'), (req, res) => {
  booksActions.add({
    ...req.body,
    fileBook: req.file ? `/${req.file.path}` : '',
  });

  res.redirect('/books');
});

siteBooksRouter.get('/update/:id', (req, res) => {
  const book = booksActions.getById({ id: req.params.id });

  res.render('books/update', { book });
});

siteBooksRouter.post('/update/:id', fileMiddleware.single('file_book'), (req, res) => {
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
