const express = require('express');
const { createJob, getJobs, deleteJob } = require('../controllers/jobController');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/:businessId').get(getJobs);
router.route('/').post(protect, createJob);
router.route('/:jobId').delete(protect, deleteJob);

module.exports = router;
