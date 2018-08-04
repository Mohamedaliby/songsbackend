const multer = require('multer')
const memory = multer.memoryStorage()
const cloudinary = require('cloudinary');
const config = require('../config/config')
cloudinary.config({
    cloud_name: config.cloudinary.cloud_name,
    api_key: config.cloudinary.api_key,
    api_secret: config.cloudinary.api_secret,
})


let imageFilter = function (req, file, cb) {
    // accept image files only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
}

module.exports.memoryUpload = multer({ //multer settings
    storage: memory,
    limits: {
        fileSize: 2 * 1024 * 1024 // no larger than 2mb
    },
    fileFilter: imageFilter
}).single('file')

module.exports.upload = (file) => {
    return new Promise((resolve, reject) => {
        let url;
        console.log(file)
       cloudinary.v2.uploader.upload_stream({
                    resource_type: 'raw'
                },
                function (err, result) {
                    if (err) {
                        reject(err)
                    }
                    // console.log(result.secure_url)
                    url = result.secure_url
                    resolve(url)
                })
            .end(file)
    })
    // let file = req.file.buffer
    // let url;


    // cloudinary.uploader.upload(file, function(result) {
    //     req.imageUrl = result.url
    //     console.log(result) 
    //   })
    // req.imageUrl = url
    // next()
}



// multer local storage
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
module.exports.storageUpload = multer({ //multer settings
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // no larger than 5mb
    }
}).single('file')

// multer local storage end