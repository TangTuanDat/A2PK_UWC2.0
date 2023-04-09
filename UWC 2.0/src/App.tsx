import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserRouter, RouterProvider, Route, createRoutesFromElements, Navigate } from "react-router-dom";
import ErrorPage from "./pages/error-page/error-page";
import Root from "./pages/dashboard";
import Home from "./pages/home/home";
import Login from "./pages/login/login"
import { useAuthContext, AuthContextType, ProtectedRoutes } from "./components/Auth/context";

export default function App() {
  const { currentUser } = useAuthContext() as AuthContextType;
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route element={<ProtectedRoutes/>}>
          <Route path="/" element={<Root />}>
            <Route index={true} element={<Home />} />
            <Route path="/profile" index={true} element={<Home />} />
          </Route>
        </Route>
        <Route path="/login" element={currentUser ? <Navigate to="/" /> : <Login />} />
        <Route path="/*" element={<ErrorPage />} />
      </>
    )
  );
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
