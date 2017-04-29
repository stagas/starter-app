const config = require('../config')
const debug = require('debug')

module.exports = namespace => {
  return debug(config.name + ':' + namespace)
}
