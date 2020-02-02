import React, { createContext, useReducer } from "react";
import io from "socket.io-client";

export const ctx = createContext();
const RECIEVE_MSG = "RECIEVE_MSG";
const LOGIN = "LOGIN";
const NEW_USER = "NEW_USER";
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGIN_FAILURE = "LOGIN_FAILURE";
const CHAT_MESSAGE = "CHAT_MESSAGE";
const USER_DISCONNECT = "USER_DISCONNECT";
export const SET_ROOM = "SET_ROOM";
const initState = {
  room: "",
  nickname: "",
  msgs: [],
  users: [],
  error: false
};

let socket;

const reducer = (state, action) => {
  console.log(state, action.type);
  const { type, nickname, text, room, time, nicknames, chats } = action;
  switch (type) {
    case RECIEVE_MSG:
      return {
        ...state,
        msgs: [...state.msgs, { text, nickname, time }]
      };
    case LOGIN_SUCCESS:
      return { ...state, nickname, room, users: nicknames, error: false };
    case LOGIN_FAILURE:
      return { ...state, error: true };
    case NEW_USER:
      if (state.room === action.newUserRoom) {
        return { ...state, users: nicknames };
      }
      return state;
    case SET_ROOM:
      return { ...state, room };
    case USER_DISCONNECT:
      return { ...state, users: chats[state.room] };
    default:
      return state;
  }
};

const sendChatAction = value => {
  socket.emit(CHAT_MESSAGE, value);
};
const login = (nickname, room) => {
  socket.emit(LOGIN, { nickname, room });
};

export default function Store(props) {
  const [state, dispatch] = useReducer(reducer, initState);
  const { Provider } = ctx;

  if (!socket) {
    socket = io("http://localhost:3001");

    socket.on(CHAT_MESSAGE, newMsg => {
      console.log(newMsg);
      dispatch({ type: RECIEVE_MSG, ...newMsg });
    });

    socket.on(LOGIN_SUCCESS, (nickname, room, nicknames) => {
      console.log(nickname, room, nicknames);
      dispatch({ type: LOGIN_SUCCESS, nickname, room, nicknames });
    });
    socket.on(LOGIN_FAILURE, () => {
      dispatch({ type: LOGIN_FAILURE });
    });
    socket.on(NEW_USER, (nicknames, newUserRoom) => {
      dispatch({ type: NEW_USER, nicknames, newUserRoom });
    });
    socket.on(USER_DISCONNECT, chats => {
      dispatch({ type: USER_DISCONNECT, chats });
    });
  }

  return (
    <Provider
      value={{
        state,
        sendChatAction,
        login,
        dispatch
      }}
    >
      {props.children}
    </Provider>
  );
}
