import starter from '@blended/starter'
import config from './config'
import api from './api'

let app = starter(api, config)

export default app
export { api, config }

if (require.main === module) {
  let port = process.argv[2]
  app.run(port)
}
