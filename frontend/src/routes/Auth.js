import React, { useState, useContext } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import { ctx } from "../store";

const useStyles = makeStyles(theme => ({
  root: {
    textAlign: "center",
    margin: "30px",
    "& > *": {
      margin: theme.spacing(1)
    }
  }
}));

const Auth = () => {
  const [name, setName] = useState("");
  const classes = useStyles();
  let history = useHistory();
  const { state, dispatch, checkNickname } = useContext(ctx);

  if (state.name){
    history.push('/rooms')
  }

  return (
    <Paper elevation={3} className={classes.root}>
      <TextField
        required
        label="Name"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={() => checkNickname(name)}>
        Primary
      </Button>
    </Paper>
  );
};

export default Auth;
