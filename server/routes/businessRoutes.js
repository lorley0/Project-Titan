const express = require('express');
const { getBusinesses, addBusiness } = require('../controllers/businessController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();
const multer = require('multer');
const { verifyBusiness } = require('../controllers/businessController'); // Import the controller function

// Multer setup for file uploads
const upload = multer({ dest: 'uploads/' });

router.get('/', getBusinesses);
router.post('/', authMiddleware, addBusiness);
// Route to handle verification document submission
router.post('/:id/verify', upload.single('document'), verifyBusiness);

module.exports = router;
