// dotenv for process.env function
const dotenv = require('dotenv').config();

// Mongoose for connection of mongoDB
const mongoose = require('mongoose');

// Initialize Express
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path'); // Import path module
const app = express();

// Middleware
const cors = require('cors');
app.use(
	cors({
		origin: 'http://localhost:5173',
	})
);

// Accept Data from JSON or POSTMAN
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
const userRoute = require('./routes/userRoute');
app.use('/api/user', userRoute);
const patientRoute = require('./routes/patientRoute');
app.use('/api/patients', patientRoute);
// Serve static files from the 'server/uploads' directory
app.use('/server/uploads/', express.static('server/uploads'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
	// Set static folder
	app.use(express.static('client/build'));

	// Serve index.html for any other routes not specifically handled
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

// Creating a dynamic PORT
const PORT = process.env.PORT || 5000;

// Connect to Database then Listen and check if error
mongoose
	.connect(process.env.MONGO_URI, {
		// Database name in Atlas MongoDB
		dbName: 'EHR',
	})
	.then(() => {
		// To Check if the connection is successful
		app.listen(PORT, () => {
			console.log(`Listening on Port ${PORT}...`);
		});
	})
	.catch((error) => {
		// Check if there is no connection
		console.error('MongoDB Error Connection:', error);
	});
