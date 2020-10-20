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


var AuthController = require(__root + 'auth/AuthController');
app.use('/api/auth', AuthController);
var userController = require(__root +'./userController/userController');
app.use('/', userController);
module.exports = app;