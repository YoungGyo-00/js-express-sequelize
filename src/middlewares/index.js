// Operations that check or maniuplate request prior to controller

const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(403).send('로그인 필요');
        throw new Error('로그인 필요');
    }
}

const isNotLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        next();
    } else {
        res.status(403).send('로그인 상태입니다.');
        throw new Error('로그인 상태입니다.');
    }
}

module.exports = { isLoggedIn, isNotLoggedIn };