import { fetch } from 'isomorphic-fetch'

export default class Cryptowatch {
  constructor(){
    this.url = 'https://api.cryptowatch.com'
  }

  getPrice(currency) {
    return fetch(this.url + '/xyz')
  }

}
