import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const _colorSchema =  new Schema({color: String, images: [{name:String}]});
const _highlightsSChema = new Schema({title:String});
const _productProperty = new Schema({title:{type:String}, value:String});

const productSchema = new Schema({
	name:{
		type:String,
		unique: true
	},
	description:{
		type:String
	},
	price:{
		type:Number,
		required:true,
	},
	brand: {
		type: String
	},
	colors : [_colorSchema],
	highlights: [_highlightsSChema],
	general :[_productProperty],
	//phones attributes
	display_features: [_productProperty],
	os_and_processor:[_productProperty],
	memory_and_storage:[_productProperty],
	camera:[_productProperty],
	cannectivity:[_productProperty],
	other_details:[_productProperty],
	battery_and_power:[_productProperty],
	dimensions:[_productProperty],
	warrenty:[_productProperty],
	category:{type: mongoose.Schema.Types.ObjectId, ref: 'Category'}
},{
	versionKey: false
});

export default mongoose.model('Product', productSchema);