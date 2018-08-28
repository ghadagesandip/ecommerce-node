
import * as categorylib from './categorylib';
import logger from '../../utils/logger';
import formatResponse from '../../utils/formatResponse';

export const index = async (req, res) =>{
	
	
};


export const add = async (req, res) =>{
    
	try{
		var category = await categorylib.saveCategory(req.body);
		if(category){
			formatResponse(res, category);
		}else{
			logger.info(category);
		}
	}catch(err){
		console.log('err', err)
		// logger.log({
		// 	level: 'error',
		// 	message: 'Error while saving category',
		// 	err: err
		//   });
		formatResponse(res, err);
	}

};