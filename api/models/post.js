import Sequelize from 'sequelize'

export default db => {
  db.define('post', {
    title: Sequelize.STRING,
    body: Sequelize.STRING,
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
  })
}
