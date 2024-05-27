# CIOCalc

#### This Node.js application for commission fees calculation for cash-in and cash-out transactions for individuals and legal entities.

## How to Run

Clone the repository to your local machine using the following command:

```bash
git clone https://github.com/maria-vslvn/cio-calc.git
```

1. Ensure you have Node.js installed. If Node.js is not installed, download and install it from [Node.js official website](https://nodejs.org/).
2. Install dependencies:

   ```bash
   npm install

3. Run the application with the input JSON file:

    ```bash
    npm start

## How to Run Tests

### Install dependencies if not installed

1. Install dependencies (if not already installed):

    ```bash
    npm install

2. Run the tests:

    ```bash
    npm test

## How to Run ESlint

### Install dependencies if not installed)
1. Install dependencies (if not already installed):

    ```bash
    npm install

2. Run the tests:

    ```bash
    npm run lint

# Description
- ##### feeCalculator.js:
  Contains functions to calculate cash in and cash out commissions.
- ##### config.js:
  Contains handlers for fetching each type of configs.
- ##### app.js:
  Main application file that reads input data, processes each operation, and outputs the commission fees.

- ##### Commission Fees
  - Cash In: 0.03% of the total amount, but no more than 5.00 EUR.
  - Cash Out (Individuals): 0.3% of the amount, with the first 1000.00 EUR per week free of charge.
  - Cash Out (Legal Entities): 0.3% of the amount, but not less than 0.50 EUR per operation.


### Environment Configuration

The application requires specific environment variables to run properly. These variables contain sensitive information and should not be exposed in public repositories.

#### Steps to Configure Environment Variables:

- Copy the `.env.example` file in the root of the project.

- Rename the copied file to `.env`.

- Replace the mocked values with valid values for each variable.

## Contributing

Contributions are welcome! If you have suggestions for improving the application, please fork the repository and submit a pull request, or open an issue with the tags "enhancement" or "bug".
