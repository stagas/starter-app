const express = require('express')
const app = require('../')

let api = module.exports = express()

api.get('/foo', function(req, res){
  res.status(200).send('bar')
})
