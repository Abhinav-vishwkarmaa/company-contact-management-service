const express = require('express');
const router = express.Router();
const { getJobs, getJob, applyForJob } = require('../controllers/jobController');

router.post('/apply', applyForJob);
router.get('/', getJobs);
router.get('/:id', getJob);

module.exports = router;
