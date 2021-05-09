const { counterDb } = require('../db/index');

const counterActions = {
  getIncrement(bookId) {
    return counterDb.findById({ id: bookId });
  },
  addIncrement(bookId) {
    return counterDb.findById({ id: bookId })
      .then((currentState) => {
        const value = currentState[bookId] + 1;
        return counterDb.update({ id: bookId, value });
      });
  },
};

exports.counterActions = counterActions;
