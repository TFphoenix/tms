const { SerialPort } = require('serialport')
const { ReadlineParser } = require('@serialport/parser-readline')
const { ARDUINO_PORT, ARDUINO_BAUD_RATE } = require("../config/general.config");

console.log('\x1b[34m%s\x1b[0m', 'Initializing Arduino service...');

// Serial port definition
const port = new SerialPort({
    path: ARDUINO_PORT,
    baudRate: ARDUINO_BAUD_RATE,
});

// Serial port parser
const parser = port.pipe(new ReadlineParser());

// Read data handle
parser.on("data", function (line) {
    console.log('\x1b[44m%s\x1b[0m', line);
});

// Errors handle
port.on('error', function (err) {
    console.log('\x1b[31m%s\x1b[0m', `Error: ${err.message}`);
});

setTimeout(() => {
    console.log('\x1b[32m%s\x1b[0m', 'Arduino service initialized');
}, 3000);

// Write the data to the serial port
setInterval(function () {

    port.write("THIS IS MY MESSAGE\n", function (err) {
        if (err) {
            console.log(`Error: ${err}`);
        }
    });
    console.log("Message sent");

}, 2000);




