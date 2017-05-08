import path from 'path'
import env from './env'
import pkg from '../package.json'
import merge from '../lib/merge'

let root = path.join(__dirname, '..')

let config = {
  version: pkg.version,
  name: pkg.name,
  port: process.env.PORT,
  host: process.env.HOST,
  static: path.join(root, 'public'),
  swagger: path.join(root, 'swagger.yml'),
  db: {
    database: 'starter'
  }
}

export default config

merge(config, env)
