const mongoose = require('mongoose');

const multiprodSchema = mongoose.Schema({


    productSize: {type: String},
    productColor: {type: String},
    otherQty: {type: String},

    dt: {
        type: Date,
        default: Date.now,
    }


})


const lastmultiprodSchema = mongoose.Schema({

    fileName: {type: String},
    filePath: {type: String},
    fileType: {type: String},
    fileSize: {type: String},



    dt: {
        type: Date,
        default: Date.now,
    }


})



const postSchemasale = mongoose.Schema({



    dt: {type:String},
    brand: {type: String},
    model: {type: String},
    serial: {type:String},
    userEmail:{type:String},
    qty:{type:Number},
    fqty:{type:Number},
    year:{type:Number},
    hotelname: {type: String},
    buyer:{type:String},
    currency: {type: String},
    cost: {type: Number},
    cargoCost: {type: Number},
    repairing: {type: Number},
    totalP: {type: Number},
    totalN: {type: Number},
    desc: {type: String},
    imageURL: {type: String},
    status: {type: String},
    pid: {type: String},


}) 


const postModels = mongoose.model('postDatasale',postSchemasale);

module.exports = postModels;