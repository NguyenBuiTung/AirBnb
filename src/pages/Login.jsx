import React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { loginApi } from "../redux/user/userReducer";
import { useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://bota.vn/">
        BotaVN
      </Link>
      {new Date().getFullYear()}
    </Typography>
  );
}
export const options = {
  position: "top-center",
  autoClose: 1000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
};
const theme = createTheme();
export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const action = loginApi(data);
      await dispatch(action);
      navigate("/home");
      window.location.reload();
    } catch (error) {
      toast.error(error.response.data.content, options);
    }
  };

  return (
    <div className="login">
      <ThemeProvider theme={theme}>
        <Container component="div" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img
              style={{ width: "90px" }}
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Airbnb_Logo_B%C3%A9lo.svg/2560px-Airbnb_Logo_B%C3%A9lo.svg.png"
              alt=""
            />
            <Typography
              // component="p"
              variant="h4"
              style={{ fontFamily: "cursive" }}
            >
              Đăng Nhập
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                {...register("email", {
                  required: "Vui lòng nhập email",
                  pattern: {
                    value:
                      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: "Email chưa đúng định dạng",
                  },
                })}
                aria-invalid={errors.email ? "true" : "false"}
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              {errors.email?.message && (
                <p
                  style={{
                    fontFamily: "cursive",
                    fontSize: "14px",
                    color: "red",
                  }}
                >
                  {errors.email?.message}
                </p>
              )}
              <TextField
                {...register("password", { required: true })}
                aria-invalid={errors.password ? "true" : "false"}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              {errors.password?.type === "required" && (
                <p
                  style={{
                    fontFamily: "cursive",
                    fontSize: "14px",
                    color: "red",
                  }}
                  role="alert"
                >
                  Vui lòng điền mật khẩu
                </p>
              )}
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Lưu mật khẩu"
              />
              <Button
                style={{ backgroundColor: "#FB335B" }}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Đăng Nhập
              </Button>

              <p className="m-0" style={{ fontFamily: "cursive" }}>
                hoặc
              </p>
              <Button
                style={{ backgroundColor: "#FB335B" }}
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Đăng kí
              </Button>
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </ThemeProvider>
    </div>
  );
}
