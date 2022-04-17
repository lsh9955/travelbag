import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Avatar, Button, Paper, Grid, Typography, Container } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

import Icon from "./icon";
import { signin, signup } from "../../actions/auth";
import { AUTH } from "../../constants/actionTypes";
import useStyles from "./styles";
import Input from "./Input";

const initialState = { firstName: "", lastName: "", email: "", password: "", confirmPassword: "" };

const LoginPage = () => {
  const [form, setForm] = useState(initialState);
  const [isSignup, setIsSignup] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);

  const switchMode = () => {
    setForm(initialState);
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignup) {
      dispatch(signup(form, history));
    } else {
      dispatch(signin(form, history));
    }
  };

  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
      dispatch({ type: AUTH, data: { result, token } });

      history.push("/posts");
    } catch (error) {
      console.log(error);
    }
  };

  const googleError = () => console.log("로그인에 오류가 발생했습니다. 다시 시도해 주세요");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={6}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {isSignup ? "회원가입" : "로그인"}
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input name="firstName" label="이름" handleChange={handleChange} autoFocus half />
                <Input name="lastName" label="성" handleChange={handleChange} half />
              </>
            )}
            <Input name="email" label="이메일" handleChange={handleChange} type="email" />
            <Input name="password" label="비밀번호" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
            {isSignup && <Input name="confirmPassword" label="비밀번호 확인" handleChange={handleChange} type="password" />}
          </Grid>
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            {isSignup ? "회원가입" : "로그인"}
          </Button>
          <GoogleLogin
            clientId="564033717568-bu2nr1l9h31bhk9bff4pqbenvvoju3oq.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
                구글 로그인(미구현)
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleError}
            cookiePolicy="single_host_origin"
          />
          <Grid container justify="flex-end">
            <Grid item>
              <Button onClick={switchMode}>{isSignup ? "이미 계정이 있으신가요? 로그인" : "계정이 없으신가요? 회원가입"}</Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default LoginPage;
