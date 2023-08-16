const User = require('../models/User'); 
const Media = require('../models/Media'); 

exports.likeSong = async (req, res, next) => {
    const userId = req.userId; // Get the user ID from the authenticated user

    const songId = req.params.songId; // Get the song ID from the request URL parameter

    try {
        const user = await User.findById(userId);
        const song = await Media.findById(songId);

        if (!user || !song) {
            const error = new Error('User or song not found');
            error.statusCode = 404;
            throw error;
        }

        // Check if the song is already in the liked playlist
        if (user.likedPlaylist.includes(songId)) {
            const error = new Error('Song is already liked');
            error.statusCode = 400;
            throw error;
        }

        // Add the song to the liked playlist
        user.likedPlaylist.push(songId);
        await user.save();
        res.status(200).json({ message: 'Added to your likes', user });

    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};

// Dislike Song
exports.dislikeSong = async (req, res, next) => {
    const userId = req.userId; // Assuming you have a middleware that extracts user ID

    const songId = req.params.songId; // Get the song ID from the request URL parameter

    try {
        const user = await User.findById(userId);
        const song = await Media.findById(songId);

        if (!user || !song) {
            return res.status(404).json({ message: 'User or song not found' });
        }

        // Check if the song is in the liked playlist
        if (!user.likedPlaylist.includes(songId)) {
            return res.status(400).json({ message: 'Song is not liked' });
        }

        // Remove the song from the liked playlist (dislike)
        user.likedPlaylist = user.likedPlaylist.filter(id => id.toString() !== songId);
        await user.save();
        res.status(200).json({ message: 'Removed from your likes', user });

    } catch (error) {
        res.status(500).json({ message: 'An error occurred', error });
    }
};
