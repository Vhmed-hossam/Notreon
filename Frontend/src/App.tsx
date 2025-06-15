import { NotreonRoutes } from "./Routes/notreon";
import { RouterProvider } from "react-router";
import { ThemeProvider } from "./Theme/themeProvider";
export default function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={NotreonRoutes} />
    </ThemeProvider>
  );
}
