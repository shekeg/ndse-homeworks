const { stieBooksRouter } = require('./site/books-router');

const { apiUserRouter } = require('./api/user-router');
const { apiBooksRouter } = require('./api/books-router');

module.exports = {
  stieBooksRouter,
  apiUserRouter,
  apiBooksRouter,
};
