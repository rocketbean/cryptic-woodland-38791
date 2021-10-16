
module.exports = (qty, property, item) => {
  let total = Number(qty) + Number(property.qty);

  if(Number(item.stock) < total) {
    throw new Error("insufficient stock")
  }
  
  property.qty = total;
  return property;
}