import path from 'path'
import pkg from '../../package.json'

const root = path.join(__dirname, '..', '..')

export default {
  version: pkg.version,
  name: pkg.name,
  port: process.env.PORT,
  host: process.env.HOST,
  static: path.join(root, 'public'),
  swagger: path.join(root, 'swagger.yml'),
  db: { dialect: 'sqlite' }
}
