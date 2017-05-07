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

describe('/posts', () => {

  it('GET /posts should be an empty array', () => {
    return request
      .get('/posts')
      .expect(200, joi.array().empty())
  })

  it('POST /posts should fail because of missing author relation', () => {
    return request
      .post('/posts', { title: 'A title', body: 'A body', authorId: 1 })
      .expect(400, joi.object({
        message: joi.string()
      }))
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

  it('POST /posts should create a post', () => {
    return request
      .post('/posts', { title: 'A title', body: 'A body', authorId: 1 })
      .expect(201, joi.object({
        id: 1,
        title: 'A title',
        body: 'A body',
        authorId: 1,
        createdAt: joi.string(),
        updatedAt: joi.string()
      }))
  })

  it('GET /posts should return 1 post', () => {
    return request
      .get('/posts')
      .expect(200, joi.array().items(
        joi.object({
          id: 1,
          title: 'A title',
          body: 'A body',
          authorId: 1,
          createdAt: joi.string(),
          updatedAt: joi.string()
        })
      ))
  })

})
