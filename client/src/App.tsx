import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { UploadPage } from "../src/components/UploadPage/UploadPage";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/write" element={<UploadPage />} />
      </Routes>
    </Router>
  );
}

export default App;
