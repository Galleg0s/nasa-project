const { getAllLaunches, getLaunch, addNewLaunch, abortLaunch, existLaunchWithId } = require('../../models/launches.model.js');


function httpGetAllLaunches(req, res) {
    return res.status(200).json(getAllLaunches());
}

function httpAddNewLaunch(req, res) {
    const launch = req.body;
    launch.launchDate = new Date(launch.launchDate);

    if(!launch.mission || !launch.rocket || !launch.launchDate || !launch.target) {
        return res.status(400).json({
            error: 'Missing required launch property',
        });
    }

    if(isNaN(launch.launchDate)) {
        return res.status(400).json({
            error: 'Invalid launch date',
        })
    }

 
    addNewLaunch(launch);
    return res.status(201).json(launch);
}


function httpAbortLaunch(req, res) {
    const launchId = Number(req.params.id);

    if (existLaunchWithId(launchId)) {
        const result = abortLaunch(launchId);
        return res.status(200).json(result);
    } else {
        return res.status(404).json({error: 'Launch not found'});
    }
}


module.exports = {
    httpGetAllLaunches,
    httpAddNewLaunch,
    httpAbortLaunch
}