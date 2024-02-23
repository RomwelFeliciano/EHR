// Import express
const express = require('express');

const requireAuth = require('../middleware/authentication');

// Import upload from the multer to use it
const uploadPatient = require('../middleware/multerPatient');

// import the functions from the controllers
const {
	addPatient,
	getPatients,
	getSinglePatient,
	updatePatient,
	deletePatient,
} = require('../controllers/patientController');

// Use the router express
const router = express.Router();

// Require Auth for all note routes
router.use(requireAuth);

// Add a patient
router.post('/', uploadPatient.single('patientPicture'), addPatient);

// Get all the patients
router.get('/', getPatients);

// Get a single patient
router.get('/:id', getSinglePatient);

// Update a Patient
router.put('/:id', uploadPatient.single('patientPicture'), updatePatient);

// Delete a Patient
router.delete('/:id', deletePatient);

module.exports = router;
