import Sequelize from 'sequelize'

export default db => {
  let post = db.define('post', {
    title: Sequelize.STRING,
    body: Sequelize.STRING,
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
  })

  post.relations = () => {
    post.belongsTo(db.models.author)
  }

  return post
}
