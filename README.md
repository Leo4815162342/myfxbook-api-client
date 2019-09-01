<h1 align="center">Myfxbook API Client</h1>

<p align="center"><img width="150" src="https://github.com/Leo4815162342/myfxbook-api-client/blob/master/myfxbook-api-client-logo.png?raw=true" alt="myfxbook-api-client"></p>

<p align="center">
  <a href="https://travis-ci.org/Leo4815162342/myfxbook-api-client"><img src="https://api.travis-ci.org/Leo4815162342/myfxbook-api-client.svg?branch=master" alt="Build Status"></a>
  <a href="https://github.com/facebook/jest"><img src="https://img.shields.io/badge/tested_with-jest-99424f.svg" alt="myfxbook-api-client tested with jest"></a>
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

> `email` and `password` are credentials to your myfxbook.com account

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
  .catch(error => {
    console.log('error', error);
  });
```

<details><summary>View sample response</summary>
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

---

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
  .catch(error => {
    console.log('error', error);
  });
```

<details><summary>View sample response</summary>
<p>
  
```json
{
  "error": false,
  "message": "",
  "accounts": [
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

---

### **`getOpenOrders(id)`**

Get all open orders for a given account

Arguments:

- `id` - _id of a trading account_

```javascript
const { MyfxbookApi } = require('myfxbook-api-client');

const client = new MyfxbookApi({ email: 'my@email.com', password: 'my_password' });

client
  .getOpenOrders(12345)
  .then(data => {
    console.log(data.openOrders);
  })
  .catch(error => {
    console.log('error', error);
  });
```

<details><summary>View sample response</summary>
<p>
  
```json
{
 "error": false,
 "message": "",
 "openOrders": [
  {
   "openTime": "03/01/2010 13:52",
   "symbol": "GBPUSD",
   "action": "Sell Limit",
   "sizing": {
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

---

### **`getOpenTrades(id)`**

Get all open trades for a given account

Arguments:

- `id` - _id of a trading account_

```javascript
const { MyfxbookApi } = require('myfxbook-api-client');

const client = new MyfxbookApi({ email: 'my@email.com', password: 'my_password' });

client
  .getOpenTrades(12345)
  .then(data => {
    console.log(data.openTrades);
  })
  .catch(error => {
    console.log('error', error);
  });
```

<details><summary>View sample response</summary>
<p>
  
```json
{
 "error": false,
 "message": "",
 "openTrades": [
    {
      "openTime": "03/01/2010 13:39",
      "symbol": "GBPUSD",
      "action": "Sell",
      "sizing":    {
        "type": "lots",
        "value": "0.01"
      },
      "openPrice": 1.4802,
      "tp": 1.4832,
      "sl": 0,
      "comment":"best trade ever",
      "profit": -10.8,
      "pips": -108,
      "swap": 0,
      "magic": 24129962
    }
  ]
}

````

</p>
</details>

---

### **`getHistory(id)`**

Get history of all trades for a given account

Arguments:

- `id` - _id of a trading account_

```javascript
const { MyfxbookApi } = require('myfxbook-api-client');

const client = new MyfxbookApi({ email: 'my@email.com', password: 'my_password' });

client
  .getHistory(12345)
  .then(data => {
    console.log(data.history);
  })
  .catch(error => {
    console.log('error', error)}
  );
````

<details><summary>View sample response</summary>
<p>
  
```json
{
 "error": false,
 "message": "",
 "history": [
  {
   "openTime": "03/01/2010 14:13",
   "closeTime": "03/01/2010 15:26",
   "symbol": "GBPUSD",
   "action": "Buy Limit",
   "sizing": {
    "type": "lots",
    "value": "0.04"
   },
   "openPrice": 1.4831,
   "closePrice": 1.4934,
   "tp": 1.4881,
   "sl": 0,
   "comment":"best trade ever",
   "pips": 0,
   "profit": 0,
   "interest": 12.1,
   "commission": 0
  }
 ]
}
```

</p>
</details>

---

### **`getDailyGain(id, start, end)`**

Get daily breakdown of all gains for a given account within time range

Arguments:

- `id` - _id of a trading account_
- `start` - _start date, format : yyyy-MM-dd_
- `end` - _end date, format : yyyy-MM-dd_

```javascript
const { MyfxbookApi } = require('myfxbook-api-client');

const client = new MyfxbookApi({ email: 'my@email.com', password: 'my_password' });

client
  .getDailyGain(12345, '2019-02-01', '2019-02-07')
  .then(data => {
    console.log(data.dailyGain);
  })
  .catch(error => {
    console.log('error', error);
  });
```

<details><summary>View sample response</summary>
<p>
  
```json
{
 "error": false,
 "message": "",
 "dailyGain": [
  [{
   "date": "02/01/2010",
   "value": 0.07,
   "profit": 0.03
  }]
 ]
}
```

</p>
</details>

---

### **`getGain(id, start, end)`**

Get total gain for a given account within time range

Arguments:

- `id` - _id of a trading account_
- `start` - _start date, format : yyyy-MM-dd_
- `end` - _end date, format : yyyy-MM-dd_

```javascript
const { MyfxbookApi } = require('myfxbook-api-client');

const client = new MyfxbookApi({ email: 'my@email.com', password: 'my_password' });

client
  .getGain(12345, '2019-02-01', '2019-02-07')
  .then(data => {
    console.log(data.value);
  })
  .catch(error => {
    console.log('error', error);
  });
```

<details><summary>View sample response</summary>
<p>
  
```json
{
 "error": false,
 "message": "",
 "value": 86.69
}
```

</p>
</details>

---

### **`getCommunityOutlook()`**

Get Myfxbook Community Outlook data (https://www.myfxbook.com/community/outlook)

```javascript
const { MyfxbookApi } = require('myfxbook-api-client');

const client = new MyfxbookApi({ email: 'my@email.com', password: 'my_password' });

client
  .getCommunityOutlook()
  .then(data => {
    console.log(data.symbols);
    console.log(data.general);
  })
  .catch(error => {
    console.log('error', error);
  });
```

<details><summary>View sample response</summary>
<p>
  
```json
{
 "error": false,
 "message": "",
 "symbols": [
  {
   "name": "EURUSD",
   "shortPercentage": 55,
   "longPercentage": 44,
   "shortVolume": 1142.58,
   "longVolume": 905.47,
   "longPositions": 2932,
   "shortPositions": 3888,
   "totalPositions": 2048,
   "avgShortPrice":1.3808,
   "avgLongPrice":1.4097
  }
 ],
 "general": {
  "demoAccountsPercentage": 43,
  "realAccountsPercentage": 56,
  "profitablePercentage": 54,
  "nonProfitablePercentage": 45,
  "fundsWon": "6,819,251.63",
  "fundsLost": "-8,740,646.15",
  "averageDeposit": "21,740.16",
  "averageAccountProfit": "4,127.88",
  "averageAccountLoss": "-5,290.95",
  "totalFunds": "35,914,737.56"
 }
}
```

</p>
</details>

---

### **`getCommunityOutlookByCountry(symbol)`**

Get community outlook data broken down by a country for provided symbol

Arguments:

- `symbol` - a trading instrument (currency pair)

```javascript
const { MyfxbookApi } = require('myfxbook-api-client');

const client = new MyfxbookApi({ email: 'my@email.com', password: 'my_password' });

client
  .getCommunityOutlookByCountry('eurusd')
  .then(data => {
    console.log(data.countries);
  })
  .catch(error => {
    console.log('error', error);
  });
```

<details><summary>View sample response</summary>
<p>
  
```json
{
 "error": false,
 "message": "",
 "countries": [
  {
   "name": "GERMANY",
   "code": "DE",
   "longVolume": 13.71,
   "shortVolume": 35.76,
   "longPositions": 111,
   "shortPositions": 489
  }
 ]
}
```

</p>
</details>

---

### **`getDailyData(id, start, end)`**

Get daily breakdown of all account data within time range

Arguments:

- `id` - _id of a trading account_
- `start` - _start date, format : yyyy-MM-dd_
- `end` - _end date, format : yyyy-MM-dd_

```javascript
const { MyfxbookApi } = require('myfxbook-api-client');

const client = new MyfxbookApi({ email: 'my@email.com', password: 'my_password' });

client
  .getDailyData(12345, '2019-02-01', '2019-02-07')
  .then(data => {
    console.log(data.dataDaily);
  })
  .catch(error => {
    console.log('error', error);
  });
```

<details><summary>View sample response</summary>
<p>
  
```json
{
 "error": false,
 "message": "",
 "dataDaily":[
  [{
   "date": "02/01/2010",
   "balance": 25083.56,
   "pips": 83.30,
   "lots": 0.41,
   "floatingPL": -500.00,
   "profit": 84.7400,
   "growthEquity": -4.15,
   "floatingPips": 1.00
  }]
 ]
}
```

</p>
</details>
