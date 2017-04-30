export default {
  async show(ctx) {
    ctx.debug('async')

    let data = await new Promise(resolve => {
      setTimeout(() => {
        ctx.debug('resolve')
        resolve('foo')
      }, 2000)
    })

    ctx.status = 200
    ctx.body = data
  }
}
