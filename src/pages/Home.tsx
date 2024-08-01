import { Box } from "@mui/material";
import TypeAnim from "../components/shared/TypeAnim";

const Home = () => {
  return (
    <Box width={"100%"} height={"100%"}>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          flexDirection: "column",
          alignItems: "center",
          mx: "auto",
          mt: 3,
        }}
      >
        <Box my={5} mx={2}>
          <TypeAnim />
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: { md: "row", sm: "column", xs: "column" },
            width: "100%",
            gap: 5,
            my: 10,
          }}
        >
          <img
            src="robo-png.png"
            alt="robot"
            width={"250px"}
            style={{ margin: "auto" }}
          />
          <img
            src="google-gemini-icon.png"
            width={"200px"}
            className="rotate"
            style={{ margin: "auto" }}
          />
        </Box>
        <Box display={"flex"} sx={{ mx: "auto" }}>
          <img
            src="chat.png"
            alt="chat"
            width={"80%"}
            style={{
              boxShadow: "-5px -5px 105px #64f3d5",
              margin: "auto",
              borderRadius: "20px",
              marginTop: "10px",
              marginBottom: "40px",
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
