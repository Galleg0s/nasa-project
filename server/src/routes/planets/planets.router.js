const express = require('express');	
const { 
    httpGetAllPlanets,
    httpGetPlanet
 } = require('./planets.controller.js');

const planetsRouter = express.Router();

planetsRouter.get('/', httpGetAllPlanets);
planetsRouter.get('/:id', httpGetPlanet);

module.exports = planetsRouter;