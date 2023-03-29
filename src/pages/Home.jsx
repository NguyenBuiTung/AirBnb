import React, { useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import { useDispatch, useSelector } from "react-redux";
import LazyLoad from "react-lazy-load";
import { getDataListRoomApi } from "../redux/user/userReducer";
export default function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    const action = getDataListRoomApi();
    dispatch(action);
  }, []);
  const { listRoom } = useSelector(
    (state) => state.persistedReducer.userReducer
  );
  return (
    <div className="home">
      <section id="boat_services" className="my-5">
        <div className="container">
          <div className="title mb-1">
            <h2>Danh sách phòng cho thuê</h2>
          </div>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              {listRoom.map((item, index) => {
                return (
                  <Grid xs={12} xl={3} lg={4} sm={6} md={4} key={index}>
                    <LazyLoad  offset={100} threshold={0.95}>
                      <Card sx={{ maxWidth: 330 }}>
                        <CardActionArea>
                          <CardMedia
                            component="img"
                            height="140"
                            image={item.hinhAnh}
                            alt="green iguana"
                          />
                          <CardContent>
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="div"
                              style={{ height: "65px", fontSize: "18px" }}
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
