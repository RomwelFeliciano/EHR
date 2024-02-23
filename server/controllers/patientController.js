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

// Get a single patient
const getSinglePatient = async (req, res) => {
	try {
		const { id } = req.params;
		const patient = await Patients.findById(id);

		if (!patient) {
			return res.status(404).json(`No Notes with ID: ${id}`);
		}

		res.status(200).json(patient);
	} catch (error) {
		res.status(500).json({ msg: error.message });
	}
};

// Update a patient
const updatePatient = async (req, res) => {
	// Extract fields from request body if they exist
	const { id } = req.params;
	console.log(req.body, req.params, req.file, req.formData);

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

	let updateFields = {
		fullname,
		birthday,
		hospitalNumber,
		religion,
		address,
		dateOfAdmission,
		complaint,
		diagnosis,
	};

	// Check if patientPicture exists and add it to updateFields if it does
	if (req.file) {
		updateFields.patientPicture = req.file.filename;

		try {
			// Retrieve the previous patient data from the database
			const prevPatient = await Patients.findById(id);

			// Check if the patient had a previous picture associated with it
			if (prevPatient.patientPicture) {
				const filePath = `./server/uploads/patient-picture/${prevPatient.patientPicture}`;

				// Check if the file exists before attempting to delete it
				if (fs.existsSync(filePath)) {
					// Delete the previous picture from the server filesystem
					try {
						await fs.promises.unlink(filePath);
						console.log('Previous picture deleted successfully.');
					} catch (error) {
						console.error(
							'Error deleting previous picture:',
							error
						);
					}
				} else {
					console.log('Previous picture does not exist:', filePath);
				}
			}
		} catch (error) {
			console.error('Error deleting previous picture:', error);
		}
	}

	try {
		const patient = await Patients.findByIdAndUpdate(
			{ _id: id },
			updateFields,
			{ timestamps: true, new: true }
		);

		if (!patient) {
			return res.status(404).json({ error: `No Patient with ID: ${id}` });
		}

		res.status(200).json(patient);
	} catch (error) {
		res.status(500).json({ msg: error.message });
	}
};

// Delete a Patient
const deletePatient = async (req, res) => {
	try {
		const { id } = req.params;

		// Retrieve the patient data from the database
		const patient = await Patients.findByIdAndDelete(id);

		if (!patient) {
			return res.status(404).json(`No Patients with ID: ${id}`);
		}

		// Check if the patient had a previous picture associated with it
		if (patient.patientPicture) {
			const filePath = `./server/uploads/patient-picture/${patient.patientPicture}`;

			// Check if the file exists before attempting to delete it
			if (fs.existsSync(filePath)) {
				// Delete the previous picture from the server filesystem
				try {
					await fs.promises.unlink(filePath);
					console.log('Patient picture deleted successfully.');
				} catch (error) {
					console.error('Error deleting patient picture:', error);
				}
			} else {
				console.log('Patient picture does not exist:', filePath);
			}
		}

		res.status(200).json(patient);
	} catch (error) {
		res.status(500).json({ msg: error.message });
	}
};

module.exports = {
	addPatient,
	getPatients,
	getSinglePatient,
	updatePatient,
	deletePatient,
};
