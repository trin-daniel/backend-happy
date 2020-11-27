import { Router } from 'express'

export default (router: Router): void => {
  router.post('/add-orphanage', (req, res) => {
    res.send({ message: 'ok' })
  })
}
