import React, { createContext, useReducer } from "react";
import io from 'socket.io-client';


export const ctx = createContext();
export const RECIEVE_MSG = "RECIEVE_MSG";

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
const reducer = (state, action) => {
  const { type, text, room, name } = action;
  switch (type) {
    case RECIEVE_MSG:
      return {
        ...state,
        [room]: [...state[room], { name, text, room }]
      };
    default:
      return state;
  }
};



let socket;

const sendChatAction = (value) => {
  console.log(socket)
  socket.on('chat message',value)
}

export default function Store(props) {
  if (!socket) {
    socket = io('http://localhost:3001')
    console.log(socket)
  }
  const [state,dispatch] = useReducer(reducer, initState);
  const { Provider } = ctx;
return <Provider value={{state,sendChatAction}}>{props.children}</Provider>;
}
