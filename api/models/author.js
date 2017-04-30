import Sequelize from 'sequelize'

export default db => {
  let author = db.define('author', {
    name: Sequelize.STRING
  })

  author.relations = () => {
    author.hasMany(db.models.post)
  }

  return author
}
