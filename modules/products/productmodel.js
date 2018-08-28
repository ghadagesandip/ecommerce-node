import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const productSchema = new Schema({
	name:{
		type:String,
		unique: true
	},
	image: {
		type: String
	},
	description:{
		type:String
	},
	price:{
		type:Number,
		required:true,
	},
	categoryId:{type: mongoose.Schema.Types.ObjectId, ref: 'Category'}
},{
	versionKey: false
});

export default mongoose.model('Product', productSchema);