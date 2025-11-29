const express = require('express');
const dotenv = require('dotenv');

// Load env vars
dotenv.config();

const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { connectDB, sequelize } = require('./config/db');

// Connect to database
connectDB();
require('./models/associations');

// Route files
const contactRoutes = require('./routes/contactRoutes');
const jobRoutes = require('./routes/jobRoutes');
const adminRoutes = require('./routes/adminRoutes');
const newsletterRoutes = require('./routes/newsletterRoutes');

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
    origin: [
        "https://abhinexgenit.vercel.app",
        "http://localhost:3000"
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));
// app.options("*", cors()); // Removed due to Express 5 incompatibility with '*' wildcard

app.use(helmet());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Mount routers
app.use('/contact', contactRoutes);
app.use('/jobs', jobRoutes);
app.use('/admin', adminRoutes);
app.use('/newsletter', newsletterRoutes);

// Health check
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
});

// Root route
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        error: 'Server Error',
    });
});

const PORT = process.env.PORT || 5000;

// Sync database and start server
if (require.main === module) {
    sequelize.sync({ alter: true }).then(() => {
        console.log('Database synced');
        app.listen(PORT, () => {
            console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
        });
    }).catch((err) => {
        console.error('Failed to sync database:', err);
    });
}

module.exports = app;
