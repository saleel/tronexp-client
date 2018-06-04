import axios from 'axios';
import store from 'store';
import {
  privateKeyToAddress,
  getBase58CheckAddressFromPriKeyBase64String,
  signTransaction,
} from '@tronprotocol/wallet-api/src/utils/crypto';
import { buildFreezeBalance } from '@tronprotocol/wallet-api/src/utils/transaction';
import { base64DecodeFromString } from '@tronprotocol/wallet-api/src/utils/bytes';

const apiInstance = axios.create({
  baseURL: process.env.API_URL || '',
  timeout: 20000,
});

const API = {
  async getBlocks(params = { limit: 20, skip: 0 }) {
    const response = await apiInstance.get('/blocks', {
      params,
    });
    return response.data;
  },

  async getTransactions(params = { limit: 20, skip: 0 }) {
    const response = await apiInstance.get('/transactions', {
      params: {
        ...params,
      },
    });
    return response.data;
  },

  async getTransfers(params = { limit: 20, skip: 0 }) {
    const response = await apiInstance.get('/transactions', {
      params: {
        ...params,
        contractType: ['TRANSFERASSETCONTRACT', 'TRANSFERCONTRACT'],
      },
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

  async getMarketData(count = 10) {
    const response = await apiInstance.get('/markets', {
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

  async getHistoricalPrice(days = 7) {
    const response = await axios.get(`https://min-api.cryptocompare.com/data/histoday?fsym=TRX&tsym=USD&limit=${days}&aggregate=1&e=Bitfinex`);
    const data = response.data.Data;
    return data.slice(data.length - days);
  },

  saveWallet(privateKey) {
    const address = privateKeyToAddress(privateKey);
    if (!address) {
      return alert('Invalid Private Key');
    }
    store.set('wallet', { key: privateKey, address });
    return this.getWallet();
  },

  getWallet() {
    return store.get('wallet');
  },

  removeWallet() {
    store.remove('wallet');
    return true;
  },
};

// const t = getBase58CheckAddressFromPriKeyBase64String('27IQVTW4LJEVUM8RWYCS9DU5BPLIMHACHDU');
// console.log(t);
// const a = buildFreezeBalance(t, 1000);
// console.log(a);
// const com_priKeyBytes = base64DecodeFromString(store.get('wallet').key);
// console.log(com_priKeyBytes);
// const s = signTransaction(com_priKeyBytes, a);
// console.log(s);

export default API;
