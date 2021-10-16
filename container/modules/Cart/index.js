const Controller = require("../../../package/statics/Controller");
const mongoose = require("mongoose")
const ObjectId = mongoose.Types.ObjectId; 
const calculateItem = require("./bin/calculateItem");
const validatePurchaseItem = require("./bin/validatePurchaseItem");
const validateUserCredit = require("./bin/validateUserCredit");
const socketAdapter = require('../../../package/framework/chasi/adapters/SocketAdapters');
const $io = socketAdapter.$io;

class Cart extends Controller{
  static constructors = ['user', 'cart'];
  
  constructor (user) {
    super()
    this.user = user;
    this.cart = {};
  }


  async initiateSocket (socket) {
      this.socket = socket;
      return true;
  }

  async pushCartItem (property) {
    let item = await this.models.item.findById(property.item)
    if(item.stock < 1) throw new Error("the item reach the stock limit")
    let prop = await this.verifyItem(property.item)
    prop = await calculateItem(property.qty, prop, item)
    await this.setCartStatus(1)
    await prop.save()
  }

  async validateItemUpdate (property, value) {

    let {_cart, _cartitem} = property
    await _cartitem.populate('item').execPopulate();
    if(_cartitem.item.stock < 1) throw new Error("the item reach the stock limit");
    _cartitem.qty = 0
    let prop = await calculateItem(value, _cartitem, _cartitem.item)
    await prop.save()
  }

  async setCartStatus (status) {
    this.cart.status = status
    return await this.cart.save();
  }

  async verifyItem (item) {
    let _itm = this.cart.items.find(_item=> _item.item._id.toString() == item.toString())
    if(!_itm) {
      _itm = await this.models.cartitem.create({
        cart: this.cart._id,
        item: ObjectId(item)
      })
    }
    await this.verify()
    return _itm
  }

  async verify () {
    if(!(await this.models.cart.exists({owner: this.user._id}))) {
      await this.models.cart.create({owner: this.user._id});
    }
    else this.cart = await this.models.cart.findOne({owner: this.user._id});
    this.cart = await this.cart.populate([{
      path: 'items',
      populate: {
        path: 'item'
      }
    }]).execPopulate();
    return this.cart;
  }

  async purchase (cartitem) {
    await cartitem.populate('item').execPopulate();
    await validatePurchaseItem(cartitem);
    await validateUserCredit(this.user, cartitem);
    await this.reduceCredits(this.user, cartitem.qty)
    await this.reduceStock(cartitem.item, cartitem.qty)
    $io.in(`item-update:${cartitem.item._id}`).emit('item-update', cartitem.item)

    await this.models.claims.create({
      user: this.user._id,
      item: cartitem.item._id,
      qty: cartitem.qty,
    })

    await this.models.cartitem.deleteOne({_id: cartitem._id})
  }
  async reduceCredits(user, qty) {
    user.credits -= qty;
    if(user.credits >= 0) {
      await user.save();
    } else throw new Error("insufficient credits!")
  }

  async reduceStock (item, qty) {
    item.stock -= qty;
    if(item.stock >= 0) {
      await item.save();
    } else throw new Error("insufficient stock!")
  }

  async getItems () {
    await this.verify()
    return this.cart.items;
  }

  static async select (user) {
    let cart = new Cart(user);
    await cart.verify();
    return cart;
  }

}

module.exports = Cart