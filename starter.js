import Debug from 'debug'
import http from 'http'
import fs from 'mz/fs'
import Koa from 'koa'
import cors from 'kcors'
import logger from 'koa-logger'
import helmet from 'koa-helmet'
import bodyParser from 'koa-bodyparser'
import Router from 'koa-router'
import swagger from 'koa2-swagger-ui'
import { singular } from 'pluralize'
// const compression = require('compression')
// const methodOverride = require('method-override')

const debug = Debug('starter')

export default env => {
  debug('init', env)

  let app = new Koa()

  app.router = new Router()

  app.debug = (namespace) => {
    return Debug(`${env.name}:${namespace}`)
  }

  app.controller = (name, action) => {
    debug('create controller : %s.%s', name, action.name)
    return async (ctx, next) => {
      ctx.debug = app.debug(`controller:${name}`)
      ctx.debug(action.name, name)
      await action(ctx)
    }
  }

  app.use(logger(env.logger || 'dev'))
  app.use(cors())
  app.use(helmet())
  app.use(bodyParser())
  app.router.get('/swagger.json', async ctx => {
    ctx.body = await fs.readFile(__dirname + '/swagger.json', 'utf8')
  })
  app.use(swagger({
    swaggerOptions: {
      url: '/swagger.json'
    }
  }))
  app.use((ctx, next) => {
    ctx.app = app
    return next()
  })

  app.router.param('resource', (resource, ctx, next) => {
    ctx.resource = resource
    ctx.modelName = singular(resource)
    return next()
  })

  app.router.param('id', (id, ctx, next) => {
    ctx.id = id
    return next()
  })

  for (let [path, middleware] of Object.entries(env.policies)) {
    debug('add policy :', path, ':', middleware.name)
    app.router.use(path, middleware)
  }

  for (let [name, controller] of Object.entries(env.controllers)) {
    if (name === 'crud') continue
    debug('add controller :', name)
    let router = new Router()
    router.get('/', app.controller(name, controller.list || env.controllers.crud.list))
    router.get('/:id', app.controller(name, controller.show || env.controllers.crud.show))
    router.post('/', app.controller(name, controller.create || env.controllers.crud.create))
    router.put('/:id', app.controller(name, controller.update || env.controllers.crud.update))
    router.delete('/:id', app.controller(name, controller.delete || env.controllers.crud.delete))
    app.router.use('/' + name, router.routes())
  }

  env.bootstrap(app)

  app.use(app.router.routes())

  app.run = function(
    port = env.port || 3000,
    host = env.host || '0.0.0.0'
  ) {
    debug('run', port)
    app.listen(port, host, () => {
      debug('listening http://%s:%d', host, port)
    })
  }

  return app
}
