const express = require('express');

const ctrl = require('../../controllers/auth');
const { ctrlWrapper } = require('../../helpers');
const { auth, upload } = require('../../middlewares');

const router = express.Router();

router.post('/signup', ctrlWrapper(ctrl.signup));
router.get('/verify/:verificationToken', ctrlWrapper(ctrl.verifyEmail));
router.post('/verify', ctrlWrapper(ctrl.resendVerifyEmail));
router.post('/signin', ctrlWrapper(ctrl.signin));
router.get('/current', auth, ctrlWrapper(ctrl.getCurrent));
router.get('/logout', auth, ctrlWrapper(ctrl.logout));
router.patch('/', auth, ctrlWrapper(ctrl.updateSubscription));
router.patch('/avatars', auth, upload.single('avatar'), ctrlWrapper(ctrl.setAvatar));

module.exports = router;