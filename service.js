const Service = require('./assets/utils/Service.js');

class TokenService extends Service {
    constructor(serviceName, logPath) {
        super(serviceName, logPath);
    }

    initDependencies() {
        super.initDependencies();
        const RouteLoader = require('./assets/network/RouteLoader.js');
        this.utils.routeLoader = new RouteLoader(this.dep, this.utils);
    }

    init() {
        super.init();
        this.createLogger();
        this.createConfigManager();
        this.initDependencies();
        this.utils.logger.log(JSON.stringify(this.utils.config.getData()));

        this.utils.routeLoader.scanRoutes();
    }
}

const tokenService = new TokenService("TokenService", "logs");
tokenService.init();