const express = require('express');
const { upload } = require('../middleware/uploadMiddleware');
const { protect, isVendor } = require('../middleware/authMiddleware');

const router = express.Router();

// Vendor uploads product images
router.post('/', protect, isVendor, upload.single('image'), (req, res) => {
    res.send({
        imageUrl: `/${req.file.path}`,
    });
});

module.exports = router;
