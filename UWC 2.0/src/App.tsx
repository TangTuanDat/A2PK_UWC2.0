import "./index.css";
import React from "react";
import "./css/layout.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/error-page";
import Root from "./pages/root";
import meetRoutes from "./pages/meets";
import contactRoutes from "./pages/contacts/index";
import {
  Root as ContactRoot,
  loader as contactLoader,
} from "./pages/contacts/root";
import Index from "./pages";
import MeetRoot from "./pages/meets/root";
import Login from "./pages/auth/login"
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
    {
      path: "/contacts",
      element: <ContactRoot />,
      errorElement: <ErrorPage />,
      loader: contactLoader,
      children: [...contactRoutes],
    },
    {
      path: "/meets",
      element: <MeetRoot />,
      errorElement: <ErrorPage />,
      loader: contactLoader,
      children: [...meetRoutes],
    },
  ];
  const router = createBrowserRouter(routes);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
