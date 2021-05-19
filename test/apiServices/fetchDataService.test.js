beforeEach(() => {
  jest.resetModules()
  process.env.API_TIMEOUT = 20
})

const mockText = JSON.stringify(require('./mockData/result.json'))

describe('Testing Fetching Data Service', () => {
  describe('fetchData() function', () => {
    it('Should return a flight list from comtravo API', async () => {
      jest.mock('superagent', () => ({
        get: jest.fn(() => {}).mockReturnThis(),
        set: jest.fn(async () => {
          return new Promise(resolve => setTimeout(() => resolve({ status: 200, text: mockText }), 0))
        })
      }))
      const fetchDataService = require('../../src/apiServices/fetchDataService')

      const result = await fetchDataService.fetchData('URL')
      expect(result.length).toBe(12)
    })

    it('Should return null when server returns 401', async () => {
      jest.mock('superagent', () => ({
        get: jest.fn(() => {}).mockReturnThis(),
        set: jest.fn(async () => {
          const err = new Error('test')
          err.status = 401
          return new Promise((resolve, reject) => setTimeout(() => reject(err), 0))
        })
      }))
      const fetchDataService = require('../../src/apiServices/fetchDataService')

      const result = await fetchDataService.fetchData('URL')
      expect(result).toBe(null)
    })

    it('Should return null when server returns 403', async () => {
      jest.mock('superagent', () => ({
        get: jest.fn(() => {}).mockReturnThis(),
        set: jest.fn(async () => {
          const err = new Error('Test error')
          err.status = 403
          return new Promise((resolve, reject) => setTimeout(() => reject(err), 0))
        })
      }))
      const fetchDataService = require('../../src/apiServices/fetchDataService')

      const result = await fetchDataService.fetchData('URL')
      expect(result).toBe(null)
    })

    it('Should return null when server returns 404', async () => {
      jest.mock('superagent', () => ({
        get: jest.fn(() => {}).mockReturnThis(),
        set: jest.fn(async () => {
          const err = new Error('Test error')
          err.status = 404
          return new Promise((resolve, reject) => setTimeout(() => reject(err), 0))
        })
      }))
      const fetchDataService = require('../../src/apiServices/fetchDataService')

      const result = await fetchDataService.fetchData('URL')
      expect(result).toBe(null)
    })

    it('Should throw an error if it was not a handled one', async () => {
      jest.mock('superagent', () => ({
        get: jest.fn(() => {}).mockReturnThis(),
        set: jest.fn(async () => {
          return new Promise((resolve, reject) => setTimeout(() => reject(new Error('Generic Error')), 0))
        })
      }))
      const fetchDataService = require('../../src/apiServices/fetchDataService')

      await expect(fetchDataService.fetchData('URL'))
        .rejects
        .toThrow('Generic Error')
    })
  })
})
