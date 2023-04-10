import React from "react";
import { Outlet, useNavigation } from "react-router-dom";
import NavBar from "../components/navbar/navbar";
import "./dashboard.css";
export const DashBoard:React.FC = () => {
  const navigation = useNavigation();
  return (
    <>
      <NavBar />
      <div
        id="detail"
        className={navigation.state === "loading" ? "loading" : ""}
      >
        <Outlet /> {/* Render child route elements*/}
      </div>
    </>
  );
}
export default DashBoard;
