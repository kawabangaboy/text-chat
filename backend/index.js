const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const TokenGenerator = require("uuid-token-generator");
const tokgen = new TokenGenerator(); // Default is a 128-bit token encoded in base58
const CHAT_MESSAGE = "CHAT_MESSAGE";
const LOGIN = "LOGIN";
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
/* chat = [
  room :[{socket :1, nickname : 2}]
  ]
*/

chat = {};

io.on("connection", socket => {
  socket.on(CHAT_MESSAGE, msg => {
    console.log("message:" + msg);
    io.emit(CHAT_MESSAGE, msg);
  });
  socket.on("disconnect", () => {
    const rooms = Object.keys(chat);
    for (room of rooms) {
      chat[room] = chat[room].filter(el => el.socket !== socket.id);
    }
    socket.broadcast.emit("USER_DISCONNECT", chat);
  });

  socket.on(LOGIN, ({ nickname, room }) => {
    if (room) {
      console.log(
        chat[room].find(el => {
          el.nickname === nickname;
        })
      );
      if (
        !chat[room].find(el => {
          el.nickname === nickname;
        })
      ) {
        chat[room] = [...chat[room], { nickname, socket: socket.id }];
        socket.emit(LOGIN_SUCCESS, nickname, room, chat[room]);
        socket.broadcast.emit("NEW_USER", chat[room], room);
      } else {
        socket.emit("LOGIN_FAILURE");
      }
    } else {
      const newRoom = tokgen.generate();
      chat[newRoom] = [{ nickname, socket: socket.id }];
      socket.emit(LOGIN_SUCCESS, nickname, newRoom, chat[newRoom]);
    }
  });
  console.log("a user connected");
});

http.listen(3001, function() {
  console.log("listening on *:3001");
});
