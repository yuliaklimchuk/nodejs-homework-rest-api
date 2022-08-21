const bcrypt = require('bcryptjs');
const gravatar = require("gravatar");
const { nanoid } = require('nanoid');

const { User, shemas } = require('../../models/user');
const { createError, sendEmail} = require('../../helpers');

const signup = async (req, res) => { 
    const { error } = shemas.signup.validate(req.body);
    if (error) { 
        throw createError(400, error.message);
    }
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) { 
        throw createError(409, `${email} is already exist`);
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const avatarURL = gravatar.url(email);
    const verificationToken = nanoid();
    const result = await User.create({ ...req.body, password: hashPassword, avatarURL, verificationToken });
    const mail = {
        to: email,
        subject: "Confirmation of registration",
        html: `<a target="_blank" href=" http://localhost:3000/api/users/verify/${verificationToken}">Click to confirm registration</a>`
    }
    await sendEmail(mail);
    res.status(201).json({
        email: result.email,
        subscription: result.subscription
    });
}

module.exports = signup;