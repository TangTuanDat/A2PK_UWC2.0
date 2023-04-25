import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserRouter, RouterProvider, Route, createRoutesFromElements, Navigate } from "react-router-dom";
import ErrorPage from "./pages/error-page/error-page";
import Login from "./pages/login/login"
import DashBoard from "./pages/dashboard";
import Home from "./pages/home/home";
import UserProfile from "./pages/profile/profile";
import { useAuthContext, AuthContextType, ProtectedRoutes } from "./components/auth/context";
import TaskProgress from "./pages/taskprogress/taskprogress";
import AssignTask from "./pages/assigntask/assigntask";

export default function App() {
  const { currentUser } = useAuthContext() as AuthContextType;
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
      <Route errorElement={<ErrorPage />}>
        <Route element={<ProtectedRoutes/>} >
          <Route path="/" element={<DashBoard />}>
            <Route index element={<Home />} />
            <Route index path="profile" element={<UserProfile />} />
            <Route index path="taskprogress" element={<TaskProgress />} />
            <Route index path="assigntask" element={<AssignTask />} />
          </Route>
        </Route>
        <Route path="/login" element={currentUser ? <Navigate to="/" /> : <Login />} />
      </Route>
      </>
    )
  );
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
