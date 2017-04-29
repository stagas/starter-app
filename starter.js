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
  debug('init')

  let port = env.port || 3000
  let host = env.host || '0.0.0.0'
  let app = express()

  app.use(logger(env.logger && env.logger.format || 'dev'))
  app.use(express.static(path.join(env.root || '.', env.staticPath || 'public')))
  app.use(api)

  let server = http.createServer(app)

  return {
    server,
    debug(namespace) {
      return Debug(`${env.name}:${namespace}`)
    },
    run(port) {
      debug('run', port)
      this.server.listen(port, host, () => {
        debug('listening', server.address())
      })

    }
  }
}


// const config = require('./config')
//
//
// api.disable('x-powered-by')
//
// api.set('port', process.env.PORT || 3001)
//
// api.use(cors())
// api.use(helmet())
//
// api.use(bodyParser.urlencoded({
//   extended: false
// }))
// api.use(bodyParser.json())
// api.use(methodOverride())
// api.use(compression())
//
// api.set('json spaces', 2)
//
// require('./http')(api, core)
//
// api.use(function (err, req, res, next) {
//   if (err && err.name === 'UnauthorizedError') {
//     core.log.info('Unauthorized Error', err)
//     return res.sendStatus(401)
//   } else if (err) {
//     core.log.error('Middleware Error', err.toString())
//     return res.sendStatus(500)
//   }
// })
//
// if (require.main === module) {
//   http.createServer(api)
//     .listen(api.get('port'), function () {
//       core.log.info('Signing Service API listening on port ' + this.address()
//           .port)
//       core.log.debug(JSON.stringify(core.config, null, 2))
//     })
// }
//
// // api.quit = function () {
// //   return core.quit()
// // }
//
// module.exports = api
