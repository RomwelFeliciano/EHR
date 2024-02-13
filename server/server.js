const dotenv = require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoute = require('./routes/userRoute');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api/user', userRoute);

// Routes
app.get('/', (req, res) => {
	// Check to test GET
	req.send('Home Page');
});

// Creating a dynamic PORT
const PORT = process.env.PORT || 5000;

// Connect to Database then Listen and check if error
mongoose
	.connect(process.env.MONGO_URI, {
		// Change 'your_database_name' to your desired database name
		dbName: 'EHR',
	})
	.then(() => {
		app.listen(PORT, () => {
			console.log(`Listening on Port ${PORT}...`);
		});
	})
	.catch((error) => {
		console.error('Error connecting to MongoDB:', error);
	});
