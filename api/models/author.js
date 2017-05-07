import Sequelize from 'sequelize'

export default db => {
  let Author = db.define('Author', {
    name: { type: Sequelize.STRING, allowNull: false }
  })

  Author.relations = () => {
    Author.hasMany(db.models.Post, { foreignKey: 'authorId' })
  }

  return Author
}
