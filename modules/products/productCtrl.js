import formatResponse from '../../utils/formatResponse';
import * as productlib from './productlib';



export const index = async (req, res) => {
	console.log('products')
	
	try{
		var limit = req.params.limit || 10;
		var skip = req.params.skip || 0 ;
		var products = await productlib.getProducts(limit, skip);
		console.log('products', products)
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