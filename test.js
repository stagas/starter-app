import starter, { test } from '@blended/starter'
import { bootstrap } from './api'
import env from './config/env'

let app = starter(env)

let port = process.argv[2]

bootstrap(app).then(() => {
  app.run(port).then(() => {
    test(app)
  })
})
