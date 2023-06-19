const mongoose = require('mongoose')
const { Schema, model } = require('mongoose');
// developerurl is the portfollio to there site
const AskQuestion = new Schema({
    // user_id: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     required: true,
    //     ref:'User'
    // },
    developeremail: {
        type: String,
        required: [true,'please fill your eamil']
    },
    title: {
        type: String,
        required: [true,'please fill your email']
    },
    developerurl: {
        type: String
    },
    question: {
        type: String,
        //required: [true,'please fill the question part'],
    },
    questionImage: {
        data: String,
        contentType: String
    },
    questionVideo: {
        type: String
    },
    questionAnswer: {
        type: String,
    },
    questionAnswerImage: {
        type: String
    },
    createAt: {
        type: Date,
        default:Date.now()
    },
    tags: {
        type: [String],
    },

})


const AskModel = model('askQuestion', AskQuestion);
module.exports = AskModel;