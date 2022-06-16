const { Router } = require('express');
const Recipe = require('../models/Recipes');

module.exports = Router()
  .get('/', async (req, res) => {
    const recipeList = await Recipe.getAll();
    res.json(recipeList);
  });