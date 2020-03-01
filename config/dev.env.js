'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  MY_GOOGLE_API_KEY: '"YOUR-GOOGLE-API-KEY"',
  MOCK_API_DOMAIN: '"YOUR-MOCK-API-DOMAIN"'
})
