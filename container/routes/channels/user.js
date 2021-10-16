module.exports = async function (socket) {
    socket.on("initiate", async data => {
        socket.join('general');
        socket.join(`user:${socket.$userSession.user._id}`);
    });
}