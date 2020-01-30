const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const CHAT_MESSAGE = 'CHAT_MESSAGE'

app.get('/', function(req, res){
  res.send('<h1>Hello world</h1>');
});



io.on('connection', function(socket){
  socket.on(CHAT_MESSAGE, function(msg){
    console.log('message:' + msg)
    io.emit(CHAT_MESSAGE, msg)
  })
  
  console.log('a user connected');


});


http.listen(3001, function(){
  console.log('listening on *:3001');
});