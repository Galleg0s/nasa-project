const mongoose = require('mongoose');

const MONGO_URL = "mongodb+srv://nasa-api:TF4934oo22964@cluster0.hxzpmk2.mongodb.net/nasa?retryWrites=true&w=majority";

mongoose.connection.on('open', () => {
    console.log('MongoDB connection ready');
});

mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection failed:', err);
});

async function mongoConnect() {
    await mongoose.connect(MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => console.log('Connected!'));
}
async function mongoDisconnect() {
    await mongoose.disconnect()
}

module.exports = {
    mongoConnect,
    mongoDisconnect
};