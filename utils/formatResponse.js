import logger from './../utils/logger';
import { encrypt } from './secuirty';

export default (res, data) =>{

	let formattedResponse = { status: 'success', message: '' };
	let statusCode = 200;
	
	if(data instanceof Error){

		logger.debug(data.stack);
		formattedResponse.status = 'error';
		formattedResponse.message = data.message;
		formattedResponse.errorType = '';
		delete data.message;

		switch(data.name){
			
		case 'ValidationError':
			formattedResponse.errorType = 'validation_error';
			statusCode = 400;
			break;

		case 'MongoError':
			formattedResponse.errorType = 'validation_error';
			statusCode = 400;
			break;

		case 'AuthenticationError':
			formattedResponse.errorType = 'authentication_error';
			statusCode = 401;
			break;

		case 'JsonWebTokenError':
			formattedResponse.errorType = 'json_web_token_error';
			statusCode = 401;
			break;

		case 'TokenExpiredError':
			formattedResponse.errorType = 'json_web_token_expired';
			statusCode = 401;
			break;

		case 'limit_exceeded':
			formattedResponse.errorType = 'limit_exceeded';
			statusCode = 403;
			break;

		case 'DataNotFound':
			formattedResponse.errorType = 'data_not_found';
			statusCode = 404;
			break;

		case 'NotFound':
			formattedResponse.errorType = 'resource_unavailable';
			statusCode = 404;
			break;

		default:
			formattedResponse.errorType = 'internal server error';
			statusCode = 500;
		}
		//formattedResponse = encrypt(formattedResponse);
		return res.status(statusCode).send(formattedResponse);

	}else{

		formattedResponse.status = data.status || 'success';
		formattedResponse.data = data;
		formattedResponse.message = data.message || '';

		if(data.message)
			delete data.message;

		//formattedResponse = encrypt(formattedResponse);
		return res.status(statusCode).send(formattedResponse);
	}
};