'use strict';
 
import Category from './categorymodel';

export const getCategories = async () => {

    try{
        return await Category.find();
    }catch(err){
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