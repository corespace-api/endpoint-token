const fs = require('fs');

class Config {
  constructor(utils) {
    this.config = {}
    this.logger = utils.logger

    this.logger.log("ConfigManager initialized");
  }

  loadConfig(path) {
    if (!path) { this.logger.error(`Error: the path parameter must be set`); return; }
    if (!fs.existsSync(path)) { this.logger.error(`Error: the path ${path} does not exist`); return; }
    const configFileContent = fs.readFileSync(path, "utf-8") ;

    if (!configFileContent) { this.logger.error(`Error: the config file is empty`); return; }
    // check if the config file is valid json
    try {
      this.config = JSON.parse(configFileContent);
      console.log(this.config);
    } catch (e) {
      this.logger.error(`Error: the config file is not a valid json file`);
      return;
    }
  }

  setData(data) {
    if (!data) { this.logger.error(`Error: the data parameter must be set`); return; }
    this.config = data;
  }

  getData() {
    return this.config;
  }

  setConfig(key, value) {
    if (!key) { this.logger.error(`Error: the key parameter must be set`); return;}
    if (!value) { this.logger.error(`Error: the value parameter must be set`); return; } 

    this.config[key] = value;
  }

  getConfig(key) {
    if (!key) { this.logger.error(`Error: the key parameter must be set`); return; }
    return this.config[key];
  }
}

module.exports = Config;