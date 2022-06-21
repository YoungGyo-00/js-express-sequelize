const router = require('express').Router();


class MainRouter {
    constructor () {
        this.router = router;
        this.setHandling();
    }

    setHandling() {
        router.use('/test', require('./test'));
    }
}

module.exports.MainRouter = new MainRouter().router;