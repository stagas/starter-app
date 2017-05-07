export default {
  async list(ctx) {
    ctx.body = await ctx.services.crud.list(ctx.params.model)
  },

  async show(ctx) {
    ctx.body = await ctx.services.crud.show(ctx.params.model, ctx.params.id)
    if (ctx.body === null) ctx.throw(404)
  },

  async create(ctx) {
    try {
      ctx.body = await ctx.services.crud.create(ctx.params.model, ctx.request.body)
      ctx.status = 201
    } catch (e) {
      ctx.body = { message: e.message }
      ctx.status = 400
    }
  },

  async update(ctx) {
    ctx.body = await ctx.services.crud.update(ctx.params.model, ctx.params.id, ctx.request.body)
    if (ctx.body === null) ctx.throw(404)
  },

  async delete(ctx) {
    if (!(await ctx.services.crud.delete(ctx.params.model, ctx.params.id))) {
      ctx.throw(404)
    } else {
      ctx.status = 200
    }
  }
}
