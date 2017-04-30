import test from 'ava'
import crud from 'api/controllers/crud'

test('crud', t => {
  t.is(typeof crud, 'object')
  t.deepEqual(Object.keys(crud), ['list','show','create','update','delete'])
})

test('crud.list', t => {
  let ctx = {}
  crud.list(ctx)
  t.is(ctx.status, 501)
})

test('crud.show', t => {
  let ctx = {}
  crud.list(ctx)
  t.is(ctx.status, 501)
})

test('crud.create', t => {
  let ctx = {}
  crud.list(ctx)
  t.is(ctx.status, 501)
})

test('crud.update', t => {
  let ctx = {}
  crud.list(ctx)
  t.is(ctx.status, 501)
})

test('crud.delete', t => {
  let ctx = {}
  crud.list(ctx)
  t.is(ctx.status, 501)
})
