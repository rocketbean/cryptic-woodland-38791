
const Controller = require("../../package/statics/Controller");

class CartItemController extends Controller {
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
    
    
  }

  /**
   * Delete an ObjectModel[]
   * @param {request} [ExpressRequest] Object
   * @return {Bool} translated as [ExpressResponse] Object
   * */
  async delete(request) {
    
  }

  /**
   * purchase an CartItem[]
   * @param {request} [ExpressRequest] Object
   * @return {Object} translated as [ExpressResponse] Object
   * */
  async purchase(request) {
    try {
      let cart = await this.Cart.select(request.auth.user)
      await cart.purchase(request.params._cartitem);
      let _cart = cart.cart.toJSON()
      _cart.items = await cart.getItems()
      this.$io.in(`user:${request.auth.user._id}`).emit('get-item-updates')
      return _cart;
    } catch(e) {
      throw {
        status: 400,
        message: e.message
      }
    }
  }

  /**
   * validate an ObjectModel[]
   * @param {request} [ExpressRequest] Object
   * @return {Object} translated as [ExpressResponse] Object
   * */
  async validateItem(request) {
    try {
      let cart = await this.Cart.select(request.auth.user)
      await cart.validateItemUpdate({...request.params}, request.body.value)
      return true;
    } catch(e) {
      throw {
        status: 400,
        message: e.message
      }
    }

  }
}

module.exports = new CartItemController()