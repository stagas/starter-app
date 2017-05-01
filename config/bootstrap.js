import services from './services'

export default app => {
  app.services = services(app)

  app.use((ctx, next) => {
    ctx.db = app.db
    ctx.services = app.services

    ctx.user = {
      permissions: [
        'read:hello',
        'update:hello',
        'read:foo',
        'read:posts',
        'create:posts',
        'create:authors',
        'read:authors',
        'update:authors',
        'delete:authors'
      ]
    }

    return next()
  })
}
