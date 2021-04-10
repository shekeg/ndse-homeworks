const express = require('express');

const { userRouter, booksRouter } = require('./routers/index');
const { notFoundMiddleware, errorHandleMiddleware } = require('./middlewares/errors');

const app = express();
app.use(express.json());

app.use('/api/user', userRouter);
app.use('/api/books', booksRouter);

app.use(notFoundMiddleware);
app.use(errorHandleMiddleware);

app.listen(3000);
