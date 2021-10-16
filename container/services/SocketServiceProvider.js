const OpenSocket = require("../../package/framework/chasi/OpenSocket")

class SocketServiceProvider {
    
    static boot () {
        new OpenSocket({
            name: 'user',
            namespace: 'user.js',
            middlewares: []
        })

        new OpenSocket({
            name: 'item',
            namespace: 'item.js',
            middlewares: []
        })
    }
}

module.exports = SocketServiceProvider