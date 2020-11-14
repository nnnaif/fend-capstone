const request = require('supertest');
const app = require('../src/server/app');

describe('Express server tests', () => {
  test('GET root should return an html page', (done) => {
    request(app)
      .get('/')
      .then((res) => {
        expect(res.statusCode).toBe(200);
        done();
      });
  });
});
