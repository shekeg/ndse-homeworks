const express = require('express');

const userRouter = express.Router();

userRouter.post('/login', (_, res) => {
  res.status(201).json({ id: 1, mail: 'test@mail.ru' });
});

exports.userRouter = userRouter;
