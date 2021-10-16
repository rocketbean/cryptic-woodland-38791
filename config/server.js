module.exports = {
    port: checkout(process.env.port, 443),
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