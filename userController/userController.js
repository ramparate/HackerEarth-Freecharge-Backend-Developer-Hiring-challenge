var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var async = require("async");
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var User = require('../user/User');
var Bank = require('../user/bankTransaction');
router.get('/', (req, res) => {
  User.find((err, data) => {
    if (err) {
      res.render('demo', { data1: [] });
    } else {
      if (data != '') {
        temp = JSON.stringify(data)
        res.render('demo', { data1: temp });
      } else {
        res.render('demo', { data1: [] });
      }
    }
  }).lean();
});
router.get('/addfiles', (req, res) => {
  Bank.find((err, data) => {
    if (err) {
      res.render('demo', { data1: [] });
    } else {
      if (data != '') {
        temp = JSON.stringify(data)
        res.render('addRecords', { data1: temp });
      } else {
        res.render('addRecords', { data1: [] });
      }
    }
  }).lean();
});
router.get('/aboutus', (req, res) => {
  res.render('aboutus');
});

router.get('/registerUser', (req, res) => {
  res.render('register');
});


module.exports = router;