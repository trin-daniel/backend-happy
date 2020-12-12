import multer from 'multer'
import path from 'path'
import crypto from 'crypto'
import { existsSync, mkdirSync } from 'fs'

const dir = existsSync(path.join(__dirname, '..', '..', '..', 'tmp', 'uploads'))
if (!dir) {
  const dirUploads = path.resolve(__dirname, '..', '..', '..', 'tmp', 'uploads')
  mkdirSync(dirUploads, { recursive: true })
}
export default {
  dest: path.resolve(__dirname, '..', '..', '..', 'tmp', 'uploads'),
  storage: multer.diskStorage({
    destination: (req, file, callback) => callback(null, path.resolve(__dirname, '..', '..', '..', 'tmp', 'uploads')),
    filename: (req, file, callback) => {
      crypto.randomBytes(16, (err, hash) => {
        const filename = `${hash.toString('hex')}-${file.originalname}`
        err && callback(err, null)
        callback(null, filename)
      })
    }
  }),
  limits: {
    fileSize: 2 * 1024 * 1024
  }
}
