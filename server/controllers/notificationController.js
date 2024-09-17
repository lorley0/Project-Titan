const nodemailer = require('nodemailer');
const Notification = require('../models/Notification');
const User = require('../models/User');

exports.sendEmailNotification = async (email, subject, message) => {
    try {
        let transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'your-email@gmail.com',
                pass: 'your-email-password',
            },
        });

        let mailOptions = {
            from: 'your-email@gmail.com',
            to: email,
            subject: subject,
            text: message,
        };

        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

exports.createInAppNotification = async (userId, message) => {
    try {
        const notification = new Notification({
            user: userId,
            message: message,
        });
        await notification.save();
    } catch (error) {
        console.error('Error creating notification:', error);
    }
};
