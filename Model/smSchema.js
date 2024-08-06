const mongoose = require('mongoose');

const SmSchema = mongoose.Schema({
  

    scode:{type:String},
    sname:{type:String},
    semail:{type:String},
    snumber:{type:Number},
    ssalary:{type:Number},



    userEmail: {type: String},
    // hotelname : {type: String}

}) 


const smModel = mongoose.model('smData',SmSchema);

module.exports = smModel;