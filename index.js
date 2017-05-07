import starter from '@blended/starter'
import config from './config'
import api from './api'

let init = () => {
  let app = starter(api, config)
  return app
}

export default init

if (require.main === module) {
  let port = process.argv[2]
  init().run({ port })
}
