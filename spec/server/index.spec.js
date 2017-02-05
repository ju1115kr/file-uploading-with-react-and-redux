const request = require('supertest');
const app = require('../../index');

describe('Server-Side', () => {
  it('shows the index page', (done) => {
    request(app)
      .get('/')
      .expect(200, done);
  });

  it('gets the 422 error status code when uploading a file of a restricted type', (done) => {
    request(app)
      .post('/upload')
      .attach('file', './spec/server/files/space-shuttle.pdf')
      .expect(422, done);
  });

  it('gets the 200 success status code when uploading a file of an allowed type', (done) => {
    request(app)
      .post('/upload')
      .attach('file', './spec/server/files/space-shuttle.jpg')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});
