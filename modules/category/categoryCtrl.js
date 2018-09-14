
import * as categorylib from './categorylib';
import logger from '../../utils/logger';
import formatResponse from '../../utils/formatResponse';

export const index = async (req, res) =>{
	
	var categories = await categorylib.getCategories();
	if(categories){
	
		formatResponse(res, categories);
	}else{
		categories.message = 'Category not found';
		formatResponse(res, err);
		logger.error(err);

	}

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
		logger.log({
			level: 'error',
			message: 'Error while saving category',
			err: err
		  });
		formatResponse(res, err);
	}

};


export const edit = async(req, res) => {

	
	try{
		
		var category = await categorylib.updateCategory(req.params.id, req.body)

		if(category){
			formatResponse(res, category);
		}else{
			logger.info(category);
		}
	}catch(err){
		logger.log({
			level: 'error',
			message: 'Error while saving category',
			err: err
		  });
		formatResponse(res, err);
	}
}


export const remove = async(req, res) => {
	try{

		var deleted = await categorylib.deleteCategory(req.params.id);
		if(deleted){
			formatResponse(res, deleted);
		}else{
			logger.info(deleted);
		}
	}catch(err){
		logger.log({
			level: 'error',
			message: 'Error while deleting category',
			err: err
		  });
		formatResponse(res, err);
	}
}