const starter = require('./starter')
const env = require('./config/env')

let app = module.exports = starter(env)

if (require.main === module) {
  let port = process.argv[2]
  app.run(port)
}
