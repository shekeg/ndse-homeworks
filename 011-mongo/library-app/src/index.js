const mongoose = require('mongoose');

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

async function start() {
  try {
    const PORT = process.env.PORT || 3000;

    const MONGO_DB_HOST = process.env.MONGO_DB_HOST || 'mongodb://localhost:27017';

    await mongoose.connect(`${MONGO_DB_HOST}/books`, { useNewUrlParser: true, useUnifiedTopology: true });

    app.listen(PORT, () => {
      console.log(`=== start server PORT ${PORT} ===`);
    });
  } catch (err) {
    console.log(err);
  }
}

start();
