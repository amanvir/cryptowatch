import fetch from 'node-fetch'

class Cryptowatch {

  constructor (options = {}) {
    this.url = 'https://api.cryptowat.ch'
    this.options = Object.assign({
      // the cryptowatch api times out
      // when incorrect params supplied
      // todo: ask them why
      timeout: 5000
    }, options)
  }

  // https://cryptowat.ch/docs/api#rate-limit
  allowance () {
    return fetch(this.url)
      .then(r => { return r.json() })
      .then(j => { return j.allowance })
  }

  // https://cryptowat.ch/docs/api#price
  price (coin, currency = 'usd', market = 'coinbase') {
    return fetch(`${this.url}/markets/${market}/${coin}${currency}/price`, this.options)
      .then(r => { return r.json() })
      .then(j => { return j.result })
      .catch(err => { throw new TypeError('This endpoint does not exist') })
  }

    return fetch(`${this.url}/markets/${market}/${coin}${currency}/price`, options)
      .then(r => { return r.json() })
      .then(j => { return j.result })
      .catch(err => { throw new TypeError('This endpoint does not exist') })
  }
}

module.exports = Cryptowatch
