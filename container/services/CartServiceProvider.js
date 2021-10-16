var cart = require("../modules/Cart");

class CartServiceProvider {
  static boot() {
    return cart
  }
}
module.exports = CartServiceProvider;