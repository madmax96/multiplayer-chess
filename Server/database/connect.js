const mongoose = require('mongoose');
//console.log(process.env.MONGODB_URI)
mongoose.connect(process.env.MONGODB_URI).then(()=>{}).catch((e)=>console.log(e.message));
mongoose.Promise = global.Promise;
module.exports = { mongoose };
