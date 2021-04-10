function notFoundMiddleware(req, res) {
  res.status(404);

  if (req.accepts('html')) {
    res.render('404');
    return;
  }

  if (req.accepts('json')) {
    res.json({ error: 'Not found' });
  }
}

// eslint-disable-next-line no-unused-vars
function errorHandleMiddleware(err, req, res, next) {
  res.status(500);

  if (req.accepts('html')) {
    res.render('500');
    return;
  }

  if (req.accepts('json')) {
    res.json({ error: err.message });
  }
}

module.exports = {
  notFoundMiddleware,
  errorHandleMiddleware,
};
