import CrudController from 'api/controllers/crud'
import HelloController from 'api/controllers/hello'
import FooController from 'api/controllers/foo'
import PostsController from 'api/controllers/posts'
import AuthorsController from 'api/controllers/authors'
import UserController from 'api/controllers/user'

export default {
  crud: CrudController,
  hello: HelloController,
  foo: FooController,
  posts: PostsController,
  authors: AuthorsController,
  user: UserController
}
