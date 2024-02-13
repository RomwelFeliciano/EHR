const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const userSchema = mongoose.Schema(
	{
		firstname: {
			type: String,
			required: true,
			trim: true, // Trim whitespace from the beginning and end of strings
		},
		lastname: {
			type: String,
			required: true,
			trim: true,
		},
		position: {
			type: String,
			required: true,
			trim: true,
		},
		contactNumber: {
			type: String,
			required: true,
			trim: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			trim: true,
			lowercase: true, // Convert email to lowercase
			validate: {
				validator: validator.isEmail, // Use validator to check email format
				message: 'Invalid email address',
			},
		},
		password: {
			type: String,
			required: true,
			trim: true,
		},
		profilePicture: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

// Static Register Method
userSchema.statics.register = async function (
	firstname,
	lastname,
	position,
	contactNumber,
	email,
	password,
	profilePicture
) {
	// Validation
	if (
		!firstname ||
		!lastname ||
		!position ||
		!contactNumber ||
		!email ||
		!password ||
		!profilePicture
	) {
		throw new Error('All fields must be filled');
	}
	if (!validator.isStrongPassword(password)) {
		throw new Error('Password is weak');
	}

	const exists = await this.findOne({ email });

	if (exists) {
		throw new Error('Email Already in Use');
	}

	const salt = await bcrypt.genSalt(10);
	const hash = await bcrypt.hash(password, salt);

	const user = await this.create({
		firstname,
		lastname,
		position,
		contactNumber,
		email,
		password: hash,
		profilePicture,
	});

	return user;
};

const Users = mongoose.model('User', userSchema);

module.exports = Users;
