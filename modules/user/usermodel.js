'use strict';

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
const Schema = mongoose.Schema;

const userSchema = new Schema({
	name:{type:String}, //for user role company, name will be company name
	username: { 
		type: String,
		unique:true,
		validate: { validator: (k) => { return /^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/.test(k); } },
		message: '{VALUE} is not valid email',
	},
	email: {
		type: String,
		unique: true,
		lowercase:true,
		validate: { validator: (k) => { return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(k); } },
		message: '{VALUE} is not valid email',
	},
	role:{type:String, enum:['user','company','admin'], default:'user'},
	profile_image: { type: String },
	password: { type: String, select: false },
	gender: {type:String, enum:['Male','Female']},
	account_verified:{type:Date, default:null}, // datatype date is used to to avoid using two fields account verified and when it was verified
	dob:{type:Date, default: null},
	is_active:{type:Number, default: 1, enum:[1, 0]}, // 0 not active, 1: active
	preferred_language: {type: String, enum:['en','fr'], default: 'en'},
	created_at: Date,
	updated_at: Date
}, 
{
	versionKey: false
});

// userSchema.set('toJSON', {
// 	transform: function (doc, ret) {
// 		ret.userId = ret._id;
// 		delete ret.password;
// 		delete ret._id;
// 		return ret;
// 	}
// });

// userSchema.set('toObject', {
// 	transform: function (doc, ret) {
// 		ret.userId = ret._id;
// 		delete ret.password;
// 		delete ret._id;
// 		return ret;
// 	}
// });


userSchema.pre('save', function (next) {

	const currentDate = new Date();

	this.updated_at = currentDate;

	if(!this.created_at){
		this.created_at = currentDate;
	}

	var user = this;
	if (!user.isModified('password')) {
		return next();
	}

	bcrypt.genSalt(10, function (err, salt) {
		bcrypt.hash(user.password, salt, function (err, hash) {
			user.password = hash;
			next();
		});
	});
});



userSchema.methods.comparePassword = function (password, done) {
	bcrypt.compare(password, this.password, function (err, isMatch) {
		done(err, isMatch);
	});
};

var User = mongoose.model('User', userSchema);

export default User;