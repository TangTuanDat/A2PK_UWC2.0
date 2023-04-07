import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/layout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/error-page";
import Root from "./pages/root";
import Index from "./pages";
import Login from "./pages/login/login"
export default function App() {
  const routes = [
    {
      path: "/login",
      element: <Login />,
      errorElement: <ErrorPage />,
      children: [],
    },
    {
      path: "/",
      element: <Root />,
      errorElement: <ErrorPage />,
      children: [{ index: true, element: <Index /> }],
    },
  ];
  const router = createBrowserRouter(routes);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
