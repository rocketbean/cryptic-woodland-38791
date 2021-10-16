const User = require("../Models/User");
const adapter = require("../../package/framework/chasi/adapters/adapters")
const mongoose = require("mongoose")
const ObjectId = mongoose.Types.ObjectId; 
const Controller = require("../../package/statics/Controller");

class UserController extends Controller {

    static unguarded = ['name', 'alias', 'avatar'];
    /**
     * Access to Chasi Service Container
     * via Adapter Service
     * @param {Adapter}
     * @return {Mailer} 
     */
    get mailer () {

        return adapter.getService("Mailer")
    }

    /**
     * @param {*} req 
     * @returns {User, token[String]}
     */
    async login (req) {
        try {
            const user = await User.findByCredentials(req.body.email, req.body.password);
            await user.populate('notifications').execPopulate()
            const token = await user.generateAuthToken('api');
            return {user, token}
        } catch(e) {
            throw {status: 400, message: e.message}
        }

    }


    /**
     * @param {*} req 
     * @returns {User, token[String]}
     */
    async credits (req) {
        try {
            return {credits: req.auth.user.credits}
        } catch(e) {
            console.log(e.message)
            throw {status: 400, message: e.message}
        }

    }
    
    /**
     * @param {Body [UserData] } req 
     * @returns {User, token[String]}
     */
    async register (req) {
        try {
            req.body.avatar = "https://www.sibberhuuske.nl/wp-content/uploads/2016/10/default-avatar.png";
            const user = await new User(req.body).save()
            const cart = await this.models.cart.create({owner: user._id});
            const token = await user.generateAuthToken('api')
            return {user, token};
        } catch (e) {
            throw {status: 400, message: e.message}
        }

    }

    /**
     * @param { File [BigInt64ArrayConstructor] } req[Binary]
     * @returns { fileObject }
     */
    async avatar (req) {

        let sec = Object.keys(req.body.files).map(f => f);
        return {filename: req.body.files[sec[1]].public}
    }
}

module.exports = new UserController();