import React, { useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import { useDispatch, useSelector } from "react-redux";
import LazyLoad from "react-lazy-load";
import {
  getDataDetailApi,
  getDataListCommentApi,
  getDataListRoomApi,
} from "../redux/product/productRoom";
import Carousel from "../components/Carousel";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { options } from "./Login";

export default function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    const action = getDataListRoomApi();
    dispatch(action);
  }, []);
  const navigate = useNavigate();
  const { listRoom } = useSelector(
    (state) => state.persistedReducer.productRoom
  );
  const goToRoom = async (id) => {
    try {
      const action = getDataDetailApi(id);
      const actionTwo = getDataListCommentApi(id);
      await dispatch(action);
      await dispatch(actionTwo);
      navigate(`/room/${id}`);
    } catch (error) {
      toast.error(error.response.data.content, options);
    }
  };
  return (
    <div className="home">
      <Carousel />
      <section id="boat_services" className="my-5">
        <div className="container">
          <div className="title mb-1">
            <h2>Danh sách phòng cho thuê</h2>
          </div>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={3}>
              {listRoom.map((item, index) => {
                return (
                  <Grid xs={12} xl={3} lg={4} sm={6} md={4} key={index}>
                    <LazyLoad height={330} offset={100} threshold={0.95}>
                      <Card
                        sx={{ maxWidth: 330, height: 330 }}
                        onClick={() => {
                          goToRoom(item.id);
                        }}
                      >
                        <CardActionArea>
                          <CardMedia
                            component="img"
                            height="140"
                            image={item.hinhAnh}
                            alt="green iguana"
                          />
                          <CardContent style={{ fontFamily: "cursive" }}>
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="div"
                              style={{ fontSize: "18px" }}
                            >
                              {item.tenPhong}
                            </Typography>
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="div"
                            >
                              {item.giaTien}$
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {item.moTa.length > 75
                                ? item.moTa.substr(0, 75) + "..."
                                : item.moTa}
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                      </Card>
                    </LazyLoad>
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        </div>
      </section>
    </div>
  );
}
