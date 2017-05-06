export default app => {
  let debug = app.debug('services:crud')

  return {
    list(name) {
      debug('list', name)
      return app.db.models[name].all()
    },

    show(name, id) {
      debug('show', name, id)
      return app.db.models[name].findById(id)
    },

    create(name, data) {
      debug('create', name, data)
      return app.db.models[name].create(data)
    },

    async update(name, id, data) {
      debug('update', name, id, data)
      let model = await app.db.models[name].findById(id)
      if (model === null) return null
      Object.assign(model, data)
      await model.save()
      return model
    },

    async delete(name, id) {
      debug('delete', name, id)
      let deleted = await app.db.models[name].destroy({ where: { id: parseInt(id) }})
      return Boolean(deleted) || null
    }
  }
}
