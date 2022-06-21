const router = require('express').Router();
const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);

class MainRouter {
    constructor () {
        this.router = router;
        this.setHandling();
    }

    setHandling() {
        fs.readdirSync(__dirname)
            .filter(file => {
                return file !== basename;
            })
            .forEach(file => {
                const cur_basename = file.split('.')[0];
                router.use('/api/' + cur_basename , require('./' + cur_basename));
            })
    }
}

module.exports.MainRouter = new MainRouter().router;