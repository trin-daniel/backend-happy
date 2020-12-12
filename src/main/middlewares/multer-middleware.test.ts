import supertest from 'supertest'
import app from '@main/config/app'
import multerMiddleware from '@main/middlewares/multer-middleware'
import multer from 'multer'
import path from 'path'

const fileDir = path.resolve(__dirname, '..', '..', '..', 'tmp', 'local', 'foto.jpg')
describe('Multer Middleware', () => {
  test('Should be able enable middleware multer', async () => {
    app.post('/test_multer', multer(multerMiddleware).array('files', 10), (req, res, next) => {
      res.send(req.files[0])
      next()
    })
    const res = await supertest(app).post('/test_multer').attach('files', fileDir)
    expect(res.status).toBe(200)
  })
})
