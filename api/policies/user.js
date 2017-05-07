export default function allow(permissions, app) {
  let debug = app.debug('policy:user')

  return function user(ctx, next) {
    let hasPermissions = permissions.reduce((p, n) => {
      return p && ctx.user.permissions.indexOf(n) > -1
    }, true)

    debug(ctx.method, permissions, '- authorized:', hasPermissions)

    if (!hasPermissions) {
      ctx.status = 403
    } else {
      return next()
    }
  }
}
