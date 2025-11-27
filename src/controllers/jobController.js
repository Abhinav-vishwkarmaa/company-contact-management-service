const Job = require('../models/Job');

// @desc    Get all jobs
// @route   GET /jobs
// @access  Public
exports.getJobs = async (req, res) => {
    try {
        const jobs = await Job.findAll({ where: { status: 'open' } });
        res.status(200).json({
            success: true,
            count: jobs.length,
            data: jobs,
        });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// @desc    Get single job
// @route   GET /jobs/:id
// @access  Public
exports.getJob = async (req, res) => {
    try {
        const job = await Job.findByPk(req.params.id);

        if (!job) {
            return res.status(404).json({ success: false, message: 'Job not found' });
        }

        res.status(200).json({
            success: true,
            data: job,
        });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// @desc    Create new job
// @route   POST /admin/jobs
// @access  Private (Admin)
exports.createJob = async (req, res) => {
    try {
        const job = await Job.create(req.body);

        res.status(201).json({
            success: true,
            data: job,
        });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// @desc    Update job
// @route   PUT /admin/jobs/:id
// @access  Private (Admin)
exports.updateJob = async (req, res) => {
    try {
        const job = await Job.findByPk(req.params.id);

        if (!job) {
            return res.status(404).json({ success: false, message: 'Job not found' });
        }

        await job.update(req.body);

        res.status(200).json({
            success: true,
            data: job,
        });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// @desc    Delete job
// @route   DELETE /admin/jobs/:id
// @access  Private (Admin)
exports.deleteJob = async (req, res) => {
    try {
        const job = await Job.findByPk(req.params.id);

        if (!job) {
            return res.status(404).json({ success: false, message: 'Job not found' });
        }

        await job.destroy();

        res.status(200).json({
            success: true,
            data: {},
        });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};
