const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');
const { APP_API_CASH_IN, APP_API_CASH_OUT_IND, APP_API_CASH_OUT_LEGAL } = require('../constantsCIOCalc/apiPaths');
const { fetchCashInConfig, fetchCashOutNaturalConfig, fetchCashOutLegalConfig } = require('./config');

describe('API Config Service', () => {
  let mock;

  beforeEach(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.restore();
  });

  it('should fetch cash in configuration', async () => {
    const cashInConfig = {
      percents: 0.03,
      max: { amount: 5, currency: 'EUR' },
    };
    mock.onGet(APP_API_CASH_IN).reply(200, cashInConfig);
    const config = await fetchCashInConfig();
    expect(config).toEqual(cashInConfig);
  });

  it('should fetch cash out natural configuration', async () => {
    const cashOutNaturalConfig = {
      percents: 0.3,
      week_limit: { amount: 1000, currency: 'EUR' },
    };
    mock.onGet(APP_API_CASH_OUT_IND).reply(200, cashOutNaturalConfig);
    const config = await fetchCashOutNaturalConfig();
    expect(config).toEqual(cashOutNaturalConfig);
  });

  it('should fetch cash out legal configuration', async () => {
    const cashOutLegalConfig = {
      percents: 0.3,
      min: { amount: 0.5, currency: 'EUR' },
    };
    mock.onGet(APP_API_CASH_OUT_LEGAL).reply(200, cashOutLegalConfig);
    const config = await fetchCashOutLegalConfig();
    expect(config).toEqual(cashOutLegalConfig);
  });
});
