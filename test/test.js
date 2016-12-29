import test from 'ava'
import nock from 'nock'

import Cryptowatch from '../src/index.js'

test.beforeEach(t => {
  t.context.cw = new Cryptowatch()
})

test('it gets correct allowance result', t => {
  nock('https://api.cryptowatch.com')
    .get('/')
    .reply(200, {'allowance': {'cost': 111, 'remaining': 666}})

  return t.context.cw
    .allowance()
    .then(a => {
      t.is(a.remaining, 666)
      t.is(a.cost, 111)
    })
})

test('it gets correct price', t => {
  nock('https://api.cryptowatch.com')
    .get('/markets/coinbase/btcusd/price')
    .reply(200, {'result': {'price': 982.6}, 'allowance': {'cost': 884009, 'remaining': 1947776255}})

  return t.context.cw
    .price('btc')
    .then(p => {
      t.is(p.price, 982.6)
    })
})

test('it throws an error when wrong params added', t => {

  nock('https://api.cryptowatch.com')
    .get('/markets/coinbase-is-not-real/btc-lol-jkcurrency-does-not-exist/price')
    .delayConnection(5500) // actual timeout in code is 5s
    .reply(500)

  const error = t.throws(() => {
    return t.context.cw.price('btc-lol-jk', 'currency-does-not-exist', 'coinbase-is-not-real')
  }, TypeError)

  t.is(error.message, 'This endpoint does not exist')
})
