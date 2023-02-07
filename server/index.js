import express from 'express'
import dotenv from 'dotenv'
import sequelize from './db.js'
import { models } from './models/models.js'
import cors from 'cors'
import fileUpload from 'express-fileupload'
import router from './routes/index.js'
import ApiErrorFunction from '../server/middleware/ErrorHandingMiddlware.js'
import path from 'path'
import { fileURLToPath } from 'url'
dotenv.config()

const PORT = process.env.PORT || 8080
const __filename = fileURLToPath(import.meta.url)

const __dirname = path.dirname(__filename)
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use('/api', router)
// Обработка ошибок, последний Middleware
app.use(ApiErrorFunction)
const start = async () => {
  try {
    await sequelize.authenticate()
    await sequelize.sync()
    app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`))
  } catch (e) {
    console.log(e)
  }
}

start()
