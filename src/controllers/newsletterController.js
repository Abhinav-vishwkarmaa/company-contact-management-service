const Newsletter = require('../models/Newsletter');
const sendEmail = require('../services/emailService');
const generateEmailTemplate = require('../utils/emailTemplate');

// @desc    Subscribe to newsletter
// @route   POST /newsletter
// @access  Public
exports.subscribe = async (req, res) => {
    try {
        const { email } = req.body;

        // Check if already subscribed
        const existing = await Newsletter.findOne({ where: { email } });
        if (existing) {
            return res.status(400).json({ success: false, message: 'Email already subscribed' });
        }

        const subscription = await Newsletter.create({ email });

        // Send confirmation email
        try {
            const message = `Hi there,
            
Thank you for subscribing to our newsletter! You will now receive updates about our latest news and offers.

Best regards,
Company Team`;

            const html = generateEmailTemplate(
                'Subscription Confirmed',
                message,
                'Visit Website',
                process.env.CLIENT_URL || '#'
            );

            await sendEmail({
                email: email,
                subject: 'Newsletter Subscription Confirmed',
                message: message, // Fallback
                html: html,
            });
        } catch (err) {
            console.error('Newsletter email failed:', err);
        }

        res.status(201).json({
            success: true,
            data: subscription,
            message: 'Subscribed successfully',
        });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// @desc    Get all newsletter subscribers
// @route   GET /admin/newsletter
// @access  Private (Admin)
exports.getSubscribers = async (req, res) => {
    try {
        const subscribers = await Newsletter.findAll({
            order: [['createdAt', 'DESC']],
        });
        res.status(200).json({
            success: true,
            count: subscribers.length,
            data: subscribers,
        });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};
