import React, { createContext, useReducer } from "react";
import io from "socket.io-client";

export const ctx = createContext();
export const RECIEVE_MSG = "RECIEVE_MSG";
export const GET_NAME = "GET_NAME";
const CHAT_MESSAGE = "CHAT_MESSAGE";
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
  name: "",
  rooms: { room1: [msg1, msg1, msg1], room2: [msg2, msg2, msg2] }
};
const reducer = (state, action) => {
  const { type, name } = action;
  switch (type) {
    case RECIEVE_MSG:
      const { text, room } = action;
      console.log(state);
      const roomUpdate = [...state.rooms[room], { name, room, text }];
      const newState = JSON.parse(JSON.stringify(state))
      newState.rooms[room] = roomUpdate
      return newState;
    case GET_NAME:
      return { ...state, name };
    default:
      return state;
  }
};

let socket;

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

  const { Provider } = ctx;
  return (
    <Provider value={{ state, sendChatAction, dispatch }}>
      {props.children}
    </Provider>
  );
}
