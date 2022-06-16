const { Router } = require('express');
const Recipe = require('../models/Recipes');

module.exports = Router()
  .get('/:id', async (req, res) => {
    const id = req.params.id;
    const singleRecipe = await Recipe.getRecipeById(id);
    res.json(singleRecipe);
  })

  .get('/', async (req, res) => {
    const recipeList = await Recipe.getAll();
    res.json(recipeList);
  });