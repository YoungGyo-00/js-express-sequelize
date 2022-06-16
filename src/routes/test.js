const router = require('express').Router();
const Controller = require('../controllers/test');
const { User } = require('../models');

class Test {
    constructor () {
        this.router = router;
        this.getController();
    }

    getController() {
        this.router.get('/', Controller.test);
        
    }
}

module.exports = new Test().router;