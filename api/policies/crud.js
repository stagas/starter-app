const permissions = {
  POST: 'create',
  GET: 'read',
  PUT: 'update',
  DELETE: 'delete'
}

export default function crud(ctx, next) {
  let debug = ctx.app.debug('policy:crud')
  let p = permissions[ctx.method] + ':' + ctx.resource

  let hasPermissions = ctx.user.permissions.indexOf(p) > -1
  debug(ctx.method, 'need:', p, '-- has:', hasPermissions, ctx.user.permissions)

  if (!hasPermissions) {
    ctx.status = 403
  } else {
    return next()
  }
}
