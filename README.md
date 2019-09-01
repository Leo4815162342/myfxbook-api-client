<p align="center"><img width="150" src="https://github.com/Leo4815162342/myfxbook-api-client/blob/master/myfxbook-api-client-logo.png?raw=true" alt="dukascopy-node"></p>

<h1 align="center">Myfxbook API Client</h1>

<p align="center">
  <a href="https://api.travis-ci.org/Leo4815162342/dukascopy-node.svg?branch=master"><img src="https://api.travis-ci.org/Leo4815162342/dukascopy-node.svg?branch=master" alt="Build Status"></a>
  <a href="https://github.com/facebook/jest"><img src="https://img.shields.io/badge/tested_with-jest-99424f.svg" alt="dukascopy-node tested with jest"></a>
</p>

A Node.js client for working with Myfxbook API - https://www.myfxbook.com/api

## Installation

#### via npm:

```bash
npm install myfxbook-api-client --save
```

#### via yarn:

```bash
yarn add myfxbook-api-client
```

## Usage

#### require:

```javascript
const { MyfxbookApi } = require('myfxbook-api-client');

const client = new MyfxbookApi({ email: 'my@email.com', password: 'my_password' });
```

#### es6 import:

```javascript
import { MyfxbookApi } from 'myfxbook-api-client';

const client = new MyfxbookApi({ email: 'my@email.com', password: 'my_password' });
```

## Methods

### **`getMyAccounts()`**

Get list of all trading accounts

```javascript
const { MyfxbookApi } = require('myfxbook-api-client');

const client = new MyfxbookApi({ email: 'my@email.com', password: 'my_password' });

client
  .getMyAccounts()
  .then(data => {
    console.log(data.accounts);
  })
  .catch(error => ('error', error));
```

<details><summary>View sample response:</summary>
<p>
  
```json
{
  "error": false,
  "message": "",
  "accounts": [
    {
      "id": 12345,
      "name": "Holy Grail",
      "description": "Super duper MA+CCI trading system.",
      "accountId": 1013230,
      "gain": 8.92,
      "absGain": 8.92,
      "daily": "0.04",
      "monthly": "1.25",
      "withdrawals": 0,
      "deposits": 10000,
      "interest": 11.1,
      "profit": 892.45,
      "balance": 10892.45,
      "drawdown": 53.53,
      "equity": 10892.45,
      "equityPercent": 100,
      "demo": true,
      "lastUpdateDate": "03/01/2010 10:14",
      "creationDate": "08/06/2009 08:13",
      "firstTradeDate": "04/21/2008 12:18",
      "tracking": 21,
      "views": 549,
      "commission": 0,
      "currency": "USD",
      "profitFactor": 0.3,
      "pips": 81.2,
      "invitationUrl": "http://www.myfxbook.com/members/john101/anyone/347/SDa45X5TSkdIsXg8",
      "server": {
        "name": "Alpari UK"
      }
    }
  ]
}
```

</p>
</details>

### **`getWatchedAccounts()`**

Get list of all watched accounts

```javascript
const { MyfxbookApi } = require('myfxbook-api-client');

const client = new MyfxbookApi({ email: 'my@email.com', password: 'my_password' });

client
  .getWatchedAccounts()
  .then(data => {
    console.log(data.accounts);
  })
  .catch(error => ('error', error));
```

<details><summary>View sample response:</summary>
<p>
  
```json
{
  "error": false,
  "message": "",
  "accounts":  [
    {
    "name": "Holy Grail",
    "gain": 8.92,
    "drawdown": 53.53,
    "demo": true,
    "change": 1.53,
  }
  ]
}
```

</p>
</details>

### **`getOpenOrders(id)`**

Get all open orders for a given account

Arguments:

- `id` - id of a trading account

```javascript
const { MyfxbookApi } = require('myfxbook-api-client');

const client = new MyfxbookApi({ email: 'my@email.com', password: 'my_password' });

client
  .getOpenOrders(12345)
  .then(data => {
    console.log(data.openOrders);
  })
  .catch(error => ('error', error));
```

<details><summary>View sample response:</summary>
<p>
  
```json
{
 "error": false,
 "message": "",
 "openOrders":  [
    {
   "openTime": "03/01/2010 13:52",
   "symbol": "GBPUSD",
   "action": "Sell Limit",
   "sizing":    {
    "type": "lots",
    "value": "0.08"
   },
   "openPrice": 1.4932,
   "tp": 1.4882,
   "sl": 0,
   "comment":"Best trade ever"
  }
 ]
}
```

</p>
</details>

### **`getOpenTrades(id)`**

Get all open trades for a given account

Arguments:

- `id` - id of a trading account

```javascript
const { MyfxbookApi } = require('myfxbook-api-client');

const client = new MyfxbookApi({ email: 'my@email.com', password: 'my_password' });

client
  .getOpenTrades(12345)
  .then(data => {
    console.log(data.openTrades);
  })
  .catch(error => ('error', error));
```

<details><summary>View sample response:</summary>
<p>
  
```json
{
 "error": false,
 "message": "",
 "openOrders":  [
    {
   "openTime": "03/01/2010 13:52",
   "symbol": "GBPUSD",
   "action": "Sell Limit",
   "sizing":    {
    "type": "lots",
    "value": "0.08"
   },
   "openPrice": 1.4932,
   "tp": 1.4882,
   "sl": 0,
   "comment":"Best trade ever"
  }
 ]
}
```

</p>
</details>
