var express = require('express');
var express = require('express');
const jwt = require('jsonwebtoken');
const Menu = require('../models/menu');
var cors = require('cors')
require('dotenv').config()


var router = express.Router();

router.use(cors())

router.post('/see', (req, res, next) => {
  console.log(req.body)

  Menu.find({
    $or: [{ owner_id: req.body.owner_id }, { _id: req.body._id },]
  }).then(function (menus) {
    res.send(menus);
  });
});

router.post('/delete', (req, res, next) => {
  console.log(req.body)
  Menu.deleteOne({ _id: req.body._id }).then(function (menus) {
    res.json({ message: '' + req.body.menu_name + ' deleted' })
  });
});

router.post('/create', (req, res, next) => {
  console.log(req.body)
  delete req.body._id;
  const menu = new Menu({
    ...req.body
  });
  menu.save()
    .then(() => res.status(201).json({ message: 'Menu created !' }))
    .catch(error => res.status(400).json({ error }));
});


module.exports = router;
