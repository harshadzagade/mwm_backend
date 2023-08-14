const mongoose = require('mongoose');

const mediaSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    artists: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Artist' // Replace with your artist model
        }
    ],
    file_path: {
        type: String,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MediaCategory' // Replace with your media category model
    },
    lyricist: String,
    director: String,
    views_count: {
        type: Number,
        default: 0
    },
    likes_count: {
        type: Number,
        default: 0
    },
    dislikes_count: {
        type: Number,
        default: 0
    },
    tags: [String]
});

const Media = mongoose.model('Media', mediaSchema);

module.exports = Media;
