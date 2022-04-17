import React from "react";
import videoBg from "../../assets/bgVideo.mp4";
import mainIcon from "../../assets/bagMainIcon.svg";

import LuggageIcon from "@mui/icons-material/Luggage";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";

const LandingPage = () => {
  const theme = useTheme();
  return (
    <>
      <div style={{ position: "relative", top: "0", left: "0", backgroundColor: "rgba(0, 0, 0, 0.8)", width: "100%", height: "100vh", overflow: "hidden" }}>
        <div style={{ height: "40vh", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}></div>
        <div style={{ height: "20vh", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
          <img src={mainIcon} style={{ margin: "0 0 3vw 0" }} />
          <h1 style={{ fontSize: "40px", color: "white", margin: "0 0 0 0", lineHeight: "130%" }}>당신의 여행을 담아드립니다</h1>
        </div>
        <div style={{ height: "20vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Link to="/post" style={{ textDecoration: "none" }}>
            <Button
              size="medium"
              sx={{
                fontSize: "1.3rem",
                backgroundColor: "none",
                color: "white",

                "&:hover": {
                  backgroundColor: "skyblue",
                  cursor: "pointer",
                },
              }}
            >
              Find Out More <LuggageIcon sx={{ color: "white", fontSize: 40, paddingLeft: "0.2rem" }} />
            </Button>
          </Link>
        </div>

        <video src={videoBg} muted loop autoPlay style={{ position: "absolute", zIndex: "-1", top: "0", left: "0", minWidth: "100%", minHeight: "100vh", objectFit: "contain" }}></video>
      </div>
    </>
  );
};
export default LandingPage;
