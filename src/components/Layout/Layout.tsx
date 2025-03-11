import Header from "./Header.tsx";
import Sidebar from "./Sidebar.tsx";
import React from "react";
import useLocalStorage from "@/hooks/useLocalStorage.tsx";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useLocalStorage("sidebarOpen", true);
  return (
    <div className="flex flex-col h-dvh">
      <Header />
      <div className="flex flex-1 h-full">
        <Sidebar
          isOpen={sidebarOpen}
          toggle={() => setSidebarOpen(!sidebarOpen)}
        />
        <main className="flex-1 p-3 pt-5 overflow-hidden">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
