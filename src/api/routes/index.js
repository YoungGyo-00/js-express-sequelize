const router = require("express").Router();
const fs = require("fs");
const path = require("path");
const basename = path.basename(__filename);

class MainRouter {
    constructor() {
        this.router = router;
        this.setRouter();
    }

    setRouter() {
        fs.readdirSync(__dirname)
            .filter((file) => {
                return (
                    file.indexOf(".") !== 0 &&
                    file !== basename &&
                    file.slice(-3) === ".js"
                );
            })
            .forEach((file) => {
                const cur_basename = file.split(".")[0];
                router.use(
                    "/api/" + cur_basename,
                    require("./" + cur_basename)
                );
            });
    }
}

module.exports = new MainRouter().router;
