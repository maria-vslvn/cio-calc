require('dotenv').config();

module.exports = {
  APP_API_CASH_IN: `${process.env.APP_API_ENTRYPOINT}/cash-in`,
  APP_API_CASH_OUT_IND: `${process.env.APP_API_ENTRYPOINT}/cash-out-natural`,
  APP_API_CASH_OUT_LEGAL: `${process.env.APP_API_ENTRYPOINT}/cash-out-juridical`,
};
