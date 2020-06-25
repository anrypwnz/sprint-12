const express = require('express');
const app = express();
const path = require('path');
const cards = require('./routes/cards.js');
const users = require('./routes/users.js');

const { PORT = 3000 } = process.env;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('/cards', cards);
app.get('/cards/:any', (req,res) => {
  res.status(404).send({ 'message': 'Запрашиваемый ресурс не найден' });
});
app.get('/users', users);
app.get('/users/:id', users);

app.all('/:any', (req,res,next)=> {
  res.status(404).send({ 'message': 'Запрашиваемый ресурс не найден' });
  next();
});