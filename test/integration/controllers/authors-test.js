import flareGun from 'flare-gun'
import joi from 'joi'
import init from '../../../'

let request

before(async function () {
  this.timeout(60000)
  let app = await init().run({
    port: 3000 + (Math.random() * 3000 | 0),
  })
  request = flareGun.route(app.config.baseUrl)
})

describe('/authors', () => {

  it('GET /authors should be an empty array', () => {
    return request
      .get('/authors')
      .expect(200, joi.array().empty())
  })

  it('POST /authors should create an author', () => {
    return request
      .post('/authors', { name: 'John Smith' })
      .expect(201, joi.object({
        id: 1,
        name: 'John Smith',
        createdAt: joi.string(),
        updatedAt: joi.string()
      }))
  })

  it('GET /authors should return 1 author', () => {
    return request
      .get('/authors')
      .expect(200, joi.array().items(
        joi.object({
          id: 1,
          name: 'John Smith',
          createdAt: joi.string(),
          updatedAt: joi.string()
        })
      ))
  })

})
