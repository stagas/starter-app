export default app => {
  app.use((ctx, next) => {
    ctx.db = app.db

    ctx.user = {
      permissions: ['read:hello','update:hello','read:foo','read:posts','create:posts','create:authors','update:authors']
    }

    return next()
  })
}
