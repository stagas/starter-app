export default {
  name: require('../../package.json').name,
  port: process.env.PORT,
  host: process.env.HOST,
  bootstrap: require('../bootstrap'),
  controllers: require('../controllers'),
  policies: require('../policies'),
  routes: require('../routes'),
  db: {
    dialect: 'sqlite'
  }
}
