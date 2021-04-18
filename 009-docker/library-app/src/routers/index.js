const { siteMainRouter } = require('./site/main-router');
const { siteBooksRouter } = require('./site/books-router');

const { apiUserRouter } = require('./api/user-router');
const { apiBooksRouter } = require('./api/books-router');

module.exports = {
  siteMainRouter,
  siteBooksRouter,
  apiUserRouter,
  apiBooksRouter,
};
