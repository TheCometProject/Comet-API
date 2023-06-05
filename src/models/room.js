import { Schema, model } from "mongoose";

const roomSchema = new Schema({
  roomId: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Room = model("Room", roomSchema);

export default Room;
