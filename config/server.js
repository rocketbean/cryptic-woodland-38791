module.exports = {
    port: checkout(process.env.PORT, 5000),
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