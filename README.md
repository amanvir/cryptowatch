# cryptowatch

API for interacting with price of bitcoin/altcoin from cryptowa.ch.

### Install

```
$ npm install --save cryptowatch
```

### Usage

To get the price from coinbase for BTC in USD.

```javascript
import Cryptowatch from 'cryptowatch'

cw = new Cryptowatch()

cw.price('btc', 'usd', 'coinbase')
  .then(p => console.log(p.price))
```
