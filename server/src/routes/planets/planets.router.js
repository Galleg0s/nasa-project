const express = require('express');	
const { 
    getAllPlanets,
    getPlanet
 } = require('./planets.controller.js');

const planetsRouter = express.Router();

planetsRouter.get('/planets', getAllPlanets);
planetsRouter.get('/planets/:id', getPlanet);

module.exports = planetsRouter;