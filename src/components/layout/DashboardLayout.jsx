import React, { useState } from "react";
import { Outlet, useLocation, Link } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { TopNavbar } from "./TopNavbar";
import { CommandPalette } from "@/components/common/CommandPalette";
import { ChevronRight, Home } from "lucide-react";
const DashboardLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);
  const getBreadcrumbName = (part) => {
    switch (part) {
      case "admin":
        return "Command";
      case "agent":
        return "Investigation";
      case "dashboard":
        return "Master Dashboard";
      case "workspace":
        return "Investigative Hub";
      case "cases":
        return "Dockets";
      case "persons":
        return "Criminal Persons";
      case "entity-resolution":
        return "Entity Resolution";
      case "network-graph":
        return "Syndicate Link Chart";
      case "geo-temporal":
        return "Geo-Temporal Map";
      case "leads":
        return "Lead Triage";
      case "reports":
        return "Intelligence Dossiers";
      case "analytics":
        return "Evidentiary Analytics";
      case "audit-ledger":
        return "Chain-of-Custody Ledger";
      case "agents":
        return "Personnel Clearance";
      case "system-config":
        return "System Ingestion Feeds";
      case "notifications":
        return "Operational Alerts";
      case "profile":
        return "Identity & Security";
      default:
        return part.toUpperCase();
    }
  };
  return /* @__PURE__ */ React.createElement("div", { className: "min-h-screen bg-tactical-neutral-100 dark:bg-tactical-neutral-950 flex flex-row font-sans text-tactical-neutral-900 dark:text-tactical-neutral-100 antialiased selection:bg-tactical-primary-500 selection:text-white" }, /* @__PURE__ */ React.createElement("div", { className: "hidden md:block shrink-0" }, /* @__PURE__ */ React.createElement(Sidebar, { collapsed, onToggleCollapse: () => setCollapsed(!collapsed) })), mobileOpen && /* @__PURE__ */ React.createElement("div", { className: "fixed inset-0 z-50 flex md:hidden" }, /* @__PURE__ */ React.createElement(
    "div",
    {
      className: "fixed inset-0 bg-black/60 backdrop-blur-xs",
      onClick: () => setMobileOpen(false)
    }
  ), /* @__PURE__ */ React.createElement("div", { className: "relative flex-1 flex flex-col max-w-xs w-full bg-tactical-neutral-50 dark:bg-tactical-neutral-900" }, /* @__PURE__ */ React.createElement(Sidebar, { onToggleCollapse: () => setMobileOpen(false) }))), /* @__PURE__ */ React.createElement("div", { className: "flex-1 flex flex-col min-w-0 overflow-hidden" }, /* @__PURE__ */ React.createElement(TopNavbar, { onToggleMobileNav: () => setMobileOpen(true) }), /* @__PURE__ */ React.createElement("div", { className: "h-8 bg-tactical-neutral-50 dark:bg-tactical-neutral-900/50 border-b border-tactical-neutral-200 dark:border-tactical-neutral-800 px-4 sm:px-6 flex items-center justify-between text-[11px] font-mono select-none" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-1.5 text-tactical-neutral-500" }, /* @__PURE__ */ React.createElement(
    Link,
    {
      to: "/admin/dashboard",
      className: "flex items-center gap-1 text-tactical-neutral-600 dark:text-tactical-neutral-400 hover:text-tactical-primary-600 dark:hover:text-tactical-primary-400"
    },
    /* @__PURE__ */ React.createElement(Home, { className: "w-3 h-3" }),
    /* @__PURE__ */ React.createElement("span", null, "HQ")
  ), pathnames.map((value, index) => {
    const to = `/${pathnames.slice(0, index + 1).join("/")}`;
    const isLast = index === pathnames.length - 1;
    return /* @__PURE__ */ React.createElement(React.Fragment, { key: to }, /* @__PURE__ */ React.createElement(ChevronRight, { className: "w-3 h-3 text-tactical-neutral-400 shrink-0" }), isLast ? /* @__PURE__ */ React.createElement("span", { className: "font-semibold text-tactical-neutral-900 dark:text-tactical-neutral-200" }, getBreadcrumbName(value)) : /* @__PURE__ */ React.createElement(
      Link,
      {
        to,
        className: "hover:text-tactical-primary-600 dark:hover:text-tactical-primary-400"
      },
      getBreadcrumbName(value)
    ));
  })), /* @__PURE__ */ React.createElement("div", { className: "hidden sm:flex items-center gap-2 text-[10px] uppercase tracking-wider text-tactical-neutral-400" }, /* @__PURE__ */ React.createElement("span", null, "TERMINAL ID: ", /* @__PURE__ */ React.createElement("strong", { className: "text-tactical-neutral-600 dark:text-tactical-neutral-300" }, "WDC-NODE-89A")), /* @__PURE__ */ React.createElement("span", null, "\u2022"), /* @__PURE__ */ React.createElement("span", null, "DEFCON: ", /* @__PURE__ */ React.createElement("strong", { className: "text-tactical-primary-600" }, "3")))), /* @__PURE__ */ React.createElement("main", { className: "flex-1 overflow-y-auto p-4 sm:p-6 focus:outline-none" }, /* @__PURE__ */ React.createElement(Outlet, null))), /* @__PURE__ */ React.createElement(CommandPalette, null));
};
export {
  DashboardLayout
};
