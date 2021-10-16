
  const SessionStorage = require("../../package/framework/storage/session")
  const User = require("../Models/User");

  /*
  * * *
  * 
  * @params {request, response, next}
  * @request [ExpressRequest]
  * @response [ExpressResponse]
  * 
  * @next [Fn] ()
  * * *
  */
  module.exports = async (request, response, next) => {
    if(request.auth.user.accountStatus < 1) {
      response.status(400).send(`user must be an admin`);
    }
    next();
  }