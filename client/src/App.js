import React from "react";

import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import PostDetail from "./components/PostDetail/PostDetail";

import Home from "./components/Home/Home";
import CreatorOrTag from "./components/CreatorOrTag/CreatorOrTag";
import LandingPage from "./components/LandingPage/LandingPage";
import LoginPage from "./components/LoginPage/LoginPage";
import Write from "./components/Write/Write";
const App = () => {
  const user = JSON.parse(localStorage.getItem("profile"));

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={LandingPage} />
        <Route path="/post" exact component={Home} />
        <Route path="/login" exact component={() => (!user ? <LoginPage /> : <Redirect to="/post" />)} />
        <Route path="/posts/search" exact component={Home} />
        <Route path="/post/:id" exact component={PostDetail} />
        <Route path="/write" exact component={Write} />
        <Route path={["/creators/:name", "/tags/:name"]} component={CreatorOrTag} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
