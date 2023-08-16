const mongoose = require('mongoose');

const mediaCategorySchema = new mongoose.Schema({
    category_name: {
        type: String,
        required: true
    }
});

const MediaCategory = mongoose.model('MediaCategory', mediaCategorySchema);

module.exports = MediaCategory;
