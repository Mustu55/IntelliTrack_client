import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Bell,
  ChevronDown,
  ShieldCheck,
  Radio,
  LogOut,
  User,
  Settings,
  X,
  ArrowRight
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useActiveCase } from "@/context/CaseContext";
import { SystemStatusModal } from "@/components/common/SystemStatusModal";
const SEARCH_DATABASE = [
  {
    id: "poi-1",
    category: "PERSON",
    title: "Raj Mehta",
    subtitle: 'Alias: "The Courier" \u2022 Logistics Broker \u2022 92% Confidence',
    route: "/entities/poi-1",
    tag: "Person of Interest"
  },
  {
    id: "poi-2",
    category: "PERSON",
    title: "Vikramaditya Singhania",
    subtitle: "Syndicate Beneficiary \u2022 88% Confidence",
    route: "/entities/poi-2",
    tag: "Person of Interest"
  },
  {
    id: "phn-1",
    category: "PHONE",
    title: "+91 98201 44921",
    subtitle: "Burner SIM (VoLTE) \u2022 14 calls to Raj Mehta",
    route: "/network",
    tag: "High-Frequency CDR"
  },
  {
    id: "veh-1",
    category: "VEHICLE",
    title: "Black Audi A8 [MH-01-EA-9902]",
    subtitle: "Conveyance Sedan \u2022 Scanned at JNPT Port Toll",
    route: "/geo",
    tag: "ALPR Alert"
  },
  {
    id: "loc-1",
    category: "LOCATION",
    title: "JNPT Port Container Yard B-4",
    subtitle: "Repeated Meeting Point & Drop Location",
    route: "/geo",
    tag: "Activity Hotspot"
  },
  {
    id: "org-1",
    category: "ORGANIZATION",
    title: "BlueStar Logistics Pvt. Ltd.",
    subtitle: "Shell Freight Forwarder \u2022 Direct link to Hawala fund route",
    route: "/network",
    tag: "Shell Entity"
  },
  {
    id: "case-1",
    category: "CASE",
    title: "CASE #IT-2024-884: Hawala Network Syndicate Alpha",
    subtitle: "28 Entities \u2022 14 Leads \u2022 Lead: Agent Vance",
    route: "/cases",
    tag: "Active Docket"
  }
];
const CockpitTopNavbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { activeCase } = useActiveCase();
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const filteredResults = searchQuery.trim() ? SEARCH_DATABASE.filter(
    (item) => item.title.toLowerCase().includes(searchQuery.toLowerCase()) || item.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) || item.category.toLowerCase().includes(searchQuery.toLowerCase())
  ) : SEARCH_DATABASE.slice(0, 5);
  const handleSelectResult = (route) => {
    navigate(route);
    setIsSearchOpen(false);
    setSearchQuery("");
  };
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("header", { className: "h-14 bg-[#07111F] border-b border-[#263B55] px-4 flex items-center justify-between gap-4 z-40 select-none" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-3 shrink-0" }, /* @__PURE__ */ React.createElement(
    "div",
    {
      onClick: () => navigate("/dashboard"),
      className: "flex items-center gap-2 cursor-pointer group"
    },
    /* @__PURE__ */ React.createElement("div", { className: "w-8 h-8 rounded-lg bg-blue-600/10 border border-[#2563EB]/40 flex items-center justify-center text-[#2563EB] group-hover:border-[#06B6D4] transition-colors" }, /* @__PURE__ */ React.createElement(ShieldCheck, { className: "w-4 h-4 text-[#06B6D4]" })),
    /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-1.5" }, /* @__PURE__ */ React.createElement("span", { className: "font-black text-sm tracking-wider text-white font-mono" }, "INTELLITRACK"), /* @__PURE__ */ React.createElement("span", { className: "w-1.5 h-1.5 rounded-full bg-[#06B6D4]" })), /* @__PURE__ */ React.createElement("div", { className: "text-[10px] text-[#94A3B8] font-mono tracking-wide hidden sm:block" }, "Investigative Intelligence Platform"))
  )), /* @__PURE__ */ React.createElement("div", { className: "flex-1 max-w-xl mx-2" }, /* @__PURE__ */ React.createElement("div", { className: "relative" }, /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => setIsSearchOpen(true),
      className: "w-full h-9 px-3 rounded-lg bg-[#0D1B2A] border border-[#263B55] text-left text-xs text-[#94A3B8] hover:text-white hover:border-[#2563EB] transition-all flex items-center justify-between group shadow-inner"
    },
    /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2.5 truncate" }, /* @__PURE__ */ React.createElement(Search, { className: "w-3.5 h-3.5 text-[#06B6D4] group-hover:text-white shrink-0 transition-colors" }), /* @__PURE__ */ React.createElement("span", { className: "truncate" }, "Search people, phone numbers, vehicles, locations, cases...")),
    /* @__PURE__ */ React.createElement("kbd", { className: "hidden md:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-[#101F33] border border-[#263B55] text-[10px] font-mono text-[#94A3B8]" }, /* @__PURE__ */ React.createElement("span", null, "\u2318"), "K")
  ))), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-3 shrink-0" }, /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => setIsStatusModalOpen(true),
      className: "hidden md:flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-[#0D1B2A] border border-[#263B55] hover:border-[#10B981]/50 text-xs font-mono transition-colors",
      title: "System Operational Status"
    },
    /* @__PURE__ */ React.createElement("span", { className: "relative flex h-2 w-2" }, /* @__PURE__ */ React.createElement("span", { className: "animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75" }), /* @__PURE__ */ React.createElement("span", { className: "relative inline-flex rounded-full h-2 w-2 bg-[#10B981]" })),
    /* @__PURE__ */ React.createElement("span", { className: "text-white text-[11px] font-semibold" }, "System Operational")
  ), /* @__PURE__ */ React.createElement("div", { className: "relative" }, /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => setIsNotificationsOpen(!isNotificationsOpen),
      className: "p-2 rounded-lg bg-[#0D1B2A] border border-[#263B55] hover:border-slate-400 text-[#94A3B8] hover:text-white transition-colors relative",
      title: "Operational Alerts"
    },
    /* @__PURE__ */ React.createElement(Bell, { className: "w-4 h-4" }),
    /* @__PURE__ */ React.createElement("span", { className: "absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#EF4444]" })
  ), isNotificationsOpen && /* @__PURE__ */ React.createElement("div", { className: "absolute right-0 top-12 w-80 sm:w-96 bg-[#0D1B2A] border border-[#263B55] rounded-xl shadow-2xl z-50 overflow-hidden font-sans" }, /* @__PURE__ */ React.createElement("div", { className: "bg-[#07111F] px-4 py-3 border-b border-[#263B55] flex items-center justify-between" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 font-mono text-xs font-bold text-white uppercase" }, /* @__PURE__ */ React.createElement(Radio, { className: "w-3.5 h-3.5 text-[#06B6D4] animate-pulse" }), /* @__PURE__ */ React.createElement("span", null, "Real-Time Intelligence Feeds")), /* @__PURE__ */ React.createElement("span", { className: "px-1.5 py-0.5 rounded text-[10px] font-mono bg-red-500/20 text-[#EF4444] border border-red-500/30" }, "3 ALERTS")), /* @__PURE__ */ React.createElement("div", { className: "max-h-80 overflow-y-auto divide-y divide-[#263B55] custom-scrollbar text-xs font-mono" }, /* @__PURE__ */ React.createElement("div", { className: "p-3 hover:bg-[#101F33] transition-colors cursor-pointer" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between text-[#94A3B8] text-[10px] mb-1" }, /* @__PURE__ */ React.createElement("span", { className: "text-[#EF4444] font-bold" }, "HIGH RISK SIGNAL"), /* @__PURE__ */ React.createElement("span", null, "2m ago")), /* @__PURE__ */ React.createElement("div", { className: "text-white font-semibold" }, "SIM Rotation Detected for Raj Mehta"), /* @__PURE__ */ React.createElement("div", { className: "text-[#94A3B8] text-[11px] mt-0.5" }, "IMEI #861294 switched to new prepaid IMSI in JNPT Sector.")), /* @__PURE__ */ React.createElement("div", { className: "p-3 hover:bg-[#101F33] transition-colors cursor-pointer" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between text-[#94A3B8] text-[10px] mb-1" }, /* @__PURE__ */ React.createElement("span", { className: "text-[#F59E0B] font-bold" }, "CO-LOCATION REVIEW"), /* @__PURE__ */ React.createElement("span", null, "18m ago")), /* @__PURE__ */ React.createElement("div", { className: "text-white font-semibold" }, "Pier 42 Hotspot Convergence"), /* @__PURE__ */ React.createElement("div", { className: "text-[#94A3B8] text-[11px] mt-0.5" }, "Audi A8 [MH-01-EA-9902] scanned within 50m of burner phone.")), /* @__PURE__ */ React.createElement("div", { className: "p-3 hover:bg-[#101F33] transition-colors cursor-pointer" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between text-[#94A3B8] text-[10px] mb-1" }, /* @__PURE__ */ React.createElement("span", { className: "text-[#10B981] font-bold" }, "VERIFIED LINK"), /* @__PURE__ */ React.createElement("span", null, "1h ago")), /* @__PURE__ */ React.createElement("div", { className: "text-white font-semibold" }, "Bank Wire Authenticated"), /* @__PURE__ */ React.createElement("div", { className: "text-[#94A3B8] text-[11px] mt-0.5" }, "$142,000 NEFT transferred from Astraea Trading to BlueStar Logistics."))), /* @__PURE__ */ React.createElement("div", { className: "bg-[#07111F] p-2 border-t border-[#263B55] text-center" }, /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => {
        setIsNotificationsOpen(false);
        navigate("/leads");
      },
      className: "text-xs font-mono text-[#06B6D4] hover:underline"
    },
    "View All Investigative Alerts \u2192"
  )))), /* @__PURE__ */ React.createElement("div", { className: "relative" }, /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => setIsUserMenuOpen(!isUserMenuOpen),
      className: "flex items-center gap-2.5 p-1 rounded-lg hover:bg-[#0D1B2A] transition-colors"
    },
    /* @__PURE__ */ React.createElement("div", { className: "w-8 h-8 rounded-lg bg-[#2563EB] text-white flex items-center justify-center font-bold text-xs shadow-md border border-blue-400/30" }, user?.name ? user.name.slice(0, 2).toUpperCase() : "MV"),
    /* @__PURE__ */ React.createElement("div", { className: "hidden lg:block text-left leading-tight" }, /* @__PURE__ */ React.createElement("div", { className: "text-xs font-semibold text-white" }, user?.name || "Marcus Vance"), /* @__PURE__ */ React.createElement("div", { className: "text-[10px] font-mono text-[#06B6D4]" }, "Special Agent")),
    /* @__PURE__ */ React.createElement(ChevronDown, { className: "w-3.5 h-3.5 text-[#94A3B8] hidden sm:block" })
  ), isUserMenuOpen && /* @__PURE__ */ React.createElement("div", { className: "absolute right-0 top-12 w-64 bg-[#0D1B2A] border border-[#263B55] rounded-xl shadow-2xl z-50 py-2 font-sans" }, /* @__PURE__ */ React.createElement("div", { className: "px-4 py-2.5 border-b border-[#263B55]" }, /* @__PURE__ */ React.createElement("div", { className: "text-xs font-bold text-white" }, user?.name || "Marcus Vance"), /* @__PURE__ */ React.createElement("div", { className: "text-[11px] text-[#94A3B8] font-mono" }, user?.email || "m.vance@intellitrack.gov"), /* @__PURE__ */ React.createElement("div", { className: "mt-1.5 px-2 py-0.5 rounded bg-blue-950/80 text-[#06B6D4] text-[10px] font-mono inline-block border border-blue-800" }, "Badge: ", user?.badgeNumber || "FBI-89412", " \u2022 Tier-3")), /* @__PURE__ */ React.createElement("div", { className: "py-1 text-xs" }, /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => {
        setIsUserMenuOpen(false);
        navigate("/profile");
      },
      className: "w-full px-4 py-2 text-left text-slate-300 hover:text-white hover:bg-[#101F33] flex items-center gap-2.5 transition-colors"
    },
    /* @__PURE__ */ React.createElement(User, { className: "w-3.5 h-3.5 text-[#94A3B8]" }),
    /* @__PURE__ */ React.createElement("span", null, "Investigator Profile")
  ), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => {
        setIsUserMenuOpen(false);
        navigate("/settings");
      },
      className: "w-full px-4 py-2 text-left text-slate-300 hover:text-white hover:bg-[#101F33] flex items-center gap-2.5 transition-colors"
    },
    /* @__PURE__ */ React.createElement(Settings, { className: "w-3.5 h-3.5 text-[#94A3B8]" }),
    /* @__PURE__ */ React.createElement("span", null, "System Settings")
  )), /* @__PURE__ */ React.createElement("div", { className: "border-t border-[#263B55] pt-1" }, /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => {
        setIsUserMenuOpen(false);
        logout();
        navigate("/login");
      },
      className: "w-full px-4 py-2 text-left text-[#EF4444] hover:bg-red-500/10 flex items-center gap-2.5 text-xs font-medium transition-colors"
    },
    /* @__PURE__ */ React.createElement(LogOut, { className: "w-3.5 h-3.5" }),
    /* @__PURE__ */ React.createElement("span", null, "Terminate Session")
  )))))), isSearchOpen && /* @__PURE__ */ React.createElement("div", { className: "fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-navy-950/80 backdrop-blur-md select-none" }, /* @__PURE__ */ React.createElement("div", { className: "w-full max-w-2xl bg-[#0D1B2A] border border-[#263B55] rounded-xl shadow-2xl overflow-hidden font-sans" }, /* @__PURE__ */ React.createElement("div", { className: "p-3 bg-[#07111F] border-b border-[#263B55] flex items-center gap-3" }, /* @__PURE__ */ React.createElement(Search, { className: "w-4 h-4 text-[#06B6D4]" }), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "text",
      autoFocus: true,
      value: searchQuery,
      onChange: (e) => setSearchQuery(e.target.value),
      placeholder: "Search people, phone numbers, vehicles, locations, cases...",
      className: "w-full bg-transparent border-0 text-white placeholder-[#94A3B8] text-sm focus:outline-hidden font-sans"
    }
  ), searchQuery && /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => setSearchQuery(""),
      className: "p-1 rounded text-[#94A3B8] hover:text-white"
    },
    /* @__PURE__ */ React.createElement(X, { className: "w-4 h-4" })
  ), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => setIsSearchOpen(false),
      className: "px-2 py-1 rounded text-xs font-mono text-[#94A3B8] hover:text-white bg-[#101F33] border border-[#263B55]"
    },
    "ESC"
  )), /* @__PURE__ */ React.createElement("div", { className: "max-h-96 overflow-y-auto p-2 divide-y divide-[#263B55]/50 custom-scrollbar text-xs font-mono" }, /* @__PURE__ */ React.createElement("div", { className: "px-3 py-1.5 text-[10px] text-[#94A3B8] uppercase tracking-wider" }, searchQuery ? `SEARCH RESULTS (${filteredResults.length})` : "RECENT INTELLIGENCE ENTITIES"), filteredResults.length === 0 ? /* @__PURE__ */ React.createElement("div", { className: "p-8 text-center text-[#94A3B8]" }, 'No intelligence records found matching "', searchQuery, '"') : filteredResults.map((item) => /* @__PURE__ */ React.createElement(
    "div",
    {
      key: item.id,
      onClick: () => handleSelectResult(item.route),
      className: "p-3 rounded-lg hover:bg-[#101F33] transition-colors cursor-pointer flex items-center justify-between gap-3 group"
    },
    /* @__PURE__ */ React.createElement("div", { className: "truncate" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React.createElement("span", { className: "text-white font-bold text-xs group-hover:text-[#06B6D4] transition-colors" }, item.title), /* @__PURE__ */ React.createElement("span", { className: "text-[10px] px-1.5 py-0.2 rounded bg-[#07111F] border border-[#263B55] text-slate-300" }, item.tag)), /* @__PURE__ */ React.createElement("div", { className: "text-[11px] text-[#94A3B8] truncate mt-0.5" }, item.subtitle)),
    /* @__PURE__ */ React.createElement(ArrowRight, { className: "w-4 h-4 text-[#94A3B8] group-hover:text-white group-hover:translate-x-0.5 transition-all shrink-0" })
  ))), /* @__PURE__ */ React.createElement("div", { className: "bg-[#07111F] px-4 py-2 border-t border-[#263B55] flex items-center justify-between text-[11px] font-mono text-[#94A3B8]" }, /* @__PURE__ */ React.createElement("span", null, "Search across 1,482 entities & 5,839 links"), /* @__PURE__ */ React.createElement("span", null, "Press ESC to close")))), /* @__PURE__ */ React.createElement(
    SystemStatusModal,
    {
      isOpen: isStatusModalOpen,
      onClose: () => setIsStatusModalOpen(false)
    }
  ));
};
var stdin_default = CockpitTopNavbar;
export {
  CockpitTopNavbar,
  stdin_default as default
};
