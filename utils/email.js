import nodemailer from 'nodemailer';
import config from '../config/index';

const emailConfig = config.email.gmail;

const transporter = nodemailer.createTransport(emailConfig);

export default (mailOptions) => {

	return new Promise((resolve, reject) =>{
		
		transporter.createTransport(mailOptions);
		
		nodemailer.sendMail(mailOptions, (err, response)=>{
			if(err){
				reject(err);
			}else{
				resolve(response);
			}
		});	
	});
	
   
};