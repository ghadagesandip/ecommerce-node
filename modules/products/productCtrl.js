import formatResponse from '../../utils/formatResponse';
import * as productlib from './productlib';



export const index = (req, res) => {
	formatResponse(res,'welcome to ecommerce apis');
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
	
	formatResponse(res,'welcome to ecommerce apis');
};