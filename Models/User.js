// this is be for google auth
const mongoose = require('mongoose')
const { Schema, model } = require('mongoose');


const GoogleUsers = new Schema({
    developername: {
        type: String,
        required: [true,'please fill your name']
    },
    accesstoken: {
        type: String,
        // required: [true,'please fill this input']
    },
    portfoliowebsite: {
        type: String,
        //  required: [true ,'please fill this input'] 
    },
    createAt: {
        type: Date,
        default:Date.now()
    },
})


const MyGoogleusers = model('GoogleUsers', GoogleUsers);
module.exports = MyGoogleusers;