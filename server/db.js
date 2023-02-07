import { Sequelize } from 'sequelize'

const sequelize = new Sequelize('node_postgres', 'postgres', 'root', {
  dialect: 'postgres',
  host: 'localhost'
})

try {
  await sequelize.authenticate()
  console.log('Соединение с БД было успешно установлено')
} catch (e) {
  console.log('Невозможно выполнить подключение к БД: ', e)
}

export default sequelize
