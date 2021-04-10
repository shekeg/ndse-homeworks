const express = require('express');

const {
  siteMainRouter, siteBooksRouter, apiUserRouter, apiBooksRouter,
} = require('./routers/index');
const { notFoundMiddleware, errorHandleMiddleware } = require('./middlewares/errors');

const app = express();

app.use(express.json());
app.set('view engine', 'ejs');

app.use('/public', express.static(`${__dirname}/public`));

app.use('/', siteMainRouter);
app.use('/books', siteBooksRouter);

app.use('/api/user', apiUserRouter);
app.use('/api/books', apiBooksRouter);

app.use(notFoundMiddleware);
app.use(errorHandleMiddleware);

app.listen(3000);
