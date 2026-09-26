import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { useCommandPalette } from "@/context/CommandPaletteContext";
import { ZuluClock } from "@/components/common/ZuluClock";
import {
  Search,
  Moon,
  Sun,
  Bell,
  LogOut,
  User as UserIcon,
  Shield,
  Layers
} from "lucide-react";
import { cn } from "@/utils/cn";
const TopNavbar = ({ onToggleMobileNav }) => {
  const { user, role, switchRole, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { openPalette } = useCommandPalette();
  const navigate = useNavigate();
  const handleRoleToggle = () => {
    const newRole = role === "ADMIN" ? "AGENT" : "ADMIN";
    switchRole(newRole);
    if (newRole === "AGENT" && window.location.pathname.startsWith("/admin")) {
      navigate("/agent/workspace");
    } else if (newRole === "ADMIN" && window.location.pathname === "/agent/workspace") {
      navigate("/admin/dashboard");
    }
  };
  return /* @__PURE__ */ React.createElement("header", { className: "h-14 bg-white dark:bg-tactical-neutral-900 border-b border-tactical-neutral-200 dark:border-tactical-neutral-800 px-4 flex items-center justify-between sticky top-0 z-20 select-none" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-3 flex-1 max-w-md" }, onToggleMobileNav && /* @__PURE__ */ React.createElement(
    "button",
    {
      type: "button",
      onClick: onToggleMobileNav,
      className: "md:hidden p-1.5 rounded text-tactical-neutral-600 dark:text-tactical-neutral-300 hover:bg-tactical-neutral-100 dark:hover:bg-tactical-neutral-800"
    },
    /* @__PURE__ */ React.createElement(Layers, { className: "w-5 h-5" })
  ), /* @__PURE__ */ React.createElement(
    "button",
    {
      type: "button",
      onClick: openPalette,
      className: "w-full flex items-center justify-between px-3 py-1.5 bg-tactical-neutral-100 dark:bg-tactical-neutral-800 hover:bg-tactical-neutral-200/80 dark:hover:bg-tactical-neutral-700/80 border border-tactical-neutral-300 dark:border-tactical-neutral-700 rounded text-xs font-mono text-tactical-neutral-500 transition-colors text-left"
    },
    /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 truncate" }, /* @__PURE__ */ React.createElement(Search, { className: "w-3.5 h-3.5 shrink-0 text-tactical-neutral-400" }), /* @__PURE__ */ React.createElement("span", { className: "truncate" }, "Multi-entity intelligence search...")),
    /* @__PURE__ */ React.createElement("kbd", { className: "hidden sm:inline-block px-1.5 py-0.5 text-[10px] uppercase font-bold bg-white dark:bg-tactical-neutral-900 rounded border border-tactical-neutral-300 dark:border-tactical-neutral-600 text-tactical-neutral-600 dark:text-tactical-neutral-300 shadow-xs" }, "\u2318K")
  )), /* @__PURE__ */ React.createElement("div", { className: "hidden lg:flex items-center gap-3 mx-4" }, /* @__PURE__ */ React.createElement(ZuluClock, null), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-1.5 px-2 py-0.5 bg-tactical-neutral-100 dark:bg-tactical-neutral-800 border border-tactical-neutral-200 dark:border-tactical-neutral-700 rounded font-mono text-[10px] text-tactical-neutral-600 dark:text-tactical-neutral-400" }, /* @__PURE__ */ React.createElement("span", { className: "w-1.5 h-1.5 rounded-full bg-tactical-success-500" }), /* @__PURE__ */ React.createElement("span", null, "FUSION NODE: ONLINE"), /* @__PURE__ */ React.createElement("span", { className: "text-tactical-neutral-300 dark:text-tactical-neutral-600" }, "|"), /* @__PURE__ */ React.createElement("span", { className: "text-tactical-primary-600 dark:text-tactical-primary-400 font-semibold" }, "4.8 GB/s"))), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 sm:gap-3" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center bg-tactical-neutral-100 dark:bg-tactical-neutral-800 p-0.5 rounded border border-tactical-neutral-300 dark:border-tactical-neutral-700" }, /* @__PURE__ */ React.createElement(
    "button",
    {
      type: "button",
      onClick: handleRoleToggle,
      title: "Click to alternate clearance role between Commander (Admin) and Investigator (Agent)",
      className: cn(
        "px-2 py-1 text-[11px] font-mono font-bold rounded flex items-center gap-1.5 transition-all",
        role === "ADMIN" ? "bg-tactical-neutral-900 text-white dark:bg-tactical-neutral-100 dark:text-tactical-neutral-900 shadow-xs" : "text-tactical-neutral-600 dark:text-tactical-neutral-400 hover:text-tactical-neutral-900"
      )
    },
    /* @__PURE__ */ React.createElement(Shield, { className: "w-3 h-3 text-tactical-danger-500" }),
    /* @__PURE__ */ React.createElement("span", null, "COMMANDER")
  ), /* @__PURE__ */ React.createElement(
    "button",
    {
      type: "button",
      onClick: handleRoleToggle,
      title: "Click to alternate clearance role between Commander (Admin) and Investigator (Agent)",
      className: cn(
        "px-2 py-1 text-[11px] font-mono font-bold rounded flex items-center gap-1.5 transition-all",
        role === "AGENT" ? "bg-tactical-primary-700 text-white dark:bg-tactical-primary-600 shadow-xs" : "text-tactical-neutral-600 dark:text-tactical-neutral-400 hover:text-tactical-neutral-900"
      )
    },
    /* @__PURE__ */ React.createElement(UserIcon, { className: "w-3 h-3 text-tactical-primary-300" }),
    /* @__PURE__ */ React.createElement("span", null, "AGENT")
  )), /* @__PURE__ */ React.createElement(
    "button",
    {
      type: "button",
      onClick: toggleTheme,
      "aria-label": "Toggle Night Ops Mode",
      className: "p-1.5 rounded text-tactical-neutral-600 dark:text-tactical-neutral-300 hover:bg-tactical-neutral-100 dark:hover:bg-tactical-neutral-800 border border-transparent hover:border-tactical-neutral-300 dark:hover:border-tactical-neutral-700 transition-colors",
      title: `Switch to ${theme === "dark" ? "Daylight Tactical" : "Night Ops Dark"} Mode`
    },
    theme === "dark" ? /* @__PURE__ */ React.createElement(Sun, { className: "w-4 h-4 text-tactical-warning-400" }) : /* @__PURE__ */ React.createElement(Moon, { className: "w-4 h-4 text-tactical-primary-600" })
  ), /* @__PURE__ */ React.createElement(
    Link,
    {
      to: "/notifications",
      className: "relative p-1.5 rounded text-tactical-neutral-600 dark:text-tactical-neutral-300 hover:bg-tactical-neutral-100 dark:hover:bg-tactical-neutral-800 border border-transparent hover:border-tactical-neutral-300 dark:hover:border-tactical-neutral-700 transition-colors",
      title: "Operational Alerts & Signals"
    },
    /* @__PURE__ */ React.createElement(Bell, { className: "w-4 h-4" }),
    /* @__PURE__ */ React.createElement("span", { className: "absolute top-1 right-1 w-2 h-2 rounded-full bg-tactical-danger-500 animate-pulse" })
  ), /* @__PURE__ */ React.createElement("div", { className: "h-6 w-px bg-tactical-neutral-200 dark:bg-tactical-neutral-700 mx-0.5" }), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React.createElement(
    Link,
    {
      to: "/profile",
      className: "flex items-center gap-2 pl-1 pr-2 py-1 rounded hover:bg-tactical-neutral-100 dark:hover:bg-tactical-neutral-800 transition-colors group"
    },
    /* @__PURE__ */ React.createElement("div", { className: "w-7 h-7 rounded bg-tactical-neutral-800 dark:bg-tactical-neutral-700 text-tactical-neutral-100 flex items-center justify-center font-mono text-xs font-bold border border-tactical-neutral-600" }, user?.fullName?.split(" ").map((n) => n[0]).join("") || "MV"),
    /* @__PURE__ */ React.createElement("div", { className: "hidden xl:block text-left" }, /* @__PURE__ */ React.createElement("div", { className: "text-xs font-semibold text-tactical-neutral-900 dark:text-tactical-neutral-100 leading-none group-hover:text-tactical-primary-600" }, user?.fullName || "Agent Marcus Vance"), /* @__PURE__ */ React.createElement("div", { className: "text-[10px] font-mono text-tactical-neutral-500 leading-tight" }, user?.badgeNumber || "FBI-89412"))
  ), /* @__PURE__ */ React.createElement(
    "button",
    {
      type: "button",
      onClick: logout,
      title: "Secure Session Termination (Logout)",
      className: "p-1.5 rounded text-tactical-neutral-400 hover:text-tactical-danger-600 hover:bg-tactical-danger-50 dark:hover:bg-tactical-danger-950/40 transition-colors"
    },
    /* @__PURE__ */ React.createElement(LogOut, { className: "w-4 h-4" })
  ))));
};
export {
  TopNavbar
};
