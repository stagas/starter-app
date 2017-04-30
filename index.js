const starter = require('./starter')
const models = require('./api/models')
const env = require('./config/env')

let app = module.exports = starter(env)

if (require.main === module) {
  let port = process.argv[2]
  models(env.db).then(db => {
    app.db = db
    app.run(port)
  })
}
