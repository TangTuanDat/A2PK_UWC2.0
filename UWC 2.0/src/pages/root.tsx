import React from "react";
import { Outlet, useNavigation } from "react-router-dom";
import NavBar from "../components/NavBar/navbar";
export function Root(): JSX.Element {
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
export default Root;
