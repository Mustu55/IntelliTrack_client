import React from "react";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { CockpitSidebar } from "./CockpitSidebar";
import { CockpitTopNavbar } from "./CockpitTopNavbar";
import { Breadcrumbs } from "./Breadcrumbs";
import { CommandPalette } from "@/components/common/CommandPalette";

const CockpitLayout = () => {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#0d0f11] text-[#f3f4f6] font-sans antialiased">
      <CockpitSidebar />
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden bg-[#0d0f11]">
        <CockpitTopNavbar />
        <Breadcrumbs />
        <main className="flex-1 overflow-y-auto p-4 lg:p-6 bg-[#0d0f11] custom-scrollbar">
          <Outlet />
        </main>
      </div>
      <CommandPalette />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3500,
          style: {
            background: "#14171c",
            color: "#f3f4f6",
            border: "1px solid #222731",
            fontFamily: "JetBrains Mono, monospace",
            fontSize: "12px",
            boxShadow: "0 10px 30px -5px rgba(0, 0, 0, 0.7)",
            borderRadius: "8px"
          },
          success: {
            iconTheme: {
              primary: "#8fa38d",
              secondary: "#0d0f11"
            }
          },
          error: {
            iconTheme: {
              primary: "#dc7869",
              secondary: "#0d0f11"
            }
          }
        }}
      />
    </div>
  );
};

export { CockpitLayout };
export default CockpitLayout;
