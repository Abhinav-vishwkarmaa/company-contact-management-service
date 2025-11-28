const Job = require('../models/Job');
const JobApplication = require('../models/JobApplication');
const sendEmail = require('../services/emailService');

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
        console.error('Error in getJobs:', error);
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
        console.error('Error in getJob:', error);
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
        console.error('Error in createJob:', error);
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
        console.error('Error in updateJob:', error);
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
        console.error('Error in deleteJob:', error);
        res.status(400).json({ success: false, error: error.message });
    }
};

// @desc    Apply for a job
// @route   POST /jobs/apply
// @access  Public
exports.applyForJob = async (req, res) => {
    try {
        const { name, email, phone, linkedin, portfolio, resume, coverLetter, jobId } = req.body;

        // Check if job exists
        if (jobId) {
            const job = await Job.findByPk(jobId);
            if (!job) {
                return res.status(404).json({ success: false, message: 'Job not found' });
            }
        }

        // Create application in DB
        const application = await JobApplication.create({
            name,
            email,
            phone,
            linkedin,
            portfolio,
            resume,
            coverLetter,
            jobId,
        });

        // Send email notification
        const messageToSend = `
      New Job Application Received!
      
      Name: ${name}
      Email: ${email}
      Phone: ${phone}
      LinkedIn: ${linkedin || 'N/A'}
      Portfolio: ${portfolio || 'N/A'}
      Resume: ${resume}
      
      Cover Letter:
      ${coverLetter || 'N/A'}
    `;

        try {
            // Email to Admin
            await sendEmail({
                email: process.env.SMTP_USER,
                subject: `New Job Application from ${name}`,
                message: messageToSend,
            });

            // Email to Applicant
            const applicantMessage = `
        Hi ${name},

        Thank you for applying! We have received your application.
        
        We will review your resume and portfolio and get back to you if your profile matches our requirements.

        Best regards,
        HR Team
      `;

            await sendEmail({
                email: email,
                subject: 'Application Received',
                message: applicantMessage,
            });

        } catch (err) {
            console.error(err);
            // We still return success even if email fails
        }

        res.status(201).json({
            success: true,
            data: application,
            message: 'Application submitted successfully',
        });
    } catch (error) {
        console.error('Error in applyForJob:', error);
        res.status(400).json({
            success: false,
            error: error.message,
        });
    }
};

// @desc    Get all job applications
// @route   GET /admin/applications
// @access  Private (Admin)
exports.getJobApplications = async (req, res) => {
    try {
        const applications = await JobApplication.findAll({
            include: [
                {
                    model: Job,
                    attributes: ['jobTitle', 'location', 'type'],
                },
            ],
        });

        res.status(200).json({
            success: true,
            count: applications.length,
            data: applications,
        });
    } catch (error) {
        console.error('Error in getJobApplications:', error);
        res.status(400).json({ success: false, error: error.message });
    }
};
