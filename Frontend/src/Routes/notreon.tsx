import Layout from "@/Layout/Layout";
import Home from "@/Pages/Home/home";
import Login from "@/Pages/Login/login";
import Register from "@/Pages/Register/register";
import { createBrowserRouter, Navigate } from "react-router";

export const NotreonRoutes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "*",
        element: <Navigate to="/" />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
]);
