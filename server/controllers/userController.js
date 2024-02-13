const Users = require('../models/userModel');
const jwt = require('jsonwebtoken');
const fs = require('fs');

const createToken = (_id) => {
	return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' });
};

// Register User
const registerUser = async (req, res) => {
	const { firstname, lastname, position, contactNumber, email, password } =
		req.body;

	// Assuming profilePicture is the name attribute of your file input field
	const profilePicture = req.file.filename;

	console.log(profilePicture, req.body);
	try {
		// Create a new user document with the profilePicture data
		const user = await Users.register(
			firstname,
			lastname,
			position,
			contactNumber,
			email,
			password,
			profilePicture
		);

		console.log(user);

		res.status(200).json({ user });
	} catch (error) {
		// Registration failed, delete the uploaded file if it exists
		if (req.file) {
			// If there's an uploaded file, delete it
			fs.unlinkSync(req.file.path);
		}
		res.status(500).json({ msg: error.message });
	}
};

const getUsers = async (req, res) => {
	try {
		const users = await Users.find({}).sort({ createdAt: -1 });
		res.status(200).json(users);
	} catch (error) {
		res.status(500).json({ msg: error.message });
	}
};

module.exports = { registerUser, getUsers };
