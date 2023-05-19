const express = require("express");
const router = express.Router();
const Room = require("../models/room");
const { createError } = require("../utils/error");

router.post("/rooms", async (req, res, next) => {
  try {
    const { author, roomId } = req.body;

    const newRoom = new Room({
      author, 
      roomId
    });

    await newRoom.save();

    res
      .status(201)
      .json({
        message: "Room created successfully",
      });
  } catch (error) {
    return next(
      createError(500, "Cannot create a room at the moment")
    );
  }
});

router.delete("/rooms/:roomId", async (req, res, next) => {
  try {
    const roomId = req.params.roomId;

    // Find the room by its roomId and delete it
    const room = await Room.findOneAndDelete({roomId: roomId});

    if (!room) {
      return next(createError(404, "Room doesn't exist"));
    }

    res.status(200).json({ message: "Room deleted successfully" });
  } catch (error) {
    return next(
      createError(500, "Cannot delete conference room at the moment")
    );
  }
});

router.get("/rooms/:roomId", async (req, res, next) => {
  try {
    const roomId = req.params.roomId;
    console.log(roomId);
    const room = await Room.findOne({roomId: roomId});

    if (!room) {
      return next(createError(404, "Room doesn't exist"));
    }

    res.status(200).json({ message: "Room exists", room });
  } catch (error) {
    return next(
      createError(500, "Cannot retrieve conference room at the moment")
    );
  }
});

module.exports = router;
