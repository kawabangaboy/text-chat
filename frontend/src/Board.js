import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import { ctx } from "./store";

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
  rooms: {
    width: "30%",
    height: "300px",
    borderRight: "1px solid gray"
  },
  chatWindow: {
    width: "70%",
    height: "300px",
    padding: "20px"
  },
  inputArea: {
    width: "85%"
  }
}));

const Board = () => {
  const classes = useStyles();

  const { state, sendChatAction, name } = useContext(ctx);
  const rooms = Object.keys(state);

  const [msgText, setMsgText] = useState("");
  const [activeRoom, setActiveRoom] = useState(rooms[0]);

  return (
    <Paper elevation={3} className={classes.root}>
      <Typography variant="h3" component="h3" gutterBottom>
        Chat
      </Typography>
      <Typography variant="h5" component="h3" gutterBottom>
        {activeRoom}
      </Typography>
      <div className={classes.flex}>
        <div className={classes.rooms}>
          <List component="nav" aria-label="main mailbox folders">
            {rooms.map(room => (
              <ListItem
                button
                key={room}
                onClick={e => setActiveRoom(e.target.innerText)}
              >
                <ListItemText primary={room} />
              </ListItem>
            ))}
          </List>
        </div>
        <div className={classes.chatWindow}>
          {state[activeRoom].map((chatMsg, idx) => (
            <div className={classes.flex} key={idx}>
              <Chip label={chatMsg.name} />
              <Typography variant="body1">{chatMsg.text}</Typography>
            </div>
          ))}
        </div>
      </div>
      <div className={classes.flex}>
        <TextField
          id="outlined-multiline-flexible"
          label="Write your message..."
          multiline
          rowsMax="4"
          value={msgText}
          onChange={e => setMsgText(e.target.value)}
          variant="outlined"
          className={classes.inputArea}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            sendChatAction({ name, text: msgText, room: activeRoom });
            setMsgText("");
          }}
        >
          Отправить
        </Button>
      </div>
    </Paper>
  );
};

export default Board;
