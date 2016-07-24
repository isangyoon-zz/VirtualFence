/* CONSTANTS */
const SOCKET_PORT       = process.env.PORT || 3000;
const XBEE_PORT         = process.env.XBEE || 'COM4';
const DATABASE_URL      = 'mongodb://localhost:27017/virtualfence';

/* DEPENDENCIES */
const SerialPortModule  = require('serialport');
const XBeeModule        = require('xbee-api');
const MongoDBModule     = require('mongodb');
const AssertModule      = require('assert');
const SocketIOModule    = require('socket.io');

/* MODULE SETTINGS */
const XBee = new XBeeModule.XBeeAPI({
  "api_mode"      : 1,
  "module"        : "802.15.4",
  "raw_frames"    : false
});

const SerialPort = new SerialPortModule(XBEE_PORT, {
  "baudRate"    : 9600,
  "parser"      : XBee.rawParser()
});

/* SERVER */
const IO = SocketIOModule(SOCKET_PORT);
IO.on('connection', (socket) => {
  socket.on('connect', () => {
    // let client = socket.request.connection._peername;
    // console.log('CONNECTION:', client.address);
  });

  socket.on('animal alert', (payload) => {
    //console.log(JSON.stringify(payload));

    let data;
    if (payload.status === 'Safety')        data = '0';
    else if (payload.status === 'Warning')  data = '1';
    else if (payload.status === 'Danger')   data = '2';
    else if (payload.status === 'Leave')    data = '3';

    let frame = {
        "type"          : 0x01,
        "destination16" : payload.uuid,
        "options"       : 0x00,
        "data"          : '[' + data + ',' + payload.volume + ',' + payload.type + ',' + payload.flag + ']\n'
    };

    SerialPort.write(XBee.buildFrame(frame), (error, result) => {
      SerialPort.drain();
    });
  });

  socket.on('disconnect', () => {
    //console.log('DISCONNECTION:', client.address);
  });
});

// Send GPS Data via Socket
XBee.on('frame_object', (frame) => {
  if(frame.type === 0x81)
  {
    let data = frame.data.toString().slice(1, -2).split(","),
        packet = {
          "uuid"  : frame.remote16,
          "fence" : data[0],
          "lat"   : data[1],
          "lng"   : data[2],
          "alt"   : data[3],
          "speed" : data[4]
        };

    IO.sockets.emit('animal data', JSON.stringify(packet));
  }
});

SerialPort.on('open', (error) => {
});

SerialPort.on('close', () => {
});
