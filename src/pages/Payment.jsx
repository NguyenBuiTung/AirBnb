import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect } from "react";
import { deleteUserBoxApi, userBoxRoomApi } from "../redux/user/userReducer";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { Box, Button, Grid } from "@mui/material";
import { toast } from "react-toastify";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { options } from "./Login";
export default function Payment() {
  const { user } = useSelector(
    (state) => state.persistedReducer.userReducer.userLogin
  );
  const { userBoxRoom } = useSelector(
    (state) => state.persistedReducer.userReducer
  );
  const [value, setValue] = React.useState("female");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    const action = userBoxRoomApi(user.id);
    dispatch(action);
  });
  const deleteBoxRoom = async (id) => {
    // console.log(id)
    try {
      const action = deleteUserBoxApi(id);
      await dispatch(action);
      toast.success("Huỷ chuyến đi thành công", options);
    } catch (error) {
      toast.error(error.response.data.content);
    }
  };
  const handleToast = () => {
    toast.error("Có cái nịt chưa biết làm chức năng này", options);
  };
  return (
    <div className="payment">
      <div
        className="container"
        style={{ paddingBottom: "10px", paddingTop: "10px" }}
      >
        <Grid container spacing={5}>
          <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
            <div
              className="payment-left"
              //   style={{  padding: "0px 40px" }}
            >
              <h3
                style={{
                  fontSize: "30px",
                  margin: "20px 0",
                  fontFamily: "cursive",
                }}
              >
                Xác nhận và thanh toán
              </h3>
              <h4 style={{ fontSize: "20px", fontFamily: "cursive" }}>
                Tất cả chuyến đi của bạn
              </h4>
              <TableContainer component={Paper}>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Mã Phòng</TableCell>
                      <TableCell align="right">Ngày đến</TableCell>
                      <TableCell align="right">Ngày đi</TableCell>
                      <TableCell align="right">Số lượng khách</TableCell>
                      <TableCell align="right">Hành Động</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {userBoxRoom.map((row, index) => (
                      <TableRow
                        key={index}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {row.maPhong}
                        </TableCell>
                        <TableCell align="right">
                          {moment(row.ngayDen).format("DD-MM-YYYY")}
                        </TableCell>
                        <TableCell align="right">
                          {moment(row.ngayDi).format("DD-MM-YYYY")}
                        </TableCell>
                        <TableCell align="right">{row.soLuongKhach}</TableCell>
                        <TableCell align="right">
                          <Button
                            onClick={() => {
                              deleteBoxRoom(row.id);
                            }}
                            type="submit"
                            // fullWidth
                            variant="contained"
                            sx={{
                              mt: 3,
                              mb: 2,
                              textTransform: "none",
                              backgroundColor: "#FB335B",
                            }}
                          >
                            Hủy chuyến đi
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </Grid>
          <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
            <div
              className="payment-right"
              style={{
                marginTop: "108px",
                boxShadow:
                  " rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
                borderRadius: "4px",
              }}
            >
              <div style={{ display: "flex", flexDirection: "column",padding:'20px 20px',fontFamily:'cursive' }}>
                <h3>Chọn cách thanh toán</h3>
                <FormControl>
                  <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={value}
                    onChange={handleChange}
                  >
                    <FormControlLabel
                      value="tienmat"
                      control={<Radio />}
                      label="Thanh toán bằng tiền mặt"
                    />
                    <FormControlLabel
                      value="momo"
                      control={<Radio />}
                      label="Thanh toán bằng momo"
                    />
                    <FormControlLabel
                      value="visa"
                      control={<Radio />}
                      label="Thanh toán bằng visa"
                    />
                    <FormControlLabel
                      value="nit"
                      control={<Radio />}
                      label="Thanh toán bằng cái nịt"
                    />
                  </RadioGroup>
                </FormControl>
                <Button
                  type="submit"
                  onClick={() => {
                    handleToast();
                  }}
                  variant="contained"
                  sx={{
                    mt: 3,
                    mb: 2,
                    textTransform: "none",
                    backgroundColor: "#FB335B",
                    width: "30%",
                  }}
                >
                  Thanh Toán Ngay
                </Button>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
