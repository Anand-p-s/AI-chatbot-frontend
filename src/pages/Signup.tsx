import { Box, Button, Typography } from "@mui/material";
import { CiLogin } from "react-icons/ci";
import CustomInput from "../components/shared/CustomInput";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    try {
      toast.loading("signing up", { id: "signup" });
      await auth?.signup(name, email, password);
      toast.success("signed up", { id: "signup" });
    } catch (error) {
      console.log(error);
      toast.error("signup failed", { id: "signup" });
    }
  };

  useEffect(() => {
    if (auth?.isLoggedIn && auth.user) {
      return navigate("/chat");
    }
  }, [auth, navigate]);

  return (
    <Box display={"flex"} width={"100%"} height={"100%"} flex={1}>
      <Box display={{ md: "flex", sm: "none", xs: "none" }} padding={2} mt={2}>
        <img src="robot_PNG.png" alt="Chatbot logo" />
      </Box>
      <Box
        display={"flex"}
        flex={{ xs: 1, md: 0.5 }}
        padding={5}
        mt={5}
        ml={"auto"}
        p={2}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <form
          onSubmit={handleSubmit}
          style={{
            margin: "auto",
            padding: "20px",
            boxShadow: "10px 10px 20px #000",
            borderRadius: "10px",
            border: "none",
          }}
        >
          <Box
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
          >
            <Typography variant="h4" textAlign="center" p={2} fontWeight={600}>
              Sign Up
            </Typography>
            <CustomInput name="name" type="text" label="Name" />
            <CustomInput name="email" type="email" label="Email" />
            <CustomInput name="password" type="password" label="Password" />
            <Button
              type="submit"
              sx={{
                px: 2,
                py: 1,
                mt: 3,
                bgcolor: "#00fffc",
                color: "black",
                ":hover": { bgcolor: "white", color: "black" },
              }}
              endIcon={<CiLogin />}
            >
              Signup
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default Signup;
