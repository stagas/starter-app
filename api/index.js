import { singular } from 'pluralize'
import models from './models'

let api = {}

export default api

api.bootstrap = async app => {
  let debug = app.debug('bootstrap')

  app.controllers = api.controllers
  app.policies = api.policies
  app.services = api.services(app)

  app.router.all('/:resource/:id?', (ctx, next) => {
    ctx.params.model = singular(ctx.params.resource)
    ctx.params.model = ctx.params.model[0].toUpperCase() + ctx.params.model.slice(1)
    return next()
  })

  app.use((ctx, next) => {
    ctx.db = app.db
    ctx.services = app.services

    ctx.user = {
      permissions: [
        'read:hello',
        'update:hello',
        'read:foo',
        'read:posts',
        'update:posts',
        'create:posts',
        'create:authors',
        'read:authors',
        'update:authors',
        'delete:authors'
      ]
    }

    return next()
  })

  app.db = await models(app.config.db)
}

// controllers

import CrudController from './controllers/crud'
import HelloController from './controllers/hello'
import FooController from './controllers/foo'
import PostsController from './controllers/posts'
import AuthorsController from './controllers/authors'
import UserController from './controllers/user'

api.controllers = {
  crud: CrudController,
  hello: HelloController,
  foo: FooController,
  posts: PostsController,
  authors: AuthorsController,
  user: UserController
}

// policies

import userPolicy from './policies/user'

api.policies = {
  user: userPolicy
}

// services

import CrudService from './services/crud'

api.services = app => {
  return {
    crud: CrudService(app),
    login: (data) => {
      app.debug('login')(data)
      return {
        username: data.username,
        email: 'foo@bar.com',
        access_token: '1234abcd'
      }
    },
    logout: (data) => {
      app.debug('logout')(data)
      return ''
    }
  }
}
