const { getAllLaunches, getLaunch, scheduleNewLaunch, abortLaunch, existLaunchWithId } = require('../../models/launches.model.js');


async function httpGetAllLaunches(req, res) {
    return res.status(200).json(await getAllLaunches());
}

async function httpAddNewLaunch(req, res) {
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

 
    await scheduleNewLaunch(launch);
    return res.status(201).json(launch);
}


async function httpAbortLaunch(req, res) {
    const launchId = Number(req.params.id);
    const hasLaunch = await existLaunchWithId(launchId);

    if (!hasLaunch) {
        return res.status(404).json({error: 'Launch not found'});
    }


    const aborted = await abortLaunch(launchId);
    if (!aborted) {
        return res.status(400).json({
            error: 'Launch not aborted'
        });
    } else {
        return res.status(200).json({
            ok: true
        });
    }
   
}


module.exports = {
    httpGetAllLaunches,
    httpAddNewLaunch,
    httpAbortLaunch
}