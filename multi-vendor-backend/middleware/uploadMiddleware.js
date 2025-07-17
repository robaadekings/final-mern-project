const multer = require('multer');
const path = require('path');

// Storage
const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, process.env.UPLOADS_DIR || 'uploads/');
    },
    filename(req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

// File type check
function checkFileType(file, cb) {
    const filetypes = /jpg|jpeg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
        cb(null, true);
    } else {
        cb(new Error('Images only (jpg, jpeg, png)!'));
    }
}

const upload = multer({
    storage,
    fileFilter(req, file, cb) {
        checkFileType(file, cb);
    },
    limits: { fileSize: 2 * 1024 * 1024 }, // optional size limit
});

module.exports = { upload };
