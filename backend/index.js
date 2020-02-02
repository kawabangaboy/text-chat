const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

const CHAT_MESSAGE = "CHAT_MESSAGE";
const USER_JOIN_ROOM = "USER_JOIN_ROOM";

const users = new Set();
const chatState = {
  room1: [],
  room2: []
};

io.on("connection", socket => {
  socket.on(CHAT_MESSAGE, msg => {
    console.log("message:" + msg);
    io.emit(CHAT_MESSAGE, msg);
  });

  socket.on(USER_JOIN_ROOM, ({ name, room, prevRoom }) => {
    if (users.has(name)) {
      socket.emit(LOGIN_ERROR);
    } else {
      users.add(name);
    }
    console.log(name, room, prevRoom);
  });

  socket.on("CHECK_NICKNAME", nickname => {
    const rooms = Object.keys(chatState);
    let isOk = true
    for (room of rooms) {
      if (room.indexOf(nickname) !== -1) {
        socket.emit("NICKNAME_FAILURE");
        isOk = false
        break
      }
    }
    isOk && socket.emit("NICKNAME_OK", nickname, Object.keys(chatState));
  });

  socket.on("CHECK_ROOM", room => {
    if (Object.keys(chatState).indexOf(room) === -1) {
      socket.emit("ROOM_OK",room)
      chatState[room] = []
      console.log(room,chatState)
    }
    else{
      socket.emit("ROOM_FAILURE")
    }
  });

  console.log("a user connected");
});

http.listen(3001, function() {
  console.log("listening on *:3001");
});
