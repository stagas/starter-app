export default {
  async login(ctx) {
    ctx.debug('login')
    ctx.body = await ctx.services.login(ctx.request.body)
    if (ctx.body === null) ctx.throw(400)
  },
  async logout(ctx) {
    ctx.debug('logout')
    ctx.body = await ctx.services.logout(ctx.request.user)
    if (ctx.body === null) ctx.throw(400)
  }
}
