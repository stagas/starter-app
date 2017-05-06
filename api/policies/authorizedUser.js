
export default function allow(permissions) {
  return function authorizedUser(ctx, next) {
    let debug = ctx.app.debug('policy:authorizedUser')

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
