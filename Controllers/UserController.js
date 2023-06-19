const UrlStore = require('../Models/UrlStroage')
const HttpError = require('../error/http-error')
const multer = require('multer')
const { validationResult } = require('express-validator')
const { construct_svelte_component } = require('svelte/internal')
const MyPortfolio = require('../Models/Portfolio')
const MyGoogleusers = require('../Models/User')






const user = async (req, res) => {
    const { developername, accesstoken, portfoliowebsite } = req.body;
    try {
        const data = await MyGoogleusers.create({
            developername,
            accesstoken,
            portfoliowebsite
        })
        res.status(201).json({ dataMessage: 'user created', data })
        console.log(data)
    } catch (err) {
        res.status(201).json({ dataMessage: err.message })
        console.log(err.message)
    }
}

module.exports = {  
    user,
}