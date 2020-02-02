import React, { useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { useHistory } from "react-router-dom";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { Typography } from "@material-ui/core";
import { ctx, START_LOADING, LOADING_SUCCESS, CHANGE_ROOM } from "../store";

const useStyles = makeStyles(theme => ({
  root: {
    textAlign: "center",
    margin: "30px",
    "& > *": {
      margin: theme.spacing(1)
    }
  },
  flex: {
    display: "flex",
    alignItems: "center"
  },
  createdRooms: {
    width: "30%",
    height: "300px",
    borderRight: "1px solid gray"
  }
}));

const RoomSelect = () => {
  const classes = useStyles();
  const history = useHistory();
  const { state, checkRoom, setRoom } = useContext(ctx);

  if (!state.name){
    history.push('/')
  }
  if (state.room){
    history.push('/chats')
  }

  console.log(state);
  const rooms = Object.keys(state.rooms);

  const [newRoomName, setNewRoomName] = useState("");

  const changeRoom = e => {
    console.log(e.target.innerText);
  };

  return (
    <Paper className={classes.root}>
      <Typography variant="h3" component="h3" gutterBottom>
        Choose a chat room or create a new one
      </Typography>
      <div className={classes.flex}>
        <div className={classes.createdRooms}>
          <List component="nav" aria-label="main mailbox folders">
            {rooms.map(room => (
              <ListItem
                button
                key={room}
                onClick={e => setRoom(e.target.innerText)}
              >
                <ListItemText primary={room} />
              </ListItem>
            ))}
          </List>
        </div>
        <div className={classes.flex}>
          <TextField
            id="outlined-multiline-flexible"
            label="Room name"
            multiline
            rowsMax="4"
            variant="outlined"
            className={classes.inputArea}
            onChange={e => setNewRoomName(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={() => checkRoom(newRoomName)}
          >
            create room
          </Button>
        </div>
      </div>
    </Paper>
  );
};

export default RoomSelect;
