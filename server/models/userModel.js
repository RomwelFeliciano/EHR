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
		// This works only for text and number inputs
		!firstname ||
		!lastname ||
		!position ||
		!contactNumber ||
		!email ||
		!password
	) {
		throw new Error('All fields must be filled');
	}

	// Validation of password must 8 characters, uppercase, numbers, and special characters
	if (!validator.isStrongPassword(password)) {
		throw new Error(
			'Password must contain Lowercase, Uppercase, Numbers and Special Characters'
		);
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

// Static Login Method
userSchema.statics.login = async function (email, password) {
	//Validation
	if (!email || !password) {
		throw Error('All fields must be filled');
	}
	if (!validator.isEmail(email)) {
		throw Error('Email is not valid');
	}

	// find the user with the same email in the database
	const user = await this.findOne({ email });

	if (!user) {
		throw Error('Incorrect Email');
	}

	// Compare the password of the user password in the database
	const match = await bcrypt.compare(password, user.password);

	if (!match) {
		throw Error('Incorrect Password');
	}

	return user;
};

// create a Variable of Schema Model to use for the entire application
const Users = mongoose.model('User', userSchema);

// Export the Variable
module.exports = Users;
