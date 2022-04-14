import React from "react";
import { Container } from "@material-ui/core";
import { BrowserRouter, Route, Routes, Router } from "react-router-dom";

import PostDetails from "./components/PostDetails/PostDetails";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import CreatorOrTag from "./components/CreatorOrTag/CreatorOrTag";
import { LandingPage } from "./components/LandingPage/LandingPage";

const App = () => {
  const user = JSON.parse(localStorage.getItem("profile"));

  return (
    <Router>
      <Container maxWidth="xl">
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/posts" element={<Home />} />
          <Route path="/posts/search" element={<Home />} />
          <Route path="/posts/:id" element={<PostDetails />} />
          <Route path={["/creators/:name", "/tags/:name"]} element={<CreatorOrTag />} />
          <Route path="/auth" element={() => (!user ? <Auth /> : <Home />)} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;

// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import { UploadPage } from "../src/components/UploadPage/UploadPage";
// import { LandingPage } from "./components/LandingPage/LandingPage";
// import "./App.css";
// import { MainPage } from "./components/MainPage/MainPage";

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<LandingPage />} />
//         <Route path="/main" element={<MainPage />} />
//         <Route path="/write" element={<UploadPage />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;
