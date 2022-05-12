import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Button, Paper, Grid, Typography, Container } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { KAKAO_AUTH_URL } from "../../components/kakao/kakao";
import kakaoIcon from "../../assets/kakao_login_medium_wide.png";
import { signin, signup } from "../../actions/auth";
import { AUTH } from "../../constants/actionTypes";
import useStyles from "./styles";
import Input from "./Input";
import loginBag from "../../assets/loginBag.svg";
import bgVideo from "../../assets/KakaoTalk_20220511_181321420 (1).mp4";

const initialState = { nickname: "", email: "", password: "", confirmPassword: "" };

const LoginPage = () => {
  const [error, setError] = useState(null);
  const errorOccured = useSelector((state) => state.auth.errors);

  const [form, setForm] = useState(initialState);
  const [isSignup, setIsSignup] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);
  useEffect(() => {
    setError(errorOccured);
  }, [errorOccured]);
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

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
      <div style={{ position: "relative", width: "700px" }}>
        <img src={loginBag} style={{ zIndex: "100" }} />
        <video src={bgVideo} muted loop autoPlay style={{ position: "absolute", width: "400px", height: "430px", top: "150px", left: "100px", zIndex: "-2", objectFit: "cover" }}></video>
      </div>

      <Container component="main" maxWidth="xs">
        <Paper className={classes.paper} elevation={6}>
          <Typography component="h1" variant="h5">
            {isSignup ? "회원가입" : "로그인"}
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {isSignup && <Input name="nickname" label="닉네임" handleChange={handleChange} autoFocus />}
              <Input name="email" label="이메일" handleChange={handleChange} type="email" />
              <Input name="password" label="비밀번호" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
              {isSignup && <Input name="confirmPassword" label="비밀번호 확인" handleChange={handleChange} type="password" />}
            </Grid>
            <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
              {isSignup ? "회원가입" : "로그인"}
            </Button>
            <a href={KAKAO_AUTH_URL}>
              <img src={kakaoIcon} />
            </a>
            <Grid container justify="flex-end">
              <Grid item>
                <Button onClick={switchMode}>{isSignup ? "이미 계정이 있으신가요? 로그인" : "계정이 없으신가요? 회원가입"}</Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
        <div>{!isSignup && error !== null ? error : ""}</div>
      </Container>
    </div>
  );
};

export default LoginPage;
