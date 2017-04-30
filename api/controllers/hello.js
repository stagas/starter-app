// controller: hello

export default {
  list(ctx) {
    ctx.status = 200
    ctx.body = 'world'
  },

  show(ctx) {
    ctx.status = 200
    ctx.body = 'world'
  },

  create(ctx) {
    ctx.status = 200
    ctx.body = 'hello 2'
  },

  update(ctx) {
    ctx.status = 200
    ctx.body = 'ok'
  },

  foo(ctx) {
    ctx.status = 200
    ctx.body = 'hello 1'
  }
}
