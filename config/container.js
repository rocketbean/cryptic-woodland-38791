module.exports = {
    name: checkout(process.env.APPNAME, 'Chasi'),
    environment: checkout(process.env.environment, 'dev'),
    mode: {
        dev: {
            key: checkout(process.env.SSLcontainerKey, 'null'),
            cert: checkout(process.env.SSLcontainerCrt, 'null'),
            protocol: 'https',
        },
        local: {
            key: checkout(process.env.SSLcontainerKey2, 'null'),
            cert: checkout(process.env.SSLcontainerCrt2, 'null'),
            protocol: 'http',
        }
    },

    /**
     * Chasi will autoload this dirs,
     * look for models it will then bind this 
     * @ [Model|Controller] Class
     */
    modelsDir: [
        'container/Models/'
    ],

    /**
     * install third party apps 
     * into the app container
     */
    LoadPack: {
        'Sessions': 'package/framework/storage/session::init',
        'FileManager': 'container/modules/FileManager::init',
    },

    /**
     * Service Bootstrap
     * boostrapping app services
     */
    ServiceBootstrap: {
        /* * * * * * * * * * * * * * * * * *
         * this settings is mostly for 
         * * * * [Chasi] extensions * * * *
         * this services is left outside the Chasi box due to the
         * interactions developers need to associate with this services,
         * therefore giving more versatility for dev's 
         * 
         */
        'events': 'container/services/EventsServiceProvider',
        'routers': 'container/services/RouterServiceProvider',
        'auth': 'container/services/AuthServiceProvider',
        'sockets': 'container/services/SocketServiceProvider',
        'cart': 'container/services/CartServiceProvider',
        // 'Mailer': 'container/services/MailerServiceProvider',
    },

    /**
     * Middlewares
     * any middlewares pointed to a 
     * route or route group or even in a route 
     * containers, should be registered here
     */
    middlewares: {
        /**
         * Register your middlewares here.
         * [alias] => require("<your middleware path in (container/middlewares/*)>")
         * after registration the middlewares will then 
         * be installed to that Chasi Route MWs Repository,
         * then you can use it in your routes
         */

    }

}
