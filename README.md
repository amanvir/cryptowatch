# cryptowatch

API for interacting with price of bitcoin/altcoin from cryptowa.ch.

### Install

```
$ npm install --save cryptowatch
```

### Usage
```javascript
import Cryptowatch from 'cryptowatch'

cw = new Cryptowatch()

cw.allowance()
  .then(a => console.log(a.remaining))
```
