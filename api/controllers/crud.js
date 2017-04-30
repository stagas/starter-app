
export default {
  list(ctx) {
    return ctx.db.models[ctx.modelName].all()
  },

  show(ctx) {
    return ctx.db.models[ctx.modelName].findById(ctx.id)
  },

  async create(ctx) {
    ctx.debug('body', ctx.req.body)
    let model = await ctx.db.models[ctx.modelName].create(ctx.req.body)
    ctx.body = model
  },

  async update(ctx) {
    ctx.debug('body', ctx.req.body)
    let model = await ctx.db.models[ctx.modelName].findById(ctx.id)
    if (model == null) return
    Object.assign(model, ctx.req.body)
    await model.save()
    ctx.body = model
  },

  delete(ctx) {
    return ctx.db.models[ctx.modelName].delete(ctx.id)
  }
}
