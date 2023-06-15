const mongoose = require('mongoose')
const { Schema, model } = require('mongoose');
// developerurl is the portfollio to there site
const Url = new Schema({
    // user_id: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     required: true,
    //     ref:'User'
    // },
    developername: {
        type: String,
        //required: [true,'please fill your name']
    },
    websiteurl: {
        type: String
    },
    webname: {
        type: String
    },
    about: {
        type: String,
        //required: [true,'please fill the question part'],
    },
    createAt: {
        type: Date,
        default:Date.now()
    },
})


const UrlStore = model('websiteurl', Url);
module.exports = UrlStore;