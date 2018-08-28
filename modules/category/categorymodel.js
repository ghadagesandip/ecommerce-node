'use strict';

import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const categorySchema = new Schema({

	name:{
		type:String,
		unique: true,
		index: true
	},
	slug: {
		type:String,
		unique: true,
		index: true
	}
},{
	versionKey: false
});

categorySchema.pre('save', function(next){

	const currentDate = new Date();
	this.updated_at = currentDate;
	
	if(!this.created_at){
		this.created_at = currentDate;
	}
	next();
	
});


export default mongoose.model('Category', categorySchema);

