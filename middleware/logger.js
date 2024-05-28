const fs = require('fs');

const logger = (req, res, next) => {
    const logEntry = `${new Date().toISOString()} - ${req.method} ${req.url}\n`;
    fs.appendFile('log.txt', logEntry, (err) => {
        if (err) {
            console.error('Error writing to log file');
        }
    });
    next();
};

module.exports = logger;
