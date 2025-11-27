const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const JobApplication = sequelize.define('JobApplication', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    jobId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'Jobs',
            key: 'id',
        },
        onDelete: 'CASCADE',
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: { msg: 'Please add a name' },
        },
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: { msg: 'Please add a valid email' },
            notEmpty: { msg: 'Please add an email' },
        },
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: { msg: 'Please add a phone number' },
        },
    },
    linkedin: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    portfolio: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    resume: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: { msg: 'Please provide a resume link' },
        },
    },
    coverLetter: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
}, {
    timestamps: true,
});

module.exports = JobApplication;
