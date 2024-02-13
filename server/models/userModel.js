// Mongoose for the connection of MongoDB
const mongoose = require('mongoose');

// Bcrypt for the encryption of password
const bcrypt = require('bcrypt');

// Validator helps validates forms
const validator = require('validator');

// Create a new schema or database
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
			unique: true, // Check if there are no similar emails inputted
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
			trim: true,
		},
	},
	{ timestamps: true } // Timestamps to have a property of createdAt and updatedAt
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
	// Validation when empty filled
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

	// Validation of password must 8 characters, uppercase, numbers, and special characters
	if (!validator.isStrongPassword(password)) {
		throw new Error('Password is weak');
	}

	// Check if the email is existing
	const exists = await this.findOne({ email });

	if (exists) {
		throw new Error('Email Already in Use');
	}

	// genSalt for the length of encryption characters
	const salt = await bcrypt.genSalt(10);

	// hash to encrypt the password with the salt characters
	const hash = await bcrypt.hash(password, salt);

	// Create = register the user inputs into the mongoDB
	const user = await this.create({
		firstname,
		lastname,
		position,
		contactNumber,
		email,
		password: hash,
		profilePicture,
	});

	// Return the user data object
	return user;
};

// create a Variable of Schema Model to use for the entire application
const Users = mongoose.model('User', userSchema);

// Export the Variable
module.exports = Users;
