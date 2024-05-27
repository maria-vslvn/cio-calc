const { getISOWeek, getISOWeekYear, parseISO } = require('date-fns');

// CASH IN - CI
// CASH OUT - CO

const CI_FEE_PERCENT = 0.03;
const CI_MAX_FEE = 5;
const CO_JUR_FEE = 0.3;
const CO_MIN_FEE = 0.5;
const WEEK_LIMIT = 1000;

// Weekly CO amounts storage for individuals
const weeklyCOAmount = {};

const roundUp = (value) => Math.ceil(value * 100) / 100;
const getWeekOfYear = (date) => `${getISOWeekYear(parseISO(date))}-${getISOWeek(parseISO(date))}`;

const getCIFee = (amount) => roundUp(Math.min((amount * CI_FEE_PERCENT) / 100, CI_MAX_FEE));
const getCOJurFee = (amount) => roundUp(Math.max((amount * CO_JUR_FEE) / 100, CO_MIN_FEE));
const getCOIndFee = (amount, date, userId) => {
  const week = getWeekOfYear(date);

  if (!weeklyCOAmount[userId]) {
    weeklyCOAmount[userId] = {};
  }
  if (!weeklyCOAmount[userId][week]) {
    weeklyCOAmount[userId][week] = 0;
  }

  weeklyCOAmount[userId][week] += amount;

  if (weeklyCOAmount[userId][week] > WEEK_LIMIT) {
    const taxableAmount = Math.min(weeklyCOAmount[userId][week] - WEEK_LIMIT, amount);
    return roundUp((taxableAmount * 0.3) / 100);
  }
  return 0;
};

const handleTransactionFeeCalculate = (transaction) => {
  switch (transaction.type) {
    case 'cash_in':
      return getCIFee(transaction.operation.amount);
    case 'cash_out':
      if (transaction.user_type === 'natural') {
        return getCOIndFee(
          transaction.operation.amount,
          transaction.date,
          transaction.user_id,
        );
      }
      if (transaction.user_type === 'juridical') {
        return getCOJurFee(transaction.operation.amount);
      }
      break;
    default:
      console.error(`Unknown transaction type: ${transaction.type}`);
  }
  return null;
};

module.exports = {
  handleTransactionFeeCalculate,
};
