// Import express
const express = require('express');

// Import upload from the multer to use it
const upload = require('../multerConfig');

// import the functions from the controllers
const {
	registerUser,
	loginUser,
	getUsers,
} = require('../controllers/userController');

// Use the router express
const router = express.Router();

// Register a user
router.post('/register', upload.single('profilePicture'), registerUser);

// Login a user
router.post('/login', loginUser);

// Get all the users
router.get('/', getUsers);

module.exports = router;
