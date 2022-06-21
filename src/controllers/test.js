// Call Services, Respond to client requests
const { TestService } = require('../services/test');

class TestController {
    static test = async (req, res, next) => {
        try{
            const result = await TestService.test();
            return res.status(200).send(result);
        } catch (err) {
            console.error(err);
            next(err);
        }
    };
}

module.exports.TestController = TestController;