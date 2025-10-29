// src/config/api.js

// CoinGecko - Free tier (no API key required)
// For higher rate limits, optionally set VITE_COINGECKO_API_KEY in .env
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

// News APIs
// CryptoPanic - Real crypto news (Free, no API key needed for basic access)
export const CryptoPanic = {
  news: () => 'https://cryptopanic.com/api/v1/posts/?auth=null&kind=news&public=true&limit=20',
};

// NewsAPI - Alternative news source (requires API key)
export const NewsAPI = {
  news: () => 'https://newsapi.org/v2/everything?q=cryptocurrency&sortBy=publishedAt&language=en&pageSize=20',
};

// ALTERNATIVE API ENDPOINTS (Optional - for switching providers)
// CoinPaprika (Free alternative, no API key needed)
export const CoinPaprika = {
  coinList: () => 'https://api.coinpaprika.com/v1/coins',
  coinMarkets: () => 'https://api.coinpaprika.com/v1/tickers?quotes=USD&limit=100',
  historicalChart: (id, days) => `https://api.coinpaprika.com/v1/coins/${id}/ohlcv/historical?quotes=USD&limit=${days}`,
};

// CryptoCompare (Free tier: 100k calls/day)
export const CryptoCompare = {
  coinList: () => 'https://api.cryptocompare.com/data/top/mktcapfull?limit=100&tsym=USD&api_key=YOUR_KEY',
  historicalChart: (id, days) => `https://api.cryptocompare.com/data/v2/histoday?fsym=${id}&tsym=USD&limit=${days}`,
};