const axios = require('axios').default;

const { booksDb } = require('../db/index');
const { Book } = require('../models/index');

const COUNTER_SERVER_HOST = process.env.COUNTER_SERVER_HOST || 'localhost';
const COUNTER_SERVER_PORT = process.env.COUNTER_SERVER_PORT || '3001';
const COUNTER_SERVER_URL = `http://${COUNTER_SERVER_HOST}:${COUNTER_SERVER_PORT}/counter/`;

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
  incrementViewCount({ id }) {
    return axios.post(`${COUNTER_SERVER_URL}/${id}/incr`)
      .then((res) => res.data);
  },
  getViewCount({ id }) {
    return axios.get(`${COUNTER_SERVER_URL}/${id}`)
      .then((res) => res.data);
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
