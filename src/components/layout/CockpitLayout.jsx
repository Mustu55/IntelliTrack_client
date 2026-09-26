import React from "react";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { CockpitSidebar } from "./CockpitSidebar";
import { CockpitTopNavbar } from "./CockpitTopNavbar";
import { Breadcrumbs } from "./Breadcrumbs";
import { CommandPalette } from "@/components/common/CommandPalette";
const CockpitLayout = () => {
  return /* @__PURE__ */ React.createElement("div", { className: "flex h-screen w-screen overflow-hidden bg-navy-950 text-slate-100 font-sans" }, /* @__PURE__ */ React.createElement(CockpitSidebar, null), /* @__PURE__ */ React.createElement("div", { className: "flex flex-col flex-1 min-w-0 overflow-hidden bg-navy-900" }, /* @__PURE__ */ React.createElement(CockpitTopNavbar, null), /* @__PURE__ */ React.createElement(Breadcrumbs, null), /* @__PURE__ */ React.createElement("main", { className: "flex-1 overflow-y-auto p-4 lg:p-6 bg-navy-950/60 custom-scrollbar" }, /* @__PURE__ */ React.createElement(Outlet, null))), /* @__PURE__ */ React.createElement(CommandPalette, null), /* @__PURE__ */ React.createElement(
    Toaster,
    {
      position: "top-right",
      toastOptions: {
        duration: 3500,
        style: {
          background: "#0b1329",
          color: "#f8fafc",
          border: "1px solid #1e293b",
          fontFamily: "JetBrains Mono, monospace",
          fontSize: "12px",
          boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.6)"
        },
        success: {
          iconTheme: {
            primary: "#10b981",
            secondary: "#070d1e"
          }
        },
        error: {
          iconTheme: {
            primary: "#ef4444",
            secondary: "#070d1e"
          }
        }
      }
    }
  ));
};
var stdin_default = CockpitLayout;
export {
  CockpitLayout,
  stdin_default as default
};
