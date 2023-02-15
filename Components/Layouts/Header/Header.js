import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { resetToken } from "../../../Redux/Slice/TokenSlice";
import { resetUserData } from "../../../Redux/Slice/UserSlice";

function Header() {
  const router = useRouter();
  const pathname = router.pathname;
  const tokenAuth = useSelector((state) => state?.token?.token);
  const dispatch = useDispatch();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const updatedData = useSelector((state) => state?.token?.token);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static" className="marginHeader">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <img
              src={
                "https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png"
              }
              alt="Instagram"
              width={"40px"}
            />
          </Typography>
          {!(
            (pathname == "/" ||
              pathname == "/User/UserForm" ||
              pathname == "/Login/Login") &&
            !updatedData
          ) ? (
            <>
              <Link
                href={"/User/UserList"}
                className={
                  pathname == "/User/UserList" || pathname == "/User/UserForm"
                    ? "activeColor colorText"
                    : "activeColor"
                }
              >
                User List
              </Link>

              <Link
                href={"/Role/RoleList"}
                style={{ marginLeft: "30px" }}
                className={
                  pathname == "/Role/RoleForm" || pathname == "/Role/RoleList"
                    ? "activeColor colorText"
                    : "activeColor"
                }
              >
                Role Listing
              </Link>
            </>
          ) : (
            <>
              <Link
                href={"/"}
                className={
                  pathname == "/" || pathname == "/Login/Login"
                    ? "activeColor colorText"
                    : "activeColor"
                }
              >
                Login
              </Link>
              &nbsp;&nbsp;
              <Link
                href={"/User/UserForm"}
                className={
                  pathname == "/User/UserForm"
                    ? "activeColor colorText"
                    : "activeColor"
                }
                onClick={() => dispatch(resetUserData())}
              >
                Register
              </Link>
            </>
          )}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            ></IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            ></Menu>
          </Box>
          {tokenAuth ? (
            <span
              className="header-btn"
              onClick={() => {
                dispatch(resetToken());
                router.push("/Login/Login");
              }}
            >
              Logout
            </span>
          ) : (
            ""
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
