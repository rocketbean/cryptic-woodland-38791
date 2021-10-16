
const Controller = require("../../package/statics/Controller");

class CartController extends Controller {
  get Cart () {
    return this.services.cart
  }
  /**
   * Write a New ModelEntry
   * @param {request} [ExpressRequest] Object
   * @return {} translated as [ExpressResponse] Object
   * */
  async create(request) {
    

  }


  /**
   * adds new item to the cart
   * @param {request} [ExpressRequest] Object
   * @return {} translated as [ExpressResponse] Object
   * */
  async addItem(request) {
    try {
      let cart = await this.Cart.select(request.auth.user)
      await cart.pushCartItem({...request.body})
      let _cart = cart.cart.toJSON()
      _cart.items = await cart.getItems()
      return _cart
    } catch(e) {
      throw {
        status: 400,
        message: e.message
      }
    }

  }

  /**
   * Single ObjectModel[index]
   * @param {request} [ExpressRequest] Object
   * @return {Object} translated as [ExpressResponse] Object
   * */
  async index(request) {
    try {
      let cart = await this.Cart.select(request.auth.user)
      let _cart = cart.cart.toJSON()
      _cart.items = await cart.getItems()
      return _cart
    } catch(e) {
      throw {
        status: 400,
        message: e.message
      }
    }

    
  }

  /**
   * List of ObjectModel[]
   * @param {request} [ExpressRequest] Object
   * @return {Array} translated as [ExpressResponse] Object
   * */
  async list(request) {
    
    
  }

  /**
   * Delete an ObjectModel[]
   * @param {request} [ExpressRequest] Object
   * @return {Bool} translated as [ExpressResponse] Object
   * */
   async delete(request) {
    
  }


  /**
   * update CartItem instance[]
   * @param {request} [ExpressRequest] Object
   * @return {Bool} translated as [ExpressResponse] Object
   * */
  async updateItem(request) {

  }

  /**
   * Update an ObjectModel[]
   * @param {request} [ExpressRequest] Object
   * @return {Object} translated as [ExpressResponse] Object
   * */
  async update(request) {
    try {
      const updates = Object.keys(request.body)
      updates.forEach((update) => {
        request.params._cart[update] = request.body[update]
      })
      return await request.params._cart.save();
    } catch(e) {
      throw {
        status: 400,
        message: e.message
      }
    }

  }
}

module.exports = new CartController()