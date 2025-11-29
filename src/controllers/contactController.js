const Contact = require('../models/Contact');
const sendEmail = require('../services/emailService');
const generateEmailTemplate = require('../utils/emailTemplate');

// @desc    Submit contact form
// @route   POST /contact
// @access  Public
exports.submitContact = async (req, res) => {
    try {
        const { name, email, phone, message, service } = req.body;

        // Create contact entry in DB
        const contact = await Contact.create({
            name,
            email,
            phone,
            message,
            service,
        });

        // Send email notification
        const messageToSend = `
      You have a new contact request.
      Name: ${name}
      Email: ${email}
      Phone: ${phone}
      Message: ${message}
      Service: ${service}
    `;

        try {
            // Email to Admin
            const adminHtml = generateEmailTemplate(
                'New Contact Request',
                messageToSend,
                'View Contacts',
                `${process.env.CLIENT_URL || '#'}/admin/contacts`
            );

            await sendEmail({
                email: process.env.SMTP_USER,
                subject: 'New Contact Form Submission',
                message: messageToSend, // Fallback
                html: adminHtml,
            });

            // Email to User
            const userMessage = `Hi ${name},

Thank you for contacting us! We have received your message regarding "${service}" and will get back to you shortly.

Best regards,
Company Team`;

            const userHtml = generateEmailTemplate(
                'We Received Your Message',
                userMessage,
                'Visit Website',
                `${process.env.CLIENT_URL || 'https://abhinexgenit.vercel.app'}/contact-us`
            );

            await sendEmail({
                email: email,
                subject: 'We received your message',
                message: userMessage, // Fallback
                html: userHtml,
            });

        } catch (err) {
            console.error(err);
            res.status(500).json({
                success: false,
                error: err.message,
            });
            // We still return success even if email fails
        }

        res.status(201).json({
            success: true,
            data: contact,
            message: 'Message sent successfully',
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message,
        });
    }
};

// @desc    Get all contact submissions
// @route   GET /admin/contacts
// @access  Private (Admin)
exports.getContacts = async (req, res) => {
    try {
        const contacts = await Contact.findAll({
            order: [['createdAt', 'DESC']],
        });
        res.status(200).json({
            success: true,
            count: contacts.length,
            data: contacts,
        });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};
