const express = require('express');

const { counterRouter } = require('./routers');
const { notFoundMiddleware, errorHandleMiddleware } = require('./middlewares/errors');

const app = express();

app.use(express.json());

app.use('/counter', counterRouter);

app.use(notFoundMiddleware);
app.use(errorHandleMiddleware);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`=== start server PORT ${PORT} ===`);
});
