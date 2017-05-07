import test from 'ava'
import crud from '../../../api/controllers/crud'
import { spy } from 'sinon'

let services = {
  crud: {
    list: spy(),
    show: spy(),
    create: spy(),
    update: spy(),
    delete: spy()
  }
}

test('crud', t => {
  t.is(typeof crud, 'object')
  t.deepEqual(Object.keys(crud), ['list','show','create','update','delete'])
})

test('crud.list', async t => {
  let ctx = { services, params: { model: 'Post' } }
  await crud.list(ctx)
  t.truthy(services.crud.list.calledOnce)
})

test('crud.show', async t => {
  let ctx = { services, params: { model: 'Post', id: 1 } }
  await crud.show(ctx)
  t.truthy(services.crud.show.calledOnce)
})

test('crud.create', async t => {
  let ctx = { services, params: { model: 'Post' }, request: { body: { foo: 'bar' }} }
  await crud.create(ctx)
  t.truthy(services.crud.create.calledOnce)
})

test('crud.update', async t => {
  let ctx = { services, params: { model: 'Post', id: 1 }, request: { body: { foo: 'baz' }}}
  await crud.update(ctx)
  t.truthy(services.crud.update.calledOnce)
})

test('crud.delete', async t => {
  let ctx = { services, params: { model: 'Post', id: 1 }, throw: () => {} }
  await crud.delete(ctx)
  t.truthy(services.crud.delete.calledOnce)
})
