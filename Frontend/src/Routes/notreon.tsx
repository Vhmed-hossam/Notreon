import Layout from "@/Layout/Layout";
import Home from "@/Pages/Home/home";
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
    ],
  },
]);
