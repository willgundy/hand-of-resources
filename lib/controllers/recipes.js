const { Router } = require('express');
const Recipe = require('../models/Recipes');

module.exports = Router()
  .get('/:id', async (req, res, next) => {
    try {
      const id = req.params.id;
      const singleRecipe = await Recipe.getRecipeById(id);
      res.json(singleRecipe);
    } catch (e) {
      next(e);
    }
  })

  .get('/', async (req, res, next) => {
    try {
      const recipeList = await Recipe.getAll();
      res.json(recipeList);
    } catch (e) {
      next(e);
    }
  })
  
  .post('/', async(req, res, next) => {
    try {
      const newRecipe = await Recipe.insert(req.body);
      res.json(newRecipe);
    } catch (e) {
      next(e);
    }
  })
  
  .put('/:id', async(req, res, next) => {
    try {
      const id = req.params.id;
      const updatedRecipe = await Recipe.updateById(id, req.body);
      res.json(updatedRecipe);
    } catch (e) {
      next(e);
    }
  })
  
  .delete('/:id', async(req, res, next) => {
    try {
      const id = req.params.id;
      const deletedRecipe = await Recipe.delete(id);
      res.json(deletedRecipe);
    } catch (e) {
      next(e);
    }
  });