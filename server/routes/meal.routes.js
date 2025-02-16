const express = require('express');
const router = express.Router();
const mealController = require('../controllers/meal.controller');

router.post('/', mealController.createMeal);
router.get('/', mealController.getMeals);
router.get('/:id', mealController.getMealById);
router.put('/:id', mealController.updateMeal);
router.delete('/:id', mealController.deleteMeal);

module.exports = router;