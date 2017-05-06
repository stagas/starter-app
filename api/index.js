import { singular } from 'pluralize'
import models from './models'

export async function bootstrap(app) {
  let debug = app.debug('bootstrap')

  app.controllers = controllers
  app.policies = policies
  app.services = services(app)

  app.router.all('/:resource/:id?', (ctx, next) => {
    debug('resource', ctx.params.resource, 'id', ctx.params.id)
    ctx.params.model = singular(ctx.params.resource)
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
        'create:posts',
        'create:authors',
        'read:authors',
        'update:authors',
        'delete:authors'
      ]
    }

    return next()
  })

  app.db = await models(app.env.db)
}

// controllers

import CrudController from './controllers/crud'
import HelloController from './controllers/hello'
import FooController from './controllers/foo'
import PostsController from './controllers/posts'
import AuthorsController from './controllers/authors'
import UserController from './controllers/user'

export const controllers = {
  crud: CrudController,
  hello: HelloController,
  foo: FooController,
  posts: PostsController,
  authors: AuthorsController,
  user: UserController
}

// policies

import policies from './policies'

// services

import CrudService from './services/crud'

export const services = app => {
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
