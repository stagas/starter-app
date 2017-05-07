import test from 'ava'
import app from '../../../'
import request from 'superagent'

let baseUrl

test.before(async t => {
  await app.run(3000 + (Math.random() * 3000 | 0))
  baseUrl = 'http://' + app.config.host + ':' + app.config.port
})

test.serial('GET /authors should be an empty array', t => {
  return request
    .get(baseUrl + '/authors')
    .then(res => {
      t.truthy(Array.isArray(res.body))
      t.is(res.body.length, 0)
    })
})

test.serial('POST /authors should create an author', t => {
  return request
    .post(baseUrl + '/authors')
    .send({
      name: 'John Smith'
    })
    .then(res => {
      t.is(res.body.id, 1)
      t.is(res.body.name, 'John Smith')
    })
})

test.serial('GET /authors should return 1 author', t => {
  return request
    .get(baseUrl + '/authors')
    .then(res => {
      t.truthy(Array.isArray(res.body))
      t.is(res.body.length, 1)
      t.is(res.body[0].name, 'John Smith')
    })
})
