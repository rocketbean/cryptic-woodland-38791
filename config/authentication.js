module.exports = {
    default  : 'jwt',
    gateway  : {
        api: {
            driver: 'jwt',
            enabled: true,
            sessions: true,
            key: 'Chasi',
            model: require('../container/Models/User'),
            AuthRouteExceptions: [
                /**
                 * By default, all routes will
                 * Be protected by [JWT]
                 * to excempt some routes,
                 * it should be registered here..
                 */
                {"m": "GET", "url": "/api/test"}, 
                {"m": "POST", "url": "/api/register"}, 
                {"m": "POST", "url": "/api/login"}, 
            ]
        },
        chasi: {
            driver: 'jwt',
            enabled: true,
            sessions: true,
            key: 'Chasi',
            model: require('../container/Models/User'),
            AuthRouteExceptions: [
                /**
                 * By default, all routes will
                 * Be protected by [JWT]
                 * to excempt some routes,
                 * it should be registered here..
                 */
            ]
        },
        resman: {
            driver: 'jwt',
            enabled: true,
            sessions: true,
            key: 'Chasi',
            model: require('../container/Models/User'),
            AuthRouteExceptions: []
        },
    }
}