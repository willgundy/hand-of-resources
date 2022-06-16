const { Router } = require('express');
const Measurement = require('../models/Measurements');

module.exports = Router()
  .get('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const singleMeasurement = await Measurement.getMeasurementById(id);
        res.json(singleMeasurement);
    } catch (e) {
        next(e);
    }
  })

  .get('/', async (req, res, next) => {
    try {
        const measurementList = await Measurement.getAll();
        res.json(measurementList);
    } catch (e) {
        next(e);
    }
  })
  
  .post('/', async (req, res, next) => {
    try {
        const newMeasurement = await Measurement.insert(req.body);
        res.json(newMeasurement);
    } catch (e) {
        next(e);
    }
  })
  
  .put('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const updatedMeasurement = await Measurement.update(id, req.body);
        res.json(updatedMeasurement);
    } catch (e) {
        next(e);
    }
  });