import { Outlet } from "react-router-dom";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="container mx-auto flex-1 py-10">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
