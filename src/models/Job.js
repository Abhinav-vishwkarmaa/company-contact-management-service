const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Job = sequelize.define('Job', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    jobTitle: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: { msg: 'Please add a job title' },
        },
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: { msg: 'Please add a description' },
        },
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: { msg: 'Please add a location' },
        },
    },
    type: {
        type: DataTypes.ENUM('Full-time', 'Part-time', 'Contract', 'Internship', 'Freelance'),
        allowNull: false,
        validate: {
            isIn: {
                args: [['Full-time', 'Part-time', 'Contract', 'Internship', 'Freelance']],
                msg: 'Please select a valid job type',
            },
        },
    },
    salaryRange: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: { msg: 'Please add a salary range' },
        },
    },
    requirements: {
        type: DataTypes.JSON, // Storing array as JSON in MySQL
        allowNull: false,
        validate: {
            notEmpty: { msg: 'Please add requirements' },
        },
    },
    status: {
        type: DataTypes.ENUM('open', 'closed'),
        defaultValue: 'open',
    },
}, {
    timestamps: true,
});

module.exports = Job;
