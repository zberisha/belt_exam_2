const mongoose = require('mongoose');

const restrictedIngredients = ['salt', 'pepper', 'cheese'];

const mealSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20,
    },
    totalMinutes: {
        type: Number,
        required: true,
        min: 2,
        max: 240,
    },
    directions: {
        type: String,
        required: true,
        minlength: 10,
    },
    ingredientOne: {
        type: String,
        validate: [
        {
            validator: function (v) {
            const trimmed = v.trim().toLowerCase();
            return !restrictedIngredients.includes(trimmed);
            },
            message: 'Ingredient "{VALUE}" is not allowed.'
        }
        ]
    },
    ingredientTwo: {
        type: String,
        validate: [
        {
            validator: function (v) {
            const trimmed = v.trim().toLowerCase();
            return !restrictedIngredients.includes(trimmed);
            },
            message: 'Ingredient "{VALUE}" is not allowed.'
        }
        ]
    },
    ingredientThree: {
        type: String,
        validate: [
        {
            validator: function (v) {
            const trimmed = v.trim().toLowerCase();
            return !restrictedIngredients.includes(trimmed);
            },
            message: 'Ingredient "{VALUE}" is not allowed.'
        }
        ]
    }
});

const Meal = mongoose.model('Meal', mealSchema);

module.exports = Meal;