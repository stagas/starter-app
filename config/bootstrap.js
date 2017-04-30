export default app => {
  app.use((ctx, next) => {
    ctx.user = {
      permissions: ['read:hello','update:hello','read:foo']
    }
    return next()
  })
}
