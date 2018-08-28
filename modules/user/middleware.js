import Joi from 'joi';
import logger from '../../utils/logger';
import formatResponse from '../../utils/formatResponse';

export const checkSignupReq = (req, res, next) => {
	var signupSchema = Joi.object().keys({
		username: Joi.string().min(3).max(20).regex(/^[a-z0-9]+$/),
		email: Joi.string().email().required(),
		password: Joi.string().required().min(5).max(16).regex(/^[a-zA-Z0-9]{5,16}$/),
		gender:Joi.string().required()
	});

	Joi.validate(req.body, signupSchema, (err) => {
		if (err) {
			logger.error(err);
			formatResponse(res, err);
		}
		return next();
	});
};


export const checkSigninReq = (req, res, next) => {
	var loginSchema = Joi.object().keys({
		email: Joi.string().email().required(),
		password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/)
	});

	Joi.validate(req.body, loginSchema, (err) => {
		if (err) {
			formatResponse(res, err);
		}
		return next();
	});
};


