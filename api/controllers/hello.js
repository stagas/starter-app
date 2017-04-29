// controller: hello

module.exports = {
  list(ctx) {
    ctx.res.status(200).send('world')
  },

  show(ctx) {
    ctx.res.status(200).send('world')
  },

  mine(ctx) {
    ctx.res.status(200).send('mine')
  }
}
