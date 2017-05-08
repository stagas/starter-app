import { loadDocumentSync } from 'swagger2'
import starter from '@blended/starter'
import config from './config'
import api from './api'

let swagger = loadDocumentSync(config.swagger)

let init = () => starter(swagger, api, config)

export default init

if (require.main === module) {
  let port = process.argv[2]
  init().run({ port })
}
