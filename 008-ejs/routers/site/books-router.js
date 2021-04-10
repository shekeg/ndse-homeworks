const express = require('express');

const { booksActions } = require('../../actions');

const stieBooksRouter = express.Router();

stieBooksRouter.get('/', (_, res) => {
  const books = booksActions.list();
  res.render('books/index', { books });
});

stieBooksRouter.get('/create', (_, res) => {
  res.render('books/create', {
    book: {},
  });
});

stieBooksRouter.post('/create', (req, res) => {
  booksActions.add({
    ...req.body,
  });

  res.redirect('/books');
});

stieBooksRouter.get('/update/:id', (req, res) => {
  const book = booksActions.getById({ id: req.params.id });

  res.render('books/update', { book });
});

stieBooksRouter.post('/update/:id', (req, res) => {
  booksActions.edit({
    ...req.body,
    id: req.params.id,
  });

  res.redirect('/books');
});

stieBooksRouter.post('/delete/:id', (req, res) => {
  booksActions.delete({ id: req.params.id });

  res.redirect('/books');
});

exports.stieBooksRouter = stieBooksRouter;
