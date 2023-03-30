Reset = "\x1b[0m"
Bright = "\x1b[1m"
Dim = "\x1b[2m"
Underscore = "\x1b[4m"
Blink = "\x1b[5m"
Reverse = "\x1b[7m"
Hidden = "\x1b[8m"

FgBlack = "\x1b[30m"
FgRed = "\x1b[31m"
FgGreen = "\x1b[32m"
FgYellow = "\x1b[33m"
FgBlue = "\x1b[34m"
FgMagenta = "\x1b[35m"
FgCyan = "\x1b[36m"
FgWhite = "\x1b[37m"

BgBlack = "\x1b[40m"
BgRed = "\x1b[41m"
BgGreen = "\x1b[42m"
BgYellow = "\x1b[43m"
BgBlue = "\x1b[44m"
BgMagenta = "\x1b[45m"
BgCyan = "\x1b[46m"
BgWhite = "\x1b[47m"

class Logger {
    constructor(dep, path, serviceName, serviceId) {
        this.dep = dep;
        this.path = path;
        this.serviceName = serviceName;
        this.serviceId = serviceId;
        this.timestamp = new Date().toISOString();
    }

    generateNewTimestamp() {
        this.timestamp = new Date().toISOString();
    }

    #writeLog(type, message) {
        const logPath = this.path;
        const logUUIDPath = this.dep.path.join(logPath, this.serviceId);
        const logFilePath = this.dep.path.join(logUUIDPath, type);
        const timestamp = this.timestamp.split('T')[0];

        if (!this.dep.fs.existsSync(logPath)) { this.dep.fs.mkdirSync(logPath); }
        if (!this.dep.fs.existsSync(logUUIDPath)) { this.dep.fs.mkdirSync(logUUIDPath); }
        if (!this.dep.fs.existsSync(`${logFilePath}`)) { this.dep.fs.mkdirSync(`${logFilePath}`); }

        // write the log in the file
        this.dep.fs.appendFileSync(this.dep.path.join(logFilePath, `${timestamp}.log`), `${message}\r`);
    }

    log(message) {
        this.generateNewTimestamp();
        const logString = `[${this.timestamp}] ${this.serviceName}: ${message}`;
        console.log(logString);
        this.#writeLog('default', logString, this.uuid);
    }

    error(message) {
        this.generateNewTimestamp();
        const logString = `[${this.timestamp}] ${this.serviceName}: ${message}`;
        console.log(`${FgRed}${logString}${Reset}`);
        this.#writeLog('error', logString, this.uuid);
    }

    success(message) {
        this.generateNewTimestamp();
        const logString = `[${this.timestamp}] ${this.serviceName}: ${message}`;
        console.log(`${FgGreen}${logString}${Reset}`);
        this.#writeLog('default', logString, this.uuid);
    }

    info(message) {
        this.generateNewTimestamp();
        const logString = `[${this.timestamp}] ${this.serviceName}: ${message}`;
        console.log(`${FgBlue}${logString}${Reset}`);
        this.#writeLog('default', logString, this.uuid);
    }
}

module.exports = Logger;