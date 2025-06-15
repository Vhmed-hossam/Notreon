import Layout from "@/Layout/Layout";
import { createBrowserRouter } from "react-router";

export const NotreonRoutes = createBrowserRouter([
 {
    path: "/",
    element: <Layout />,
    children: [
        {
            path: "/",
            element: <h1>Home</h1>,
        }
    ]
 }
]);
