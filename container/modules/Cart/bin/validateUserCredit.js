module.exports = async (user, cartItem) => {
  if(user.credits > cartItem.qty) {
    return true
  } else throw new Error(`insufficient credits! please reload your account`)
}