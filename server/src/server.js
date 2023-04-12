const http = require('http');
const app = require('./app');
const { loadPlanetsData } = require('./models/planets.model');

const PORT = process.env.PORT || 8000;

// This set up allows us to use different types of connections, such as Web Sockets
const server = http.createServer(app);

const startServer = async () => {
    // Load data before starting the server
    await loadPlanetsData();
    
    server.listen(PORT, () => {
        console.log('Listening on port', PORT);
    });
};

startServer();
 
// const express = require('express');
// const app = express();
// const PORT = process.env.PORT || 8000;

// app.listen(PORT);

 
 