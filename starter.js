import Debug from 'debug'
import http from 'http'
import fs from 'mz/fs'
import Koa from 'koa'
import cors from 'kcors'
import logger from 'koa-logger'
import helmet from 'koa-helmet'
import bodyParser from 'koa-bodyparser'
import Router from 'koa-router'
import { ui as docs } from 'swagger2-koa'
import * as swagger from 'swagger2'
import { singular } from 'pluralize'
// const compression = require('compression')
// const methodOverride = require('method-override')
const debug = Debug('starter')

export default env => {
  debug('init', env)

  let app = new Koa()

  let swaggerFile = swagger.loadDocumentSync(__dirname + '/swagger.yml');

  app.router = new Router

  app.debug = (namespace) => {
    return Debug(`${env.name}:${namespace}`)
  }

  app.controller = (name, action) => {
    return async (ctx) => {
      ctx.debug = app.debug(`controller:${name}`)
      ctx.debug(action.name, name)
      await action(ctx)
    }
  }

  app.use(logger(env.logger || 'dev'))
  app.use(cors())
  app.use(helmet())
  app.use(bodyParser())
  app.use(docs(swaggerFile))
  app.use((ctx, next) => {
    ctx.app = app
    return next()
  })

  for (let [path, endpoint] of Object.entries(swaggerFile.paths)) {
    for (let [method, desc] of Object.entries(endpoint)) {
      let [controllerName, controllerMethod] = desc.action.split('.')
      debug('create route :', method.toUpperCase(), path, '->', desc.action)
      let controller = app.controller(controllerName, env.controllers[controllerName][controllerMethod])
      app.router[method.toLowerCase()](path, controller)
    }
  }

  env.bootstrap(app)

  app.use(app.router.routes())

  app.run = function(
    port = env.port || 3000,
    host = env.host || '0.0.0.0'
  ) {
    return new Promise(resolve => {
      debug(`run(${port}, '${host}')`)
      app.server = app.listen(port, host, () => {
        debug('server listening : http://%s:%d', host, port)
        resolve()
      })
    })
  }

  return app
}
