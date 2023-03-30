const mongoose = require('mongoose');
const argon2 = require("argon2");

// Creating the user schema 

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    refreshToken: {
        type: String,
        default: null,
    },
    isEmailConfirmed: {
        type: Boolean,
        default: false,
    },
    confirmationToken: {
        type: String,
        default: null,
    },
    resetPasswordToken: {
        type: String,
        default: null,
    },
    passwordResetTokenExpiration: {
        type: Date,
        default: null,
    },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
