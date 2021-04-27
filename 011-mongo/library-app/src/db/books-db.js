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
    // eslint-disable-next-line no-underscore-dangle
    return BookModel.findById(id).exec().then((res) => res._doc);
  },
  insert({ id, ...bookInfo }) {
    const book = new BookModel(bookInfo);
    return book.save();
  },
  update({ id, ...bookInfo }) {
    return BookModel.findByIdAndUpdate(id, bookInfo, { new: true });
  },
  remove({ id }) {
    return BookModel.deleteOne({ _id: id });
  },
};

exports.booksDb = booksDb;
