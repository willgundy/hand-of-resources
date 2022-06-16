const { Router } = require('express');
const Recipe = require('../models/Recipes');

module.exports = Router()
  .get('/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const singleRecipe = await Recipe.getRecipeById(id);
      res.json(singleRecipe);
    } catch (e) {
      next(e);
    }
  })

  .get('/', async (req, res) => {
    try {
      const recipeList = await Recipe.getAll();
      res.json(recipeList);
    } catch (e) {
      next(e);
    }
  })
  
  .post('/', async(req, res, next) => {
    try {
      const testRecipe = await Recipe.insert(req.body);
      res.json(testRecipe);
    } catch (e) {
      next(e);
    }
  });