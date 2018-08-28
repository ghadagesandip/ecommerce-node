import jwt from 'jsonwebtoken';

import * as userlib from './userlib';
import logger from '../../utils/logger';
import config from '../../config';
import formatResponse from '../../utils/formatResponse';
import { encrypt, decrypt } from '../../utils/secuirty';

const secret = config.jwtSecret;


const createToken = (user) => {

	const payload = {
		userId: user.userId,
		iat: Math.floor(Date.now() / 1000) - 30,
		exp: Math.floor(Date.now() / 1000) + 86400000
	};
	return jwt.sign(payload, secret);
};



export const index = (req, res) => {
	formatResponse(res,'welcome to home service apis');
};




export const signup = async (req, res) => {
	
	try{
		const encryptedData = await encrypt(req.body);
		const decrypted = await decrypt(encryptedData);
		var user =	await userlib.saveUser(decrypted);
		if(user){
			user.message = "User registered";
		
			var sendEmail = userlib.sendAccountVerificationEmail(user.userId);
			console.log('sendEmail', sendEmail);
			formatResponse(res, user);
		}else{
			logger.info(user);
		}
		
	}catch(err){
		logger.info(err);
		logger.log({
			level: 'error',
			message: 'Public error to share',
			err: err
		  });
		formatResponse(res, err);
	}
};



export const signin = async (req, res) => {
	
	const {email, password} = req.body;
	try{

		var  foundUser = await userlib.getUserByEmail(email);

		foundUser.comparePassword(password, (err, isMatch) => {

			if (!isMatch) {
				let error = new Error('Wrong username or password!');
				error.name = 'AuthenticationError';
				formatResponse(res, error);

			}else{

				foundUser = foundUser.toObject();
				foundUser.token = createToken(foundUser);
				formatResponse(res,foundUser);
			}
		});
		

	}catch(err) {

		logger.error(err.stack);
		formatResponse(res,err);

	}
		
};

