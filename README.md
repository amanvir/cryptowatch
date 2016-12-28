# cryptowatch

API for interacting with price of bitcoint/altcoin etc 

### Install

```
$ npm install --save cryptowatch
```

### Usage
```javascript
import Cryptowatch from 'cryptowatch'

cw = new Cryptowatch()
cw.allowance(a => console.log(a.remaining))
```
