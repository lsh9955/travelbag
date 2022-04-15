import React from "react";
import emptyBag from "../../assets/emptyBag.svg";
import bgVideo from "../../assets/bgVideo.mp4";
import styled from "styled-components";
import zIndex from "@material-ui/core/styles/zIndex";

const LoginPage = () => {
  return (
    <>
      <img src={emptyBag} style={{ width: "600px", zIndex: "1" }} />

      <div style={{ position: "relative", top: "0px", left: "100px", bottom: "0", transform: "skewY(-18deg)", overflow: "hidden", width: "400px", height: "500px" }}>
        <video src={bgVideo} muted loop autoPlay style={{ zIndex: "-1", top: "0", left: "0", minWidth: "100%", minHeight: "200%", objectFit: "contain", transform: "skewY(18deg)" }}></video>
      </div>
    </>
  );
};
export default LoginPage;
