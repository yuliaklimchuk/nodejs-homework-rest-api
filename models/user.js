const Joi = require('joi');
const { Schema, model } = require('mongoose');

const signupShema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().required(),
  subscription: Joi.string().valueOf('starter', 'pro', 'business').default("starter"),
  token: Joi.string().default(null)
})

const signinShema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().required(),
})

const emailShema = Joi.object({
  email: Joi.string().required(),
})

const updateSubscriptionShema = Joi.object({
    subscription: Joi.string().valueOf('starter', 'pro', 'business').required(),
});

const shemas = {
    signup: signupShema,
    signin: signinShema,
    updateSub: updateSubscriptionShema,
    email: emailShema,
}

const userSchema = new Schema({
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    subscription: {
        type: String,
        enum: ["starter", "pro", "business"],
        default: "starter"
    },
    avatarURL: {
        type: String,
        required: true,
    },
    token: {
        type: String,
        default: null,
    },
    verify: {
        type: Boolean,
        default: false,
    },
    verificationToken: {
        type: String,
        required: [true, 'Verify token is required'],
    },
}, { versionKey: false, timestamps: true })

const User = model('user', userSchema);

module.exports = {
    User,
    shemas
}