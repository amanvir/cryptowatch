import fetch from 'node-fetch'

export default class Cryptowatch {

  constructor() {
    this.url = 'https://api.cryptowatch.com/'
  }

  allowance() {
    return fetch(this.url)
      .then(r => { return r.json() })
      .then(r => { return r.allowance.remaining })
  }

}
