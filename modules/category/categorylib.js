'use strict';
 
import Category from './categorymodel';

export const getCategories = async () => {

    try{
        return await Category.find();
    }catch(err){
        return Promise.reject(err);
    }
}


export const getCategoryById = async (id) => {

    try{
        return await Category.find({
            _id: id
        });
    }catch(err){
        return Promise.reject(err);
    }
}



export const getCategoryWithProducts = async (limit) => {
   
    try{
        return await Category
        .find()
        .populate({
            path:'products',
            select: 'name price description brand colors',
            options:{limit:limit}
        })
        
    }catch(err){
        console.log('err', err);
        return Promise.reject(err);
    }
}

export const saveCategory = async(input) => {

    try{
        return await new Category(input).save();
    }catch(err){
        return Promise.reject(err);
    }
}

export const addProductRef = async (categoryId, productId) => {

    return new Promise((resolve, reject) => {

        Category.findOne({_id:categoryId}, function(err, Category){
            Category.products.push(productId);
            Category.save(function(err, category){
                if(err){
                    reject(err);
                }else{
                    resolve(category);
                }
            })
        })
        
    })
    
}

export const updateCategory = async(id,input) => {

    try{
        return await Category.update({_id:id}, {$set:input});

    }catch(err){
        console.log('eer', err)
        return Promise.reject(err);
    }
}

export const deleteCategory = async (id) => {
    console.log('detele id', id)
    try{
        return await Category.deleteOne({_id:id}, function (err) {
            if (err) return handleError(err);
            
            return 1;
          });
    }catch(err){
      
    }
}