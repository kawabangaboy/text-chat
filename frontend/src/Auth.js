import React, { useState, useContext, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import { GET_NAME, ctx } from "./store";

const useStyles = makeStyles(theme => ({
  root: {
    textAlign: "center",
    margin: "30px",
    "& > *": {
      margin: theme.spacing(1)
    }
  }
}));

const fetchParams = {
  method: "GET",
  dataType: "JSON",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded"
  }
};

const Auth = () => {
  const [name, setName] = useState("");
  const classes = useStyles();
  let history = useHistory();
  const { state, dispatch } = useContext(ctx);
  console.log(state);
  useEffect(() => {}, [state.name]);

  return (
    <Paper elevation={3} className={classes.root}>
      <TextField
        required
        label="Name"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          fetch(`http://localhost:3001/check_login?name=${name}`, fetchParams)
            .then(res => res.json())
            .then(res => {
              console.log(res);
              if (!res.isLogin) {
                console.log("huyarim");
              } else {
                console.log("nea");
              }
            });
          // dispatch({ type: GET_NAME, name },(state) => {
          //   console.log(state)
          // });
          // history.push('/chats')
        }}
      >
        Primary
      </Button>
    </Paper>
  );
};

export default Auth;
