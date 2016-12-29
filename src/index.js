import fetch from 'node-fetch'

class Cryptowatch {

  constructor () {
    this.url = 'https://api.cryptowat.ch'
  }

  allowance () {
    return fetch(this.url)
      .then(r => { return r.json() })
      .then(j => { return j.allowance })
  }

  price (coin, currency = 'usd', market = 'coinbase') {
    // the cryptowatch api times out
    // when incorrect params supplied
    // todo: ask them why
    const options = {
      timeout: 5000
    }

    return fetch(`${this.url}/markets/${market}/${coin}${currency}/price`, options)
      .then(r => { return r.json() })
      .then(j => { return j.result })
      .catch(err => { throw new TypeError('This endpoint does not exist') })
  }
}

module.exports = Cryptowatch
