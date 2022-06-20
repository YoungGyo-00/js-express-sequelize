// Call Services, Respond to client requests
const TestService = require('../services/test');

module.exports = class Test {
    static test = async (req, res, next) => {
        const result = await TestService.test("hi");
        return res.status(200).send(result);
    };
}