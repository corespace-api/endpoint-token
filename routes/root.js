const Route = require("../assets/network/Route");

class RootRoute extends Route {
    constructor(name, dep, utils, router) {
        super(name, dep, utils, router);
    }

    rootRoute() {
        this.router.get("/", (req, res) => {
            res.send("Hello World!");
        });
    }

    load() {
        this.rootRoute();
    }
}

module.exports = RootRoute;