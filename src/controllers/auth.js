const { AuthService } = require('../services/auth');

class AuthController {
    static signup = async (req, res, next) => {
        try{
            const result = await AuthService.signup(req.body);
            return res.status(201).send(result);
        } catch (err) {
            next(err);
        }
    };
}

module.exports.AuthController = AuthController;