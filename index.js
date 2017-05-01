import starter from 'starter'
import models from 'api/models'
import env from 'config/env'
import swagger from 'libs/swagger-generator'

let app = starter(env)

export default app

if (require.main === module) {
  let port = process.argv[2]
  models(env.db).then(db => {
    app.db = db
    app.run(port)
  })
}
