const signup = require('./signup');
const signin = require('./signin');
const getCurrent = require('./getCurrent');
const logout = require('./logout');
const updateSubscription = require('./updateSubscription');
const setAvatar = require('./setAvatar');
const verifyEmail = require('./verifyEmail');
const resendVerifyEmail = require('./resendVerifyEmail');

module.exports = {
    signup,
    signin,
    getCurrent,
    logout,
    updateSubscription,
    setAvatar,
    verifyEmail,
    resendVerifyEmail,
}