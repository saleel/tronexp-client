import axios from 'axios';
import store from 'store';

const apiInstance = axios.create({
  baseURL: process.env.API_URL || '',
  timeout: 20000,
});

const API = {
  async getBlocks(limit = 20, skip = 0) {
    const response = await apiInstance.get('/blocks', {
      params: { limit, skip },
    });
    return response.data;
  },

  async getTransactions(limit = 20, skip = 0) {
    const response = await apiInstance.get('/transactions', {
      params: { limit, skip },
    });
    return response.data;
  },

  async getBlock(blockId) {
    const response = await apiInstance.get(`/blocks/${blockId}`);
    return response.data;
  },

  async getTransaction(hash) {
    const response = await apiInstance.get(`/transactions/${hash}`);
    return response.data;
  },

  async getWitnesses(count = 20) {
    const response = await apiInstance.get('/witnesses', {
      params: { limit: count },
    });
    return response.data;
  },

  async getNodes(count = 20) {
    const response = await apiInstance.get('/nodes', {
      params: { limit: count },
    });
    return response.data;
  },

  async getAccounts(count = 20) {
    const response = await apiInstance.get('/accounts', {
      params: { limit: count },
    });
    return response.data;
  },

  async getAccount(address) {
    const response = await apiInstance.get(`/accounts/${address}`);
    return response.data;
  },

  async getTokens(count = 20) {
    const response = await apiInstance.get('/tokens', {
      params: { limit: count },
    });
    return response.data;
  },

  async getTicker() {
    const response = await axios.get('https://api.coinmarketcap.com/v2/ticker/1958/');
    const usd = response.data.data.quotes.USD;
    return {
      price: usd.price.toFixed(4),
      volume24: `$${(usd.volume_24h / 1000000).toFixed(2)}M`,
      percent24: usd.percent_change_24h,
    };
  },

  async getHistoricalPrice() {
    const response = await axios.get('https://min-api.cryptocompare.com/data/histoday?fsym=TRX&tsym=USD&limit=10&aggregate=1&e=Bitfinex');
    const data = response.data.Data;
    return data.slice(data.length - 7);
  },

  async saveWallet(wallet) {
    store.set('wallet', wallet);
    return true;
  },

  async getWallet() {
    return store.get('wallet');
  },
};

export default API;