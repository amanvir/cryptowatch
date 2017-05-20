import fetch from 'node-fetch'

function fetchResult (url, options) {
  return fetch(url, options)
    .then(r => { return r.json() })
    .then(j => { return j.result })
    .catch(err => { throw new TypeError('This endpoint does not exist') })
}

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
    return fetchResult(`${this.url}/markets/${market}/${coin}${currency}/price`, this.options)
  }

  // https://cryptowat.ch/docs/api#summary
  summary (coin, currency = 'usd', market = 'coinbase') {
    return fetchResult(`${this.url}/markets/${market}/${coin}${currency}/summary`, this.options)
  }

  // https://cryptowat.ch/docs/api#trades
  trades (coin, currency = 'usd', market = 'coinbase') {
    return fetchResult(`${this.url}/markets/${market}/${coin}${currency}/trades`, this.options)
  }

  // https://cryptowat.ch/docs/api#orderbook
  orderbook (coin, currency = 'usd', market = 'coinbase') {
    return fetchResult(`${this.url}/markets/${market}/${coin}${currency}/orderbook`, this.options)
  }

  // https://cryptowat.ch/docs/api#ohlc
  ohlc (coin, currency = 'usd', market = 'coinbase') {
    return fetchResult(`${this.url}/markets/${market}/${coin}${currency}/ohlc`, this.options)
  }

  // https://cryptowat.ch/docs/api#prices
  prices () {
    return fetchResult(`${this.url}/markets/prices`, this.options)
  }

  // https://cryptowat.ch/docs/api#summaries
  summaries () {
    return fetchResult(`${this.url}/markets/summaries`, this.options)
  }
}

module.exports = Cryptowatch
