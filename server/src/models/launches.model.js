const launches = new Map();
let latestFlightNumber = 100;

const launch = {
    flightNumber: 100,
    mission: 'Kepler Exploration X', 
    rocket: 'Explorer IS1',
    launchDate: new Date('March 25, 2030'),
    target: 'Kepler-442 n',
    customers: ['ZTM', 'NASA'],
    upcoming: true,
    success: true,
}

launches.set(launch.flightNumber, launch);

function existLaunchWithId(launchId) {
    return launches.has(launchId);
}
 
function getAllLaunches() {
    return Array.from(launches.values());
}

function getLaunch(id) {
    console.log('launches.get(id)', launches.get(id))
    return launches.get(id);
}

function addNewLaunch(launch) {
    latestFlightNumber++;
    launches.set(latestFlightNumber, Object.assign(launch, {
        flightNumber: latestFlightNumber,
        customers: ['ZTM', 'NASA'],
        upcoming: true,
        success: true
    }));
}

function abortLaunch(id) {
    const aborted = launches.get(id);
    aborted.upcoming = false;
    aborted.success = false;
    return aborted;
}

module.exports = {
    existLaunchWithId,
    getAllLaunches,
    getLaunch,
    addNewLaunch,
    abortLaunch
}