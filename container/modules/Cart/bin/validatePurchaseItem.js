
module.exports = async (cartItem) => {
  if(cartItem.qty <= cartItem.item.stock) {
    return true
  } else throw new Error(`insufficient stock for ${cartItem.item.name}`)
}