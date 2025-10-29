// src/config/api.js
const API_KEY = import.meta.env.VITE_COINGECKO_API_KEY || '';

const getHeaders = () => {
  const headers = {};
  if (API_KEY) {
    headers['x-cg-demo-api-key'] = API_KEY;
  }
  return headers;
};

export const CoinList = (currency) =>
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`;

export const HistoricalChart = (id, days, currency) =>
    `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`;

export { getHeaders };