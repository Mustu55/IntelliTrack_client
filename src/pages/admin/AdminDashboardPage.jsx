import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { mockCases, mockAuditLogs, mockAgents } from "@/constants/mockData";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ZuluClock } from "@/components/common/ZuluClock";
import { HashStamp } from "@/components/common/HashStamp";
import { MerkleModal } from "@/components/common/MerkleModal";
import {
  FolderPlus,
  UserPlus,
  CheckSquare,
  Cpu,
  ShieldCheck,
  ArrowRight,
  RefreshCw,
  Shield
} from "lucide-react";
const AdminDashboardPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [filter, setFilter] = useState("ALL");
  const [isSyncing, setIsSyncing] = useState(false);
  const [merkleModalOpen, setMerkleModalOpen] = useState(false);
  const activeCasesCount = mockCases.filter((c) => c.status === "ACTIVE").length;
  const pendingLeadsCount = 4;
  const agentsCount = mockAgents.length;
  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => setIsSyncing(false), 600);
  };
  const filteredLogs = mockAuditLogs.filter((log) => {
    if (filter === "AUTH") return log.action.toLowerCase().includes("login") || log.action.toLowerCase().includes("auth") || log.action.toLowerCase().includes("piv");
    if (filter === "CASE") return log.action.toLowerCase().includes("case") || log.action.toLowerCase().includes("docket") || log.action.toLowerCase().includes("evidence");
    if (filter === "EXPORT") return log.action.toLowerCase().includes("export") || log.action.toLowerCase().includes("dossier") || log.action.toLowerCase().includes("report");
    return true;
  });
  return /* @__PURE__ */ React.createElement("div", { className: "space-y-6 max-w-7xl mx-auto" }, /* @__PURE__ */ React.createElement("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-tactical-neutral-200 dark:border-tactical-neutral-800" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 text-tactical-neutral-500 font-mono text-[11px] uppercase tracking-wider mb-1" }, /* @__PURE__ */ React.createElement("span", null, "NODE ID: CR-INT-EAST-09"), /* @__PURE__ */ React.createElement("span", null, "/"), /* @__PURE__ */ React.createElement("span", { className: "text-tactical-success-600 dark:text-tactical-success-400 font-semibold flex items-center gap-1" }, /* @__PURE__ */ React.createElement("span", { className: "w-1.5 h-1.5 rounded-full bg-tactical-success-500 animate-pulse" }), "DEFCON 5 READY"), /* @__PURE__ */ React.createElement("span", null, "/"), /* @__PURE__ */ React.createElement("span", null, "ENC LEVEL 4 CJIS-COMPLIANT")), /* @__PURE__ */ React.createElement("h1", { className: "text-2xl font-bold font-mono tracking-tight text-tactical-neutral-900 dark:text-tactical-neutral-100" }, "Executive Command Overview")), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-3" }, /* @__PURE__ */ React.createElement(ZuluClock, { prefix: "ZULU HQ" }), /* @__PURE__ */ React.createElement(
    Button,
    {
      variant: "secondary",
      size: "sm",
      onClick: handleSync,
      disabled: isSyncing,
      icon: /* @__PURE__ */ React.createElement(RefreshCw, { className: `w-3.5 h-3.5 ${isSyncing ? "animate-spin" : ""}` })
    },
    "Re-sync Telemetry"
  ))), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" }, /* @__PURE__ */ React.createElement("div", { className: "bg-white dark:bg-tactical-neutral-900 border border-tactical-neutral-200 dark:border-tactical-neutral-800 rounded p-4 flex flex-col justify-between hover:border-tactical-primary-500 transition-colors" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-start justify-between" }, /* @__PURE__ */ React.createElement("span", { className: "text-xs font-mono font-semibold text-tactical-neutral-600 dark:text-tactical-neutral-400 uppercase" }, "Supervised Dockets"), /* @__PURE__ */ React.createElement(Badge, { variant: "primary", size: "sm" }, "ACTIVE")), /* @__PURE__ */ React.createElement("div", { className: "my-3" }, /* @__PURE__ */ React.createElement("div", { className: "text-3xl font-black font-mono tracking-tight text-tactical-neutral-900 dark:text-tactical-neutral-100" }, activeCasesCount), /* @__PURE__ */ React.createElement("div", { className: "text-[11px] font-mono text-tactical-neutral-500" }, "Across 3 Federal Jurisdictions")), /* @__PURE__ */ React.createElement("div", { className: "w-full bg-tactical-neutral-100 dark:bg-tactical-neutral-800 h-1.5 rounded-full overflow-hidden" }, /* @__PURE__ */ React.createElement("div", { className: "bg-tactical-primary-600 h-full w-3/4 rounded-full" }))), /* @__PURE__ */ React.createElement("div", { className: "bg-white dark:bg-tactical-neutral-900 border border-tactical-neutral-200 dark:border-tactical-neutral-800 rounded p-4 flex flex-col justify-between hover:border-tactical-primary-500 transition-colors" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-start justify-between" }, /* @__PURE__ */ React.createElement("span", { className: "text-xs font-mono font-semibold text-tactical-neutral-600 dark:text-tactical-neutral-400 uppercase" }, "Credentialed Staff"), /* @__PURE__ */ React.createElement(Badge, { variant: "neutral", size: "sm" }, "ACTIVE ROSTER")), /* @__PURE__ */ React.createElement("div", { className: "my-3" }, /* @__PURE__ */ React.createElement("div", { className: "text-3xl font-black font-mono tracking-tight text-tactical-neutral-900 dark:text-tactical-neutral-100" }, agentsCount), /* @__PURE__ */ React.createElement("div", { className: "text-[11px] font-mono text-tactical-neutral-500" }, "PIV & CAC Hardware Bound")), /* @__PURE__ */ React.createElement("div", { className: "w-full bg-tactical-neutral-100 dark:bg-tactical-neutral-800 h-1.5 rounded-full overflow-hidden" }, /* @__PURE__ */ React.createElement("div", { className: "bg-tactical-primary-600 h-full w-full rounded-full" }))), /* @__PURE__ */ React.createElement("div", { className: "bg-white dark:bg-tactical-neutral-900 border border-tactical-neutral-200 dark:border-tactical-neutral-800 rounded p-4 flex flex-col justify-between hover:border-tactical-primary-500 transition-colors" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-start justify-between" }, /* @__PURE__ */ React.createElement("span", { className: "text-xs font-mono font-semibold text-tactical-neutral-600 dark:text-tactical-neutral-400 uppercase" }, "Pending Warrants"), /* @__PURE__ */ React.createElement(Badge, { variant: "warning", size: "sm" }, "QUEUE ACTIVE")), /* @__PURE__ */ React.createElement("div", { className: "my-3" }, /* @__PURE__ */ React.createElement("div", { className: "text-3xl font-black font-mono tracking-tight text-tactical-neutral-900 dark:text-tactical-neutral-100" }, pendingLeadsCount), /* @__PURE__ */ React.createElement("div", { className: "text-[11px] font-mono text-tactical-neutral-500" }, "Title 18 \xA7 2703(d) Intercepts")), /* @__PURE__ */ React.createElement("div", { className: "w-full bg-tactical-neutral-100 dark:bg-tactical-neutral-800 h-1.5 rounded-full overflow-hidden" }, /* @__PURE__ */ React.createElement("div", { className: "bg-tactical-warning-500 h-full w-2/5 rounded-full" }))), /* @__PURE__ */ React.createElement("div", { className: "bg-white dark:bg-tactical-neutral-900 border border-tactical-neutral-200 dark:border-tactical-neutral-800 rounded p-4 flex flex-col justify-between hover:border-tactical-primary-500 transition-colors" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-start justify-between" }, /* @__PURE__ */ React.createElement("span", { className: "text-xs font-mono font-semibold text-tactical-neutral-600 dark:text-tactical-neutral-400 uppercase" }, "Architecture Status"), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-1.5 text-xs font-mono text-tactical-success-600 dark:text-tactical-success-400 font-bold" }, /* @__PURE__ */ React.createElement("span", { className: "w-2 h-2 rounded-full bg-tactical-success-500 animate-pulse" }), "NOMINAL")), /* @__PURE__ */ React.createElement("div", { className: "my-2 grid grid-cols-2 gap-1.5 font-mono text-[10px]" }, /* @__PURE__ */ React.createElement("div", { className: "p-1 rounded bg-tactical-neutral-100 dark:bg-tactical-neutral-800 flex items-center gap-1" }, /* @__PURE__ */ React.createElement("span", { className: "w-1.5 h-1.5 rounded-full bg-tactical-success-500" }), /* @__PURE__ */ React.createElement("span", null, "Graph DB")), /* @__PURE__ */ React.createElement("div", { className: "p-1 rounded bg-tactical-neutral-100 dark:bg-tactical-neutral-800 flex items-center gap-1" }, /* @__PURE__ */ React.createElement("span", { className: "w-1.5 h-1.5 rounded-full bg-tactical-success-500" }), /* @__PURE__ */ React.createElement("span", null, "CDR Parser")), /* @__PURE__ */ React.createElement("div", { className: "p-1 rounded bg-tactical-neutral-100 dark:bg-tactical-neutral-800 flex items-center gap-1" }, /* @__PURE__ */ React.createElement("span", { className: "w-1.5 h-1.5 rounded-full bg-tactical-success-500" }), /* @__PURE__ */ React.createElement("span", null, "NLP Triage")), /* @__PURE__ */ React.createElement("div", { className: "p-1 rounded bg-tactical-neutral-100 dark:bg-tactical-neutral-800 flex items-center gap-1" }, /* @__PURE__ */ React.createElement("span", { className: "w-1.5 h-1.5 rounded-full bg-tactical-success-500" }), /* @__PURE__ */ React.createElement("span", null, "CJIS Daemon"))), /* @__PURE__ */ React.createElement("div", { className: "text-[10px] font-mono text-tactical-neutral-400 flex justify-between" }, /* @__PURE__ */ React.createElement("span", null, "Uptime: 99.98%"), /* @__PURE__ */ React.createElement("span", null, "Cluster 4A")))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between mb-3 font-mono text-xs" }, /* @__PURE__ */ React.createElement("h2", { className: "font-bold uppercase tracking-wider text-tactical-neutral-700 dark:text-tactical-neutral-300" }, "Platform Command & Rapid Intake Actions"), /* @__PURE__ */ React.createElement("span", { className: "text-tactical-neutral-400" }, "Tier 1 Administrative Clearances")), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" }, /* @__PURE__ */ React.createElement(
    "button",
    {
      type: "button",
      onClick: () => navigate("/admin/agents"),
      className: "group p-4 rounded bg-tactical-primary-700 hover:bg-tactical-primary-800 text-white border border-tactical-primary-600 flex flex-col justify-between text-left transition-all shadow-xs"
    },
    /* @__PURE__ */ React.createElement("div", { className: "flex items-start justify-between w-full mb-4" }, /* @__PURE__ */ React.createElement("div", { className: "w-9 h-9 rounded bg-white/10 flex items-center justify-center" }, /* @__PURE__ */ React.createElement(UserPlus, { className: "w-4 h-4 text-white" })), /* @__PURE__ */ React.createElement(ArrowRight, { className: "w-4 h-4 text-tactical-primary-200 group-hover:translate-x-1 transition-transform" })),
    /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "font-mono font-bold text-xs uppercase mb-0.5" }, "+ Add New Agent"), /* @__PURE__ */ React.createElement("div", { className: "text-[11px] text-tactical-primary-100 leading-snug" }, "Onboard investigator with clearance credentials"))
  ), /* @__PURE__ */ React.createElement(
    "button",
    {
      type: "button",
      onClick: () => navigate("/cases"),
      className: "group p-4 rounded bg-white dark:bg-tactical-neutral-900 hover:bg-tactical-neutral-50 dark:hover:bg-tactical-neutral-800/80 border border-tactical-neutral-200 dark:border-tactical-neutral-800 flex flex-col justify-between text-left transition-all"
    },
    /* @__PURE__ */ React.createElement("div", { className: "flex items-start justify-between w-full mb-4" }, /* @__PURE__ */ React.createElement("div", { className: "w-9 h-9 rounded bg-tactical-neutral-100 dark:bg-tactical-neutral-800 flex items-center justify-center text-tactical-primary-600" }, /* @__PURE__ */ React.createElement(FolderPlus, { className: "w-4 h-4" })), /* @__PURE__ */ React.createElement(ArrowRight, { className: "w-4 h-4 text-tactical-neutral-400 group-hover:translate-x-1 transition-transform" })),
    /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "font-mono font-bold text-xs uppercase text-tactical-neutral-900 dark:text-tactical-neutral-100 mb-0.5" }, "+ Create New Case"), /* @__PURE__ */ React.createElement("div", { className: "text-[11px] text-tactical-neutral-500 leading-snug" }, "Open new criminal case docket & vault"))
  ), /* @__PURE__ */ React.createElement(
    "button",
    {
      type: "button",
      onClick: () => navigate("/leads"),
      className: "group p-4 rounded bg-white dark:bg-tactical-neutral-900 hover:bg-tactical-neutral-50 dark:hover:bg-tactical-neutral-800/80 border border-tactical-neutral-200 dark:border-tactical-neutral-800 flex flex-col justify-between text-left transition-all"
    },
    /* @__PURE__ */ React.createElement("div", { className: "flex items-start justify-between w-full mb-4" }, /* @__PURE__ */ React.createElement("div", { className: "w-9 h-9 rounded bg-tactical-neutral-100 dark:bg-tactical-neutral-800 flex items-center justify-center text-tactical-warning-600" }, /* @__PURE__ */ React.createElement(CheckSquare, { className: "w-4 h-4" })), /* @__PURE__ */ React.createElement(ArrowRight, { className: "w-4 h-4 text-tactical-neutral-400 group-hover:translate-x-1 transition-transform" })),
    /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "font-mono font-bold text-xs uppercase text-tactical-neutral-900 dark:text-tactical-neutral-100 mb-0.5" }, "Review Pending Leads"), /* @__PURE__ */ React.createElement("div", { className: "text-[11px] text-tactical-neutral-500 leading-snug" }, "Triage and score AI evidentiary leads"))
  ), /* @__PURE__ */ React.createElement(
    "button",
    {
      type: "button",
      onClick: () => navigate("/admin/system-config"),
      className: "group p-4 rounded bg-white dark:bg-tactical-neutral-900 hover:bg-tactical-neutral-50 dark:hover:bg-tactical-neutral-800/80 border border-tactical-neutral-200 dark:border-tactical-neutral-800 flex flex-col justify-between text-left transition-all"
    },
    /* @__PURE__ */ React.createElement("div", { className: "flex items-start justify-between w-full mb-4" }, /* @__PURE__ */ React.createElement("div", { className: "w-9 h-9 rounded bg-tactical-neutral-100 dark:bg-tactical-neutral-800 flex items-center justify-center text-tactical-neutral-600 dark:text-tactical-neutral-400" }, /* @__PURE__ */ React.createElement(Cpu, { className: "w-4 h-4" })), /* @__PURE__ */ React.createElement(ArrowRight, { className: "w-4 h-4 text-tactical-neutral-400 group-hover:translate-x-1 transition-transform" })),
    /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "font-mono font-bold text-xs uppercase text-tactical-neutral-900 dark:text-tactical-neutral-100 mb-0.5" }, "System Configuration"), /* @__PURE__ */ React.createElement("div", { className: "text-[11px] text-tactical-neutral-500 leading-snug" }, "Manage data feeds, ALPR & security policies"))
  ))), /* @__PURE__ */ React.createElement("div", { className: "bg-white dark:bg-tactical-neutral-900 border border-tactical-neutral-200 dark:border-tactical-neutral-800 rounded overflow-hidden" }, /* @__PURE__ */ React.createElement("div", { className: "p-4 bg-tactical-neutral-50 dark:bg-tactical-neutral-900/80 border-b border-tactical-neutral-200 dark:border-tactical-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React.createElement(ShieldCheck, { className: "w-4 h-4 text-tactical-primary-600" }), /* @__PURE__ */ React.createElement("h3", { className: "font-mono font-bold text-sm uppercase text-tactical-neutral-900 dark:text-tactical-neutral-100" }, "Department Activity & Access Audit Log")), /* @__PURE__ */ React.createElement("p", { className: "text-xs text-tactical-neutral-500 mt-0.5" }, "Immutable append-only chain for statutory CJIS 5.4 compliance tracking")), /* @__PURE__ */ React.createElement("div", { className: "flex flex-wrap items-center gap-2 font-mono text-xs" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center p-0.5 bg-tactical-neutral-200 dark:bg-tactical-neutral-800 rounded border border-tactical-neutral-300 dark:border-tactical-neutral-700" }, /* @__PURE__ */ React.createElement(
    "button",
    {
      type: "button",
      onClick: () => setFilter("ALL"),
      className: `px-2 py-1 rounded text-[11px] font-semibold transition-all ${filter === "ALL" ? "bg-white dark:bg-tactical-neutral-900 text-tactical-neutral-900 dark:text-tactical-neutral-100 shadow-xs" : "text-tactical-neutral-600 dark:text-tactical-neutral-400"}`
    },
    "All Events"
  ), /* @__PURE__ */ React.createElement(
    "button",
    {
      type: "button",
      onClick: () => setFilter("AUTH"),
      className: `px-2 py-1 rounded text-[11px] font-semibold transition-all ${filter === "AUTH" ? "bg-white dark:bg-tactical-neutral-900 text-tactical-neutral-900 dark:text-tactical-neutral-100 shadow-xs" : "text-tactical-neutral-600 dark:text-tactical-neutral-400"}`
    },
    "Auth"
  ), /* @__PURE__ */ React.createElement(
    "button",
    {
      type: "button",
      onClick: () => setFilter("CASE"),
      className: `px-2 py-1 rounded text-[11px] font-semibold transition-all ${filter === "CASE" ? "bg-white dark:bg-tactical-neutral-900 text-tactical-neutral-900 dark:text-tactical-neutral-100 shadow-xs" : "text-tactical-neutral-600 dark:text-tactical-neutral-400"}`
    },
    "Cases"
  ), /* @__PURE__ */ React.createElement(
    "button",
    {
      type: "button",
      onClick: () => setFilter("EXPORT"),
      className: `px-2 py-1 rounded text-[11px] font-semibold transition-all ${filter === "EXPORT" ? "bg-white dark:bg-tactical-neutral-900 text-tactical-neutral-900 dark:text-tactical-neutral-100 shadow-xs" : "text-tactical-neutral-600 dark:text-tactical-neutral-400"}`
    },
    "Exports"
  )), /* @__PURE__ */ React.createElement(
    Button,
    {
      variant: "secondary",
      size: "sm",
      onClick: () => setMerkleModalOpen(true),
      icon: /* @__PURE__ */ React.createElement(Shield, { className: "w-3.5 h-3.5 text-tactical-success-600" })
    },
    "Verify Merkle Root"
  ))), /* @__PURE__ */ React.createElement("div", { className: "overflow-x-auto" }, /* @__PURE__ */ React.createElement("table", { className: "w-full text-left font-mono text-xs" }, /* @__PURE__ */ React.createElement("thead", { className: "bg-tactical-neutral-100 dark:bg-tactical-neutral-800/80 text-tactical-neutral-600 dark:text-tactical-neutral-400 uppercase text-[10px] tracking-wider border-b border-tactical-neutral-200 dark:border-tactical-neutral-700" }, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("th", { className: "px-4 py-2.5" }, "Block / Hash"), /* @__PURE__ */ React.createElement("th", { className: "px-4 py-2.5" }, "Timestamp (UTC)"), /* @__PURE__ */ React.createElement("th", { className: "px-4 py-2.5" }, "Agent / Badge"), /* @__PURE__ */ React.createElement("th", { className: "px-4 py-2.5" }, "Action Executed"), /* @__PURE__ */ React.createElement("th", { className: "px-4 py-2.5" }, "Jurisdiction"), /* @__PURE__ */ React.createElement("th", { className: "px-4 py-2.5 text-right" }, "Integrity"))), /* @__PURE__ */ React.createElement("tbody", { className: "divide-y divide-tactical-neutral-200 dark:divide-tactical-neutral-800" }, filteredLogs.slice(0, 6).map((log) => /* @__PURE__ */ React.createElement("tr", { key: log.id, className: "hover:bg-tactical-neutral-50 dark:hover:bg-tactical-neutral-800/50 transition-colors" }, /* @__PURE__ */ React.createElement("td", { className: "px-4 py-3" }, /* @__PURE__ */ React.createElement(HashStamp, { hash: log.sha256Hash, lead: 5, tail: 5 })), /* @__PURE__ */ React.createElement("td", { className: "px-4 py-3 text-tactical-neutral-600 dark:text-tactical-neutral-400" }, new Date(log.timestamp).toISOString().replace("T", " ").slice(0, 19), "Z"), /* @__PURE__ */ React.createElement("td", { className: "px-4 py-3 font-semibold text-tactical-neutral-800 dark:text-tactical-neutral-200" }, log.agentName, /* @__PURE__ */ React.createElement("span", { className: "block text-[10px] font-normal text-tactical-neutral-400" }, log.badgeNumber)), /* @__PURE__ */ React.createElement("td", { className: "px-4 py-3 text-tactical-neutral-800 dark:text-tactical-neutral-200" }, log.action), /* @__PURE__ */ React.createElement("td", { className: "px-4 py-3" }, /* @__PURE__ */ React.createElement("span", { className: "text-[10px] px-2 py-0.5 rounded bg-tactical-neutral-100 dark:bg-tactical-neutral-800 border border-tactical-neutral-300 dark:border-tactical-neutral-700" }, log.jurisdiction)), /* @__PURE__ */ React.createElement("td", { className: "px-4 py-3 text-right" }, /* @__PURE__ */ React.createElement(Badge, { variant: "success", size: "sm" }, "VERIFIED"))))))), /* @__PURE__ */ React.createElement("div", { className: "p-3 bg-tactical-neutral-50 dark:bg-tactical-neutral-900 border-t border-tactical-neutral-200 dark:border-tactical-neutral-800 flex items-center justify-between text-xs font-mono text-tactical-neutral-500" }, /* @__PURE__ */ React.createElement("span", null, "Showing ", Math.min(filteredLogs.length, 6), " of ", filteredLogs.length, " ledger transactions"), /* @__PURE__ */ React.createElement(
    "button",
    {
      type: "button",
      onClick: () => navigate("/admin/audit-ledger"),
      className: "text-tactical-primary-600 hover:underline font-bold flex items-center gap-1"
    },
    "Open Complete Chain Ledger ",
    /* @__PURE__ */ React.createElement(ArrowRight, { className: "w-3.5 h-3.5" })
  ))), /* @__PURE__ */ React.createElement(
    MerkleModal,
    {
      isOpen: merkleModalOpen,
      onClose: () => setMerkleModalOpen(false)
    }
  ));
};
export {
  AdminDashboardPage
};
