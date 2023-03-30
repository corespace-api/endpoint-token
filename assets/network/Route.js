class Route {
    constructor(name, dep, utils) {
        this.name = name;
        this.dep = dep;
        this.utils = utils;
        this.router = utils.router;
    }

    rootRoute() {
        this.router.get("/", (req, res) => {
            res.send("Hello World!");
        });
    }

    load() {
        this.init();
        this.rootRoute();
    }
}

module.exports = Route;