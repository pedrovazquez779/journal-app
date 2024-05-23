import 'whatwg-fetch';

require('dotenv').config({
    path: '.env.test'
});

// Basically, during testing (which runs in node), we are mocking the getEnvironments and returning
// the env vars from node (which will also contain the ones that we load from .env.test)
jest.mock('./src/helpers/getEnvironments', () => ({
    getEnvironments: () => ({...process.env}),
}));
