import app from '@main/config/app'
import request from 'supertest'

describe('No Cache Middleware', () => {
  test('Should be able to disable the cache', async () => {
    app.get('/test_no_cache', (req, res) => {
      res.send()
    })
    await request(app).get('/test_no_cache')
      .expect('cache-control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
      .expect('pragma', 'no-cache')
      .expect('expires', '0')
      .expect('surrogate-control', 'no-store')
  })
})
