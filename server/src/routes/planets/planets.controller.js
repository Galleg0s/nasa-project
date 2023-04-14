const { getAllPlanets, getPlanet }  = require('../../models/planets.model');

const httpGetAllPlanets = (req, res) => {   
    return res.status(200).json(getAllPlanets());
}

const httpGetPlanet = (req, res) => {
    const planetId = req.params.id;

    return res.status(200).json(getPlanet(planetId));
}

module.exports = {
    httpGetAllPlanets,
    httpGetPlanet
}