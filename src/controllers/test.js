// Call Services, Respond to client requests
const TestService = require('../services/test');

class TestController {
    static test = async (req, res, next) => {
        const result = await TestService.test("hi");
        return res.status(200).send(result);
    };
}

module.exports = TestController;