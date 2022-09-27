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
// port.on('error', function (err) {
//     console.log('Error: ', err.message)
// })



// Write the data to the serial port
setInterval(function () {

    port.write("THIS IS MY MESSAGE\n", function (err) {
        if (err) {
            console.log(`Error: ${err}`);
        }
    });
    console.log("Message sent");

}, 2000);



