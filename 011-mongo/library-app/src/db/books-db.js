const { Schema, model } = require('mongoose');

const bookSchema = new Schema({
  title: { type: String, default: '' },
  description: { type: String, default: '' },
  authors: { type: String, default: '' },
  favorite: { type: String, default: '' },
  fileCover: { type: String, default: '' },
  fileName: { type: String, default: '' },
  fileBook: { type: String, default: '' },
});

const BookModel = model('Book', bookSchema);

const state = {
  books: [],
};

const getTargetIndex = (id) => state.books.findIndex((book) => book.id === id);

const booksDb = {
  findAll() {
    return BookModel.find();
  },
  findById({ id }) {
    const targetIndex = getTargetIndex(id);

    if (targetIndex === -1) {
      throw new Error('404 from DB');
    } else {
      return state.books[targetIndex];
    }
  },
  insert({ id, ...bookInfo }) {
    const book = new BookModel(bookInfo);
    return book.save();
  },
  update({ id, ...bookInfo }) {
    const targetIndex = getTargetIndex(id);

    if (targetIndex === -1) {
      throw new Error('404 from DB');
    } else {
      state.books[targetIndex] = {
        ...state.books[targetIndex],
        ...bookInfo,
      };

      return state.books[targetIndex];
    }
  },
  remove({ id }) {
    const targetIndex = getTargetIndex(id);

    if (targetIndex === -1) {
      throw new Error('404 from DB');
    } else {
      state.books.splice(targetIndex, 1);
      return true;
    }
  },
};

exports.booksDb = booksDb;
