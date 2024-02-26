// Import the users schema
const Users = require('../models/userModel');

// JWT for token when logging in / authentication
const jwt = require('jsonwebtoken');

// fs for interacting a file in the data
const fs = require('fs');

// Create a JSON WebToken
const createToken = (_id) => {
	return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' });
};

// Register User in the controller using the statics function in the model
const registerUser = async (req, res) => {
	// Destructure the data of request body as an object so we wont call it repeatedly
	const { firstname, lastname, position, contactNumber, email, password } =
		req.body;

	// extracting the filename of the file and stores in a constant variable
	const profilePictureReq = req.file;

	try {
		// Check if no file uploaded
		if (!profilePictureReq) {
			// Return a json error message - return is needed so it wont crashed the server
			return res.status(500).json({ error: 'No file uploaded.' });
		}

		const profilePicture = profilePictureReq.filename;

		// Proceed here if no error
		const user = await Users.register(
			firstname,
			lastname,
			position,
			contactNumber,
			email,
			password,
			profilePicture // .filename since we only want to store the filename
		);

		const token = createToken(user._id);

		// Uploaded Successfully
		res.status(200).json({
			firstname,
			lastname,
			email,
			profilePicture,
			token,
		});
	} catch (error) {
		// Registration failed, delete the uploaded file if it exists
		if (profilePicture) {
			fs.unlinkSync(profilePicture.path);
		}

		res.status(500).json({ msg: error.message });
	}
};

// Login User
const loginUser = async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = await Users.login(email, password);

		// Destructure the user since inside of it is user
		const { firstname, lastname, profilePicture } = user;

		// Create a token
		const token = createToken(user._id);

		res.status(200).json({
			firstname,
			lastname,
			email,
			profilePicture,
			token,
		});
	} catch (error) {
		res.status(500).json({ msg: error.message });
	}
};

// Get all the users for testing in POSTMAN
const getUsers = async (req, res) => {
	try {
		const users = await Users.find({}).sort({ createdAt: -1 });
		res.status(200).json(users);
	} catch (error) {
		res.status(500).json({ msg: error.message });
	}
};

module.exports = { registerUser, loginUser, getUsers };
