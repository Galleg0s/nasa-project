const { planets }  = require('../../models/planets.model');

const getAllPlanets = (req, res) => {   
    return res.status(200).json(planets);
}

const getPlanet = (req, res) => {
    const planetId = req.params.id;

    return res.status(200).json(planets[id]);
}

module.exports = {
    getAllPlanets,
    getPlanet
}