import React from "react";
import { Outlet, NavLink, useNavigation, useNavigate } from "react-router-dom";

interface MenuProps {
  id: number;
  name: string;
  path: string;
}

const menu = [
  { id: 1, name: "User Profile", path: "/" },
  { id: 1, name: "Progress of Tasks", path: "/meets" },
  { id: 2, name: "Task Assignment", path: "/contacts" },
];

export function Root(): JSX.Element {
  const navigation = useNavigation();
  const navigate = useNavigate();

  const loggedInUserId = localStorage.getItem("userId");
  if (!loggedInUserId) navigate("/login");

  return (
    <>
      <div id="sidebar">
        <h1> UWC 2.0</h1>
        <nav>
          {menu.length ? (
            <ul>
              {menu.map((menu: MenuProps) => (
                <li key={menu.id}>
                  <NavLink
                    to={`${menu.path}`}
                    className={({ isActive, isPending }) =>
                      isActive ? "active" : isPending ? "pending" : ""
                    }
                  >
                    {menu.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>Empty Menu</i>
            </p>
          )}
        </nav>
      </div>

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
