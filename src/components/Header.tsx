import { AppBar, Toolbar } from "@mui/material";
import Logo from "./shared/Logo";
import { useAuth } from "../context/AuthContext";
import NavLink from "./shared/NavLink";

const Header = () => {
  const auth = useAuth();

  return (
    <AppBar
      position="static"
      sx={{ bgcolor: "transparent", boxShadow: "none" }}
    >
      <Toolbar>
        <Logo />
        <div>
          {auth?.isLoggedIn ? (
            <>
              <NavLink
                to="/chat"
                bgcolor="#00fffc"
                text="Go-to chat"
                textcolor="black"
              />
              <NavLink
                to="/"
                bgcolor="#51538f"
                text="Logout"
                textcolor="white"
                onClick={auth.logout}
              />
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                bgcolor="#00fffc"
                text="Login"
                textcolor="black"
              />
              <NavLink
                to="/signup"
                bgcolor="#51538f"
                text="Signup"
                textcolor="white"
              />
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
