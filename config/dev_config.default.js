export default {
	'host':'127.0.0.1',
	'env': 'dev',
	'port': 3000,
	'dataEncDec':{
		'passphrase': 'cnN7V3luuOVqRTVOT0HnvNmjXKAw5MEO',
	},
	'winston': {
		'levels': { 
			'error': 0, 
			'warn': 1, 
			'info': 2, 
			'verbose': 3, 
			'debug': 4, 
			'silly': 5 
		}
	},
	'AWSConfig': {
		'accessKeyId': '',
		'secretAccessKey': '',
		'region': '',
		'signatureVersion': 'v4'
	},
	'mongo':{
		'url': 'mongodb://localhost:27017/ecommerce',
	},
	'SWAGGER_URL':'',
	'mail': {
		'mailSender': 'sandip.ghadge@neosofttech.com'
	},
	'jwtSecret': 'asdfghjkl',
	'salt': 'GYQ41CUa5UNGe9FW',
	'email':{
		'gmail':{
			'host':'smtp.gmail.com',
			'port': 587,
			'secure': false, // true for 465, false for other ports
			'auth': {
				'user': 'sandipghadge874', // generated ethereal user
				'pass': 'sandipg23' // generated ethereal password
			}
		},
		'mailOption':{
			'from':'"Picstagraph" <sandip.ghadge@wwindia.com>', // sender address
			'to': 'sandip.ghadge@wwindia.com, ghadagesadip@gmail.com', // list of receivers
		}
	}
};