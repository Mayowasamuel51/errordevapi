const mongoose = require('mongoose')
const { Schema, model } = require('mongoose');

const Portfolio = new Schema({
    developername: {
        type: String,
        required: [true,'please fill your name']
    },
    portfollio: {
        type: String,
        required: [true,'please fill your portfollio']
    },
    createAt: {
        type: Date,
        default:Date.now()
    },
})


const MyPortfolio = model('portfolio', Portfolio);
module.exports = MyPortfolio;