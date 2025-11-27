const Contact = require('../models/Contact');
const sendEmail = require('../services/emailService');

// @desc    Submit contact form
// @route   POST /contact
// @access  Public
exports.submitContact = async (req, res) => {
    try {
        const { name, email, phone, message } = req.body;

        // Create contact entry in DB
        const contact = await Contact.create({
            name,
            email,
            phone,
            message,
        });

        // Send email notification
        const messageToSend = `
      You have a new contact request.
      Name: ${name}
      Email: ${email}
      Phone: ${phone}
      Message: ${message}
    `;

        try {
            await sendEmail({
                email: process.env.SMTP_USER, // Send to company email
                subject: 'New Contact Form Submission',
                message: messageToSend,
            });
        } catch (err) {
            console.error(err);
            // We still return success for the contact submission even if email fails
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
