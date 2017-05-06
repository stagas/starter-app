import starter from '@blended/starter'
import { bootstrap } from './api'
import env from './config/env'

let app = starter(env)

export default app
export { bootstrap, env }

if (require.main === module) {
  let port = process.argv[2]
  bootstrap(app).then(db => {
    app.db = db
    app.run(port)
  })
}
