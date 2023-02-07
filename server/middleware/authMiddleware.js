import jsonWebToken from 'jsonwebtoken'

export const authMiddleware = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    next()
  }
  try {
    const token = req.headers.authorization.split(' ')[1]
    if (!token) {
      return res.status(401).json({ message: 'Не авторизован' })
    }
    const decoded = jsonWebToken.verify(token, process.env.SECRET_KEY)
    req.user = decoded
    next()
  } catch (e) {
    res.status(401).json({ message: 'Не авторизован' })
  }
}
