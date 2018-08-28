import crypto from 'crypto';
import fs from 'fs';
import config from '../config/index';
var encryptionConfig = config;
//Reading the Private Key
const privateKey = {
	key: fs.readFileSync(__dirname+'/../config/id_rsa.pem').toString(),
	passphrase: encryptionConfig.passphrase
};
//Reading the Public Key
const publicKey = fs.readFileSync(__dirname+'/../config/id_rsa.pub.pem').toString();



export const encrypt = (data) => { 

	return new Promise((resolve, reject) => {

		//Passing the text to be encrypted using private key
		const buf = Buffer.from(JSON.stringify(data), 'utf8');

		//Encrypting the text
		const secretData = crypto.privateEncrypt(privateKey, buf);

		resolve(secretData);

	});
};

export const decrypt = (encryptedData) => {
	
	return new Promise((resolve, reject) => {

		//decrypting the text using public key
		const data = crypto.publicDecrypt(publicKey, encryptedData);

		const origData = JSON.parse(data.toString());
		//Printing the original content
		//	console.log('origData : '+ origData);

		resolve(origData);

	});
};
