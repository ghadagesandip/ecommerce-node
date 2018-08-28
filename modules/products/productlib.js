import Product from './productmodel';

export const saveProduct = async(input) => {

    try{
        var product = new Product(input);
        return await product.save();
    }catch(err){
        return Promise.reject(err);
    }
}