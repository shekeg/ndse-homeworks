const express = require('express');

const siteMainRouter = express.Router();

siteMainRouter.get('/', (req, res) => {
  res.render('index');
});

exports.siteMainRouter = siteMainRouter;
