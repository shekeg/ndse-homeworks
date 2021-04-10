const express = require('express');

const { userRouter, booksRouter } = require('./routers/index');

const app = express();
app.use(express.json());

app.use('/api/user', userRouter);
app.use('/api/books', booksRouter);

app.listen(3000);
