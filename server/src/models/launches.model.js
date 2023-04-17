const launchesDatabase = require('./launches.mongo');
const planets = require('./planets.mongo');

const launches = new Map();

const DEFAULT_FLIGHT_NUMBER = 0;

const launch = {
    flightNumber: 100,
    mission: 'Kepler Exploration X', 
    rocket: 'Explorer IS1',
    launchDate: new Date('March 25, 2030'),
    target: 'Kepler-442 b',
    customers: ['ZTM', 'NASA'],
    upcoming: true,
    success: true,
}

// launches.set(launch.flightNumber, launch);


try {
    saveLaunch(launch);
} catch(err) {
    console.error(err);
}

async function existLaunchWithId(launchId) {
    return await launchesDatabase.findOne({
        flightNumber: launchId
    })
}

async function getLatestFlightNumber() {
    const latestLaunch = await launchesDatabase
    .findOne({})
    .sort('-flightNumber');

    if (!latestLaunch) {
        return DEFAULT_FLIGHT_NUMBER;
    }

    return latestLaunch.flightNumber
}
 
async function getAllLaunches() {
    return await launchesDatabase
    .find({}, {'_id': 0, '__v': 0})
}

async function saveLaunch(launch) {
    const planet = await planets.findOne({
        keplerName: launch.target
    });

    if (!planet) {
        throw new Error('No matching planet was found')
    }


    await launchesDatabase.findOneAndUpdate({
        flightNumber: launch.flightNumber,
    }, launch, {
        upsert: true
    })
}

function getLaunch(id) {
    console.log('launches.get(id)', launches.get(id))
    return launches.get(id);
}

async function scheduleNewLaunch(launch) {
    const newFlightNumber = await getLatestFlightNumber() + 1;

    const newLaunch = Object.assign(launch, {
        customers: ['ZTM', 'NASA'],
        upcoming: true,
        success: true,
        flightNumber:  newFlightNumber,
    });

    await saveLaunch(newLaunch);
}

// function abortLaunch(id) {
//     const aborted = launches.get(id);
//     aborted.upcoming = false;
//     aborted.success = false;
//     return aborted;
// }


async function abortLaunch(launchId) {
    const aborted = await launchesDatabase.updateOne({
        flightNumber: launchId,
    }, {
        success: false,
        upcoming: false
    })

    console.log(aborted);
    return aborted.acknowledged && aborted.modifiedCount === 1;
}

module.exports = {
    existLaunchWithId,
    getAllLaunches,
    getLaunch,
    scheduleNewLaunch,
    abortLaunch
}