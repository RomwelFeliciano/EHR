// userRoute.js
const express = require('express');
const upload = require('../multerConfig');
const { registerUser, getUsers } = require('../controllers/userController');

const router = express.Router();

router.post('/register', upload.single('profilePicture'), registerUser);
router.get('/', getUsers);

module.exports = router;
