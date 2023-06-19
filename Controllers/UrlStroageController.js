const UrlStore = require('../Models/UrlStroage')
const HttpError = require('../error/http-error')
const multer = require('multer')
const { validationResult } = require('express-validator')
const { construct_svelte_component } = require('svelte/internal')
const MyPortfolio = require('../Models/Portfolio')


const creatUrlWebsite = async (req, res, next) => {
    // check the id exist or not 
    const { about, developername, websiteurl, user_id, webname } = req.body;
    try {
      
        const data_url = await UrlStore.create({
            developername, // this is the same as the user gmail
            websiteurl,
            webname,
            // user_id,
            about
        })
        res.status(201).json({ dataMessage: 'question created', data_url })
        console.log(data_url)

    } catch (err) {
        res.status(404).json({ dataMessage: err.message })
        console.log(err.message)
    }

}

// get the infomation for the user
const getdeveloperwebsiteurl = async (req, res,next) => {
    const checkuser  = await UrlStore.find({ developername: req.params.developername }).sort({$natural: -1 })
    if (!checkuser) {
        return next(new HttpError('this user is not found ', 404))
    }
    res.status(200).json({ dataMessage: 'user found', data:checkuser })
}

/// portfolio controller;
const portfolioController = async (req, res, next) => {
    const checkuser = await MyPortfolio.findOne({ developername: req.params.developername });
    if (!checkuser) {
        return next(new HttpError('this user is not found ', 404))
    }
    const { developername, portfolio } = req.body;
    try {
        const data = await MyPortfolio.create({
            developername,
            portfolio
        })
        res.status(201).json({ dataMessage: 'question created', data })
        console.log(data_url)
    } catch (err) {
        res.status(404).json({ dataMessage: err.message })
        console.log(err.message)
    }
}

module.exports = {
    creatUrlWebsite,
    getdeveloperwebsiteurl,
    portfolioController
}