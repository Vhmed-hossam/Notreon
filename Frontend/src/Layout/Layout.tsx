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
          className="flex flex-row h-screen w-full"
          sizes={[30, 70]}
          minSize={[300, 400]} 
          gutterSize={6}
          maxSize={[500, 1500]}
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
