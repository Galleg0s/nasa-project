const request = require('supertest');
const app = require('../../app');

describe('Test GET /launches', () => {
    test('It should respond with 200 success', async () => {
        const response = await request(app).get('/launches').expect(200).expect('Content-Type', /json/);
    });
});

describe('Test POST /launches', () => {
    test('It should respond with 201 success', async () => {
        const completeLaunchData = {
            mission: 'Kepler Exploration X', 
            rocket: 'Explorer IS1',
            launchDate: 'January 1, 2036',
            target: 'Kepler-442 n',
        };

        const response = await request(app)
        .post('/launches')
        .send(completeLaunchData)
        .expect(201).expect('Content-Type', /json/);

        expect(response.body).toMatchObject({
            mission: 'Kepler Exploration X', 
            rocket: 'Explorer IS1',
            target: 'Kepler-442 n',
        });

        const requestDate = new Date(completeLaunchData.launchDate).valueOf();
        const responseDate = new Date(response.body.launchDate).valueOf();

        expect(responseDate).toBe(requestDate);
    });

    test('It should respond with an error if the launch date is invalid', async () => {
        const invalidDateLaunch = {
            mission: 'Kepler Exploration X', 
            rocket: 'Explorer IS1',
            launchDate: 'J 01 2015',
            target: 'Kepler-442 n',
        };

        const response = await request(app)
        .post('/launches')
        .send(invalidDateLaunch)
        .expect(400).expect('Content-Type', /json/);

        expect(response.body).toStrictEqual({error: 'Invalid launch date'});
    });

    
    test('It should respond with an error if the required fields are missing', async () => {
        const missingFieldsLaunch = {};

        const response = await request(app)
        .post('/launches')
        .send(missingFieldsLaunch)
        .expect(400).expect('Content-Type', /json/);

        expect(response.body).toStrictEqual({error: 'Missing required launch property'});
    });
});

describe('Test DELETE /launches', () => {
    test('It should respond with 200 success', async () => {
        const response = await request(app).delete('/launches/100').expect(200);
    }); 

    test('It should respond with an error if and 404 status code if launch does not exist', async () => {
        const response = await request(app).delete('/launches/100000').expect(404);

        
        expect(response.body).toStrictEqual({error: 'Launch not found'});
    }); 
});