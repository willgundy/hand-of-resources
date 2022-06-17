const { Router } = require('express');
const Instruction = require('../models/Instructions');
const { update } = require('../models/Measurements');
const pool = require('../utils/pool');

module.exports = Router()
  .get('/:id', async (req, res, next) => {
    try {
      const id = req.params.id;
      const singleInstruction = await Instruction.getInstructionById(id);
      res.json(singleInstruction);
    } catch(e) {
      next(e);
    }
  })

  .get('/', async (req, res, next) => {
    try {
      const instructionList = await Instruction.getAll();
      res.json(instructionList);
    } catch(e) {
      next(e);
    }
  })
  
  .post('/', async(req, res, next) => {
    try {
      const newInstruction = await Instruction.insert(req.body);
      res.json(newInstruction);
    } catch(e) {
      next(e);
    }
  })
  
  .put('/:id', async(req, res, next) => {
    try {
      const id = req.params.id
      const updatedInstruction = await Instruction.updateInstruction(id, req.body);
      res.json(updatedInstruction);
    } catch(e) {
      next(e);
    }
  })
  
  .delete('/:id', async(req, res, next) => {
    try {
      const id = req.params.id
      const deletedInstruction = await Instruction.delete(id);
      res.json(deletedInstruction);
    } catch(e) {
      next(e);
    }
  });