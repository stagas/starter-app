export default {
  async list(ctx) {
    ctx.body = await ctx.services.crud.list(ctx.modelName)
  },

  async show(ctx) {
    ctx.body = await ctx.services.crud.show(ctx.modelName, ctx.id)
    if (ctx.body === null) ctx.throw(404)
  },

  async create(ctx) {
    ctx.body = await ctx.services.crud.create(ctx.modelName, ctx.req.body)
  },

  async update(ctx) {
    ctx.body = await ctx.services.crud.update(ctx.modelName, ctx.id, ctx.req.body)
    if (ctx.body === null) ctx.throw(404)
  },

  async delete(ctx) {
    if (!(await ctx.services.crud.delete(ctx.modelName, ctx.id))) {
      ctx.throw(404)
    } else {
      ctx.status = 200
    }
  }
}
