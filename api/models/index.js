import Sequelize from 'sequelize'

import Post from './post'
import Author from './author'

export default options => {
  let db = new Sequelize(options)

  let models = [
    Post(db),
    Author(db)
  ]

  models.forEach(model => model.relations())

  return db.sync()
}
