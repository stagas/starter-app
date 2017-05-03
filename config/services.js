import CrudService from 'api/services/crud'

export default app => {
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
