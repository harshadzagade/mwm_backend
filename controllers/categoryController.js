const MediaCategory = require('../models/MediaCategory');

exports.addCategory = async (req, res, next) => {
    const { category_name } = req.body;

    try {
        const newCategory = new MediaCategory({
            category_name
        });

        await newCategory.save();

        res.status(201).json({ message: 'Media category added successfully', category: newCategory });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};
