import app from '../config/app'
import request from 'supertest'
import { internet } from 'faker'

describe('Body Parser', () => {
  test('Should be able to understand the JSON format', async () => {
    app.post('/test_body_parser', (req, res) => {
      res.send(req.body)
    })
    const name = internet.userName()
    await request(app).post('/test_body_parser').send({ name }).expect({ name })
  })
})
