import Layout from "@/Layout/Layout";
import Home from "@/Pages/Home/home";
import { createBrowserRouter } from "react-router";

export const NotreonRoutes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
]);
