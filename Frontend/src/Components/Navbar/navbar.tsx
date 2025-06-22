import { Link } from "react-router-dom";
import { Button } from "../shadcn/button";
import { ThemeSwitch } from "../shadcn/theme-switch-button";

export default function Navbar() {
  return (
    <div>
      <div className="relative mx-5 z-50">
        <div className="p-3 navbar rounded-lg absolute w-full mt-5">
          <div className="flex items-center p-2 justify-between gap-2">
            <Link
              className="flex gap-2 flex-row self-stretch flex-1 items-center"
              to="/"
            >
              <img
                src="/Notreon_logo.png"
                alt="Notreon Logo"
                className="w-11"
              />
              <h2 className="text-2xl confortaa">Notreon</h2>
            </Link>
            <div className="flex gap-2 flex-row self-stretch items-center">
              <Link to="/register">
                <Button variant="default">Get started</Button>
              </Link>
              <ThemeSwitch />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
