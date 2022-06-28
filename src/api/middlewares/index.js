// Operations that check or maniuplate request prior to controller

const isLoggedIn = async (req, res, next) => {
    try {
        if (req.isAuthenticated()) {
            next();
        } else {
            throw { status: 403, message: "로그인이 필요한 상태입니다" };
        }
    } catch (err) {
        console.error("\nmiddleware index.js isLoggedIn에서 에러");
        next(err);
    }
};

const isNotLoggedIn = async (req, res, next) => {
    console.log(1);
    try {
        console.log(2);
        if (!req.isAuthenticated()) {
            console.log(2);
            next();
        } else {
            throw { status: 403, message: "로그인 상태입니다" };
        }
    } catch (err) {
        console.error("\nmiddleware index.js isNotLoggedIn에서 에러");
        next(err);
    }
};

module.exports = { isLoggedIn, isNotLoggedIn };
