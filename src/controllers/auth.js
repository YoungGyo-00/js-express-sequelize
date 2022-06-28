// call services, respond to client requests
const { AuthService } = require("../services");
const { UserDto } = require("../dto/user");

class AuthController {
    static signup = async (req, res, next) => {
        try {
            const userDto = new UserDto(req.body);
            const result = await AuthService.signup(userDto);

            return res.status(201).send(result);
        } catch (err) {
            next(err);
        }
    };
}

module.exports = { AuthController };
