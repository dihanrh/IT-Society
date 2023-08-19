const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  courseName: String,
  courseCode:String,
  dateTime: Date,
  roomNumber: String,
  mentorName: String,
  mentorPhoneNumber: String,
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
