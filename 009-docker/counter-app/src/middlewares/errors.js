function notFoundMiddleware(req, res) {
  res.status(404);
  res.json({ error: 'Not found' });
}

// eslint-disable-next-line no-unused-vars
function errorHandleMiddleware(err, req, res, next) {
  console.log(err);
  res.status(500);
  res.json({ error: err.message });
}

module.exports = {
  notFoundMiddleware,
  errorHandleMiddleware,
};
