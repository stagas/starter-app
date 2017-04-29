// controller: hello

module.exports = {
  list(ctx) {
    ctx.res.status(200).send('world')
  },

  show(ctx) {
    ctx.res.status(200).send('world')
  },

  create(ctx) {
    ctx.res.status(200).send('hello 2')
  },

  foo(ctx) {
    ctx.res.status(200).send('hello 1')
  }
}
