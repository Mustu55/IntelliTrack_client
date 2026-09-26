import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Briefcase,
  Share2,
  Users2,
  MapPin,
  Flame,
  FileCheck,
  FileText,
  Settings,
  PanelLeftClose,
  PanelLeft,
  Activity,
  ShieldCheck
} from "lucide-react";
import { useActiveCase } from "@/context/CaseContext";
import { useAuth } from "@/context/AuthContext";
import { SystemStatusModal } from "@/components/common/SystemStatusModal";
const navItems = [
  {
    to: "/dashboard",
    icon: /* @__PURE__ */ React.createElement(LayoutDashboard, { className: "w-4 h-4 text-cyan-400" }),
    label: "Overview",
    badge: "LIVE",
    badgeColor: "cyan"
  },
  {
    to: "/cases",
    icon: /* @__PURE__ */ React.createElement(Briefcase, { className: "w-4 h-4 text-amber-400" }),
    label: "Investigations",
    badge: "28",
    badgeColor: "amber"
  },
  {
    to: "/network",
    icon: /* @__PURE__ */ React.createElement(Share2, { className: "w-4 h-4 text-blue-400" }),
    label: "Network Graph",
    badge: "GRAPH",
    badgeColor: "blue"
  },
  {
    to: "/entities",
    icon: /* @__PURE__ */ React.createElement(Users2, { className: "w-4 h-4 text-purple-400" }),
    label: "Entities",
    badge: "1,482",
    badgeColor: "cyan"
  },
  {
    to: "/geo",
    icon: /* @__PURE__ */ React.createElement(MapPin, { className: "w-4 h-4 text-emerald-400" }),
    label: "Geo-Temporal",
    badge: "GIS",
    badgeColor: "green"
  },
  {
    to: "/leads",
    icon: /* @__PURE__ */ React.createElement(Flame, { className: "w-4 h-4 text-rose-400" }),
    label: "Leads",
    badge: "14 HIGH",
    badgeColor: "red"
  },
  {
    to: "/evidence",
    icon: /* @__PURE__ */ React.createElement(FileCheck, { className: "w-4 h-4 text-cyan-400" }),
    label: "Evidence",
    badge: "AUDIT",
    badgeColor: "cyan"
  },
  {
    to: "/reports",
    icon: /* @__PURE__ */ React.createElement(FileText, { className: "w-4 h-4 text-slate-300" }),
    label: "Reports"
  }
];
const CockpitSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const { activeCase } = useActiveCase();
  const { user } = useAuth();
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(
    "aside",
    {
      className: `bg-[#07111F] border-r border-[#263B55] transition-all duration-200 flex flex-col z-30 select-none ${collapsed ? "w-16" : "w-64"}`
    },
    /* @__PURE__ */ React.createElement("div", { className: "h-14 flex items-center justify-between px-3 border-b border-[#263B55] bg-[#0D1B2A]" }, !collapsed && /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2.5 overflow-hidden" }, /* @__PURE__ */ React.createElement("div", { className: "w-8 h-8 rounded-lg bg-[#101F33] border border-[#2563EB]/40 flex items-center justify-center shrink-0 shadow-inner" }, /* @__PURE__ */ React.createElement(ShieldCheck, { className: "w-5 h-5 text-[#06B6D4]" })), /* @__PURE__ */ React.createElement("div", { className: "truncate" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-1.5" }, /* @__PURE__ */ React.createElement("span", { className: "font-bold text-sm tracking-tight text-white font-sans" }, "IntelliTrack"), /* @__PURE__ */ React.createElement("span", { className: "text-[9px] font-mono px-1 py-0.2 rounded bg-blue-950/80 text-blue-300 border border-blue-800" }, "AI-INTEL")), /* @__PURE__ */ React.createElement("div", { className: "text-[10px] text-[#94A3B8] font-mono tracking-wider truncate" }, "CRIMINAL NETWORK OS"))), /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => setCollapsed(!collapsed),
        className: "p-1.5 rounded-lg hover:bg-[#101F33] text-[#94A3B8] hover:text-white transition-colors mx-auto",
        title: collapsed ? "Expand Sidebar" : "Collapse Sidebar"
      },
      collapsed ? /* @__PURE__ */ React.createElement(PanelLeft, { className: "w-4 h-4 text-cyan-400" }) : /* @__PURE__ */ React.createElement(PanelLeftClose, { className: "w-4 h-4" })
    )),
    !collapsed && /* @__PURE__ */ React.createElement("div", { className: "px-3 py-2 bg-[#0D1B2A]/70 border-b border-[#263B55]" }, /* @__PURE__ */ React.createElement("div", { className: "text-[10px] uppercase font-mono tracking-wider text-[#94A3B8] flex items-center justify-between" }, /* @__PURE__ */ React.createElement("span", null, "ACTIVE INVESTIGATION"), /* @__PURE__ */ React.createElement("span", { className: "flex items-center gap-1 text-[#10B981] font-semibold" }, /* @__PURE__ */ React.createElement("span", { className: "w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" }), "LIVE")), /* @__PURE__ */ React.createElement("div", { className: "text-xs font-semibold text-white truncate mt-0.5", title: activeCase?.title }, activeCase?.title || "Hawala Network Syndicate Alpha"), /* @__PURE__ */ React.createElement("div", { className: "text-[10px] font-mono text-[#06B6D4] truncate" }, activeCase?.caseNumber || "CASE #IT-2024-884", " \u2022 ", activeCase?.leadInvestigator || "Agent Vance")),
    /* @__PURE__ */ React.createElement("div", { className: "flex-1 overflow-y-auto px-2 py-3 space-y-1 custom-scrollbar" }, !collapsed && /* @__PURE__ */ React.createElement("div", { className: "px-2 pb-1 text-[10px] font-mono uppercase tracking-wider text-[#94A3B8]" }, "INVESTIGATION MODULES"), navItems.map((item) => /* @__PURE__ */ React.createElement(
      NavLink,
      {
        key: item.to,
        to: item.to,
        className: ({ isActive }) => `flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-all duration-150 group relative ${isActive ? "bg-[#101F33] text-white border-l-2 border-[#2563EB] shadow-md font-semibold" : "text-[#94A3B8] hover:text-white hover:bg-[#0D1B2A]"}`,
        title: collapsed ? item.label : void 0
      },
      /* @__PURE__ */ React.createElement("span", { className: "shrink-0 transition-transform group-hover:scale-105" }, item.icon),
      !collapsed && /* @__PURE__ */ React.createElement("span", { className: "truncate" }, item.label),
      !collapsed && item.badge && /* @__PURE__ */ React.createElement(
        "span",
        {
          className: `ml-auto text-[10px] font-mono px-1.5 py-0.2 rounded font-semibold ${item.badgeColor === "red" ? "bg-red-500/20 text-[#EF4444] border border-red-500/30" : item.badgeColor === "amber" ? "bg-amber-500/20 text-[#F59E0B] border border-amber-500/30" : item.badgeColor === "green" ? "bg-emerald-500/20 text-[#10B981] border border-emerald-500/30" : "bg-blue-500/20 text-[#06B6D4] border border-blue-500/30"}`
        },
        item.badge
      )
    ))),
    /* @__PURE__ */ React.createElement("div", { className: "p-2 border-t border-[#263B55] bg-[#0D1B2A] space-y-1" }, /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => setIsStatusModalOpen(true),
        className: "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium text-[#94A3B8] hover:text-white hover:bg-[#101F33] transition-colors",
        title: collapsed ? "System Operational" : void 0
      },
      /* @__PURE__ */ React.createElement("div", { className: "shrink-0 relative" }, /* @__PURE__ */ React.createElement(Activity, { className: "w-4 h-4 text-[#10B981]" }), /* @__PURE__ */ React.createElement("span", { className: "absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-[#10B981] animate-ping" })),
      !collapsed && /* @__PURE__ */ React.createElement("div", { className: "flex-1 text-left" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between" }, /* @__PURE__ */ React.createElement("span", { className: "text-white text-xs font-semibold" }, "System Status"), /* @__PURE__ */ React.createElement("span", { className: "text-[10px] font-mono text-[#10B981]" }, "OPERATIONAL")), /* @__PURE__ */ React.createElement("div", { className: "text-[10px] font-mono text-[#94A3B8]" }, "42ms \u2022 Node 04"))
    ), /* @__PURE__ */ React.createElement(
      NavLink,
      {
        to: "/settings",
        className: ({ isActive }) => `flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${isActive ? "bg-[#101F33] text-white font-semibold" : "text-[#94A3B8] hover:text-white hover:bg-[#101F33]"}`,
        title: collapsed ? "Settings" : void 0
      },
      /* @__PURE__ */ React.createElement(Settings, { className: "w-4 h-4 text-[#94A3B8]" }),
      !collapsed && /* @__PURE__ */ React.createElement("span", null, "Settings")
    ), /* @__PURE__ */ React.createElement(
      NavLink,
      {
        to: "/profile",
        className: ({ isActive }) => `flex items-center gap-2.5 px-2.5 py-2 rounded-lg transition-colors border border-transparent hover:border-[#263B55] ${isActive ? "bg-[#101F33] border-[#263B55]" : "hover:bg-[#101F33]"}`,
        title: collapsed ? user?.name || "Investigator Profile" : void 0
      },
      /* @__PURE__ */ React.createElement("div", { className: "w-7 h-7 rounded-lg bg-[#2563EB] text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-md" }, user?.name ? user.name.slice(0, 2).toUpperCase() : "MV"),
      !collapsed && /* @__PURE__ */ React.createElement("div", { className: "truncate text-left leading-tight" }, /* @__PURE__ */ React.createElement("div", { className: "text-xs font-semibold text-white truncate" }, user?.name || "Marcus Vance"), /* @__PURE__ */ React.createElement("div", { className: "text-[10px] font-mono text-[#06B6D4] truncate" }, user?.badgeNumber || "FBI-89412", " \u2022 Tier-3"))
    ))
  ), /* @__PURE__ */ React.createElement(
    SystemStatusModal,
    {
      isOpen: isStatusModalOpen,
      onClose: () => setIsStatusModalOpen(false)
    }
  ));
};
var stdin_default = CockpitSidebar;
export {
  CockpitSidebar,
  stdin_default as default
};
