import Product from './productmodel';

export const getProducts = async (limit, skip) => {
   
    try{
        return await Product.find({}, null, {skip: skip, limit: limit});
    }catch(err){
        return Promise.reject(err);
    }
}

export const saveProduct = async(input) => {

    try{
        var product = new Product(input);
        return await product.save();
    }catch(err){
        return Promise.reject(err);
    }
}