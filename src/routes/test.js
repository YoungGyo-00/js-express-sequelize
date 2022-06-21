// Express API 구조 정의
const router = require('express').Router();

const { TestController } = require('../controllers/test');
const { User } = require('../models');

class TestRouter {
    constructor () {
        this.router = router;
        this.getController();
    }

    getController() {
        this.router.get('/test', TestController.test);
    }
}

module.exports = new TestRouter().router;