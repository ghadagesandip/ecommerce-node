import express from 'express';
import * as userCtrl from './userCtrl';
import * as middleware  from './middleware';

const router = express.Router({ caseSensitive: true });

router.get('/', userCtrl.index);

//admin apis
//signup will be enabled 
router.post('/signup', middleware.checkSignupReq, userCtrl. signup);
router.post('/signin', middleware.checkSigninReq, userCtrl.signin);

//router.post('/customer/facebook-sigin', middleware.checkCustomerFbSiginReq, userCtrl.customerFbSigin);
//router.post('/customer/facebook-signup', middleware.checkCustomerFbSignupReq, userCtrl.customerFbSignUp);
export default router;
