class Service {
    constructor(serviceName, logPath) {
        this.dep = {};
        this.utils = {};

        this.serviceName = serviceName;
        this.logPath = logPath;
        this.serviceId = null;
    }

    loadCoreDependencies() {
        this.dep.fs = require('fs');
        this.dep.path = require('path');
        this.dep.dotenv = require('dotenv');
        this.dep.crypto = require('crypto');
        this.dep.Logger = require('./Logger.js');
        this.dep.Config = require('./Config.js');
    }

    setServiceName(serviceName) {
        this.serviceName = serviceName;
    }

    createLogger() {
        this.utils.logger = new this.dep.Logger(this.dep, this.logPath, this.serviceName, this.serviceId);

        this.utils.logger.info(`Initializing ${this.serviceName} service...`);
        this.utils.logger.info(`Service ID: ${this.serviceId}`);
    }

    createConfigManager() {
        this.utils.config = new this.dep.Config(this.utils);
        this.utils.config.loadConfig(this.dep.path.join(__dirname, '../../', 'config.json')); 
    }

    initDependencies() {}
    
    init() {
        this.loadCoreDependencies();
        this.serviceId = this.dep.crypto.randomBytes(16).toString("hex");
    }

}

module.exports = Service;