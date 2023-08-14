const Media = require('../models/Media'); // Replace with your media model
const Category = require('../models/MediaCategory'); // Replace with your category model

exports.addMedia = async (req, res, next) => {
    const {
        title,
        artists,
        file_path,
        category,
        lyricist,
        director,
        tags
    } = req.body;

    try {
        const mediaCategory = await Category.findOne({ _id: category });

        if (!mediaCategory) {
            const error = new Error("Invalid category");
            error.statusCode = 400;
            throw error;
        }

        const newMedia = new Media({
            title,
            artists,
            file_path,
            category: mediaCategory._id,
            lyricist,
            director,
            tags
        });

        await newMedia.save();

        res.status(201).json({ message: 'Media added successfully', media: newMedia });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};
