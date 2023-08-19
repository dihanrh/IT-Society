const mongoose = require('mongoose');

const FileShareSchema = new mongoose.Schema({
  senderId: String,
  receiverId: String,
  files: [
    {
      fileName: String,
    },
  ],
  sendingDate: Date,
});

const FileShare = mongoose.model('FileShare', FileShareSchema);

module.exports = FileShare;
