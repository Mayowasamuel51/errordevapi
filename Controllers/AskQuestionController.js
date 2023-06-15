const AskQuestion = require('../Models/AskQuestion');
const HttpError = require('../error/http-error')
const multer = require('multer')
const {validationResult} = require('express-validator')
// return next(new HttpError('this user exist in the system', 400))


const multerStorage = multer.diskStorage({
    destination: (req, file, cd) => {
        cd(null, 'public/askimages/users')
    },
    filename: (req, file, cd) => {
        const extension = file.mimetype.split('/')[1];
        cd(null, `user-${Date.now()}.${extension}`);
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
    storage: multerStorage,
    fileFilter:multerFilter 
 })
// creating a middleware for the image testing 
exports.uploadsUserPhoto = uploads.single('test')

//create a question for the user
exports.createAskQuestion =  async (req, res, next) => {
    const valierrorMessage = validationResult(req)
    if (!valierrorMessage.isEmpty()) {
        console.log(valierrorMessage)
        res.status(422)
        return next(new HttpError('empty input check your data',422))
      }
    const { developerurl, developername, question, tags , user_id} = req.body;
    try {
        const data_question = await AskQuestion.create({
            developername,
            developerurl,
            user_id,
            question,
            tags,
            questionImage: {
                data:req.file.filename
            }
        })
        res.status(201).json({ dataMessage: 'question created', data_question })
        console.log(data_question)
    } catch (err) {
        res.status(404).json({ dataMessage: err.message })
        console.log(err.message)
    }

}

