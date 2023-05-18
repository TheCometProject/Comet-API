const express = require("express");
const router = express.Router();
const VideoCall = require("../models/videocall");
const { createError } = require("../utils/error");

router.post("/rooms", async (req, res, next) => {

    try {

        const { _id, participants, start_time, end_time, call_url } = req.body;

        const newRoom = new VideoCall({
            //participants,
            _id,
            start_time,
            end_time,
            call_url
        });

        await newRoom.save();

        res.status(201).json({ message: "Conference room created successfully", call_url, start_time, end_time, _id });

    } catch (error) {

        return next(createError(500, "Cannot create conference room at the moment"));

    }
});

router.delete('/rooms/:id', async (req, res, next) => {

    try {

        const roomId = req.params.id;

        // Find the room by its ID and delete it
        const room = await VideoCall.findByIdAndDelete(roomId);

        if (!room) {
            return next(createError(404, "Room not found"));
        }

        res.status(200).json({ message: "Room deleted successfully" });

    } catch (error) {

        return next(createError(500, "Cannot delete conference room at the moment"));

    }

});

router.get('/rooms/:id', async (req, res, next) => {

    try {

        const roomId = req.params.id;
        const room = await VideoCall.findById(roomId);

        if (!room) {
            return next(createError(404, "Room not found"));
        }

        res.status(200).json({ message: "Room retrieved successfully", room });

    } catch (error) {

        return next(createError(500, "Cannot retrieve conference room at the moment"));

    }
});

module.exports = router;