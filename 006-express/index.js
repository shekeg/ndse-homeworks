const express = require('express');
const { booksActions } = require('./actions');

const app = express();
app.use(express.json());

app.post('/api/user/login', (_, res) => {
  res.status(201).json({ id: 1, mail: 'test@mail.ru' });
});

app.get('/api/books', (_, res) => {
  const books = booksActions.list();
  res.status(200).json(books);
});

app.get('/api/books/:id', (req, res) => {
  try {
    const book = booksActions.getById({ id: req.params.id });
    res.status(200).json(book);
  } catch (err) {
    handleError(err, res);
  }
});

app.post('/api/books', (req, res) => {
  try {
    const book = booksActions.add(req.body);
    res.status(200).json(book);
  } catch (err) {
    handleError(err, res);
  }
});

app.put('/api/books/:id', (req, res) => {
  try {
    const book = booksActions.edit({ ...req.body, id: req.params.id });
    res.status(200).json(book);
  } catch (err) {
    handleError(err, res);
  }
});

app.delete('/api/books/:id', (req, res) => {
  try {
    booksActions.delete({ id: req.params.id });
    res.status(200).json('ok');
  } catch (err) {
    handleError(err, res);
  }
});

function handleError(err, res) {
  if (err.message.includes('404')) {
    res.status(404).json(err.message);
  } else {
    res.status(500).json(err.message);
  }
}

app.listen(3000);
