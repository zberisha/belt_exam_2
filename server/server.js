const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('./config/meal.config');
const mealRoutes = require('./routes/meal.routes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/meals', mealRoutes);

// Connect to MongoDB
mongoose.connect(config.mongoURI)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(config.port, () => {
        console.log(`Server running on port ${config.port}`);
        });
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    });