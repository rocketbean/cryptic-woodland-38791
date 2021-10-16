
const Controller = require("../../package/statics/Controller");

class ClaimController extends Controller {

  /**
   * Write a New ModelEntry
   * @param {request} [ExpressRequest] Object
   * @return {} translated as [ExpressResponse] Object
   * */
  async create(request) {
    

  }

  /**
   * Single ObjectModel[index]
   * @param {request} [ExpressRequest] Object
   * @return {Object} translated as [ExpressResponse] Object
   * */
  async index(request) {
    

  }

  /**
   * List of ObjectModel[]
   * @param {request} [ExpressRequest] Object
   * @return {Array} translated as [ExpressResponse] Object
   * */
  async list(request) {
    try {
      let user = await request.auth.user.populate([
        {
          path: 'claims',
          populate: { path: 'item' },
          options: {
            sort: { 'createdAt' : -1 }
          }
        }
      ]).execPopulate();
      return user.claims;
    } catch(e) {
      throw {
        status: 400,
        message: e.message
      }
    }
  }

  /**
   * Delete an ObjectModel[]
   * @param {request} [ExpressRequest] Object
   * @return {Bool} translated as [ExpressResponse] Object
   * */
  async delete(request) {
    
  }

  /**
   * Update an ObjectModel[]
   * @param {request} [ExpressRequest] Object
   * @return {Object} translated as [ExpressResponse] Object
   * */
  async update(request) {
    
    
  }
}

module.exports = new ClaimController()