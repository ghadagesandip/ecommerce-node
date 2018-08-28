'use strict';

import User from './usermodel';
import { decryption } from '../../utils/secuirty';
import sendEmail from '../../utils/email';
import logger from '../../utils/logger';



export const saveUser = async (input) => {
	
	try{
		const user = new User(input);
		return await user.save();
	}catch(err){
		return Promise.reject(err)
	}
};


export const updateDocById = (id, input) => {

	return new Promise((resolve, reject) => {

		User.findById(id, function (err, user) {
			if (err) 
				reject(err);
			
			user.set(input);
			user.save(function (err, updatedUser) {
			  if (err) 
				  reject(err);
				  
			  resolve(updatedUser);
			});
		  });
	});
};


export const getUserByEmail = (email) => {

	return User.findOne({email : email.toLowerCase()}, '+password');

};


export const getUserByUserId = async (value) => {

	return await User.findOne({ '_id' : value});
}


export const sendAccountVerificationEmail = async (id) => {

	try{
		
		let mailOptions = {
			from: '"Fred Foo 👻" <foo@example.com>', // sender address
			to: 'bar@example.com, baz@example.com', // list of receivers
			subject: 'Hello ✔', // Subject line
			text: 'Hello world?', // plain text body
			html: '<b>Hello world?</b>' // html body
		};
		console.log('id', id)
		var user = await getUserByUserId(id);
	
		if(user && user.account_verified !== null ){
			var sentEmail = await sendEmail(mailOptions);
			console.log('sent email', sentEmail);
		}else{
			logger.error('account is not verified')
		}
	
	}catch(err){
		logger.error(err.stack);
	}
	
	return true;
}


