const SerialPort = require("serialport");
const Readline = require("@serialport/parser-readline");

// Defining the serial port
const port = new SerialPort("COM5", {
    baudRate: 9600,
});

// The Serial port parser
const parser = new Readline();
port.pipe(parser);

// Read the data from the serial port
parser.on("data", (line) => console.log(line));

// Open errors will be emitted as an error event
port.on('error', function (err) {
    console.log('Error: ', err.message)
})

// const encoder = new TextEncoder();
// const writer = port.writable.getWriter();
// await writer.write(encoder.encode("PING"));
// writer.releaseLock();

setInterval(function () {
    // Write the data to the serial port
    port.write("ROBOT POWER ON\r\n", function (err) {
        console.log(err);
    });
    // port.flush();

    console.log("Message sent");
}, 100);