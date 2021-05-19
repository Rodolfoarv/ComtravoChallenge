const request = require('supertest')

const app = require('../src/app')

describe('GET API NOT FOUND /api/notfound', function () {
  it('should return 404', function (done) {
    request(app)
      .get('/api/notfound')
      .expect(404, done)
  })
})
