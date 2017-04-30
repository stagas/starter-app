
export default app => {
  let debug = app.debug('services:crud')

  return {
    list(modelName) {
      debug('list', modelName)
      return app.db.models[modelName].all()
    },

    show(modelName, id) {
      debug('show', modelName, id)
      return app.db.models[modelName].findById(id)
    },

    create(modelName, data) {
      debug('create', modelName, data)
      return app.db.models[modelName].create(data)
    },

    async update(modelName, id, data) {
      debug('update', modelName, id, data)
      let model = await app.db.models[modelName].findById(id)
      if (model == null) return
      Object.assign(model, data)
      await model.save()
      return model
    },

    delete(modelName, id) {
      debug('delete', modelName, id)
      return app.db.models[modelName].delete(id)
    }
  }
}
