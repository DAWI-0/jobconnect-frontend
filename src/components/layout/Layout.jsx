import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

function Layout() {
  return (
    <div className="min-h-screen bg-slate-50 pb-20 text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100 md:pb-0">
      
      <Navbar />

      <main className="w-full py-0">
        <Outlet />
      </main>

    </div>
  );
}

export default Layout;