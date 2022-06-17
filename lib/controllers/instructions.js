const { Router } = require('express');
const Instruction = require('../models/Instructions');
const { update } = require('../models/Measurements');
const pool = require('../utils/pool');

module.exports = Router()
  .get('/', async (req, res, next) => {
    try {
      const instructionList = await Instruction.getAll();
      res.json(instructionList);
    } catch(e) {
      next(e);
    }
  });