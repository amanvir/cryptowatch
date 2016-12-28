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
      {"allowance":{"cost":16096,"remaining":666}}
    )

  t.context.cw.allowance().then(a => t.is(a, 666))
})
