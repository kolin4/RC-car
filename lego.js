var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var Gpio = require('onoff').Gpio; 
var ENGINE_UP = new Gpio(26, 'out'); 
var ENGINE_DOWN = new Gpio(19, 'out')
var ENGINE_LEFT = new Gpio(20, 'out')
var ENGINE_RIGHT = new Gpio(21, 'out')


app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});


io.on('connection', function (socket) {
  /* ENGINE ON */
  socket.on('up', function () {
    console.log('UPPPP!!');
    ENGINE_UP.writeSync(1)
  })
  socket.on('left', function () {
    console.log('left!!');
    ENGINE_LEFT.writeSync(1)
  })
  socket.on('down', function () {
    console.log('down!!');
    ENGINE_DOWN.writeSync(1)
  })
  socket.on('right', function () {
    console.log('right!!');
    ENGINE_RIGHT.writeSync(1)
  })
  // ENGINE OFF
  socket.on('upRelase', function () {
    ENGINE_UP.writeSync(0)
  })
  socket.on('downRelase', function () {
    ENGINE_DOWN.writeSync(0)
  })
  socket.on('leftRelase', function () {
    ENGINE_LEFT.writeSync(0)
  })
  socket.on('rightRelase', function () {
    ENGINE_RIGHT.writeSync(0)
  })
});



http.listen(3000, function () {
  console.log('listening on *:3000');
});
