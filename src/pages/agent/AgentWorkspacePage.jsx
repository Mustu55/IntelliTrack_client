import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { mockCases, mockLeads } from "@/constants/mockData";
import { CaseAccessModal } from "@/components/common/CaseAccessModal";
import { ClearanceBadge } from "@/components/common/ClearanceBadge";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
  Briefcase,
  UserCheck,
  AlertTriangle,
  Key,
  ArrowRight,
  MapPin,
  Search
} from "lucide-react";
const AgentWorkspacePage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [cases, setCases] = useState(mockCases);
  const [accessModalOpen, setAccessModalOpen] = useState(false);
  const [selectedCaseForAccess, setSelectedCaseForAccess] = useState({
    id: "CASE-FED-2026-0042",
    number: "FED-2026-0042"
  });
  const assignedCases = cases.filter((c) => c.assignedAgents.includes(user?.badgeNumber || "FBI-89412") || true);
  const assignedLeads = mockLeads.filter((l) => l.assignedTo.includes("Vance") || true);
  return /* @__PURE__ */ React.createElement("div", { className: "space-y-6 max-w-7xl mx-auto font-mono" }, /* @__PURE__ */ React.createElement("div", { className: "p-2.5 bg-tactical-neutral-200 dark:bg-tactical-neutral-900 rounded border border-tactical-neutral-300 dark:border-tactical-neutral-800 flex flex-wrap items-center justify-between text-xs gap-2" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React.createElement("span", { className: "px-1.5 py-0.5 rounded bg-tactical-neutral-900 text-white dark:bg-tactical-neutral-100 dark:text-tactical-neutral-900 text-[10px] font-bold" }, "RESTRICTED NODE"), /* @__PURE__ */ React.createElement("span", { className: "font-semibold text-tactical-neutral-800 dark:text-tactical-neutral-200" }, "ACTIVE AGENT WORKSPACE // LAW ENFORCEMENT SENSITIVE (LES)")), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-3 text-[11px] text-tactical-neutral-500" }, /* @__PURE__ */ React.createElement("span", null, "STATION: DETROIT METRO TAC-09"), /* @__PURE__ */ React.createElement("span", { className: "text-tactical-success-600 font-semibold flex items-center gap-1" }, /* @__PURE__ */ React.createElement("span", { className: "w-1.5 h-1.5 rounded-full bg-tactical-success-500 animate-pulse" }), "DISPATCH LINK STABLE"))), /* @__PURE__ */ React.createElement("div", { className: "p-5 bg-white dark:bg-tactical-neutral-900 rounded border border-tactical-neutral-200 dark:border-tactical-neutral-800 flex flex-col md:flex-row md:items-center justify-between gap-4" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-start gap-4" }, /* @__PURE__ */ React.createElement("div", { className: "w-12 h-12 rounded bg-tactical-primary-100 dark:bg-tactical-primary-950 text-tactical-primary-700 dark:text-tactical-primary-300 flex items-center justify-center shrink-0 border border-tactical-primary-300 dark:border-tactical-primary-800" }, /* @__PURE__ */ React.createElement(Briefcase, { className: "w-6 h-6" })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React.createElement("h1", { className: "text-lg font-bold text-tactical-neutral-900 dark:text-tactical-neutral-100" }, user?.fullName || "Special Agent Marcus Vance"), /* @__PURE__ */ React.createElement(ClearanceBadge, { level: user?.clearanceLevel || "CJIS_LEVEL_4" })), /* @__PURE__ */ React.createElement("p", { className: "text-xs text-tactical-neutral-500 font-sans mt-0.5" }, "Assigned Command: Transnational Organized Crime & Narcotics Task Force (TOC-NTF)"), /* @__PURE__ */ React.createElement("div", { className: "flex flex-wrap items-center gap-4 text-[11px] text-tactical-neutral-400 mt-2" }, /* @__PURE__ */ React.createElement("span", null, "BADGE: ", /* @__PURE__ */ React.createElement("strong", { className: "text-tactical-neutral-700 dark:text-tactical-neutral-300" }, user?.badgeNumber || "FBI-89412")), /* @__PURE__ */ React.createElement("span", null, "TERMINAL ID: ", /* @__PURE__ */ React.createElement("strong", { className: "text-tactical-neutral-700 dark:text-tactical-neutral-300" }, "WS-8831-B")), /* @__PURE__ */ React.createElement("span", null, "PIV EXPIRY: ", /* @__PURE__ */ React.createElement("strong", { className: "text-tactical-neutral-700 dark:text-tactical-neutral-300" }, "04:12:00 ZULU"))))), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 shrink-0" }, /* @__PURE__ */ React.createElement(
    Button,
    {
      variant: "primary",
      size: "sm",
      onClick: () => setAccessModalOpen(true),
      icon: /* @__PURE__ */ React.createElement(Key, { className: "w-4 h-4" })
    },
    "+ Request Case Access"
  ), /* @__PURE__ */ React.createElement(
    Button,
    {
      variant: "secondary",
      size: "sm",
      onClick: () => navigate("/cases"),
      icon: /* @__PURE__ */ React.createElement(Search, { className: "w-4 h-4" })
    },
    "Search Dockets"
  ))), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-6" }, /* @__PURE__ */ React.createElement("div", { className: "lg:col-span-7 space-y-4" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between text-xs" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React.createElement(Briefcase, { className: "w-4 h-4 text-tactical-primary-600" }), /* @__PURE__ */ React.createElement("h2", { className: "font-bold uppercase text-tactical-neutral-900 dark:text-tactical-neutral-100" }, "My Active Investigative Dockets")), /* @__PURE__ */ React.createElement("span", { className: "text-[11px] text-tactical-neutral-500" }, "TOTAL ASSIGNED: ", assignedCases.length.toString().padStart(2, "0"))), /* @__PURE__ */ React.createElement("div", { className: "space-y-3" }, assignedCases.map((c) => /* @__PURE__ */ React.createElement(
    "div",
    {
      key: c.id,
      className: "p-4 bg-white dark:bg-tactical-neutral-900 rounded border border-tactical-neutral-200 dark:border-tactical-neutral-800 hover:border-tactical-primary-500 transition-colors space-y-3"
    },
    /* @__PURE__ */ React.createElement("div", { className: "flex items-start justify-between gap-2" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 mb-1" }, /* @__PURE__ */ React.createElement("span", { className: "font-bold text-xs text-tactical-primary-700 dark:text-tactical-primary-300" }, c.caseNumber), /* @__PURE__ */ React.createElement(Badge, { variant: c.priority === "CRITICAL" ? "danger" : "warning", size: "sm" }, c.priority), /* @__PURE__ */ React.createElement("span", { className: "text-[10px] text-tactical-neutral-400" }, c.classification)), /* @__PURE__ */ React.createElement("h3", { className: "font-bold text-sm text-tactical-neutral-900 dark:text-tactical-neutral-100" }, c.title)), /* @__PURE__ */ React.createElement(
      Button,
      {
        variant: "secondary",
        size: "sm",
        onClick: () => navigate(`/cases/${c.id}`),
        icon: /* @__PURE__ */ React.createElement(ArrowRight, { className: "w-3.5 h-3.5" }),
        className: "text-[11px]"
      },
      "Open Docket"
    )),
    /* @__PURE__ */ React.createElement("p", { className: "text-xs text-tactical-neutral-600 dark:text-tactical-neutral-400 font-sans leading-relaxed line-clamp-2" }, c.summary),
    /* @__PURE__ */ React.createElement("div", { className: "pt-2 border-t border-tactical-neutral-100 dark:border-tactical-neutral-800 flex items-center justify-between text-[11px] text-tactical-neutral-500" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-3" }, /* @__PURE__ */ React.createElement("span", null, "POIs: ", /* @__PURE__ */ React.createElement("strong", { className: "text-tactical-neutral-800 dark:text-tactical-neutral-200" }, c.primaryPOIs?.length || 0, " Targets")), /* @__PURE__ */ React.createElement("span", null, "Evidence: ", /* @__PURE__ */ React.createElement("strong", { className: "text-tactical-neutral-800 dark:text-tactical-neutral-200" }, c.evidenceCount || 0, " Files"))), /* @__PURE__ */ React.createElement("span", null, "Lead: ", c.leadInvestigator))
  )))), /* @__PURE__ */ React.createElement("div", { className: "lg:col-span-5 space-y-4" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between text-xs" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React.createElement(AlertTriangle, { className: "w-4 h-4 text-tactical-warning-500" }), /* @__PURE__ */ React.createElement("h2", { className: "font-bold uppercase text-tactical-neutral-900 dark:text-tactical-neutral-100" }, "Actionable Evidence Leads")), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => navigate("/leads"),
      className: "text-[11px] text-tactical-primary-600 hover:underline font-bold"
    },
    "View All Triage Queue"
  )), /* @__PURE__ */ React.createElement("div", { className: "space-y-3" }, assignedLeads.slice(0, 3).map((lead) => /* @__PURE__ */ React.createElement(
    "div",
    {
      key: lead.id,
      className: "p-3 bg-white dark:bg-tactical-neutral-900 rounded border border-tactical-neutral-200 dark:border-tactical-neutral-800 space-y-2 hover:border-tactical-warning-500 transition-colors"
    },
    /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between" }, /* @__PURE__ */ React.createElement("span", { className: "text-[11px] font-bold text-tactical-neutral-800 dark:text-tactical-neutral-200" }, lead.leadNumber), /* @__PURE__ */ React.createElement(Badge, { variant: lead.confidenceScore >= 90 ? "danger" : "warning", size: "sm" }, lead.confidenceScore, "% AI Confidence")),
    /* @__PURE__ */ React.createElement("h4", { className: "text-xs font-semibold text-tactical-neutral-900 dark:text-tactical-neutral-100" }, lead.headline),
    /* @__PURE__ */ React.createElement("p", { className: "text-[11px] text-tactical-neutral-500 font-sans line-clamp-2" }, lead.rationale),
    /* @__PURE__ */ React.createElement("div", { className: "pt-2 border-t border-tactical-neutral-100 dark:border-tactical-neutral-800 flex justify-between items-center text-[10px]" }, /* @__PURE__ */ React.createElement("span", { className: "text-tactical-neutral-400" }, "ACTION: ", lead.recommendedAction), /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => navigate("/leads"),
        className: "text-tactical-primary-600 hover:underline font-bold"
      },
      "Triage >"
    ))
  ))), /* @__PURE__ */ React.createElement("div", { className: "p-4 bg-tactical-neutral-50 dark:bg-tactical-neutral-900 rounded border border-tactical-neutral-300 dark:border-tactical-neutral-800 space-y-3" }, /* @__PURE__ */ React.createElement("h3", { className: "text-xs font-bold uppercase text-tactical-neutral-900 dark:text-tactical-neutral-100" }, "Field Intake Protocols"), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-2 gap-2 text-xs" }, /* @__PURE__ */ React.createElement(
    "button",
    {
      type: "button",
      onClick: () => navigate("/persons"),
      className: "p-2.5 rounded bg-white dark:bg-tactical-neutral-800 border border-tactical-neutral-300 dark:border-tactical-neutral-700 hover:border-tactical-primary-500 text-left transition-colors"
    },
    /* @__PURE__ */ React.createElement(UserCheck, { className: "w-4 h-4 text-tactical-primary-600 mb-1" }),
    /* @__PURE__ */ React.createElement("span", { className: "font-bold block text-[11px]" }, "FORM-POI-2026"),
    /* @__PURE__ */ React.createElement("span", { className: "text-[10px] text-tactical-neutral-500" }, "Record Target POI")
  ), /* @__PURE__ */ React.createElement(
    "button",
    {
      type: "button",
      onClick: () => navigate("/geo-temporal"),
      className: "p-2.5 rounded bg-white dark:bg-tactical-neutral-800 border border-tactical-neutral-300 dark:border-tactical-neutral-700 hover:border-tactical-primary-500 text-left transition-colors"
    },
    /* @__PURE__ */ React.createElement(MapPin, { className: "w-4 h-4 text-tactical-danger-600 mb-1" }),
    /* @__PURE__ */ React.createElement("span", { className: "font-bold block text-[11px]" }, "Geo-Spatial Ping"),
    /* @__PURE__ */ React.createElement("span", { className: "text-[10px] text-tactical-neutral-500" }, "Track Tower Intercept")
  ))))), /* @__PURE__ */ React.createElement(
    CaseAccessModal,
    {
      isOpen: accessModalOpen,
      onClose: () => setAccessModalOpen(false),
      caseId: selectedCaseForAccess.id,
      caseNumber: selectedCaseForAccess.number
    }
  ));
};
export {
  AgentWorkspacePage
};
