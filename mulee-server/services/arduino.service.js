const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');
const { ARDUINO_PORT, ARDUINO_BAUD_RATE } = require("../config/general.config");
const { logInfo, logError, logSuccess } = require("./logger.service");

logInfo('arduino', 'Initializing Arduino service...');

// Serial port definition
const port = new SerialPort({
    path: ARDUINO_PORT,
    baudRate: ARDUINO_BAUD_RATE
});

// Serial port parser
const parser = port.pipe(new ReadlineParser());

// Read data handle
parser.on("data", function (line) {
    logInfo('arduino', line);
});

// Errors handle
let lastError = undefined;
port.on('error', function (err) {
    logError('arduino', err.message);
    lastError = err;
});

// Open handle
port.on('open', function (err) {
    logSuccess('arduino', 'Arduino service opened');
});

setTimeout(() => {
    if (!lastError)
        logSuccess('arduino', 'Arduino service initialized');
}, 3000);

// Service functions
exports.writeData = (data) => {
    port.write(`${data}\n`, function (err) {
        if (err) {
            logError('arduino', err);
        }
    });
    logInfo('arduino', 'Message sent');
};





