const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const cors = require("cors");
const bodyParser = require("body-parser");

const CHAT_MESSAGE = "CHAT_MESSAGE";
const USER_JOIN_ROOM = "USER_JOIN_ROOM";
const LOGIN_ERROR = "LOGIN_ERROR";

app.use(cors());

const users = new Set();

app.get("/check_login", function(req, res) {
  // console.log(req.query);
  console.log(users.has(req.query.name))
  res.json({ isLogin: users.has(req.query.name) });
});

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
  console.log("a user connected");
});

http.listen(3001, function() {
  console.log("listening on *:3001");
});
