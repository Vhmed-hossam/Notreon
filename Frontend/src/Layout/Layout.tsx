import NavbarAuth from "@/Components/Navbar - Auth/navbar";
import Navbar from "@/Components/Navbar/navbar";
import { useAuthStore } from "@/Store/useAuthstore";
import { Outlet } from "react-router";
import Split from "react-split";

export default function Layout() {
  const { User } = useAuthStore();
  return (
    <>
      {User ? (
        <Split
          className="flex flex-row h-screen"
          sizes={[25, 75]}
          minSize={250}
          gutterSize={5}
        >
          <NavbarAuth />
          <Outlet />
        </Split>
      ) : (
        <>
          <Navbar />
          <Outlet />
        </>
      )}
    </>
  );
}
