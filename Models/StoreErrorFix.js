const mongoose = require('mongoose')
const { Schema, model } = require('mongoose');


const StoreErrorFix= new Schema({
    developeremail: {
        type: String,
        required: [true,'please fill your email']
    },
    errorname: {
        type: String,
        required: [true,'please fill your email']
    },
    errorcode: {
        type: String,
    },
    errorfixImage: {
        data: String,
        contentType: String
    },
    createAt: {
        type: Date,
        default:Date.now()
    },
})


const MyStoreErrorFix = model('storeerrorfix',StoreErrorFix);
module.exports = MyStoreErrorFix;