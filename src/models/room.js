const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  // participants: [{
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: 'User',
  //     required: true
  // }],
  author: {
    type: String,
    required: true,
  },
  roomId: {
    type: String,
    required: true,
    unique: true,
  },

  roomTitle: {
    type: String,
    required:true,
  },

  isActive: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Room = mongoose.model("Room", roomSchema);

module.exports = Room;
