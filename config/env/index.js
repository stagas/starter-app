import development from './development'
import production from './production'
import staging from './staging'
import testing from './testing'
import merge from '../../lib/merge'

let env = {
  logger: 'none',
  db: {
    dialect: 'sqlite',
    storage: ':memory:',
    logging: false
  },
  secret: 'secret'
}

export default env

switch (process.env.NODE_ENV) {
  case 'production':
    merge(env, production)
    break
  case 'staging':
    merge(env, staging)
    break
  case 'testing':
    merge(env, testing)
    break
  case 'development':
  default:
    merge(env, development)
    break
}
