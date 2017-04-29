const starter = require('./starter')
const api = require('./api')
const env = require('./config/env')

let app = module.exports = starter(api, env)

if (require.main === module) {
  let port = process.argv[2]
  app.run(port || env.port)
}
