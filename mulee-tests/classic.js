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

// Write dummy data to the serial port
function writeFoo() {
    port.write("THIS IS MY MESSAGE\n", function (err) {
        if (err) {
            console.log(`Error: ${err}`);
        }
    });
    console.log("Message sent");
}

setTimeout(writeFoo, 3000);


