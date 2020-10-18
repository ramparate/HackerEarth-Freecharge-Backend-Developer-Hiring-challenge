var express = require('express');
var app = express();
var db = require('./config/db');
var path = require('path');
var User = require('./user/User');
global.__root   = __dirname + '/'; 
app.set('view engine','ejs');
// app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.resolve(__dirname,'public')));
app.get('/api', function (req, res) {
  res.status(200).send('API works.');
});
app.get('/',(req,res)=>{
  User.find((err,data)=>{
       if(err){
           console.log(err);
       }else{
            if(data!=''){
              // var c = 0;
              // data.forEach(function (item) {
              //   c += 1
              //   item.cnt=c;
              // });
              temp = JSON.stringify(data)
                res.render('demo',{data1:temp});
            }else{
                res.render('demo',{data1:[]});
            }
       }
  });
});

var AuthController = require(__root + 'auth/AuthController');
app.use('/api/auth', AuthController);
module.exports = app;