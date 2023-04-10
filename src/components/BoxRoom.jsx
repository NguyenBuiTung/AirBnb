import React, { useRef, useState } from "react";
import { ThemeProvider } from "@emotion/react";
import {
  Box,
  Button,
  Container,
  CssBaseline,
  // InputLabel,
  TextField,
  createTheme,
} from "@mui/material";

import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import * as yup from "yup";
// import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import moment from "moment";
import { Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { boxRoomApi } from "../redux/user/userReducer";
// import { toast } from "react-toastify";
// import { options } from "../pages/Login";
import { useNavigate } from "react-router-dom";
const schema = yup.object().shape({
  form1: yup.string().nullable(true),
  form2: yup.string().nullable(true),
});

export default function BoxRoom() {
  const theme = createTheme();
  const { listRoomDetail } = useSelector(
    (state) => state.persistedReducer.productRoom
  );
  const { user } = useSelector(
    (state) => state.persistedReducer.userReducer.userLogin
  );
  const dispatch = useDispatch();
  const { handleSubmit, control } = useForm({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();
  const ref = useRef();
  const [people, setPeople] = useState(1);
  const handleChange = (event) => {
    ref.current = event.target.value;
    // console.log(ref.current);
    setPeople(event.target.value);
  };
  const submitForm = async (data) => {
    try {
      const boxRoom = {
        id: user.id,
        maPhong: listRoomDetail.id,
        ngayDen: `${moment(data.form1).format("DD-MM-YYYY")}`,
        ngayDi: `${moment(data.form2).format("DD-MM-YYYY")}`,
        soLuongKhach: ref.current === undefined ? 1 : ref.current,
        maNguoiDung: user.id,
      };
      //   console.log(boxRoom);
      const action = boxRoomApi(boxRoom);
      await dispatch(action);
      navigate("/payment");
    } catch (error) {
      // navigate("/login");
    }
  };
  return (
    <ThemeProvider theme={theme}>
      <Container
        component="div"
        maxWidth="xs"
        style={{
          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
          borderRadius: "20px",
          position: "sticky",
          top: "90px",
        }}
      >
        <CssBaseline />
        <Box
          sx={{
            // marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: "20px",
              marginBottom: "10px",
            }}
          >
            {listRoomDetail.giaTien}$/
            <span style={{ fontSize: "14px" }}>đêm</span>
          </div>
          <Box
            component="form"
            onSubmit={handleSubmit(submitForm)}
            style={{ width: "100%" }}
          >
            <div noValidate className="signup-form">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Controller
                  name="form1"
                  control={control}
                  defaultValue={null}
                  rules={{ required: true }}
                  render={({
                    field: { onChange, value },
                    fieldState: { error, invalid },
                  }) => (
                    <DatePicker
                      label="Nhận phòng"
                      disableFuture
                      value={value}
                      onChange={(value) => onChange(value)}
                      renderInput={(params) => (
                        <TextField
                          helperText={invalid ? error.message : null}
                          id="form1"
                          variant="standard"
                          margin="dense"
                          fullWidth
                          color="primary"
                          autoComplete="bday"
                          {...params}
                          error={invalid}
                        />
                      )}
                    />
                  )}
                />
                <Controller
                  name="form2"
                  control={control}
                  defaultValue={null}
                  render={({
                    field: { onChange, value },
                    fieldState: { error, invalid },
                  }) => (
                    <DatePicker
                      label="Trả phòng"
                      value={value}
                      onChange={(value) => onChange(value)}
                      renderInput={(params) => (
                        <TextField
                          helperText={invalid ? error.message : null}
                          id="form2"
                          variant="standard"
                          margin="dense"
                          fullWidth
                          color="primary"
                          autoComplete="bday"
                          {...params}
                          error={invalid}
                        />
                      )}
                    />
                  )}
                />
              </LocalizationProvider>
            </div>
            <FormControl fullWidth>
              {/* <InputLabel id="khach" style={{ fontSize: "10px" }}>
                Khách
              </InputLabel> */}
              <Select
                name="khach"
                labelId="khach"
                id="khach"
                value={people}
                style={{ borderRadius: 0 }}
                onChange={handleChange}
              >
                <MenuItem value={1}>1 khách</MenuItem>
                <MenuItem value={2}>2 khách</MenuItem>
                <MenuItem value={3}>3 khách</MenuItem>
                <MenuItem value={4}>4 khách</MenuItem>
                <MenuItem value={5}>5 khách</MenuItem>
                <MenuItem value={6}>6 khách</MenuItem>
                <MenuItem value={7}>7 khách</MenuItem>
                <MenuItem value={8}>8 khách</MenuItem>
              </Select>
            </FormControl>
            <Button
              style={{ backgroundColor: "#FB335B" }}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Đặt phòng
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
