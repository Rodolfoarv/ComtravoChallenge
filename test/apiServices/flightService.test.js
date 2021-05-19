beforeEach(() => {
  jest.resetModules();
});

const mockFirstEndpoint = JSON.stringify(
  require('./mockData/firstRequest.json')
);
const mockSecondEndpoint = JSON.stringify(
  require('./mockData/secondRequest.json')
);

describe('getFlights() function', () => {
  it('Should return array of flights from endpoint 1 and endpoint 2', async () => {
    jest.mock('../../src/apiServices/fetchDataService', () => ({
      fetchData: jest
        .fn()
        .mockReturnValueOnce(Promise.resolve(mockFirstEndpoint))
        .mockReturnValueOnce(Promise.resolve(mockSecondEndpoint)),
    }));
    const flightsService = require('../../src/apiServices/flightsService');

    const flightsArray = await flightsService.getFlights();
    expect(flightsArray.length).toBe(2);
    expect(flightsArray[0]).toBe(mockFirstEndpoint);
    expect(flightsArray[1]).toBe(mockSecondEndpoint);
  });

  it('Should return null if the results exceed the timeout', async () => {
    jest.mock('../../src/apiServices/fetchDataService', () => ({
      fetchData: jest.fn(async () => {
        return new Promise((resolve) => setTimeout(() => resolve(null), 0));
      }),
    }));
    const flightsService = require('../../src/apiServices/flightsService');

    const result = await flightsService.getFlights();
    expect(result.length).toBe(2);
    expect(result).toStrictEqual([null, null]);
  });
});

describe('filterFlights()', () => {
  it('Should filter the results from both endpoints', async () => {
    jest.mock('../../src/apiServices/fetchDataService', () => ({
      fetchData: jest
        .fn()
        .mockReturnValueOnce(Promise.resolve([1, 2, 3, 5, 7, 9, 10]))
        .mockReturnValueOnce(Promise.resolve([3, 4, 6, 7, 8, 10])),
    }));
    const flightsService = require('../../src/apiServices/flightsService');

    const result = await flightsService.filterFlights();
    expect(result.length).toBe(10);
    expect(result).toStrictEqual([1,2,3,5,7,9,10,4,6,8]);
  });

  it('Should filter flights with one endpoint having a timeout error', async () => {
    jest.mock('../../src/apiServices/fetchDataService', () => ({
      fetchData: jest
        .fn()
        .mockReturnValueOnce(Promise.resolve(null))
        .mockReturnValueOnce(Promise.resolve([1, 2, 7])),
    }));
    const flightsService = require('../../src/apiServices/flightsService');

    const result = await flightsService.filterFlights();
    expect(result.length).toBe(3);
    expect(result).toStrictEqual([1, 2, 7]);
  });
});
