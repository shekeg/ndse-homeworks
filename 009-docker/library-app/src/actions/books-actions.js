const { booksDb } = require('../db/index');
const { Book } = require('../models/index');

const booksActions = {
  list() {
    return booksDb.findAll();
  },
  getById({ id }) {
    if (!id) {
      throw new Error('You must pass a book id');
    }

    return booksDb.findById({ id });
  },
  download({ id }, res, next) {
    if (!id) {
      throw new Error('You must pass a book id');
    }

    const book = this.getById({ id });

    res.download(book.fileBook, (err) => {
      if (err) {
        next(new Error('404 File not found'));
      }
    });
  },
  add(bookInfo) {
    if (!bookInfo) {
      throw new Error('You must pass a book object');
    }

    const book = new Book(bookInfo);
    return booksDb.insert(book);
  },
  edit(bookInfo) {
    if (!bookInfo) {
      throw new Error('You must pass a book object');
    }

    const book = new Book(bookInfo);
    return booksDb.update(book);
  },
  delete({ id }) {
    if (!id) {
      throw new Error('You must pass a book id');
    }

    return booksDb.remove({ id });
  },
};

exports.booksActions = booksActions;
