import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
// import AdbIcon from "@mui/icons-material/Adb";
import { Modal } from "@mui/material";
import Login from "../pages/Login";
import { NavLink, useNavigate } from "react-router-dom";
import { persistor } from "../redux/configStores";
import { ACCESSTOKEN, settings } from "../util/config";
// import Carousel from "./Carousel";
import { useDispatch, useSelector } from "react-redux";
import { getDataListRoomApi } from "../redux/product/productRoom";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: 280, sm: 350 },
  bgcolor: "background.paper",
  borderRadius: "12px",
  boxShadow: 24,
  p: 4,
};
export default function HeaderHome() {
  const { user } = useSelector(
    (state) => state.persistedReducer.userReducer.userLogin
  );
  // const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const dispatch = useDispatch();
  const home = () => {
    const action = getDataListRoomApi();
    dispatch(action);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const getOpenAndClose = () => {
    handleOpen();
    handleCloseUserMenu();
  };
  const OpenAndClose = () => {
    setAnchorElUser(null);
    navigate("/profile");
  };
  const Logout = () => {
    persistor.pause();
    persistor.flush().then(() => {
      settings.delete_cookie("token");
      window.location.href = "/home";
      return persistor.purge();
    });
  };
  const renderLogin = () => {
    if (settings.getCookie(ACCESSTOKEN)) {
      return (
        <>
          <Button
            onClick={() => {
              OpenAndClose();
            }}
            style={{
              fontSize: "16px",
              color: "#000",
              textTransform: "capitalize",
              fontFamily: "serif",
            }}
          >
            Trang Cá Nhân
          </Button>
          <Button
            className="nav-link"
            style={{
              fontSize: "16px",
              color: "#000",
              textTransform: "capitalize",
              fontFamily: "serif",
            }}
            onClick={() => {
              Logout();
            }}
          >
            Đăng xuất
            <i className="fa fa-sign-out-alt ms-2"></i>
          </Button>
        </>
      );
    }
    return (
      <Button
        onClick={() => {
          getOpenAndClose();
        }}
        style={{
          fontSize: "16px",
          color: "#000",
          textTransform: "capitalize",
          fontFamily: "serif",
        }}
      >
        Đăng Nhập
      </Button>
    );
  };
  return (
    <div className="header" style={{ height: "65px" }}>
      <AppBar position="fixed" style={{ backgroundColor: "#fff" }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters style={{ justifyContent: "space-between" }}>
            <NavLink
              onClick={() => {
                home();
              }}
              to={"/"}
            >
              <img
                style={{ width: "90px" }}
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Airbnb_Logo_B%C3%A9lo.svg/2560px-Airbnb_Logo_B%C3%A9lo.svg.png"
                alt=""
              />
            </NavLink>
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt="Remy Sharp"
                    src={settings.getCookie(ACCESSTOKEN) ? user.avatar : ""}
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem style={{ display: "grid" }}>{renderLogin()}</MenuItem>
              </Menu>
            </Box>
          </Toolbar>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                style={{ fontWeight: "700", fontSize: "22px" }}
              >
                Chào mừng bạn đến với Airbnb
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <Login />
              </Typography>
            </Box>
          </Modal>
        </Container>
        {/* <Carousel /> */}
      </AppBar>
    </div>
  );
}
