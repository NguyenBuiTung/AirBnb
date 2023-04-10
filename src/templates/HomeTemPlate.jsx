import React from "react";
import { Outlet } from "react-router-dom";
import FooterHome from "../components/FooterHome";
import HeaderHome from "../components/HeaderHome";
import ScrollToTop from "react-scroll-to-top";
import RocketSharpIcon from "@mui/icons-material/RocketSharp";
export default function HomeTemPlate() {
  return (
    <div>
      <HeaderHome />
      <Outlet></Outlet>
      <ScrollToTop
        smooth
        component={<RocketSharpIcon style={{ color: "#E80505" }} />}
      />
      <FooterHome />
    </div>
  );
}
