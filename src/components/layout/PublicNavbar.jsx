import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "@/context/ThemeContext";
import { useAuth } from "@/context/AuthContext";
import { Shield, Moon, Sun, Lock, ArrowRight } from "lucide-react";
const PublicNavbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { isAuthenticated, role } = useAuth();
  const navigate = useNavigate();
  return /* @__PURE__ */ React.createElement("header", { className: "h-16 border-b border-navy-800 bg-navy-950/95 backdrop-blur-md sticky top-0 z-30 px-4 sm:px-8 flex items-center justify-between select-none font-sans" }, /* @__PURE__ */ React.createElement(Link, { to: "/", className: "flex items-center gap-3 group" }, /* @__PURE__ */ React.createElement("div", { className: "w-9 h-9 rounded bg-steel-700/40 border border-steel-500/50 flex items-center justify-center text-steel-300 shrink-0 shadow-md group-hover:bg-steel-600 transition-colors" }, /* @__PURE__ */ React.createElement(Shield, { className: "w-5 h-5" })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "font-mono font-bold text-sm tracking-wider text-white flex items-center gap-2" }, /* @__PURE__ */ React.createElement("span", null, "INTELLITRACK"), /* @__PURE__ */ React.createElement("span", { className: "text-[10px] px-1.5 py-0.2 rounded bg-steel-900 border border-steel-700 text-steel-300 font-semibold" }, "FED-v4.8.2")), /* @__PURE__ */ React.createElement("div", { className: "text-[10px] font-mono text-slate-400 uppercase tracking-widest" }, "CRIMINAL INTELLIGENCE & FUSION COCKPIT"))), /* @__PURE__ */ React.createElement("nav", { className: "hidden md:flex items-center gap-6 text-xs font-mono text-slate-300" }, /* @__PURE__ */ React.createElement("a", { href: "#features", className: "hover:text-steel-400 transition-colors" }, "Core Capabilities"), /* @__PURE__ */ React.createElement("a", { href: "#architecture", className: "hover:text-steel-400 transition-colors" }, "Technical Architecture"), /* @__PURE__ */ React.createElement("a", { href: "#compliance", className: "hover:text-steel-400 transition-colors" }, "CJIS 5.4 Compliance"), /* @__PURE__ */ React.createElement("a", { href: "#workflow", className: "hover:text-steel-400 transition-colors" }, "Investigation Workflow")), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-3" }, /* @__PURE__ */ React.createElement(
    "button",
    {
      type: "button",
      onClick: toggleTheme,
      "aria-label": "Toggle Night Ops Mode",
      className: "p-2 rounded text-slate-400 hover:text-white hover:bg-navy-800 transition-colors",
      title: `Switch to ${theme === "dark" ? "Light" : "Dark"} Mode`
    },
    theme === "dark" ? /* @__PURE__ */ React.createElement(Sun, { className: "w-4 h-4 text-amber-400" }) : /* @__PURE__ */ React.createElement(Moon, { className: "w-4 h-4 text-steel-400" })
  ), isAuthenticated ? /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => navigate("/dashboard"),
      className: "px-4 py-2 rounded bg-steel-600 hover:bg-steel-500 text-white font-mono text-xs font-semibold flex items-center gap-1.5 shadow-md transition-all active:scale-95"
    },
    /* @__PURE__ */ React.createElement("span", null, "Access Cockpit"),
    /* @__PURE__ */ React.createElement(ArrowRight, { className: "w-3.5 h-3.5" })
  ) : /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => navigate("/login"),
      className: "px-4 py-2 rounded bg-steel-600 hover:bg-steel-500 text-white font-mono text-xs font-semibold flex items-center gap-1.5 shadow-md transition-all active:scale-95"
    },
    /* @__PURE__ */ React.createElement(Lock, { className: "w-3.5 h-3.5" }),
    /* @__PURE__ */ React.createElement("span", null, "Terminal Login")
  )));
};
export {
  PublicNavbar
};
