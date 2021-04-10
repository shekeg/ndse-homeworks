const { siteMainRouter } = require('./site/main-router');
const { stieBooksRouter } = require('./site/books-router');

const { apiUserRouter } = require('./api/user-router');
const { apiBooksRouter } = require('./api/books-router');

module.exports = {
  siteMainRouter,
  stieBooksRouter,
  apiUserRouter,
  apiBooksRouter,
};
