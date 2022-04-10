import React from "react";
import mainIcon from "../../assets/bagMainIcon.svg";
import mainPicture from "../../assets/mainPicture.jpg";
export const MainPage = () => {
  return (
    <div>
      <nav
        style={{
          height: "auto",
          position: "absolute",
          top: "0",
          transition: "top 0s .1s,opacity .3s cubic-bezier(.38,.41,.27,1),transform .6s cubic-bezier(.38,.41,.27,1)",
          width: "100%",
          zIndex: "200",
          display: "block",
          fontSize: "2rem",
          fontWeight: "bold",
          color: "white",
          lineHeight: "1.3em",
        }}
      >
        <div style={{ alignItems: "center", display: "flex", top: "0", height: "10rem", marginBottom: "5rem", justifyContent: "center" }}>
          <img src={mainIcon} style={{}} />
        </div>
        <img src={mainPicture} style={{ filter: "brightness(80%)", zIndex: "-1", position: "absolute", top: "0", minWidth: "100%", maxHeight: "50vh", objectFit: "cover" }} />
        <div style={{ alignItems: "center", display: "flex", top: "0", height: "10rem", padding: "0 5rem" }}>
          봄에 여행가기 좋은 곳을
          <br />
          소개해드릴게요
        </div>
      </nav>
    </div>
  );
};
