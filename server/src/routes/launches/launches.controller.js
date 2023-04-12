const { launches } = require('../../models/launches.model.js');


function getAllLaunches(req, res) {
    return res.status(200).json(Array.from(launches.values()));
}

function getLaunch (req, res) {
    const launchId = req.params.id;

    return res.status(200).json(launches.get(launchId));
}

module.exports = {
    getAllLaunches,
    getLaunch
}