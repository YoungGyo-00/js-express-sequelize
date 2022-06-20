// Call Services, Respond to client requests
module.exports = class Test {
    static test = async (req, res, next) => {
        return res.status(200).send({ "message" : "test 성공" });
    };
}