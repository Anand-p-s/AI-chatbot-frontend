import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <div
      style={{
        alignItems: "center",
        display: "flex",
        marginRight: "auto",
        gap: "5px",
      }}
    >
      <Link to={"/"}>
        <img
          src="logo1.png"
          alt="chatbot logo"
          width={"50px"}
          height={"50px"}
        />
      </Link>
      <Typography
        sx={{
          display: { md: "block", sm: "none", xs: "none" },
          fontWeight: "800",
          mr: "auto",
          textShadow: "2px 2px 20px #000",
        }}
      >
        <span style={{ fontSize: "20px" }}>MERN</span>-AI
      </Typography>
    </div>
  );
};

export default Logo;
