import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import { ctx, SET_ROOM } from "../store";

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
  chatWindow: {
    width: "70%",
    minHeight: "300px",
    padding: "20px",
    borderRight: "1px solid gray"
  },
  participants: {
    width: "30%",
    minHeight: "300px"
  },
  inputArea: {
    width: "85%"
  }
}));

const Chat = () => {
  const classes = useStyles();
  let history = useHistory();
  const { state, sendChatAction, dispatch } = useContext(ctx);
  const { room, nickname } = state;
  const [msgText, setMsgText] = useState("");

  if (!nickname) {
    const { search } = history.location;
    dispatch({ type: SET_ROOM, room: search.slice(6) });
    history.push("/");
  }
  const sendMsg = () => {
    if (!msgText) return;
    const date = new Date();
    sendChatAction({
      nickname,
      text: msgText,
      room,
      time: `${date.getHours()}:${date.getMinutes()}`
    });
    setMsgText("");
  };

  return (
    <Paper elevation={3} className={classes.root}>
      <Typography variant="h3" component="h3" gutterBottom>
        Chat
      </Typography>
      <Typography variant="h5" component="h3" gutterBottom>
        You are now in {room}
      </Typography>
      <div className={classes.flex}>
        <div className={classes.chatWindow}>
          {state.msgs.map((chatMsg, idx) => (
            <div className={classes.flex} key={idx}>
              <Chip label={chatMsg.nickname} />
              <Typography variant="body1">{chatMsg.text}</Typography>
              <Typography variant="body1">{chatMsg.time}</Typography>
            </div>
          ))}
        </div>
        <div className={classes.participants}>
          <List>
            {state.users.map((user, idx) => (
              <ListItem key={idx}>
                <AssignmentIndIcon />
                <ListItemText primary={user.nickname} />
              </ListItem>
            ))}
          </List>
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
        <Button variant="contained" color="primary" onClick={sendMsg}>
          Отправить
        </Button>
      </div>
    </Paper>
  );
};

export default Chat;
