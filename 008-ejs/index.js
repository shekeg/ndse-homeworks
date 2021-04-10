const express = require('express');

const { apiUserRouter, apiBooksRouter } = require('./routers/index');
const { notFoundMiddleware, errorHandleMiddleware } = require('./middlewares/errors');

const app = express();

app.use(express.urlencoded());
app.use(express.json());

app.use('/public', express.static(`${__dirname}/public`));

app.use('/api/user', apiUserRouter);
app.use('/api/books', apiBooksRouter);

app.use(notFoundMiddleware);
app.use(errorHandleMiddleware);

app.listen(3000);
