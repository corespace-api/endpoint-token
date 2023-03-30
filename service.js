const Service = require('./assets/utils/Service.js');

class TokenService extends Service {
    constructor(serviceName, logPath) {
        super(serviceName, logPath);
    }

    initDependencies() {
        super.initDependencies();
    }

    init() {
        super.init();
        this.createLogger();
        this.createConfigManager();
        this.initDependencies();
    }
}

const tokenService = new TokenService("TokenService", "logs");
tokenService.init();