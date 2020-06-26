const express = require('express');

const app = express();
const path = require('path');
const cards = require('./routes/cards.js');
const users = require('./routes/users.js');

const { PORT = 3000 } = process.env;

app.listen(PORT);
app.use(express.static(path.join(__dirname, 'public')));
app.use(cards);
app.use(users);
app.all('*', (req, res, next) => {
  res.status(404).send({ 'message': 'Запрашиваемый ресурс не найден' });
  next();
});
