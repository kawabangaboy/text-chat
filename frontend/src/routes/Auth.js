import React, { useState, useContext } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import { ctx } from "../store";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
    height: "95vh",
    margin: "30px",
    "& > *": {
      margin: theme.spacing(1)
    }
  },
  flexCol: {
    display: "flex"
  }
}));

const Auth = () => {
  const [name, setName] = useState("");
  const classes = useStyles();
  let history = useHistory();
  const { state, login } = useContext(ctx);
  const { nickname, room,error } = state;
  if (nickname) {
    history.push(`/chat?room=${room}`);
  }

  return (
    <Paper elevation={3} className={classes.root}>
      <Typography variant="h3" component="h2">
        Welcome to text-chat-app
      </Typography>
      <Typography variant="h4" component="h2">
        Enter your name please
      </Typography>

      <TextField
        required
        label="Name"
        value={name}
        error={error}
        helperText={error && `Username is not available`}
        onChange={e => setName(e.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          name && login(name, room);
        }}
      >
        ENTER CHAT
      </Button>
    </Paper>
  );
};

export default Auth;
