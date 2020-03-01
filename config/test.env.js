'use strict'
const merge = require('webpack-merge')
const devEnv = require('./dev.env')

module.exports = merge(devEnv, {
  NODE_ENV: '"testing"',
  MY_GOOGLE_API_KEY: '"YOUR-GOOGLE-API-KEY"',
  MOCK_API_DOMAIN: '"YOUR-MOCK-API-DOMAIN"'
})
