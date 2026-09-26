import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { ADMIN_NAV_SECTION, INVESTIGATION_NAV_SECTION, UTILITIES_NAV_SECTION } from "@/constants/navigation";
import {
  LayoutDashboard,
  Users,
  Cpu,
  BarChart3,
  ShieldCheck,
  Compass,
  Briefcase,
  UserCheck,
  GitMerge,
  Network,
  MapPin,
  AlertTriangle,
  FileText,
  Bell,
  Key,
  ChevronLeft,
  ChevronRight,
  Shield,
  Lock
} from "lucide-react";
import { cn } from "@/utils/cn";
const iconMap = {
  LayoutDashboard: /* @__PURE__ */ React.createElement(LayoutDashboard, { className: "w-4 h-4 shrink-0" }),
  Users: /* @__PURE__ */ React.createElement(Users, { className: "w-4 h-4 shrink-0" }),
  Cpu: /* @__PURE__ */ React.createElement(Cpu, { className: "w-4 h-4 shrink-0" }),
  BarChart3: /* @__PURE__ */ React.createElement(BarChart3, { className: "w-4 h-4 shrink-0" }),
  ShieldCheck: /* @__PURE__ */ React.createElement(ShieldCheck, { className: "w-4 h-4 shrink-0" }),
  Compass: /* @__PURE__ */ React.createElement(Compass, { className: "w-4 h-4 shrink-0" }),
  Briefcase: /* @__PURE__ */ React.createElement(Briefcase, { className: "w-4 h-4 shrink-0" }),
  UserCheck: /* @__PURE__ */ React.createElement(UserCheck, { className: "w-4 h-4 shrink-0" }),
  GitMerge: /* @__PURE__ */ React.createElement(GitMerge, { className: "w-4 h-4 shrink-0" }),
  Network: /* @__PURE__ */ React.createElement(Network, { className: "w-4 h-4 shrink-0" }),
  MapPin: /* @__PURE__ */ React.createElement(MapPin, { className: "w-4 h-4 shrink-0" }),
  AlertTriangle: /* @__PURE__ */ React.createElement(AlertTriangle, { className: "w-4 h-4 shrink-0" }),
  FileText: /* @__PURE__ */ React.createElement(FileText, { className: "w-4 h-4 shrink-0" }),
  Bell: /* @__PURE__ */ React.createElement(Bell, { className: "w-4 h-4 shrink-0" }),
  Key: /* @__PURE__ */ React.createElement(Key, { className: "w-4 h-4 shrink-0" })
};
const Sidebar = ({
  collapsed = false,
  onToggleCollapse
}) => {
  const { user } = useAuth();
  const location = useLocation();
  const renderNavItem = (item) => {
    const isActive = location.pathname === item.path || item.path !== "/" && location.pathname.startsWith(item.path + "/");
    const icon = iconMap[item.iconName] || /* @__PURE__ */ React.createElement(Compass, { className: "w-4 h-4 shrink-0" });
    return /* @__PURE__ */ React.createElement(
      NavLink,
      {
        key: item.path,
        to: item.path,
        title: collapsed ? item.name : void 0,
        className: cn(
          "group relative flex items-center gap-3 px-3 py-2 text-xs font-mono rounded transition-colors",
          isActive ? "bg-tactical-primary-50 dark:bg-tactical-primary-950/80 text-tactical-primary-700 dark:text-tactical-primary-300 font-semibold border-l-[3px] border-tactical-primary-600 dark:border-tactical-primary-400" : "text-tactical-neutral-700 dark:text-tactical-neutral-300 hover:bg-tactical-neutral-200/60 dark:hover:bg-tactical-neutral-800/60 hover:text-tactical-neutral-900 dark:hover:text-tactical-neutral-100"
        )
      },
      /* @__PURE__ */ React.createElement("span", { className: cn(
        "transition-colors",
        isActive ? "text-tactical-primary-600 dark:text-tactical-primary-400" : "text-tactical-neutral-500 group-hover:text-tactical-neutral-700 dark:text-tactical-neutral-400 dark:group-hover:text-tactical-neutral-200"
      ) }, icon),
      !collapsed && /* @__PURE__ */ React.createElement("span", { className: "truncate flex-1 tracking-tight" }, item.name),
      !collapsed && item.badge && /* @__PURE__ */ React.createElement("span", { className: cn(
        "text-[9px] font-mono px-1.5 py-0.5 rounded font-bold uppercase tracking-wider",
        item.badge === "CRITICAL" ? "bg-tactical-danger-100 text-tactical-danger-700 dark:bg-tactical-danger-950 dark:text-tactical-danger-300" : "bg-tactical-neutral-200 text-tactical-neutral-700 dark:bg-tactical-neutral-800 dark:text-tactical-neutral-300"
      ) }, item.badge),
      collapsed && /* @__PURE__ */ React.createElement("div", { className: "absolute left-full ml-2 px-2.5 py-1 bg-tactical-neutral-900 dark:bg-tactical-neutral-800 text-white text-xs font-mono rounded shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity z-50 whitespace-nowrap" }, item.name, item.badge && ` (${item.badge})`)
    );
  };
  return /* @__PURE__ */ React.createElement(
    "aside",
    {
      className: cn(
        "h-screen sticky top-0 bg-tactical-neutral-50 dark:bg-tactical-neutral-900 border-r border-tactical-neutral-200 dark:border-tactical-neutral-800 flex flex-col justify-between transition-all duration-200 select-none z-30",
        collapsed ? "w-16" : "w-60"
      )
    },
    /* @__PURE__ */ React.createElement("div", { className: "p-3 border-b border-tactical-neutral-200 dark:border-tactical-neutral-800 flex items-center justify-between" }, /* @__PURE__ */ React.createElement(NavLink, { to: "/", className: "flex items-center gap-2.5 overflow-hidden" }, /* @__PURE__ */ React.createElement("div", { className: "w-8 h-8 rounded bg-tactical-primary-700 flex items-center justify-center text-white shrink-0 shadow-sm border border-tactical-primary-600" }, /* @__PURE__ */ React.createElement(Shield, { className: "w-4 h-4 fill-tactical-primary-300 stroke-tactical-primary-100" })), !collapsed && /* @__PURE__ */ React.createElement("div", { className: "leading-tight overflow-hidden" }, /* @__PURE__ */ React.createElement("span", { className: "font-mono font-bold text-xs tracking-wider text-tactical-neutral-900 dark:text-tactical-neutral-100 block truncate" }, "INTELLITRACK"), /* @__PURE__ */ React.createElement("span", { className: "font-mono text-[9px] text-tactical-neutral-500 uppercase tracking-widest block" }, "FED-v4.8.2 // CJIS-4"))), onToggleCollapse && /* @__PURE__ */ React.createElement(
      "button",
      {
        type: "button",
        onClick: onToggleCollapse,
        className: "p-1 rounded text-tactical-neutral-400 hover:text-tactical-neutral-700 dark:hover:text-tactical-neutral-200 hover:bg-tactical-neutral-200 dark:hover:bg-tactical-neutral-800 transition-colors",
        title: collapsed ? "Expand Sidebar" : "Collapse Sidebar"
      },
      collapsed ? /* @__PURE__ */ React.createElement(ChevronRight, { className: "w-4 h-4" }) : /* @__PURE__ */ React.createElement(ChevronLeft, { className: "w-4 h-4" })
    )),
    /* @__PURE__ */ React.createElement("div", { className: "flex-1 overflow-y-auto p-2 space-y-4" }, user?.role === "ADMIN" && /* @__PURE__ */ React.createElement("div", null, !collapsed && /* @__PURE__ */ React.createElement("div", { className: "px-3 pb-1 text-[10px] font-mono uppercase font-bold text-tactical-neutral-400 dark:text-tactical-neutral-500 tracking-wider" }, ADMIN_NAV_SECTION.title), /* @__PURE__ */ React.createElement("div", { className: "space-y-0.5" }, ADMIN_NAV_SECTION.items.map(renderNavItem))), /* @__PURE__ */ React.createElement("div", null, !collapsed && /* @__PURE__ */ React.createElement("div", { className: "px-3 pb-1 text-[10px] font-mono uppercase font-bold text-tactical-neutral-400 dark:text-tactical-neutral-500 tracking-wider" }, INVESTIGATION_NAV_SECTION.title), /* @__PURE__ */ React.createElement("div", { className: "space-y-0.5" }, INVESTIGATION_NAV_SECTION.items.map(renderNavItem))), /* @__PURE__ */ React.createElement("div", null, !collapsed && /* @__PURE__ */ React.createElement("div", { className: "px-3 pb-1 text-[10px] font-mono uppercase font-bold text-tactical-neutral-400 dark:text-tactical-neutral-500 tracking-wider" }, UTILITIES_NAV_SECTION.title), /* @__PURE__ */ React.createElement("div", { className: "space-y-0.5" }, UTILITIES_NAV_SECTION.items.map(renderNavItem)))),
    /* @__PURE__ */ React.createElement("div", { className: "p-2 border-t border-tactical-neutral-200 dark:border-tactical-neutral-800 bg-tactical-neutral-100/60 dark:bg-tactical-neutral-900/60" }, !collapsed ? /* @__PURE__ */ React.createElement("div", { className: "p-2 rounded bg-white dark:bg-tactical-neutral-800 border border-tactical-neutral-200 dark:border-tactical-neutral-700" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between mb-1" }, /* @__PURE__ */ React.createElement("span", { className: "font-mono text-[9px] font-bold text-tactical-primary-700 dark:text-tactical-primary-300 uppercase tracking-wider flex items-center gap-1" }, /* @__PURE__ */ React.createElement(Lock, { className: "w-3 h-3 text-tactical-success-500 shrink-0" }), "CJIS LEVEL 4 VERIFIED"), /* @__PURE__ */ React.createElement("span", { className: "w-2 h-2 rounded-full bg-tactical-success-500" })), /* @__PURE__ */ React.createElement("div", { className: "font-mono text-[10px] text-tactical-neutral-600 dark:text-tactical-neutral-400 truncate" }, user?.fullName || "Agent Marcus Vance"), /* @__PURE__ */ React.createElement("div", { className: "font-mono text-[9px] text-tactical-neutral-400 truncate" }, "BADGE: ", user?.badgeNumber || "FBI-89412", " \u2022 ", user?.role)) : /* @__PURE__ */ React.createElement("div", { className: "flex justify-center", title: "CJIS Level 4 Active Session" }, /* @__PURE__ */ React.createElement("div", { className: "w-8 h-8 rounded bg-tactical-neutral-200 dark:bg-tactical-neutral-800 flex items-center justify-center text-tactical-success-600" }, /* @__PURE__ */ React.createElement(Lock, { className: "w-4 h-4" }))))
  );
};
export {
  Sidebar
};
