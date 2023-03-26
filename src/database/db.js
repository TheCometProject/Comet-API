// This is a file that ONLY describes the database, it's not being called anywhere in the code

const mongoose = require('mongoose');

// Get database credentials from environment variables
const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;

// Construct the MongoDB connection string
const connectionString = `mongodb://${dbUser}:${dbPass}@localhost/${dbName}`;


// Connect to the MongoDB database
mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', (error) => {
    console.error('Unable to connect to the database:', error);
});

db.once('open', () => {
    console.log('Connection has been established successfully.');
});


