var express = require('express');
var app = express();
var db = require('./config/db');
var path = require('path');
var User = require('./user/User');
var Bank = require('./user/bankTransaction');
global.__root = __dirname + '/';
app.set('view engine', 'ejs');
app.use(express.static(path.resolve(__dirname, 'public')));
app.get('/api', function (req, res) {
  res.status(200).send('API works.');
});
app.get('/', (req, res) => {
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
app.get('/addfiles', (req, res) => {
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
app.get('/aboutus', (req, res) => {
  res.render('aboutus');
});

var AuthController = require(__root + 'auth/AuthController');
app.use('/api/auth', AuthController);
module.exports = app;