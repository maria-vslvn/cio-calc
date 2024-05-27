const { handleTransactionFeeCalculate } = require('./feeCalculator');

describe('Transaction Processing', () => {
  describe('Cash In Transactions', () => {
    it('calculates the correct fee for cash in transactions', () => {
      const transaction = {
        type: 'cash_in',
        operation: { amount: 200.0 },
      };
      const fee = handleTransactionFeeCalculate(transaction);
      expect(fee).toBe(0.06);
    });
  });

  describe('Cash Out Transactions for Juridical Users', () => {
    it('calculates the minimum fee correctly for juridical users', () => {
      const transaction = {
        type: 'cash_out',
        user_type: 'juridical',
        operation: { amount: 300.0 },
      };
      const fee = handleTransactionFeeCalculate(transaction);
      expect(fee).toBe(0.9);
    });
  });

  describe('Cash Out Transactions for Natural Users', () => {
    it('calculates no fee for a natural user under the free limit', () => {
      const transaction = {
        type: 'cash_out',
        user_type: 'natural',
        date: '2020-01-01',
        user_id: 1,
        operation: { amount: 1000.0 },
      };
      const fee = handleTransactionFeeCalculate(transaction);
      expect(fee).toBe(0.0);
    });

    it('calculates the correct fee for a natural user over the free limit within a single week', () => {
      const transaction1 = {
        type: 'cash_out',
        user_type: 'natural',
        date: '2020-01-01',
        user_id: 1,
        operation: { amount: 1000.0 },
      };
      const transaction2 = {
        type: 'cash_out',
        user_type: 'natural',
        date: '2020-01-01',
        user_id: 1,
        operation: { amount: 100.0 },
      };
      handleTransactionFeeCalculate(transaction1);
      const fee = handleTransactionFeeCalculate(transaction2);
      expect(fee).toBe(0.3);
    });
  });
});
