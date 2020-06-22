const fs = require('fs');
const path = require('path');
const router = require('express').Router();
const usersData = path.join(__dirname, '../data/users.json');

router.get('/users', (req, res) => {
  fs.readFile(usersData,{ encoding: 'utf8' }, (err, data) => {
    if(err){
      console.log(err);
      return;
    }
   res.send(data)
  })
})

router.get('/users/:id', (req,res) => {
  fs.readFile(usersData,{ encoding: 'utf8' }, (err, data) => {
    if(err){
      console.log(err);
      return;
    }
    const inData = JSON.parse(data);
    for(let id in inData) {
     if(inData[id]._id === req.params.id){
       res.send(inData[id]);
       break;
     }
     if (id >= inData.length - 1){
       res.status(404).send({ "message": "Нет пользователя с таким id" })
     }
    }
  })
})

module.exports = router;