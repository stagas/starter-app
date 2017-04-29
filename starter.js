const _ = require('lodash')
const express = require('express')
const compression = require('compression')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const http = require('http')
const helmet = require('helmet')
const cors = require('cors')
const path = require('path')
const logger = require('morgan')
const Debug = require('debug')
const debug = Debug('starter')

module.exports = (api, env) => {
  debug('init', api, env)

  let port = env.port || 3000
  let host = env.host || '0.0.0.0'
  let app = express()

  app.debug = (namespace) => {
    return Debug(`${env.name}:${namespace}`)
  }

  app.use(logger(env.logger && env.logger.format || 'dev'))

  let createController = (name, action) => {
    // debug(`Controller ${name} action ${action.name}`)
    return (req, res) => {
      let ctx = {
        name: name,
        debug: app.debug('controller:' + name),
        req,
        res
      }
      ctx.debug(action.name)
      action(ctx)
    }
  }

  app.use(cors())
  app.use(helmet())

  app.use(bodyParser.urlencoded({
    extended: false
  }))
  app.use(bodyParser.json())
  app.use(methodOverride())
  app.use(compression())

  app.set('json spaces', 2)

  Object.keys(api.controllers).forEach(ctrlName => {
    let controller = api.controllers[ctrlName]
    let router = new express.Router()
    // If controller._config.actions merge with blueprints
    // If config.routes has custom routes, bind them
    router.get('/', createController(ctrlName, controller.list || crud.list))
    router.get('/:id', createController(ctrlName, controller.show || crud.show))
    router.post('/', createController(ctrlName, controller.create || crud.create))
    router.put('/:id', createController(ctrlName, controller.update || crud.update))
    router.delete('/:id', createController(ctrlName, controller.delete || crud.delete))
    app.use('/' + ctrlName, router)
  })

  app.use(express.static(path.join(env.root || '.', env.staticPath || 'public')))

  let server = http.createServer(app)

  app.server = server

  app.run = function(port) {
    debug('run', port)
    this.server.listen(port, host, () => {
      debug('listening', server.address())
    })
  }
  return app
}
