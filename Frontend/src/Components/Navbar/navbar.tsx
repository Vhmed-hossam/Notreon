import { Link } from "react-router-dom";
import { ThemeSwitch } from "../shadcn/theme-switch-button";

export default function Navbar() {
  return (
    <div className="fixed z-50">
      <div
        className="p-3 fixed top-0 left-0 right-0 rounded-lg w-full px-7"
        style={{
          backgroundColor: "rgba(19, 19, 19, 0.15)",
          backdropFilter: "blur(10px)",
        }}
      >
        <div className="flex items-center p-2 justify-between gap-2">
          <Link
            className="flex gap-2 flex-row self-stretch flex-1 items-center"
            to="/"
          >
            <img src="/Notreon_logo.png" alt="Notreon Logo" className="w-11" />
            <h2 className="text-2xl confortaa">Notreon</h2>
          </Link>
          <div className="flex gap-2 flex-row self-stretch items-center justify-end px-2">
            <ThemeSwitch />
          </div>
        </div>
      </div>
    </div>
  );
}
