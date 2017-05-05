import CrudService from '../api/services/crud'

export default app => {
  return {
    crud: CrudService(app)
  }
}
