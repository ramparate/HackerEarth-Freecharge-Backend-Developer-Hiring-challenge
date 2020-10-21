var mongoose = require('mongoose');
// mongoose.connect('mongodb://127.0.0.1:27017/bankAccount');

mongoose.connect('mongodb://127.0.0.1:27017/bankAccount', {useNewUrlParser: true, useUnifiedTopology: true,useCreateIndex:true})
.then(() => {
    console.log("Successfully connected to MongoDB.");    
}).catch(err => {
    console.log('Could not connect to MongoDB.');
    process.exit();
});

