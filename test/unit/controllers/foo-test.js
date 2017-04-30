import test from 'ava'
import foo from 'api/controllers/foo'

test('foo.show', async t => {
  let ctx = { debug: () => {} }
  await foo.show(ctx)
  t.is(ctx.status, 200)
  t.is(ctx.body, 'foo')
})
