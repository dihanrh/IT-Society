// models/registration.js

const mongoose = require('mongoose');

// Define the schema for user registration
const registrationSchema = new mongoose.Schema({
  name: String,
  studentId: String,
  semester: String,
  email: String,
  password: String,
  isApproved: Boolean,
});

// Create a model using the schema
const Registration = mongoose.model('Registration', registrationSchema);

module.exports = Registration;
