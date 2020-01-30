import React, { createContext, useReducer } from "react";
import io from "socket.io-client";

export const ctx = createContext();
export const RECIEVE_MSG = "RECIEVE_MSG";
const CHAT_MESSAGE = 'CHAT_MESSAGE'
/*
  msg { 
    name,
    text,
    room,
    time,
    id,
  }

  state : [
   {
    room1 : [msg,msg,msg]
  },
  {
    room2 : [msg,msg,msg]
  }]
*/
const msg1 = {
  name: "user",
  text: "hello",
  room: "room1"
};
const msg2 = {
  name: "user",
  text: "hello1",
  room: "room2"
};

const initState = {
  room1: [msg1, msg1, msg1],
  room2: [msg2, msg2, msg2]
};
const reducer = (state, { type, text, room, name }) => {
  switch (type) {
    case RECIEVE_MSG:
      console.log("state before", state);
      console.log(state[room]);
      const roomUpdate = [...state[room], { name, room, text }];
      console.log(roomUpdate);
      console.log("state after---", { ...state, [room]: roomUpdate });
      return { ...state, [room]: roomUpdate };
    // return state;
    default:
      return state;
  }
};

let socket;
let name;

const sendChatAction = value => {
  socket.emit(CHAT_MESSAGE, JSON.stringify(value));
};

export default function Store(props) {
  const [state, dispatch] = useReducer(reducer, initState);

  if (!socket) {
    socket = io("http://localhost:3001");
    socket.on(CHAT_MESSAGE, newMsg => {
      console.log(JSON.parse(newMsg));
      dispatch({ type: RECIEVE_MSG, ...JSON.parse(newMsg) });
    });
  }
  if (!name) {
    name = "ivan" + +Math.random(100);
  }

  const { Provider } = ctx;
  return (
    <Provider value={{ state, sendChatAction, name }}>
      {props.children}
    </Provider>
  );
}
