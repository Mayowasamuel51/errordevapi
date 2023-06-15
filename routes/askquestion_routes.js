const express = require('express')
const { check } = require('express-validator')
const {createAskQuestion, uploadsUserPhoto} = require('../Controllers/AskQuestionController')
const UrlStroageController = require('../Controllers/UrlStroageController')
const router  = express.Router()

// routes for questions
router.post('/askquestions',
    [
    //check('developername').not().isEmpty(),
    ],
    uploadsUserPhoto, createAskQuestion)



// url routes
router.get('/websiteurlinfo/:developername', UrlStroageController.getdeveloperwebsiteurl)
router.post('/websiteurlinfo', UrlStroageController.creatUrlWebsite)
// developername














// [ check('title').
//        not().isEmpty(),
//        check('description').isLength({ min: 5 }),
//        check('address').not().isEmpty()
//    ]



module.exports = router;