import React, { useState } from "react";
import { mockLeads } from "@/constants/mockData";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
  CheckSquare,
  ShieldCheck,
  Send,
  XCircle,
  CheckCircle,
  Brain,
  Scale
} from "lucide-react";
const LeadPrioritizationPage = () => {
  const [leads, setLeads] = useState(mockLeads);
  const [selectedLead, setSelectedLead] = useState(mockLeads[0]);
  const [showFRE902Reasoning, setShowFRE902Reasoning] = useState(true);
  const [triageActionMessage, setTriageActionMessage] = useState(null);
  const handleTriageAction = (action) => {
    setTriageActionMessage(`ACTION EXECUTED: ${action} for ${selectedLead.leadNumber}. Signed and logged to Merkle block.`);
    setTimeout(() => setTriageActionMessage(null), 4e3);
  };
  return /* @__PURE__ */ React.createElement("div", { className: "space-y-6 max-w-7xl mx-auto font-mono" }, /* @__PURE__ */ React.createElement("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-tactical-neutral-200 dark:border-tactical-neutral-800" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 text-tactical-neutral-500 text-[11px] uppercase tracking-wider mb-0.5" }, /* @__PURE__ */ React.createElement("span", null, "EXPLAINABLE ALGORITHMIC TRIAGE"), /* @__PURE__ */ React.createElement("span", null, "/"), /* @__PURE__ */ React.createElement("span", { className: "text-tactical-success-600 font-semibold" }, "FRE 902 TRANSPARENT EVIDENCE")), /* @__PURE__ */ React.createElement("h1", { className: "text-2xl font-bold tracking-tight text-tactical-neutral-900 dark:text-tactical-neutral-100" }, "Explainable Lead Prioritization & Case Triage")), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React.createElement(
    Button,
    {
      variant: "secondary",
      size: "sm",
      onClick: () => setShowFRE902Reasoning(!showFRE902Reasoning),
      icon: /* @__PURE__ */ React.createElement(Scale, { className: "w-4 h-4 text-tactical-primary-600" })
    },
    showFRE902Reasoning ? "Hide FRE 902 Factors" : "Show FRE 902 Factors"
  ))), triageActionMessage && /* @__PURE__ */ React.createElement("div", { className: "p-3 bg-tactical-success-50 dark:bg-tactical-success-950/80 border border-tactical-success-300 dark:border-tactical-success-800 rounded flex items-center justify-between text-xs text-tactical-success-800 dark:text-tactical-success-200" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React.createElement(CheckCircle, { className: "w-4 h-4 text-tactical-success-600" }), /* @__PURE__ */ React.createElement("span", null, triageActionMessage)), /* @__PURE__ */ React.createElement("span", { className: "text-[10px] uppercase font-bold text-tactical-success-600" }, "MERKLE ROOT UPDATED")), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-6" }, /* @__PURE__ */ React.createElement("div", { className: "lg:col-span-5 space-y-3" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between text-xs pb-1" }, /* @__PURE__ */ React.createElement("span", { className: "font-bold text-tactical-neutral-900 dark:text-tactical-neutral-100 uppercase" }, "Triage Priority Queue"), /* @__PURE__ */ React.createElement("span", { className: "text-[11px] text-tactical-neutral-500" }, leads.length, " LEADS GENERATED")), /* @__PURE__ */ React.createElement("div", { className: "space-y-2.5" }, leads.map((lead) => {
    const isSelected = selectedLead.id === lead.id;
    return /* @__PURE__ */ React.createElement(
      "div",
      {
        key: lead.id,
        onClick: () => setSelectedLead(lead),
        className: `p-4 rounded border cursor-pointer transition-all ${isSelected ? "bg-tactical-primary-50 dark:bg-tactical-primary-950/70 border-tactical-primary-500 shadow-xs" : "bg-white dark:bg-tactical-neutral-900 border-tactical-neutral-200 dark:border-tactical-neutral-800 hover:border-tactical-neutral-400"}`
      },
      /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between mb-1.5" }, /* @__PURE__ */ React.createElement("span", { className: "text-xs font-bold text-tactical-neutral-900 dark:text-tactical-neutral-100" }, lead.leadNumber), /* @__PURE__ */ React.createElement(
        Badge,
        {
          variant: lead.confidenceScore >= 90 ? "danger" : "warning",
          size: "sm"
        },
        lead.confidenceScore,
        "% AI Confidence"
      )),
      /* @__PURE__ */ React.createElement("h3", { className: "text-xs font-semibold text-tactical-neutral-800 dark:text-tactical-neutral-200 mb-1" }, lead.headline),
      /* @__PURE__ */ React.createElement("p", { className: "text-[11px] text-tactical-neutral-500 font-sans line-clamp-2 leading-relaxed" }, lead.rationale),
      /* @__PURE__ */ React.createElement("div", { className: "pt-2 mt-2 border-t border-tactical-neutral-100 dark:border-tactical-neutral-800 flex justify-between items-center text-[10px] text-tactical-neutral-400" }, /* @__PURE__ */ React.createElement("span", null, "ACTION: ", lead.recommendedAction), /* @__PURE__ */ React.createElement("span", null, "Assigned: ", lead.assignedTo.split(" ")[0]))
    );
  }))), /* @__PURE__ */ React.createElement("div", { className: "lg:col-span-7 space-y-4" }, /* @__PURE__ */ React.createElement("div", { className: "p-5 bg-white dark:bg-tactical-neutral-900 rounded border border-tactical-neutral-200 dark:border-tactical-neutral-800 space-y-4" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-start justify-between pb-3 border-b border-tactical-neutral-200 dark:border-tactical-neutral-800" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", { className: "text-[10px] uppercase text-tactical-neutral-500 block mb-0.5" }, "SELECTED EVIDENTIARY LEAD"), /* @__PURE__ */ React.createElement("h2", { className: "text-base font-bold text-tactical-neutral-900 dark:text-tactical-neutral-100" }, selectedLead.headline), /* @__PURE__ */ React.createElement("div", { className: "text-[11px] text-tactical-neutral-500 mt-0.5" }, "LEAD ID: ", selectedLead.leadNumber, " \u2022 ASSIGNED: ", selectedLead.assignedTo)), /* @__PURE__ */ React.createElement("div", { className: "text-right" }, /* @__PURE__ */ React.createElement("span", { className: "text-[10px] uppercase text-tactical-neutral-500 block" }, "Calculated Confidence"), /* @__PURE__ */ React.createElement("span", { className: "text-2xl font-black text-tactical-danger-600" }, selectedLead.confidenceScore, "%"))), /* @__PURE__ */ React.createElement("div", { className: "space-y-1" }, /* @__PURE__ */ React.createElement("span", { className: "text-[11px] font-bold uppercase text-tactical-neutral-700 dark:text-tactical-neutral-300" }, "Evidentiary Rationale & Probable Cause Synthesis"), /* @__PURE__ */ React.createElement("p", { className: "text-xs text-tactical-neutral-600 dark:text-tactical-neutral-400 font-sans leading-relaxed" }, selectedLead.rationale)), showFRE902Reasoning && /* @__PURE__ */ React.createElement("div", { className: "p-4 bg-tactical-neutral-50 dark:bg-tactical-neutral-950 rounded border border-tactical-neutral-300 dark:border-tactical-neutral-800 space-y-3" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-1.5 text-xs font-bold uppercase text-tactical-neutral-900 dark:text-tactical-neutral-100" }, /* @__PURE__ */ React.createElement(Brain, { className: "w-4 h-4 text-tactical-primary-600" }), /* @__PURE__ */ React.createElement("span", null, "FRE 902(14) Transparent Algorithmic Factor Weights")), /* @__PURE__ */ React.createElement(Badge, { variant: "outline", size: "sm" }, "COURT ADMISSIBLE")), /* @__PURE__ */ React.createElement("div", { className: "space-y-2 text-xs" }, selectedLead.confidenceFactors.map((factor, idx) => /* @__PURE__ */ React.createElement("div", { key: idx, className: "space-y-1" }, /* @__PURE__ */ React.createElement("div", { className: "flex justify-between text-[11px]" }, /* @__PURE__ */ React.createElement("span", { className: "text-tactical-neutral-700 dark:text-tactical-neutral-300 font-semibold" }, factor.factor), /* @__PURE__ */ React.createElement("span", { className: "text-tactical-primary-600 font-bold" }, "+", factor.weight, "%")), /* @__PURE__ */ React.createElement("div", { className: "w-full bg-tactical-neutral-200 dark:bg-tactical-neutral-800 h-1.5 rounded-full overflow-hidden" }, /* @__PURE__ */ React.createElement(
    "div",
    {
      className: "bg-tactical-primary-600 h-full rounded-full",
      style: { width: `${factor.weight * 2.5}%` }
    }
  )), /* @__PURE__ */ React.createElement("span", { className: "text-[10px] text-tactical-neutral-500 font-sans block" }, factor.source))))), /* @__PURE__ */ React.createElement("div", { className: "space-y-2 pt-2 border-t border-tactical-neutral-200 dark:border-tactical-neutral-800" }, /* @__PURE__ */ React.createElement("span", { className: "text-[11px] font-bold uppercase text-tactical-neutral-700 dark:text-tactical-neutral-300 block" }, "Recommended Triage Protocol"), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs" }, /* @__PURE__ */ React.createElement(
    Button,
    {
      variant: "primary",
      size: "sm",
      onClick: () => handleTriageAction("Issue 18 U.S.C. \xA7 2703(d) Intercept Order"),
      icon: /* @__PURE__ */ React.createElement(Send, { className: "w-3.5 h-3.5" }),
      className: "w-full justify-center text-[11px]"
    },
    "Approve Warrant Affidavit"
  ), /* @__PURE__ */ React.createElement(
    Button,
    {
      variant: "secondary",
      size: "sm",
      onClick: () => handleTriageAction("Dispatch Mobile Tactical Intercept Unit"),
      icon: /* @__PURE__ */ React.createElement(CheckSquare, { className: "w-3.5 h-3.5" }),
      className: "w-full justify-center text-[11px]"
    },
    "Dispatch Field Surveillance"
  ), /* @__PURE__ */ React.createElement(
    Button,
    {
      variant: "secondary",
      size: "sm",
      onClick: () => handleTriageAction("Route to FinCEN Forensic Unit"),
      icon: /* @__PURE__ */ React.createElement(ShieldCheck, { className: "w-3.5 h-3.5" }),
      className: "w-full justify-center text-[11px]"
    },
    "Refer to FinCEN Task Force"
  ), /* @__PURE__ */ React.createElement(
    Button,
    {
      variant: "danger",
      size: "sm",
      onClick: () => handleTriageAction("Archived / Unfounded"),
      icon: /* @__PURE__ */ React.createElement(XCircle, { className: "w-3.5 h-3.5" }),
      className: "w-full justify-center text-[11px]"
    },
    "Dismiss Lead as Noise"
  )))))));
};
export {
  LeadPrioritizationPage
};
