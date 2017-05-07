import development from './development'
import production from './production'
import staging from './staging'
import testing from './testing'

let env = {}

export default env

switch (process.env.NODE_ENV) {
  case 'production':
    Object.assign(env, production)
    break
  case 'staging':
    Object.assign(env, staging)
    break
  case 'testing':
    Object.assign(env, testing)
    break
  case 'development':
  default:
    Object.assign(env, development)
    break
}
