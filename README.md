# cryptowatch

API for interacting with price of bitcoint/altcoin etc 

### Install

```
$ npm install --save cryptowatch
```

### Usage
Once you have installed cryptowatch you need to initiate a new copy of `cryptowatch` like so:

```javascript
import Cryptowatch from 'cryptowatch'

cw = new Cryptowatch()
cw.allowance(a => console.log(a.remaining))
```
