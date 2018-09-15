import formatResponse from '../../utils/formatResponse';
import * as productlib from './productlib';
import * as categorylib from '../category/categorylib';


export const index = async (req, res) => {
	
	try{
		var limit = req.params.limit || 10;
		var skip = req.params.skip || 0 ;

		var products = await productlib.getProducts(limit, skip);

		if(products){
			formatResponse(res, products);
		}else{
			logger.log({
				level: 'error',
				message: 'Error while saving product',
			});
		}
		
	}catch(err){
		formatResponse(res, err);
	}
};


export const add = async (req, res) => {
	try{
		var product = await productlib.saveProduct(req.body);
		if(product){
			console.log('category : ', product.category)
			console.log('prod : ', product._id)
			categorylib.addProductRef(product.category, product._id);
			formatResponse(res, product);
		}else{
			logger.log({
				level: 'error',
				message: 'Error while saving product',
			});
		}
	}catch(err){
		formatResponse(res, err);
	}
};