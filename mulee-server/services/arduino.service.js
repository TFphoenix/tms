const { SerialPort } = require('serialport')
const { ReadlineParser } = require('@serialport/parser-readline')
const { ARDUINO_PORT, ARDUINO_BAUD_RATE } = require("../config/general.config");

// Arduino logging
function logError(message) {
    console.log('\x1b[31m[arduino] %s\x1b[0m', `Error: ${message}`);
}

function logInfo(message) {
    console.log('\x1b[34m[arduino] %s\x1b[0m', message);
}

function logSuccess(message) {
    console.log('\x1b[32m[arduino] %s\x1b[0m', message);
}

logInfo('Initializing Arduino service...');

// Serial port definition
const port = new SerialPort({
    path: ARDUINO_PORT,
    baudRate: ARDUINO_BAUD_RATE,
});

// Serial port parser
const parser = port.pipe(new ReadlineParser());

// Read data handle
parser.on("data", function (line) {
    logInfo(line);
});

// Errors handle
port.on('error', function (err) {
    logError(err.message);
});

setTimeout(() => {
    logSuccess('Arduino service initialized');
}, 3000);

// Service functions
exports.writeData = (data) => {
    port.write(`${data}\n`, function (err) {
        if (err) {
            logError(err);
        }
    });
    logInfo('Message sent');
};





