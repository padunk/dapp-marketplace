# DApp - Marketfair

![DApp Marketfair Screencast](https://github.com/padunk/dapp-marketplace/blob/main/public/dapp-marketfair.gif?raw=true)

## Pre-requisite

-   Metamask (Chrome based extension)
-   NodeJS > 10

## Installation

1. Clone the repo.
2. `npm install` or `yarn`.
3. Run `npx ganache-cli -m surround forum marriage quarter jazz october must purchase seven height volume nation`. This will run a local server at port 8545.
4. Open new window and run `truffle migrate` to deploy the contract.
5. Run `npm run dev` or `yarn dev`. This will run a local frontend server at port 3000.
6. Import the first three account from ganache in your Metamask.
    - Account-1: act as Deployer
    - Account-2: act as Seller
    - Account-3: act as Buyer
