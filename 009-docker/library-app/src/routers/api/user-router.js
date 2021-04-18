const express = require('express');

const apiUserRouter = express.Router();

apiUserRouter.post('/login', (_, res) => {
  res.status(201).json({ id: 1, mail: 'test@mail.ru' });
});

exports.apiUserRouter = apiUserRouter;
