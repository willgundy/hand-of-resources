const { Router } = require('express');
const Grocery = require('../models/Groceries');

module.exports = Router()
  .get('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const singleGrocery = await Grocery.getGroceryById(id);
        res.json(singleGrocery);
    } catch (e) {
        next(e);
    }
  })

  .get('/', async (req, res, next) => {
    try {
        const groceryList = await Grocery.getAll();
        res.json(groceryList);
    } catch (e) {
        next(e);
    }
  })
  
  .post('/', async (req, res, next) => {
    try {
        const newGrocery = await Grocery.insert(req.body);
        res.json(newGrocery);
    } catch (e) {
        next(e);
    }
  });