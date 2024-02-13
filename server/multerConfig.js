// Import multer for file uploading
const multer = require('multer');

// import UUID for random ID's
const { v4: uuidv4 } = require('uuid');

// Import path
const path = require('path');

// Storage of the file
const storage = multer.diskStorage({
	// Where will be the files stored
	destination: function (req, file, cb) {
		cb(null, './server/uploads/');
	},
	// Generate a new filename
	filename: function (req, file, cb) {
		// UUID is unique ID, Date when it is uploaded and path.extname is the original file extension of the file
		cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname));
	},
});

// Filtering the file
const fileFilter = (req, file, cb) => {
	// Upload a specific file type
	const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];

	// To check if the uploaded file is included of the right file types
	if (allowedFileTypes.includes(file.mimetype)) {
		// True to accept the file
		cb(null, true);
	} else {
		// Dont accept the file
		cb(null, false);
	}
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
