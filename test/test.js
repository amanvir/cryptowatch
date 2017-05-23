import test from 'ava'
import nock from 'nock'

import Cryptowatch from '../src/index.js'

test.beforeEach(t => {
  t.context.cw = new Cryptowatch()
})

test('it gets correct allowance result', t => {
  nock('https://api.cryptowat.ch/')
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
  nock('https://api.cryptowat.ch/')
    .get('/markets/coinbase/btcusd/price')
    .reply(200, {'result': {'price': 982.6}, 'allowance': {'cost': 884009, 'remaining': 1947776255}})

  return t.context.cw
    .price('btc')
    .then(p => {
      t.is(p.price, 982.6)
    })
})

test('it calls correct price endpoint with non-default inputs', t => {
  nock('https://api.cryptowat.ch/')
    .get('/markets/quoine/ethusd/price')
    .reply(200, {'result': {'price': 7.97}, 'allowance': {'cost': 1173698, 'remaining': 1902993194}})

  return t.context.cw
    .price('eth', 'usd', 'quoine')
    .then(p => {
      t.is(p.price, 7.97)
    })
})

test('it gets correct summary', t => {
  const price = {
    'last': 2050.46,
    'high': 2051,
    'low': 1799.79,
    'change': {
      'percentage': 0.13927098,
      'absolute': 250.65991
    }
  }

  nock('https://api.cryptowat.ch/')
    .get('/markets/coinbase/btcusd/summary')
    .reply(200, {'result': {price}, 'allowance': {'cost': 20207785, 'remaining': 1882785409}})

  return t.context.cw
    .summary('btc')
    .then(p => p.price)
    .then(p => {
      t.is(p.last, 2050.46)
      t.is(p.high, 2051)
      t.is(p.low, 1799.79)
    })
})

test('it calls correct summary endpoint with non-default inputs', t => {
  const price = {
    'last': 125.65,
    'high': 129.34,
    'low': 121,
    'change': {
      'percentage': -0.002619478,
      'absolute': -0.33000183
    }
  }

  nock('https://api.cryptowat.ch/')
    .get('/markets/quoine/ethusd/summary')
    .reply(200, {'result': {price}, 'allowance': {'cost': 3289727, 'remaining': 1879495682}})

  return t.context.cw
    .summary('eth', 'usd', 'quoine')
    .then(p => p.price)
    .then(p => {
      t.is(p.last, 125.65)
      t.is(p.high, 129.34)
      t.is(p.low, 121)
    })
})

test('it gets correct trades', t => {
  const trades = [
    [0, 1495321701, 2050.88, 0.0868],
    [0, 1495321701, 2050.88, 0.29]
  ]

  nock('https://api.cryptowat.ch/')
    .get('/markets/coinbase/btcusd/trades')
    .reply(200, {'result': trades, 'allowance': {'cost': 1067832, 'remaining': 1878427850}})

  return t.context.cw
    .trades('btc')
    .then(s => {
      t.deepEqual(s[0], [0, 1495321701, 2050.88, 0.0868])
      t.deepEqual(s[1], [0, 1495321701, 2050.88, 0.29])
    })
})

test('it calls correct trades endpoint with non-default inputs', t => {
  const trades = [
    [0, 1495321701, 125.8, 3.088294],
    [0, 1495321712, 125.54, 0.10446933]
  ]

  nock('https://api.cryptowat.ch/')
    .get('/markets/quoine/ethusd/trades')
    .reply(200, {'result': trades, 'allowance': {'cost': 1321485, 'remaining': 1877106365}})

  return t.context.cw
    .trades('eth', 'usd', 'quoine')
    .then(s => {
      t.deepEqual(s[0], [0, 1495321701, 125.8, 3.088294])
      t.deepEqual(s[1], [0, 1495321712, 125.54, 0.10446933])
    })
})

test('it gets correct orderbook', t => {
  const asks = [
    [2050.98, 29.275566],
    [2050.99, 10]
  ]

  nock('https://api.cryptowat.ch/')
    .get('/markets/coinbase/btcusd/orderbook')
    .reply(200, {'result': {asks}, 'allowance': {'cost': 2497456, 'remaining': 1874608909}})

  return t.context.cw
    .orderbook('btc')
    .then(a => {
      t.deepEqual(a.asks[0], [2050.98, 29.275566])
      t.deepEqual(a.asks[1], [2050.99, 10])
    })
})

test('it calls correct orderbook endpoint with non-default inputs', t => {
  const asks = [
    [125.65, 71.50525],
    [125.71, 4.6673603]
  ]

  nock('https://api.cryptowat.ch/')
    .get('/markets/quoine/ethusd/orderbook')
    .reply(200, {'result': {asks}, 'allowance': {'cost': 5605693, 'remaining': 1869003216}})

  return t.context.cw
    .orderbook('eth', 'usd', 'quoine')
    .then(p => {
      t.deepEqual(p.asks[0], [125.65, 71.50525])
      t.deepEqual(p.asks[1], [125.71, 4.6673603])
    })
})

test('it gets correct ohlc', t => {
  const ohlcs = [
    [1488124800, 1168.69, 1171.99, 1167.9, 1171.95, 366.4575],
    [1488139200, 1171.95, 1187.33, 1170, 1177.5, 1165.559]
  ]

  nock('https://api.cryptowat.ch/')
    .get('/markets/coinbase/btcusd/ohlc')
    .reply(200, {'result': {'14400': ohlcs}, 'allowance': {'cost': 89080998, 'remaining': 1779922218}})

  return t.context.cw
    .ohlc('btc')
    .then(a => {
      t.deepEqual(a['14400'][0], [1488124800, 1168.69, 1171.99, 1167.9, 1171.95, 366.4575])
      t.deepEqual(a['14400'][1], [1488139200, 1171.95, 1187.33, 1170, 1177.5, 1165.559])
    })
})

test('it calls correct ohlc endpoint with non-default inputs', t => {
  const ohlcs = [
    [1488124800, 13.64, 13.77, 13.62, 13.76, 8585.488],
    [1488139200, 13.74, 14.49, 13.74, 14.26, 30895.133]
  ]

  nock('https://api.cryptowat.ch/')
    .get('/markets/quoine/ethusd/ohlc')
    .reply(200, {'result': {'14400': ohlcs}, 'allowance': {'cost': 29617397, 'remaining': 1750304821}})

  return t.context.cw
    .ohlc('eth', 'usd', 'quoine')
    .then(p => {
      t.deepEqual(p['14400'][0], [1488124800, 13.64, 13.77, 13.62, 13.76, 8585.488])
      t.deepEqual(p['14400'][1], [1488139200, 13.74, 14.49, 13.74, 14.26, 30895.133])
    })
})

test('it gets prices', t => {
  const prices = {
    'coinbase:btcusd': 2050.87,
    'coinbase:ethusd': 125.62
  }

  nock('https://api.cryptowat.ch/')
    .get('/markets/prices')
    .reply(200, {'result': prices, 'allowance': {'cost': 71867393, 'remaining': 1678437428}})

  return t.context.cw
    .prices()
    .then(p => {
      t.is(p['coinbase:btcusd'], 2050.87)
      t.is(p['coinbase:ethusd'], 125.62)
    })
})

test('it gets summaries', t => {
  const summaries = {
    'coinbase:btcusd': {
      'price': {
        'last': 2050.86,
        'high': 2051,
        'low': 1799.79,
        'change': {
          'percentage': 0.1394933,
          'absolute': 251.06006
        }
      },
      'volume': 44013.92
    },
    'coinbase:ethusd': {
      'price': {
        'last': 126.24,
        'high': 129.34,
        'low': 121,
        'change': {
          'percentage': 0.026341446,
          'absolute': 3.2399979
        }
      },
      'volume': 203207.1
    }
  }

  nock('https://api.cryptowat.ch/')
    .get('/markets/summaries')
    .reply(200, {'result': summaries, 'allowance': {'cost': 25138388, 'remaining': 1653299040}})

  return t.context.cw
    .summaries()
    .then(p => {
      const btc = p['coinbase:btcusd']
      t.is(btc.price.last, 2050.86)
      t.is(btc.price.high, 2051)
      t.is(btc.price.low, 1799.79)

      const eth = p['coinbase:ethusd']
      t.is(eth.price.last, 126.24)
      t.is(eth.price.high, 129.34)
      t.is(eth.price.low, 121)
    })
})
