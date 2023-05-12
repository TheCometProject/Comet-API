const express = require("express");
const { createError } = require("../utils/error");
const router = express.Router();
const Drawing = require("../models/drawing");

router.post(
    "/drawings", async (req, res, next) => {

        try {

            const drawingData = req.body.drawingData;

            await Drawing.create({ data: drawingData });

            res.status(200).send('Drawing saved successfully');

        } catch (error) {

            return next(createError(500, "Internal server error"));

        }
    }
);


router.get('/drawings', async (req, res, next) => {
    try {

        const drawings = await Drawing.find();

        res.render('drawings', { drawings });

    } catch (error) {

        return next(createError(500, 'Internal server error'));

    }
});

module.exports = router;
