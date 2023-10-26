const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { createError } = require('./constant');
function createRout(req) {
    const date = new Date()
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString();
    const day = date.getDate().toString()
    const directory = path.join(__dirname, '..', 'public', 'uploads', 'profile', year, month, day)
    req.body.fileuploadpath = path.join('uploads', 'profile', year, month, day)

    fs.mkdirSync(directory, { recursive: true })
    return directory
}
const storage = multer.diskStorage({
    destination: (req, file, cb) => {

        if (file?.originalname) {
            const filePath = createRout(req)

            return cb(null, filePath)

        }
        cb(null, null)

    },
    filename: (req, file, cb) => {
        if (file?.originalname) {
            const ext = path.extname(file.originalname)
            const fileName = String(new Date().getTime() + ext)
            req.body.filename = fileName
            cb(null, fileName)

        }
        



    }
})
function fileFilter(req, file, cb) {
    const ext = path.extname(file.originalname)
    const mimetypes = ['.jpg', '.jpeg', '.png', '.webp', '.gif']
    if (mimetypes.includes(ext)) {
        return cb(null, true)
    } else {
        return cb(createError.BadRequest('فرمت ارسال شده تصویر صحیح نمیباشد'))
    }
}

const maxSize = 1 * 2000 * 2000

const uploadFile = multer({ storage, fileFilter, limits:{fileSize: maxSize }});

module.exports = {
    uploadFile
}

