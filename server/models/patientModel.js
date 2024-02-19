// Mongoose for the connection of MongoDB
const mongoose = require('mongoose');

// Create a new schema or database
const patientSchema = mongoose.Schema(
	{
		fullname: {
			type: String,
			required: true,
			trim: true, // Trim whitespace from the beginning and end of strings
		},
		birthday: {
			type: Date,
			required: true,
			trim: true,
		},
		hospitalNumber: {
			type: String,
			required: true,
			trim: true,
		},
		religion: {
			type: String,
			required: true,
			trim: true,
		},
		address: {
			type: String,
			required: true,
			trim: true,
		},
		dateOfAdmission: {
			type: Date,
			required: true,
			trim: true,
		},
		complaint: {
			type: String,
			required: true,
			trim: true,
		},
		diagnosis: {
			type: String,
			required: true,
			trim: true,
		},
		patientPicture: {
			type: String,
			required: true,
			trim: true,
		},
		user_id: {
			type: String,
			required: true,
			trim: true,
		},
	},
	{ timestamps: true } // Timestamps to have a property of createdAt and updatedAt
);

// create a Variable of Schema Model to use for the entire application
const Patients = mongoose.model('Patients', patientSchema);

// Export the Variable
module.exports = Patients;
