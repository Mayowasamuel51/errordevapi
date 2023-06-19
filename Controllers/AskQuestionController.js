const AskQuestion = require('../Models/AskQuestion');
const HttpError = require('../error/http-error')
const multer = require('multer')
const { validationResult } = require('express-validator');
const MyStoreErrorFix = require('../Models/StoreErrorFix');
const { default: mongoose } = require('mongoose');
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
    fileFilter: multerFilter
})
// creating a middleware for the image testing 
exports.uploadsUserPhoto = uploads.single('questionImage')


const multerStorageErrorFix = multer.diskStorage({
    destination: (req, file, cd) => {
        cd(null, 'public/errorfix')
    },
    filename: (req, file, cd) => {
        const extension = file.mimetype.split('/')[1];
        cd(null, `user-${Date.now()}.${extension}`);
    }
})
const multerFilterErrorFix = (req, file, cd) => {
    if (file.mimetype.startsWith('image')) {
        cd(null, true)
    } else {
        cd('not image ', false)
    }
}
const uploadsErrorFix = multer({
    storage: multerStorageErrorFix,
    fileFilter: multerFilterErrorFix
})
// creating a middleware for the errorfix testing 
exports.uploadsErrorFix = uploadsErrorFix.single('errorfixImage')



//create a question for the user
exports.createAskQuestion = async (req, res, next) => {
    const valierrorMessage = validationResult(req)
    if (!valierrorMessage.isEmpty()) {
        console.log(valierrorMessage)
        res.status(422)
        return next(new HttpError('empty input check your data', 422))
    }
    const { title, developeremail, question, tags, user_id } = req.body;
    try {
        const data_question = await AskQuestion.create({
            developeremail,
            title,
            // user_id,
            question,
            tags,
            questionImage: {
                data: req.file.filename
            }
        })
        res.status(201).json({ status: 201, dataMessage: 'question created', data_question })
        console.log(data_question)
    } catch (err) {
        res.status(404).json({ dataMessage: err.message })
        console.log(err.message)
    }

}



//controller for error fix
exports.errorfix = async (req, res, next) => {
    const valierrorMessage = validationResult(req)
    if (!valierrorMessage.isEmpty()) {
        console.log(valierrorMessage)
        res.status(422)
        return next(new HttpError('empty input check your data', 422))
    }
    const { developeremail, errorfixImage, errorname, errorcode } = req.body;
    try {
        const data_question = await MyStoreErrorFix.create({
            developeremail,
            errorcode,
            errorname,
            errorfixImage: {
                data: req.file.filename
            }
        })
        res.status(201).json({ status: 201, dataMessage: 'question created', data_question })
        console.log(data_question)
    } catch (err) {
        res.status(404).json({ dataMessage: err.message })
        console.log(err.message)
    }

}
// get the infomation for the user
exports.geterrorfix = async (req, res, next) => {
    const checkuser = await MyStoreErrorFix.find({ developeremail: req.params.developeremail }).sort({$natural: -1 })
    if (!checkuser) {
        return next(new HttpError('this user is not found ', 404))
    }
    res.status(200).json({ dataMessage: 'user found', data: checkuser })
}

// get the veiw solutionn 
exports.veiwsolution = async (req, res, next) => {
    try {
        const user = await MyStoreErrorFix.findById(req.params.id);
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
        return res.json({ data: user });
    } catch (err) {
        if (err instanceof mongoose.CastError) {
            return res.status(404).json({ message: `Invalid store id: ${err.message}` });
          } else {
            return next(err);
          }
      }
   
}
