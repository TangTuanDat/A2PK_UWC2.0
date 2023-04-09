import React from "react";
import "./home.css"
import { useAuthContext, AuthContextType } from "../../components/Auth/context";

export default function Home() {
  const { currentUser } = useAuthContext() as AuthContextType;
  const name  = currentUser?.lastName + " " + currentUser?.firstName;
  return (
    <p id="zero-state">
      Urban Waste Collection 2.0
      <br />
      The project made by{" "}
      <a href="https://github.com/TangTuanDat/A2PK_UWC2.0">A2PK</a>.
      <p>Hi {name}!</p>
    </p>
  );
}
