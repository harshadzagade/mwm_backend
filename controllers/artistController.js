const Artist = require('../models/Artist'); 

exports.addArtist = async (req, res, next) => {
    const { name } = req.body;

    try {
        const newArtist = new Artist({
            name,
        });

        await newArtist.save();
        res.status(201).json({ 
            message: 'Artist added successfully', 
            artist: newArtist 
        });

    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};
