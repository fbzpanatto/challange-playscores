const request = require('supertest')
const app = require('../server')

request(app)
  .get('/teste')
  .expect('teste')