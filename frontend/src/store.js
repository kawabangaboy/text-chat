import React, { createContext, useReducer } from "react";
import io from "socket.io-client";

export const ctx = createContext();
export const RECIEVE_MSG = "RECIEVE_MSG";
export const GET_NAME = "GET_NAME";
export const CHAT_MESSAGE = "CHAT_MESSAGE";
const USER_JOIN_ROOM = "USER_JOIN_ROOM";
export const CHANGE_ROOM = "CHANGE_ROOM";
const LOGIN_ERROR = "LOGIN_ERROR"

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
  prevRoom: "",
  error : '',
  rooms: { room1: [msg1, msg1, msg1], room2: [msg2, msg2, msg2] }
};
const reducer = (state, action) => {
  console.log(state, action);
  const { type, name } = action;
  switch (type) {
    case RECIEVE_MSG:
      const { text, room } = action;
      const updatedRoom = [...state.rooms[room], { name, room, text }];
      return {
        ...state,
        rooms: {
          ...state.rooms,
          [room]: updatedRoom
        }
      };
    case GET_NAME:
      return { ...state, name };
    case CHANGE_ROOM:
      return { ...state, prevRoom: action.prevRoom, room: action.room };
    case LOGIN_ERROR:
      return { ...state, error : LOGIN_ERROR}
    default:
      return state;
  }
};

let socket;

const sendChatAction = value => {
  socket.emit(CHAT_MESSAGE, value);
};

export default function Store(props) {
  const [state, dispatch] = useReducer(reducer, initState);
  const { Provider } = ctx;

  if (!socket && state.name) {
    const { rooms, name, prevRoom } = state;
    const room = Object.keys(rooms)[0];

    socket = io("http://localhost:3001");
    socket.emit(USER_JOIN_ROOM, {
      name,
      room,
      prevRoom
    });

    dispatch({ type: CHANGE_ROOM, room, prevRoom: room });

    socket.on(CHAT_MESSAGE, newMsg => {
      console.log(newMsg);
      dispatch({ type: RECIEVE_MSG, ...newMsg });
    });
    socket.on(LOGIN_ERROR, () =>{
      dispatch({ type : LOGIN_ERROR })
    })
  }

  return (
    <Provider value={{ state, sendChatAction, dispatch }}>
      {props.children}
    </Provider>
  );
}
