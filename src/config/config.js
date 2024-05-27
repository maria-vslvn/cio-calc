const axios = require('axios');
const { APP_API_CASH_IN, APP_API_CASH_OUT_IND, APP_API_CASH_OUT_LEGAL } = require('../constantsCIOCalc/apiPaths');

const cache = {};

async function fetchConfig(url) {
  if (cache[url]) return cache[url];

  try {
    const response = await axios.get(url);
    cache[url] = response.data;
    return response.data;
  } catch (error) {
    console.error(`Error in ${url}:`, error.message);
    throw error;
  }
}

const fetchCashInConfig = function fetchCashInConfig() {
  return fetchConfig(APP_API_CASH_IN);
};

const fetchCashOutNaturalConfig = function fetchCashOutNaturalConfig() {
  return fetchConfig(APP_API_CASH_OUT_IND);
};

const fetchCashOutLegalConfig = function fetchCashOutLegalConfig() {
  return fetchConfig(APP_API_CASH_OUT_LEGAL);
};

module.exports = {
  fetchCashInConfig,
  fetchCashOutNaturalConfig,
  fetchCashOutLegalConfig,
};
