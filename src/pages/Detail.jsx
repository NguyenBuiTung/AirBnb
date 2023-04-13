import React, { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import Checkbox from "@mui/material/Checkbox";
import WashOutlinedIcon from "@mui/icons-material/WashOutlined";
import IronOutlinedIcon from "@mui/icons-material/IronOutlined";
import OndemandVideoOutlinedIcon from "@mui/icons-material/OndemandVideoOutlined";
import HvacOutlinedIcon from "@mui/icons-material/HvacOutlined";
import WifiOutlinedIcon from "@mui/icons-material/WifiOutlined";
import KitchenOutlinedIcon from "@mui/icons-material/KitchenOutlined";
import LocalParkingOutlinedIcon from "@mui/icons-material/LocalParkingOutlined";
import PoolOutlinedIcon from "@mui/icons-material/PoolOutlined";
import TableRestaurantOutlinedIcon from "@mui/icons-material/TableRestaurantOutlined";
import Paper from "@mui/material/Paper";
import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";
// import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";

import { DateField } from "@mui/x-date-pickers/DateField";

import {toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import dayjs from "dayjs";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Avatar, Divider } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { commentApi } from "../redux/product/productRoom";
import { useNavigate } from "react-router-dom";
import BoxRoom from "../components/BoxRoom";
import { options } from "./Login";


export default function Detail() {
 
  const { listRoomDetail } = useSelector(
    (state) => state.persistedReducer.productRoom
  );
  const { listCommentDetail } = useSelector(
    (state) => state.persistedReducer.productRoom
  );
  const { user } = useSelector(
    (state) => state.persistedReducer.userReducer.userLogin
  );
  const dispatch = useDispatch();
  const [value, setValue] = React.useState();
  const formattedDate = moment(value).format("DD/MM/YYYY");
  // console.log(formattedDate)
  const navigate = useNavigate();
  const {
    register,
    // formState: { errors },
    handleSubmit,
  } = useForm();
  const [fullName, setFullName] = useState('');
  const onSubmitComment = async (data) => {
    try {
      const comment = {
        id: user.id,
        maPhong: listRoomDetail.id,
        maNguoiBinhLuan: user.id,
        ngayBinhLuan: `${formattedDate}`,
        noiDung: data.noiDung,
        saoBinhLuan: 0,
      };
      const action = commentApi(comment);
      await dispatch(action);
      setFullName('');
    } catch (error) {
      // console.log(error)
      toast.error("Vui lòng đăng nhập để bình luận", options);
    }
  };
  return (
    <div className="container room">
      <img className="w-100" src={listRoomDetail.hinhAnh} alt="" />
      <div style={{ display: "flex", justifyContent: "flex-start" }}>
        <div className="room-left" style={{ width: "70%", padding: "0 10px" }}>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container>
              <Grid
                xs={12}
                md={6}
                lg={6}
                xl={6}
                style={{ padding: "10px 10px" }}
              >
                <h4>{listRoomDetail.tenPhong}</h4>
                <p className="box-price">{listRoomDetail.giaTien}$</p>
              </Grid>
              <Grid
                xs={12}
                md={6}
                lg={6}
                xl={6}
                style={{ padding: "10px 10px" }}
              >
                <p>Khach:{listRoomDetail.khach}</p>
                <p>Phong ngủ:{listRoomDetail.phongNgu}</p>
                <p>Giường:{listRoomDetail.giuong}</p>
                <p>Phòng tắm:{listRoomDetail.phongTam}</p>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <h2 style={{ width: "100%" }}>Thông tin thêm về căn hộ</h2>
              <p>{listRoomDetail.moTa}</p>
            </Grid>

            <Grid container spacing={2}>
              <h2 className="title-h2">Nơi này có gì cho bạn</h2>
              <Grid sm={6} xl={6} lg={6} md={6} xs={12}>
                <p className="box-convenient">
                  <WashOutlinedIcon />: Máy giặt
                  <Checkbox
                    checked={listRoomDetail.mayGiat}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                </p>
                <p className="box-convenient">
                  <IronOutlinedIcon />: Bàn là{" "}
                  <Checkbox
                    checked={listRoomDetail.banLa}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                </p>
                <p className="box-convenient">
                  <OndemandVideoOutlinedIcon />: Ti vi{" "}
                  <Checkbox
                    checked={listRoomDetail.tivi}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                </p>
                <p className="box-convenient">
                  <HvacOutlinedIcon />: Điều hòa{" "}
                  <Checkbox
                    checked={listRoomDetail.dieuHoa}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                </p>
                <p className="box-convenient">
                  <WifiOutlinedIcon />: Wifi{" "}
                  <Checkbox
                    checked={listRoomDetail.wifi}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                </p>
              </Grid>
              <Grid sm={6} xl={6} lg={6} md={6} xs={12}>
                <p className="box-convenient">
                  <KitchenOutlinedIcon />: Bếp{" "}
                  <Checkbox
                    checked={listRoomDetail.bep}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                </p>
                <p className="box-convenient">
                  <LocalParkingOutlinedIcon />: Đỗ xe{" "}
                  <Checkbox
                    checked={listRoomDetail.doXe}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                </p>
                <p className="box-convenient">
                  <PoolOutlinedIcon />: Hồ bơi{" "}
                  <Checkbox
                    checked={listRoomDetail.hoBoi}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                </p>
                <p className="box-convenient">
                  <TableRestaurantOutlinedIcon />: Bàn ủi{" "}
                  <Checkbox
                    checked={listRoomDetail.banUi}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                </p>
              </Grid>
            </Grid>
          </Box>
        </div>
        <div className="room-right" style={{ width: "30%", padding: "10px 10px" }}>
          <BoxRoom/>
        </div>
      </div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h2>Bình Luận</h2>

        <Box
          // style={{ display: "flex", alignItems: "center" }}
          component="form"
          onSubmit={handleSubmit(onSubmitComment)}
          noValidate
          sx={{ mt: 1 }}
        >
          <Grid spacing={2}>
            <Grid xl={4} md={12}>
              <TextField
                {...register("noiDung", { required: true })}
                margin="normal"
                required
                id="noiDung"
                name="noiDung"
                autoComplete="noiDung"
                autoFocus
                style={{ margin: "0px" }}
                onChange={event => setFullName(event.target.value)}
                value={fullName}
              />
            </Grid>
       
            <Grid xl={4} md={12}>
              <Button
                style={{ marginLeft: 10, margin: "0px" }}
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Gửi
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Paper style={{ padding: "40px 20px" }}>
        {listCommentDetail.map((item, index) => {
          return (
            <div key={index}>
              <Grid container wrap="nowrap" spacing={2}>
                <Grid style={{ padding: "10px 10px" }} item>
                  <Avatar alt="Remy Sharp" src={item.avatar} />
                </Grid>
                <Grid justifyContent="left" item xs zeroMinWidth>
                  <h4 style={{ margin: 0, textAlign: "left" }}>
                    {item.tenNguoiBinhLuan}
                  </h4>
                  <p className="box-comment" style={{ textAlign: "left" }}>
                    {item.noiDung}
                  </p>
                  <p style={{ textAlign: "left", color: "gray" }}>
                    {item.ngayBinhLuan}
                  </p>
                </Grid>
              </Grid>
              <Divider variant="fullWidth" style={{ opacity: "1" }} />
            </div>
          );
        })}
      </Paper>
    </div>
  );
}
