const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const heroSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 10
    },
    likeCount: {
        type: Number,
        required: true,
    },
    isAlive: {
        type: Boolean,
        required: false,
        default: true
    },
    superPowers: {
        type: [String],
        default: undefined,
        enum: ["Flying", "Barking", "Trolling"],
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
        unique: true
    }
});

const Hero = mongoose.model('Hero', heroSchema);

module.exports = Hero;
