import React, { createContext, useReducer } from "react";
import io from "socket.io-client";

export const ctx = createContext();
export const RECIEVE_MSG = "RECIEVE_MSG";
export const GET_NAME = "GET_NAME";
export const CHAT_MESSAGE = "CHAT_MESSAGE";
export const CHANGE_ROOM = "CHANGE_ROOM";
export const LOGIN_ERROR = "LOGIN_ERROR";
export const START_LOADING = "START_LOADING";
export const LOADING_SUCCESS = "LOADING_SUCCESS";
export const CREATE_NEW_ROOM = "CREATE_NEW_ROOM";
export const CHECK_NICKNAME = "CHECK_NICKNAME";
export const SET_NICKNAME = "SET_NICKNAME";
const SET_ROOM = "SET_ROOM";

const initState = {
  name: "",
  prevRoom: "",
  error: "",
  loading: false,
  rooms: {}
};

let socket;

const reducer = (state, action) => {
  console.log(state, action);
  const { type, name, text, room, rooms } = action;
  switch (type) {
    case RECIEVE_MSG:
      const updatedRoom = [...state.rooms[room], { name, room, text }];
      return {
        ...state,
        rooms: {
          ...state.rooms,
          [room]: updatedRoom
        }
      };
    case SET_NICKNAME:
      console.log(rooms);
      const newRooms = rooms.reduce((acc,el) => {
        acc[el] = []
        return acc
      },{});
      console.log(newRooms);
      return { ...state, name, rooms: { ...newRooms } };
    case SET_ROOM:
      if (Object.keys(state.rooms).indexOf(room) === -1) {
        state.rooms[room] = [];
      }
      return {
        ...state,
        room
      };
    default:
      return state;
  }
};

const sendChatAction = value => {
  socket.emit(CHAT_MESSAGE, value);
};
const checkNickname = nickname => {
  socket.emit(CHECK_NICKNAME, nickname);
};
const checkRoom = room => {
  socket.emit("CHECK_ROOM", room);
};
const setRoom = dispatch => room => {
  dispatch({ type: SET_ROOM, room });
};

export default function Store(props) {
  const [state, dispatch] = useReducer(reducer, initState);
  const { Provider } = ctx;

  if (!socket) {
    socket = io("http://localhost:3001");

    socket.on(CHAT_MESSAGE, newMsg => {
      dispatch({ type: RECIEVE_MSG, ...newMsg });
    });
    socket.on("NICKNAME_OK", (name, rooms) => {
      dispatch({ type: SET_NICKNAME, name, rooms });
    });
    socket.on("ROOM_OK", room => setRoom(dispatch)(room));
  }

  return (
    <Provider
      value={{
        state,
        sendChatAction,
        dispatch,
        checkNickname,
        setRoom: setRoom(dispatch),
        checkRoom
      }}
    >
      {props.children}
    </Provider>
  );
}
