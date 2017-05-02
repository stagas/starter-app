import CrudService from 'api/services/crud'

export default app => {
  return {
    crud: CrudService(app),
    login: (data) => {
      app.debug('login')(data)
      return {}
    },
    logout: (data) => {
      app.debug('logout')(data)
      return {}
    }
  }
}
