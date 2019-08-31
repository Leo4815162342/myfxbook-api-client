import MyfxbookApi from './myfxbook-api';
import * as fetch from 'node-fetch';
import url from 'url';
import querystring from 'querystring';

const MOCK_EMAIL = 'my@email.com';
const MOCK_PASSWORD = 'my_password';
const MOCK_SESSTION_ID = 'abcd1234';
const MOCK_RESPONSE = { error: false, message: '', session: MOCK_SESSTION_ID };
jest.mock('node-fetch', function fetchMock() {
  const mockFn = jest.fn();
  return mockFn.mockImplementation(() => {
    return Promise.resolve({
      text: () => JSON.stringify(MOCK_RESPONSE),
      json: () => MOCK_RESPONSE
    });
  });
});

const fetchSpy = jest.spyOn(fetch, 'default');

function getCalledUrls(fetchSpy: jest.SpyInstance) {
  return fetchSpy.mock.calls.map(item => url.parse(item[0] as string));
}

const publicMethodsMap = [
  {
    method: 'getMyAccounts',
    endpointPathname: '/api/get-my-accounts.json'
  },
  {
    method: 'getWatchedAccounts',
    endpointPathname: '/api/get-watched-accounts.json'
  },
  {
    method: 'getOpenTrades',
    endpointPathname: '/api/get-open-trades.json',
    args: [8888],
    params: { id: '8888' }
  },
  {
    method: 'getOpenOrders',
    endpointPathname: '/api/get-open-orders.json',
    args: [3333],
    params: { id: '3333' }
  },
  {
    method: 'getHistory',
    endpointPathname: '/api/get-history.json',
    args: [7777],
    params: { id: '7777' }
  },
  {
    method: 'getDailyGain',
    endpointPathname: '/api/get-daily-gain.json',
    args: [6666, '2019-02-01', '2019-02-07'],
    params: { id: '6666', start: '2019-02-01', end: '2019-02-07' }
  },
  {
    method: 'getGain',
    endpointPathname: '/api/get-gain.json',
    args: [5555, '2019-03-01', '2019-03-07'],
    params: { id: '5555', start: '2019-03-01', end: '2019-03-07' }
  },
  {
    method: 'getCommunityOutlook',
    endpointPathname: '/api/get-community-outlook.json'
  },
  {
    method: 'getCommunityOutlookByCountry',
    endpointPathname: '/api/get-community-outlook-by-country.json',
    args: ['eurusd'],
    params: { symbol: 'eurusd' }
  },
  {
    method: 'getDailyData',
    endpointPathname: '/api/get-data-daily.json',
    args: [4444, '2019-04-01', '2019-04-07'],
    params: { id: '4444', start: '2019-04-01', end: '2019-04-07' }
  }
];

afterEach(() => {
  jest.restoreAllMocks();
  fetchSpy.mockClear();
});

describe('Myfxbook API client', () => {
  const client = new MyfxbookApi({ email: MOCK_EMAIL, password: MOCK_PASSWORD });

  describe('Login', () => {
    it('Should call login first and only once (with right parameters)', async () => {
      await Promise.all([
        client.getMyAccounts(),
        client.getWatchedAccounts(),
        client.getCommunityOutlook()
      ]);

      const calledUrls = getCalledUrls(fetchSpy);

      // first call is login
      expect(calledUrls[0].pathname).toEqual('/api/login.json');

      // called only once
      expect(calledUrls.filter(url => url.pathname === '/api/login.json')).toHaveLength(1);

      // called with correct parameters
      expect(querystring.parse(calledUrls[0].query)).toEqual({
        email: MOCK_EMAIL,
        password: MOCK_PASSWORD
      });

      // 1 call to login endpoint + 3 calls for respective methods
      expect(calledUrls).toHaveLength(4);
    });
  });

  describe('Public methods (calls are fired to the correct endpoints with correct params)', () => {
    publicMethodsMap.forEach(item => {
      it(item.method, async () => {
        //@ts-ignore
        await client[item.method].apply(client, item.args);

        const calledUrls = getCalledUrls(fetchSpy);

        // called once
        expect(calledUrls).toHaveLength(1);

        // correct endpoint
        expect(calledUrls[0].pathname).toEqual(item.endpointPathname);

        // with correct parameters
        expect(querystring.parse(calledUrls[0].query)).toEqual({
          ...{ session: MOCK_SESSTION_ID },
          ...item.params
        });
      });
    });
  });
});
