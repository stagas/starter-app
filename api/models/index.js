import Sequelize from 'sequelize'

import post from './post'
import author from './author'

export default options => {
  let db = new Sequelize(options)

  let models = [
    post(db),
    author(db)
  ]

  models.forEach(model => model.relations())

  return db.sync()
}
