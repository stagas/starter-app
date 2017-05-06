import starter, { test } from '@blended/starter'
import models from './api/models'
import env from './config/env'

let app = starter(env)

let port = process.argv[2]

models(env.db).then(db => {
  app.db = db
  app.run(port).then(() => {
    test(app, env.swaggerFile)
  })
})
