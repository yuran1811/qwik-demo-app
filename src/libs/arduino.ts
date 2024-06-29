import { ReadlineParser } from '@serialport/parser-readline';
import { SerialPort } from 'serialport';

const CONFIG = {
  port: '/dev/tty-usbserial1',
  baudRate: 57600,
};

const port = new SerialPort({ path: CONFIG.port, baudRate: CONFIG.baudRate }, function (err) {
  err && console.log('Error: ', err.message);
});

const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }));
parser.on('data', console.log);
