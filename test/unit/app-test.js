import test from 'ava'

import app from '../../src/app'

test('app', t => {
  t.is(typeof app, 'function')
})
