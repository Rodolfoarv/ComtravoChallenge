const request = require('supertest')
beforeEach(() => {
  jest.resetModules()
})

it('Should return an array containing flights', async function (done) {
  jest.mock('../../src/apiServices/flightsService', () => ({
    filterFlights: jest.fn(async () => {
      return []
    })
  }))
  const app = require('../../src/app')
  const res = await request(app)
    .get('/api/flights')

  expect(res).toHaveProperty('status', 200)
  expect(res).toHaveProperty('text', '{"flightsResult":[]}')
  done()
})

it('Should return server error 500', async function (done) {
  jest.mock('../../src/apiServices/flightsService', () => ({
    filterFlights: jest.fn(async () => {
      throw new Error('Mock error')
    })
  }))
  const app = require('../../src/app')
  const res = await request(app)
    .get('/api/flights')

  expect(res).toHaveProperty('status', 500)
  expect(res).toHaveProperty('text', '{"status":"error","message":"Mock error"}')
  done()
})
