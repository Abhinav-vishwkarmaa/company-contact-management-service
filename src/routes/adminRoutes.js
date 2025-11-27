const express = require('express');
const router = express.Router();
const { loginAdmin, registerAdmin } = require('../controllers/authController');
const { createJob, updateJob, deleteJob, getJobApplications } = require('../controllers/jobController');
const { getContacts } = require('../controllers/contactController');
const { getSubscribers } = require('../controllers/newsletterController');
const { protect } = require('../middleware/authMiddleware');

router.post('/login', loginAdmin);
router.post('/register', registerAdmin); // Disable in production

// Protected routes
router.post('/jobs', protect, createJob);
router.put('/jobs/:id', protect, updateJob);
router.delete('/jobs/:id', protect, deleteJob);
router.get('/contacts', protect, getContacts);
router.get('/newsletter', protect, getSubscribers);
router.get('/applications', protect, getJobApplications);

module.exports = router;
