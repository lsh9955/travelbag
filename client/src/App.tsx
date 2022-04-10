import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { UploadPage } from "../src/components/UploadPage/UploadPage";
import { LandingPage } from "./components/LandingPage/LandingPage";
import "./App.css";
import { MainPage } from "./components/MainPage/MainPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/write" element={<UploadPage />} />
      </Routes>
    </Router>
  );
}

export default App;
