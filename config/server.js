module.exports = {
    port: process.env.port || 5000,
    staticDir: "storage",
    enableSocketServer: true,
    socketMiddlewares : [
        /**
         * [Socket Middlewares]
         * socket middlewares are registered here
         */
        
        '/middlewares/userSession.mw.js',
    ]
}