const Blog = require('../model/Blog');
const fs = require('fs')
const multer = require('multer')
exports.getAll = async (req, res) => {

    
    try {
        const data = await Blog.find();
        res.json({
            status: 200,
            data:data
        })
        
        console.log('data showing')
    } catch (err) {
        res.json({
            status: 404,
            data: 'ERROR WITH SERVER PLEASE CHECK YOUR NETWORK'
        })
    }
}

const multerStroage = multer.diskStorage({
    destination: (req, file, cd) => {
        cd(null, 'public/img/users')
    },
    filename: (req, file, cd) => {
        // cd(null,file.originalname)
        const ext = file.mimetype.split('/')[1];
        cd(null, `user-${Date.now()}.${ext}`)

    }
})
const multerFilter = (req, file, cd) => {
    if (file.mimetype.startsWith('image')) {
        cd(null, true)
    } else {
        cd('not image ', false)
    }
}
const uploads = multer({
    storage: multerStroage,
    fileFilter:multerFilter 
 })
exports.uploadedUserPhoto = uploads.single('testImage')

exports.Create = async (req, res) => {
    try {
        const { title, blognote, blogerlink, phone, usesubheaders } = req.body;
        const data = await Blog.create({
            title: title,
            blogerlink: blogerlink,
            blognote: blognote,
            phone: phone,
            usesubheaders: usesubheaders,
            image: {
                data:req.file.filename
            }
        })
        res.json({
            status: 200,
            data: data
        })
        console.log('data saved')
    } catch (err) {
        res.json({
            status: 404,
            data: 'ERROR WITH SERVER PLEASE CHECK YOUR NETWORK'
        })
        console.log(err.message)
    }
}