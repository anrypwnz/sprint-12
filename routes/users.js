const fs = require('fs');
const path = require('path');
const router = require('express').Router();

const usersData = path.join(__dirname, '../data/users.json');

router.get('/users', (req, res) => {
  fs.readFile(usersData, { encoding: 'utf8' }, (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    res.send(data);
  });
});

router.get('/users/:id', (req, res) => {
  fs.readFile(usersData, { encoding: 'utf8' }, (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    const inData = JSON.parse(data);
    const resUser = inData.find((item) => item._id === req.params.id);
    if (resUser) {
      res.send(resUser);
    } else {
      res.status(404).send({ 'message': 'Нет пользователя с таким id' });
    }
  });
});
module.exports = router;
