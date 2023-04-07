import React from "react";
import { Button } from "antd";
import { useEffect } from "react";
import {
  Outlet,
  useLoaderData,
  Form,
  redirect,
  NavLink,
  useNavigation,
  useSubmit,
  useLocation,
  useNavigate,
} from "react-router-dom";

export function Root() {
  const navigation = useNavigation();
  const navigate = useNavigate();

  const submit = useSubmit();
  const searching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has("q");

  return (
    <>
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
