export default {
  async list(ctx) {
    ctx.body = await ctx.services.crud.list(ctx.modelName)
  },

  async show(ctx) {
    ctx.body = await ctx.services.crud.show(ctx.modelName, ctx.id)
  },

  async create(ctx) {
    ctx.body = await ctx.services.crud.create(ctx.modelName, ctx.req.body)
  },

  async update(ctx) {
    ctx.body = await ctx.services.crud.update(ctx.modelName, ctx.id, ctx.req.body)
  },

  delete(ctx) {
    return ctx.services.crud.delete(ctx.modelName, ctx.id)
  }
}
