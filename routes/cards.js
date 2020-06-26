const fs = require('fs');
const path = require('path');
const router = require('express').Router();

const cards = path.join(__dirname, '../data/cards.json');

router.get('/cards', (req, res) => {
  fs.readFile(cards, { encoding: 'utf8' }, (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    res.send(data);
  });
});

module.exports = router;
