import Sequelize from 'sequelize'

import post from './post'
import author from './author'

export default options => {
  let db = new Sequelize(options)

  ;[
    post(db),
    author(db)
  ].forEach(model => model.relations())

  return db.sync()
}
