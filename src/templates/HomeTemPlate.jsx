import React from "react";
import { Outlet } from "react-router-dom";
import FooterHome from "../components/FooterHome";
import HeaderHome from "../components/HeaderHome";

export default function HomeTemPlate() {
  return (
    <div>
      <HeaderHome />
      <Outlet />
      <FooterHome />
    </div>
  );
}
