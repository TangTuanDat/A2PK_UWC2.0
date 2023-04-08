import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserRouter, RouterProvider, Route, createRoutesFromElements } from "react-router-dom";
import ErrorPage from "./pages/error-page/error-page";
import Root from "./pages/dashboard";
import Home from "./pages/home/home";
import Login from "./pages/login/login"
import { ProtectedRoutes } from "./components/Auth/context";
export default function App() {
  // const routes = [
  //   {
  //     path: "/login",
  //     element: <Login />,
  //     errorElement: <ErrorPage />,
  //     children: [],
  //   },
  //   {
  //     path: "/",
  //     element: <Root />,
  //     errorElement: <ErrorPage />,
  //     children: [{ index: true, element: <Home /> }],
  //   },
  // ];
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route element={<ProtectedRoutes/>}>
          <Route path="/" element={<Root />}>
            <Route index={true} element={<Home />} />
          </Route>
        </Route>
        <Route path="/login" element={<Login />} />
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
