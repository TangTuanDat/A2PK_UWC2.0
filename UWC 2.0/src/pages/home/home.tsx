import React from "react";
import { useAuthContext, AuthContextType } from "../../components/auth/context";

const Home: React.FC = () => {
  const { currentUser } = useAuthContext() as AuthContextType;
  const name  = currentUser?.lastName + " " + currentUser?.firstName;
  return (
    <p id="dashboard-content">
      Urban Waste Collection 2.0
      <br />
      The project made by{" "}
      <a href="https://github.com/TangTuanDat/A2PK_UWC2.0">A2PK</a>.
      <p>Hi {name}!</p>
    </p>
  );
}

export default Home;