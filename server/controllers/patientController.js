const fs = require('fs');

// Import the users schema
const Patients = require('../models/patientModel');

// Create a Note
const addPatient = async (req, res) => {
	const user_id = req.user._id;
	const { firstname, lastname } = req.user;
	console.log(user_id, firstname, lastname);

	const addedBy = `${firstname} ${lastname}`;

	const {
		fullname,
		birthday,
		hospitalNumber,
		religion,
		address,
		dateOfAdmission,
		complaint,
		diagnosis,
	} = req.body;

	const patientPicture = req.file;

	if (!patientPicture) {
		// Return a json error message - return is needed so it wont crashed the server
		return res.status(500).json({ error: 'No file uploaded.' });
	}

	try {
		// extracting the filename of the file and stores in a constant variable

		const patient = await Patients.create(
			{
				fullname,
				birthday,
				hospitalNumber,
				religion,
				address,
				dateOfAdmission,
				complaint,
				diagnosis,
				patientPicture: patientPicture.filename,
				user_id,
				addedBy,
			} // .filename since we only want to store the filename
		);

		res.status(200).json(patient);
	} catch (error) {
		// Registration failed, delete the uploaded file if it exists
		if (patientPicture) {
			fs.unlinkSync(patientPicture.path);
		}

		res.status(500).json({ msg: error.message });
	}
};

// Get all the users for testing in POSTMAN
const getPatients = async (req, res) => {
	try {
		const patients = await Patients.find({}).sort({ createdAt: -1 });
		res.status(200).json(patients);
	} catch (error) {
		res.status(500).json({ msg: error.message });
	}
};

module.exports = { addPatient, getPatients };
