import fs from 'fs'
import * as swagger from 'swagger2'
import h from 'handlebars'
import amanda from 'amanda'
import Parser from 'swagger-parameters'
import request from 'request-promise-native'
import app, { models, env } from '../'

runServer().then(runTests)

function runServer() {
  return models(env.db)
    .then(db => {
      app.db = db
      return app.run()
    })
}

function runTests() {
  let api = swagger.loadDocumentSync(__dirname + '/../swagger.yml');

  let tests = []

  for (let [path, endpoint] of Object.entries(api.paths)) {
    tests.push(test(path, endpoint)())
  }

  Promise.all(tests).then(result => {
    console.log('OK tests pass!')
  }).catch(e => {
    console.error('FAIL:', e.stack)
  }).then(() => app.server.close())

  function test(path, endpoint) {
    return async () => {
      let errors = []
      for (let [method, desc] of Object.entries(endpoint)) {
        let req = {}
        req.method = method
        req.url = api.schemes[0] + '://' + api.host + api.basePath + path.slice(1)
        let bodyParam = (desc.parameters || []).find(param => param.in === 'body')
        if (bodyParam) {
          req.body = bodyParam.schema.example
        } else {
          return
        }
        req.json = true
        errors = await request(req).then((body, res) => {
          let validator = amanda('json')
          return new Promise(resolve => {
            validator.validate(body, desc.responses[200].schema, resolve)
          })
        })
        if (errors && errors.length) throw new Error(path + ': ' + errors[0].message)
      }
    }
  }
}
