const Meal = require('../models/meal.model');

exports.createMeal = (req, res) => {
    const meal = new Meal(req.body);
    meal.save()
    .then(savedMeal => res.status(201).json(savedMeal))
    .catch(err => res.status(400).json({ message: err.message }));
};

exports.getMeals = (req, res) => {
    Meal.find()
        .then(meals => res.json(meals))
        .catch(err => res.status(500).json({ message: err.message }));
};

exports.getMealById = (req, res) => {
        Meal.findById(req.params.id)
        .then(meal => {
            if (!meal) return res.status(404).json({ message: 'Meal not found' });
            res.json(meal);
        })
        .catch(err => res.status(500).json({ message: err.message }));
    };

exports.updateMeal = (req, res) => {
    Meal.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(updatedMeal => res.json(updatedMeal))
        .catch(err => res.status(400).json({ message: err.message }));
};

exports.deleteMeal = (req, res) => {
    Meal.findByIdAndDelete(req.params.id)
        .then(() => res.status(204).json({ message: 'Meal deleted' }))
        .catch(err => res.status(500).json({ message: err.message }));
};