module.exports = class Test {
    static test(req, res, next) {
        return res.status(200).send({ "message" : "test 성공" });
    };
}
