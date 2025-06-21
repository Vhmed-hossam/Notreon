import { Link } from "react-router-dom";
import { Button } from "../shadcn/button";

export default function Navbar() {
  return (
    <div className="pt-5 px-5">
      <div className="p-3 navbar rounded-lg">
        <div className="flex items-center p-2 justify-between gap-2">
          <Link
            className="flex gap-2 flex-row self-stretch flex-1 items-center"
            to="/"
          >
            <img src="/Notreon_logo.png" alt="Notreon Logo" className="w-11" />
            <h2 className="text-2xl confortaa">Notreon</h2>
          </Link>
          <div className="flex gap-2 flex-row self-stretch items-center">
            <Link to="/login">
              <Button variant="link">Login</Button>
            </Link>
            <Link to="/register">
              <Button variant="outline">Register</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
