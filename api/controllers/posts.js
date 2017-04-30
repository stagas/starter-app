// controller: posts

export default {
  async list(ctx) {
    ctx.body = await ctx.db.models.post.all()
  },

  show(ctx) {
    ctx.status = 200
    ctx.body = 'world'
  },

  async create(ctx) {
    ctx.body = await ctx.db.models.post.create({
      authorId: 1,
      title: 'hello',
      body: 'world'
    })
  },

  update(ctx) {
    ctx.status = 200
    ctx.body = 'ok'
  },

  delete(ctx) {
    ctx.status = 200
    ctx.body = 'hello 1'
  }
}
