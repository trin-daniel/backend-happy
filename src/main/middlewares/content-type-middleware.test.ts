import app from '@main/config/app'
import request from 'supertest'

describe('Content Type Middleware', () => {
  test('Should be able to return JSON format by default', async () => {
    app.get('/test_content_type', (req, res) => {
      res.send({})
    })
    await request(app).get('/test_content_type').expect('content-type', /json/)
  })

  test('Should be able to return the XML format if defined', async () => {
    app.get('/test_content_type_xml', (req, res) => {
      res.type('xml')
      res.send({})
    })
    await request(app).get('/test_content_type_xml').expect('content-type', /xml/)
  })
})
