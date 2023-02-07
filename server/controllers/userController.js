import ApiError from '../error/ApiError.js'
import bcrypt from 'bcrypt'
import { models } from '../models/models.js'
import jsonWebToken from 'jsonwebtoken'
import { authMiddleware } from '../middleware/authMiddleware.js'
const { User, Basket } = models

const generateJwt = (id, email, role) => {
  return jsonWebToken.sign({ id, email, role }, process.env.SECRET_KEY, { expiresIn: '24h' })
}
class UserController {
  async registration (req, res) {
    const { email, password, role } = req.body
    if (!email || !password) {
      return res.json('Некорректный емаил или пароль')
    }
    const candidate = await User.findOne({ where: { email } })
    if (candidate) {
      return res.json('Пользователь с таким емаил уже существует')
    }
    const hashPassword = await bcrypt.hash(password, 5)
    const user = await User.create({ email, role, password: hashPassword })
    const basket = await Basket.create({ userId: user.id })
    const token = generateJwt(user.id, user.email, user.role)
    return res.json({ token })
  }

  async login (req, res) {
    const { email, password } = req.body
    const user = await User.findOne({ where: { email } })
    if (!user) {
      return res.json('Пользователь с таким емаил не найден')
    }
    const comparePassword = bcrypt.compareSync(password, user.password)
    if (!comparePassword) {
      return res.json('Указан неверный пароль')
    }
    const token = generateJwt(user.id, user.email, user.role)
    return res.json({ token })
  }

  async check (req, res, next) {
    const token = generateJwt(req.user.id, req.user.email, req.user.role)
    return res.json({ token })
  }
}

export default new UserController()
