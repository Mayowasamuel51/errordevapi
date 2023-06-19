const express = require('express')
const { check } = require('express-validator')
const {createAskQuestion, uploadsUserPhoto,errorfix, uploadsErrorFix, geterrorfix, veiwsolution} = require('../Controllers/AskQuestionController')
const UrlStroageController = require('../Controllers/UrlStroageController')
const UserController = require('../Controllers/UserController')
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


//user info routes
router.post('/users',UserController.user)



// store error fix
router.get('/errorfix/:developeremail',geterrorfix)
router.post('/errorfix', uploadsErrorFix, errorfix)
router.get('/errorfixid/:id', veiwsolution)

// [ check('title').
//        not().isEmpty(),
//        check('description').isLength({ min: 5 }),
//        check('address').not().isEmpty()
//    ]
module.exports = router;