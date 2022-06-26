const multer  = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, 'uploads')
    },

    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    },

})

const upload = multer({storage: storage,
    fileFilter: function(req, file, cb) {
        if (file.mimetype == 'image/png' || file.mimetype == 'image/jpeg')
        {
            cb(null, true)
        } else {
            console.log('Fail');
            return cb(null, false);
        }
    }, limits: {fileSize : 2 * 1024 * 1024}})

module.exports = {upload};