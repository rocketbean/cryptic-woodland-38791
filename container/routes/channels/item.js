module.exports = async function (socket) {
  socket.on("item-init", async data => {
    socket.join(`item-update:${data.item._id}`)
  });
}