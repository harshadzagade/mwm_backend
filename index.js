const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const roleRoutes = require('./routes/roleRoutes');
const mediaRoutes = require('./routes/mediaRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const artistRoutes = require('./routes/artistRoutes');
const PORT = 5000;
require('dotenv').config();
const app = express();

app.use(express.json());

// Mongo Integration
mongoose.connect(process.env.MONGODB)
    .then(() => {
        console.log("Database connected Successfully");
    })
    .catch(() => {
        console.log("Database connection failed");
    })

// Error Handling
app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500; // setting default value as 500 if undefined
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
    next();
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/roles', roleRoutes);
app.use('/api/media', mediaRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/artists', artistRoutes);

app.listen(PORT, () => {
    console.log("Server running on " + PORT);
})