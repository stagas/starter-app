export default {
  async create(ctx) {
    ctx.body = await ctx.services.crud.create('post', {
      authorId: 1,
      title: 'hello',
      body: 'world'
    })
  }
}
