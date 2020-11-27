import app from '@main/config/app'
import request from 'supertest'

describe('Content Type', () => {
  test('Should be able to return JSON format by default', async () => {
    app.get('/test_content_type', (req, res) => {
      res.send({})
    })
    await request(app).get('/test_content_type').expect('content-type', /json/)
  })
})
