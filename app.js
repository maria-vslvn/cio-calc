const fs = require('fs');
const { handleTransactionFeeCalculate } = require('./src/services/feeCalculator');

const readFile = (filePath) => {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error while reading file:', err);
    return [];
  }
};

const handleProcess = (inputFile) => {
  const transactions = readFile(inputFile);
  const fees = transactions.map((transaction) => handleTransactionFeeCalculate(transaction));
  fees.forEach((fee) => console.log(fee.toFixed(2)));
};

const inputData = process.argv[2];

if (!inputData) {
  console.error('Error: Please provide valid file path');
  process.exit(1);
}

handleProcess(inputData);
