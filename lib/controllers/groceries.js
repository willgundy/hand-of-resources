const { Router } = require('express');
const Grocery = require('../models/Groceries');
const { update } = require('../models/Measurements');

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
  })
  
  .put('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const updatedGrocery = await Grocery.updateById(id, req.body);
        res.json(updatedGrocery);
    } catch (e) {
        next(e);
    }
  })
  
  .delete('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const deletedGrocery = await Grocery.delete(id);
        res.json(deletedGrocery);
    } catch (e) {
        next(e);
    }
  });