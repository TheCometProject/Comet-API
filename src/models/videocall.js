const mongoose = require('mongoose');

const videoCallSchema = new mongoose.Schema({
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }],
    start_time: {
        type: Date,
        required: true,
        validate: {
            validator: function (value) {
                return value < this.end_time;
            },
            message: 'Start time must be before end time'
        },
        index: true
    },
    end_time: {
        type: Date,
        required: true,
        validate: {
            validator: function (value) {
                return value > this.start_time;
            },
            message: 'End time must be after start time'
        }
    },
    call_url: {
        type: String,
        required: true
    },
    is_active: {
        type: Boolean,
        default: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
});

const VideoCall = mongoose.model('VideoCall', videoCallSchema);

module.exports = VideoCall;
