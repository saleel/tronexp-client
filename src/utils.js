import moment from 'moment';

function formatTime(date, formatter = 'lll') {
  const m = moment(date);
  if (!m.isValid()) {
    return '';
  }
  return m.format(formatter);
}

function formatCurrency(amount, decimals = 6) {
  if (!amount) {
    return 0;
  }

  const noDecimals = parseInt(amount.toString().split('.')[1], 10) === 0;
  const re = /(\d)(?=(\d{3})+(?:\.\d+)?$)/g;

  return parseFloat(amount)
    .toFixed(noDecimals ? 0 : decimals)
    .toString()
    .replace(new RegExp(re, 'g'), '$&,');
}

function isTransactionTransfer(trans = {}) {
  return ['TRANSFERASSETCONTRACT', 'TRANSFERCONTRACT'].includes(trans.contractType);
}

export { formatTime, formatCurrency, isTransactionTransfer };
