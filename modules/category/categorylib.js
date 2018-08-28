'use strict';
 
import Category from './categorymodel';
import logger from '../../utils/logger';

export const saveCategory = async(input) => {

    try{
        console.log('input ', input)
        const category = new Category(input);
        return await category.save();
    }catch(err){
        return Promise.reject(err);
    }
}