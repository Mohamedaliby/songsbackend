const multer = require('multer')

const memory = multer.memoryStorage()

const storage = multer.diskStorage({ //multers disk storage settings
    destination: (req, file, cb) => {
        cb(null, './uploads')
    },
    filename: (req, file, cb) => {
        var datetimestamp = Date.now()
        var filename = file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1]
        req.imageUrl = filename
        cb(null, filename)
    }
})
module.exports.upload = multer({ //multer settings
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // no larger than 5mb
    }
}).single('file')

module.exports.memoryUpload = multer({ //multer settings
    storage: memory,
    limits: {
        fileSize: 5 * 1024 * 1024 // no larger than 5mb
    }
}).single('file')

module.exports.fields = multer().single('file') // unkown destination