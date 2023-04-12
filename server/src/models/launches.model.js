// launchDate
// missonName
// rockerType
// destinationExplanet
// flightNumber
// customers

  
const launches = new Map();

const launch = {
    misson: 'Kepler Exploration X', 
    rocketName: 'Explorer IS1',
    date: new Date('March 25, 2030'),
    destination: 'Kepler-442 n',
    flightNumber: 100,
    customers: ['ZTM', 'NASA'],
    upcoming: true,
    success: true,
}

launches.set(launch.flightNumber, launch);

module.exports = {
    launches
}