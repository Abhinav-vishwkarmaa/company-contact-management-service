const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Newsletter = sequelize.define('Newsletter', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: { msg: 'Please add a valid email' },
            notEmpty: { msg: 'Please add an email' },
        },
    },
}, {
    timestamps: true,
});

module.exports = Newsletter;
