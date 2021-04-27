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

siteBooksRouter.get('/update/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const book = await booksActions.getById({ id });

    await booksActions.incrementViewCount({ id });
    const counterState = await booksActions.getViewCount({ id });

    res.render('books/update', { book: { ...book, viewCount: counterState[id] } });
  } catch (error) {
    next(error);
  }
});

siteBooksRouter.post('/update/:id', fileMiddleware.single('fileBook'), async (req, res, next) => {
  try {
    const editableBook = await booksActions.getById({ id: req.params.id });

    await booksActions.edit({
      ...req.body,
      id: req.params.id,
      fileBook: req.file ? `/${req.file.path}` : editableBook.fileBook,
    });

    res.redirect('/books');
  } catch (error) {
    next(error);
  }
});

siteBooksRouter.post('/delete/:id', (req, res, next) => {
  booksActions.delete({ id: req.params.id })
    .then(() => res.redirect('/books'))
    .catch(next);
});

exports.siteBooksRouter = siteBooksRouter;
