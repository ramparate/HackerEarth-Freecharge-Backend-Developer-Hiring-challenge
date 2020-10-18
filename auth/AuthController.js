var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var async = require("async");
var csv = require('csvtojson');
var VerifyToken = require('./VerifyToken');
var upload = require('../config/upload');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var User = require('../user/User');
var Bank = require('../user/bankTransaction');
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var bcrypt = require('bcryptjs');
var config = require('../config/config');

router.post('/login', function (req, res) {
  let p = req.body
  for (var key in p) {
    if (p.hasOwnProperty(key)) {
      if (p[key] == "" || p[key] == null || p[key] == undefined) {
        return res.status(400).send({ "msg": "Missing Params." });
      }
    }
  }
  User.findOne({ username: req.body.username }, function (err, user) {
    if (err) return res.status(500).send('Error on the server.');
    if (!user) return res.status(404).send({ msg: "Upload csv file." });
    // check if the password is valid
    var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    if (!passwordIsValid) return res.status(404).send({ msg: "User Email or Password Incorrect" });
    // if user is found and password is valid
    // create a token
    var token = jwt.sign({ id: user._id }, config.secret, {
      expiresIn: 86400 // expires in 24 hours
    });
    let userDetails = { accountNumber: user.accountNumber, name: user.name, user: user.user_id }
    res.status(200).send({ userDetailsInfos: userDetails, auth: true, token: token });
  });
});

router.get('/logout', function (req, res) {
  res.status(200).send({ auth: false, token: null });
});

router.post('/register', function (req, res) {
  let p = req.body
  for (var key in p) {
    if (p.hasOwnProperty(key)) {
      if (p[key] == "" || p[key] == null || p[key] == undefined) {
        return res.status(400).send({ "msg": "Missing Params." });
      }
    }
  }
  var len = 8;
  let accountNumber = parseInt((Math.random() * 9 + 1) * Math.pow(10, len - 1), 10);
  var hashedPassword = bcrypt.hashSync(req.body.password, 8);
  User.create({
    name: req.body.name,
    password: hashedPassword,
    email: req.body.email,
    username: req.body.username,
    status: req.body.status,
    accountNumber: accountNumber
  },
    function (err, user) {
      if (err && err.code == 11000) {
        return res.status(500).send({ msg: "Username or Email Already exist." });
      }
      if (err) {
        res.status(500).send({ msg: "There was a problem registering the user." });
      }
      else {
        let userObj = {
          user: user.user_id,
          name: user.name,
          username: user.username,
          accountNumber: user.accountNumber,
          email: user.email,
          status: user.status
        }
        res.status(200).send(userObj);
      }
    });
});

router.post('/uploadBankStatement', upload.uploads.single('csv'), (req, res) => {
  csv()
    .fromFile(req.file.path)
    .then((jsonObj) => {
      jsonObj.forEach(function (item) {
        if (item && item['Closing Balance']) {
          item.Closing_Balance = item['Closing Balance']
        }
        item.status = "ACTIVE",
          item.user_id = req.body.user_id,
          item.accountNumber = req.body.accountNumber
      });
      Bank.insertMany(jsonObj, (err, data) => {
        if (err) {
          res.status(400).send({ "msg": "Error in User" });
        } else {
          res.status(200).send(data);
        }
      });
    });
});

router.post('/uploadBankStatementUser', upload.uploads.single('csv'), (req, res) => {
  async.waterfall([
    function (callback) {
      csv()
        .fromFile(req.file.path)
        .then((jsonObj) => {
          jsonObj.forEach(function (item) {
            if (item && item['Closing Balance']) {
              item.Closing_Balance = item['Closing Balance']
            }
            item.status = "ACTIVE",
              item.user_id = req.body.user_id,
              item.accountNumber = req.body.accountNumber
          });
          Bank.insertMany(jsonObj, (err, data) => {
            if (err) {
              return callback(err, null)
            } else {
              callback(null, true)
            }
          });
        });
    },
    function (value, callback) {
      let findObj = {
        user_id: req.body.user_id
      }
      Bank.find(findObj, { _id: 0, __v: 0 }, function (err, result) {
        if (err) {
          callback(null, result);
        } else {
          callback(null, result);
        }
      })
        .lean();
    },
    function (value, callback) {
      if (value && value.length > 0) {
        groupKey = 0;
        groups = value.reduce(function (r, o) {
          var m = o.Date.split(('/'))[0];
          (r[m]) ? r[m].data.push(o) : r[m] = { group: String(groupKey++), data: [o] };
          return r;
        }, {});
        var result = Object.keys(groups).map(function (k) { return groups[k]; });
        let totalBalance = 0
        let monthlyTotalBalance = 0
        result.forEach(function (item) {
          if (item && item.data.length > 0) {
            item.data.forEach(function (ele) {
              if (ele && ele.Deposit) {
                totalBalance = totalBalance + ele.Deposit
              }
              if (ele && ele.Closing_Balance) {
                monthlyTotalBalance = monthlyTotalBalance + parseInt(ele.Closing_Balance)
              }
            });
          }
        });
        let avgMonthlyBalance = monthlyTotalBalance / 12
        var percentAsDecimal = (avgMonthlyBalance / 100);
        let creditLimit = percentAsDecimal * 20
        avgMonthlyBalance = avgMonthlyBalance.toFixed(2)
        creditLimit = creditLimit.toFixed(2)
        let AccountObj = {
          "recordMsg": "All Record Inserted",
          avgMonthlyBalance,
          creditLimit
        }
        callback(null, AccountObj);
      }
      else {
        callback(null, "No Account info found");
      }
    }
  ], function (err, results) {
    res.json(results);
  });
});

module.exports = router;