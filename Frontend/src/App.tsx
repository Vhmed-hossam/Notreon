import { Button } from "@/Components/shadcn/button";
import Layout from "./Layout/Layout";
import { NotreonRoutes } from "./Routes/notreon";
import { RouterProvider } from "react-router";
export default function App() {
  return (
    <div className="p-2">
      <h2>Notreon Project on development!.</h2>
      <p>Steps left for frontend:</p>
      <ul>
        <li>2. backend</li>
      </ul>
      <Button variant="outline" onClick={() => alert("NO!")}>
        Notify when ready
      </Button>
      <hr/>
      <RouterProvider router={NotreonRoutes} />
    </div>
  );
}
