const { Router } = require('express');
const Ingredient = require('../models/Ingredients');

module.exports = Router()
  .get('/:id', async (req, res, next) => {
    try {
      const id = req.params.id;
      const singleIngredient = await Ingredient.getIngredientById(id);
      res.json(singleIngredient);
    } catch (e) {
      next(e);
    }
  })

  .get('/', async (req, res, next) => {
    try {
      const ingredientList = await Ingredient.getAll();
      res.json(ingredientList);
    } catch (e) {
      next(e);
    }
  })
  
  .post('/', async(req, res, next) => {
    try {
      const newIngredient = await Ingredient.insert(req.body);
      res.json(newIngredient);
    } catch(e) {
      next(e);
    }
  });