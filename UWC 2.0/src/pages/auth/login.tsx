import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useNavigation } from "react-router-dom";
import { backOfficerData } from "../../data/data";
import "./login.css";
interface User {
  username: string;
  password: string;
}

const initialUserState = {
  username: "",
  password: "",
};

const Login = () => {
  const [user, setUser] = useState<User>(initialUserState);
  const navigation = useNavigation();
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const foundUser = backOfficerData.find((u) => u.username === user.username && u.password === user.password);
    if (foundUser) {
      localStorage.setItem("userId", foundUser.id);
      navigate("/");
    } else {
      alert("Invalid username or password");
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUser((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <>
    <div>
      <h1>UWC 2.0</h1>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <input type="text" id="username" name="username" value={user.username} onChange={handleInputChange} />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" value={user.password} onChange={handleInputChange} />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
    <div
        id="detail"
        className={navigation.state === "loading" ? "loading" : ""}
      >

    </div>
  </>
  );
};

export default Login;
