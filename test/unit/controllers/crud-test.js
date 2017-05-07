import assert from 'assert'
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

describe('crud', () => {
  it('should be an object', () => {
    assert.equal(typeof crud, 'object')
    assert.deepEqual(Object.keys(crud), ['list','show','create','update','delete'])
  })

  it('list()', async () => {
    let ctx = { services, params: { model: 'Post' } }
    await crud.list(ctx)
    assert.ok(services.crud.list.calledOnce)
  })

  it('show()', async () => {
    let ctx = { services, params: { model: 'Post', id: 1 } }
    await crud.show(ctx)
    assert.ok(services.crud.show.calledOnce)
  })

  it('create()', async () => {
    let ctx = { services, params: { model: 'Post' }, request: { body: { foo: 'bar' }} }
    await crud.create(ctx)
    assert.ok(services.crud.create.calledOnce)
  })

  it('update()', async () => {
    let ctx = { services, params: { model: 'Post', id: 1 }, request: { body: { foo: 'baz' }}}
    await crud.update(ctx)
    assert.ok(services.crud.update.calledOnce)
  })

  it('delete()', async () => {
    let ctx = { services, params: { model: 'Post', id: 1 }, throw: () => {} }
    await crud.delete(ctx)
    assert.ok(services.crud.delete.calledOnce)
  })
})
