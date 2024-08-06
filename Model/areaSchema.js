const mongoose = require('mongoose');

const areaSchema = mongoose.Schema({

    areaName: {type:String},
    cemail: {type:String},
    caddress: {type:String},
    cmobile: {type:Number},
    img : {type:String},

    userEmail: {type: String},
    hotelname : {type: String}

}) 


const areaModel = mongoose.model('areaData',areaSchema);

module.exports = areaModel;