// Express API 구조 정의서
const router = require('express').Router();

const { AuthController } = require('../../controllers');
const { isLoggedIn, isNotLoggedIn } = require('../middlewares');
const { User } = require('../../models');

class AuthRouter {
    constructor () {
        this.router = router;
        this.setMiddleware();
        this.getController();
        this.postController();
    }

    setMiddleware() {
        router.use((req, res, next) => { // 전역적으로 사용할 수 있는 변수 만들기
            res.locals.user = req.user;
            next();
        })
    }

    getController() {

    }

    postController() {
        this.router.post('/signup', isNotLoggedIn, AuthController.signup);
    }
}

module.exports = new AuthRouter().router;