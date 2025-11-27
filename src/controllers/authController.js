const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

// @desc    Authenticate admin & get token
// @route   POST /admin/login
// @access  Public
exports.loginAdmin = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check for user
        const admin = await Admin.findOne({ where: { username } });

        if (admin && (await admin.matchPassword(password))) {
            res.json({
                success: true,
                id: admin.id,
                username: admin.username,
                token: generateToken(admin.id),
            });
        } else {
            res.status(401).json({ success: false, message: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// @desc    Register a new admin (Optional, for initial setup)
// @route   POST /admin/register
// @access  Public
exports.registerAdmin = async (req, res) => {
    try {
        const { username, password } = req.body;

        const adminExists = await Admin.findOne({ where: { username } });

        if (adminExists) {
            return res.status(400).json({ success: false, message: 'Admin already exists' });
        }

        const admin = await Admin.create({
            username,
            password,
        });

        if (admin) {
            res.status(201).json({
                success: true,
                id: admin.id,
                username: admin.username,
                token: generateToken(admin.id),
            });
        } else {
            res.status(400).json({ success: false, message: 'Invalid admin data' });
        }
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};
