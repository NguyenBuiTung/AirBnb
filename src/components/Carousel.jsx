import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import BeachAccessOutlinedIcon from "@mui/icons-material/BeachAccessOutlined";
import ForestOutlinedIcon from "@mui/icons-material/ForestOutlined";
import NaturePeopleOutlinedIcon from "@mui/icons-material/NaturePeopleOutlined";
import AddHomeWorkOutlinedIcon from "@mui/icons-material/AddHomeWorkOutlined";
import DeckOutlinedIcon from "@mui/icons-material/DeckOutlined";
import ApartmentOutlinedIcon from "@mui/icons-material/ApartmentOutlined";
import { getDataAreaApi } from "../redux/product/productRoom";
import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
export default function Carousel() {
  const [value, setValue] = React.useState(0);
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const handleChange = async (event, newValue) => {
    try {
      const action = getDataAreaApi(newValue);
      await dispatch(action);
      setValue(newValue);
      // navigate("/area");
    } catch (error) {}
  };
  return (
    <div className="carousel">
      <AppBar
        position="sticky"
        style={{
          backgroundColor: "#fff",
          boxShadow: "0 4px 2px -2px gray",
          borderTop: "1px solid lavender",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                maxWidth: { xs: 320, sm: 480, md: 760, lg: 1000, xl: 1200 },
              }}
            >
              <Tabs
                value={value}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons="auto"
                aria-label="scrollable auto tabs example"
              >
                <Tab
                  icon={<FavoriteBorderOutlinedIcon />}
                  label="Được ưa chuộng"
                />
                <Tab icon={<BeachAccessOutlinedIcon />} label="Bãi biển" />
                <Tab icon={<ForestOutlinedIcon />} label="Trên Rừng" />
                <Tab icon={<NaturePeopleOutlinedIcon />} label="Nông thôn" />
                <Tab icon={<AddHomeWorkOutlinedIcon />} label="Nhà nông trại" />
                <Tab icon={<DeckOutlinedIcon />} label="Bãi cát" />
                <Tab icon={<ApartmentOutlinedIcon />} label="Thành phố" />
              </Tabs>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}
