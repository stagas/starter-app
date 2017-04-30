import Sequelize from 'sequelize'

import post from './post'

export default options => {
  let db = new Sequelize(options)

  post(db)

  return db.sync()
}
