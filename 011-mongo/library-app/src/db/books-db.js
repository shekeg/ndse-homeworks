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

const booksDb = {
  findAll() {
    return BookModel.find();
  },
  findById({ id }) {
    return BookModel.findById(id).exec()
      .then((res) => {
        if (res === null) {
          return Promise.reject(new Error('Code: 404'));
        }
        // eslint-disable-next-line no-underscore-dangle
        return res._doc;
      });
  },
  insert({ id, ...bookInfo }) {
    const book = new BookModel(bookInfo);
    return book.save();
  },
  update({ id, ...bookInfo }) {
    return BookModel.findByIdAndUpdate(id, bookInfo, { new: true })
      .then((res) => {
        if (res === null) {
          return Promise.reject(new Error('Code: 404'));
        }
        // eslint-disable-next-line no-underscore-dangle
        return res;
      });
  },
  remove({ id }) {
    return BookModel.deleteOne({ _id: id });
  },
};

exports.booksDb = booksDb;
