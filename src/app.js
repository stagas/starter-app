const debug = require('./debug')('server')
const http = require('http')
const path = require('path')
const express = require('express')
const logger = require('morgan')
const port = process.env.PORT
const host = process.env.HOST
const root = path.join(__dirname, '..')

let app = module.exports = express()

app.use(logger('dev'))
app.use(express.static(path.join(root, 'public')))

let server = http.createServer(app)

server.listen(port, host, () => {
  debug('listening', server.address())
})
