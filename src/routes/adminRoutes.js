const express = require('express');
const router = express.Router();
const { loginAdmin, registerAdmin } = require('../controllers/authController');
const { createJob, updateJob, deleteJob } = require('../controllers/jobController');
const { getContacts } = require('../controllers/contactController');
const { protect } = require('../middleware/authMiddleware');

// Auth routes
router.post('/login', loginAdmin);
router.post('/register', registerAdmin); // Optional

// Job management routes
router.post('/jobs', protect, createJob);
router.put('/jobs/:id', protect, updateJob);
router.delete('/jobs/:id', protect, deleteJob);

// Contact management routes
router.get('/contacts', protect, getContacts);

module.exports = router;
