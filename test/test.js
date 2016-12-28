import test from 'ava'
import nock from 'nock'

import Cryptowatch from '../src/index.js'


test.beforeEach(t => {
  t.context.cw = new Cryptowatch()
})



test('it gets correct allowance result', t => {
  nock('https://api.cryptowatch.com')
    .get('/')
    .reply(200, 
      {"allowance":{"cost":111,"remaining":666}}
    )

  return t.context.cw
    .allowance()
    .then(a => {
      console.log(a)
      t.is(a.remaining, 666)
      t.is(a.cost, 111)
    })
})
