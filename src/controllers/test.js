module.exports = class Test {
    static test = async (req, res, next) => {
        setTimeout(() => {
            return res.status(200).send({ "message" : "test 성공" });
        }, 100);
        console.log('hi');
    };
}