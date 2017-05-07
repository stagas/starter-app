import Sequelize from 'sequelize'

export default db => {
  let Post = db.define('Post', {
    title: { type: Sequelize.STRING, allowNull: false },
    body: { type: Sequelize.STRING, allowNull: false },
    authorId: { type: Sequelize.INTEGER, allowNull: false },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
  })

  Post.relations = () => {

  }

  return Post
}
