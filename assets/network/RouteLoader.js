class RouteLoader {
    constructor(dep, utils) {
        this.dep = dep;
        this.utils = utils;
        this.router = this.utils.router;
        this.database = this.utils.database;

        this.routes = [];
        this.routePath = null;
    }

    scanRoutes() {
        this.routePath = this.utils.config.getConfig("routePath");

        if (!this.routePath) { this.utils.logger.error("No route path specified in config.json!"); return; }

        this.utils.logger.log(`Scanning routes in ${this.routePath}...`);

        const files = this.dep.fs.readdirSync(this.routePath);

        for (let i = 0; i < files.length; i++) {
            if (files[i].endsWith(".js")) {
                const route = require(this.dep.path.join("../..", this.routePath, files[i]));
                // get filename without extension as name
                const name = files[i].split(".")[0];
                this.routes.push(new route(name, this.dep, this.utils));
            }
        }

        this.utils.logger.log(`Found ${this.routes.length} routes`);
        this.utils.logger.log(`Routes: ${this.routes.map(route => route.name).join(", ")}`);

        // this.routes.forEach(route => {
        //     route.load();
        // });
    }

}

module.exports = RouteLoader;