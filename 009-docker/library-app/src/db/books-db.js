const generateUniqueId = require('generate-unique-id');

const state = {
  books: [],
};

const getTargetIndex = (id) => state.books.findIndex((book) => book.id === id);

const booksDb = {
  findAll() {
    return state.books;
  },
  findById({ id }) {
    const targetIndex = getTargetIndex(id);

    if (targetIndex === -1) {
      throw new Error('404 from DB');
    } else {
      return state.books[targetIndex];
    }
  },
  insert({ ...bookInfo }) {
    const id = generateUniqueId();
    state.books.push({ ...bookInfo, id });
    return { ...bookInfo, id };
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
