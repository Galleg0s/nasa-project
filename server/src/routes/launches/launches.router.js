const express = require('express');
const {
    getAllLaunches,
    getLaunch
} = require('./launches.controller.js');

const launchesRouter = express.Router();

launchesRouter.get('/launches', getAllLaunches);
launchesRouter.get('/launches:id', getLaunch);

module.exports = launchesRouter;