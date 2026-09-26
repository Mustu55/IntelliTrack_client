import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { mockCases } from "@/constants/mockData";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { Modal } from "@/components/ui/Modal";
import {
  Plus,
  Search,
  ArrowRight
} from "lucide-react";
const CasesPage = () => {
  const navigate = useNavigate();
  const [cases, setCases] = useState(mockCases);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [priorityFilter, setPriorityFilter] = useState("ALL");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newNumber, setNewNumber] = useState(`FED-2026-${Math.floor(1e3 + Math.random() * 9e3)}`);
  const [newTitle, setNewTitle] = useState("");
  const [newClassification, setNewClassification] = useState("RICO Transnational Syndicate");
  const [newPriority, setNewPriority] = useState("HIGH");
  const [newSummary, setNewSummary] = useState("");
  const [newLead, setNewLead] = useState("Special Agent Marcus Vance");
  const [newJurisdiction, setNewJurisdiction] = useState("USDC SDNY / EDNY Joint Command");
  const handleCreateCase = (e) => {
    e.preventDefault();
    const newCase = {
      id: `case-${Date.now()}`,
      caseNumber: newNumber,
      title: newTitle,
      classification: newClassification,
      priority: newPriority,
      status: "ACTIVE",
      leadInvestigator: newLead,
      primaryJurisdiction: newJurisdiction,
      summary: newSummary,
      createdDate: (/* @__PURE__ */ new Date()).toISOString(),
      lastUpdated: (/* @__PURE__ */ new Date()).toISOString(),
      primaryPOIs: [],
      evidenceCount: 0,
      assignedAgents: ["FBI-89412"],
      statutoryAuthority: "18 U.S.C. \xA7 1962 (RICO)",
      grandJuryNumber: "GJ-2026-NY-412"
    };
    setCases([newCase, ...cases]);
    setIsModalOpen(false);
    setNewTitle("");
    setNewSummary("");
    setNewNumber(`FED-2026-${Math.floor(1e3 + Math.random() * 9e3)}`);
  };
  const filteredCases = cases.filter((c) => {
    const matchSearch = c.caseNumber.toLowerCase().includes(search.toLowerCase()) || c.title.toLowerCase().includes(search.toLowerCase()) || c.leadInvestigator.toLowerCase().includes(search.toLowerCase()) || (c.classification?.toLowerCase() || "").includes(search.toLowerCase());
    const matchStatus = statusFilter === "ALL" || c.status === statusFilter;
    const matchPriority = priorityFilter === "ALL" || c.priority === priorityFilter;
    return matchSearch && matchStatus && matchPriority;
  });
  return /* @__PURE__ */ React.createElement("div", { className: "space-y-6 max-w-7xl mx-auto font-mono" }, /* @__PURE__ */ React.createElement("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-tactical-neutral-200 dark:border-tactical-neutral-800" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 text-tactical-neutral-500 text-[11px] uppercase tracking-wider mb-1" }, /* @__PURE__ */ React.createElement("span", null, "FEDERAL INVESTIGATIVE DOCKET VAULT"), /* @__PURE__ */ React.createElement("span", null, "/"), /* @__PURE__ */ React.createElement("span", { className: "text-tactical-primary-600 font-semibold" }, "TITLE 18 JURISDICTION")), /* @__PURE__ */ React.createElement("h1", { className: "text-2xl font-bold tracking-tight text-tactical-neutral-900 dark:text-tactical-neutral-100" }, "Investigative Dockets & Case Management")), /* @__PURE__ */ React.createElement(
    Button,
    {
      variant: "primary",
      size: "sm",
      onClick: () => setIsModalOpen(true),
      icon: /* @__PURE__ */ React.createElement(Plus, { className: "w-4 h-4" })
    },
    "+ Open Case Docket"
  )), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 sm:grid-cols-4 gap-4" }, /* @__PURE__ */ React.createElement("div", { className: "p-4 bg-white dark:bg-tactical-neutral-900 rounded border border-tactical-neutral-200 dark:border-tactical-neutral-800" }, /* @__PURE__ */ React.createElement("div", { className: "text-[10px] uppercase text-tactical-neutral-500" }, "Supervised Dockets"), /* @__PURE__ */ React.createElement("div", { className: "text-2xl font-black text-tactical-neutral-900 dark:text-tactical-neutral-100 my-1" }, cases.length), /* @__PURE__ */ React.createElement("div", { className: "text-[11px] text-tactical-neutral-500" }, "Cross-Jurisdictional Scope")), /* @__PURE__ */ React.createElement("div", { className: "p-4 bg-white dark:bg-tactical-neutral-900 rounded border border-tactical-neutral-200 dark:border-tactical-neutral-800" }, /* @__PURE__ */ React.createElement("div", { className: "text-[10px] uppercase text-tactical-neutral-500" }, "Critical Priority"), /* @__PURE__ */ React.createElement("div", { className: "text-2xl font-black text-tactical-danger-600 my-1" }, cases.filter((c) => c.priority === "CRITICAL").length), /* @__PURE__ */ React.createElement("div", { className: "text-[11px] text-tactical-danger-600 font-semibold" }, "Immediate Operational Focus")), /* @__PURE__ */ React.createElement("div", { className: "p-4 bg-white dark:bg-tactical-neutral-900 rounded border border-tactical-neutral-200 dark:border-tactical-neutral-800" }, /* @__PURE__ */ React.createElement("div", { className: "text-[10px] uppercase text-tactical-neutral-500" }, "Grand Jury Sealed"), /* @__PURE__ */ React.createElement("div", { className: "text-2xl font-black text-tactical-primary-600 my-1" }, cases.filter((c) => c.grandJuryNumber).length), /* @__PURE__ */ React.createElement("div", { className: "text-[11px] text-tactical-neutral-500" }, "Fed. R. Crim. P. 6(e) Protected")), /* @__PURE__ */ React.createElement("div", { className: "p-4 bg-white dark:bg-tactical-neutral-900 rounded border border-tactical-neutral-200 dark:border-tactical-neutral-800" }, /* @__PURE__ */ React.createElement("div", { className: "text-[10px] uppercase text-tactical-neutral-500" }, "Evidentiary Vault Files"), /* @__PURE__ */ React.createElement("div", { className: "text-2xl font-black text-tactical-neutral-900 dark:text-tactical-neutral-100 my-1" }, cases.reduce((acc, curr) => acc + (curr.evidenceCount || 0), 0)), /* @__PURE__ */ React.createElement("div", { className: "text-[11px] text-tactical-success-600 font-semibold" }, "100% SHA-256 Anchored"))), /* @__PURE__ */ React.createElement("div", { className: "p-3 bg-white dark:bg-tactical-neutral-900 rounded border border-tactical-neutral-200 dark:border-tactical-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 w-full sm:w-80" }, /* @__PURE__ */ React.createElement(Search, { className: "w-4 h-4 text-tactical-neutral-400 shrink-0" }), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "text",
      className: "w-full bg-tactical-neutral-100 dark:bg-tactical-neutral-800 px-3 py-1.5 rounded border border-tactical-neutral-300 dark:border-tactical-neutral-700 text-tactical-neutral-900 dark:text-tactical-neutral-100 placeholder-tactical-neutral-400 focus:outline-none",
      placeholder: "Search docket number, title, lead agent...",
      value: search,
      onChange: (e) => setSearch(e.target.value)
    }
  )), /* @__PURE__ */ React.createElement("div", { className: "flex flex-wrap items-center gap-3 w-full sm:w-auto" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-1.5" }, /* @__PURE__ */ React.createElement("span", { className: "text-[11px] text-tactical-neutral-500" }, "Status:"), /* @__PURE__ */ React.createElement(
    "select",
    {
      className: "bg-tactical-neutral-100 dark:bg-tactical-neutral-800 px-2.5 py-1.5 rounded border border-tactical-neutral-300 dark:border-tactical-neutral-700 text-xs",
      value: statusFilter,
      onChange: (e) => setStatusFilter(e.target.value)
    },
    /* @__PURE__ */ React.createElement("option", { value: "ALL" }, "All Statuses"),
    /* @__PURE__ */ React.createElement("option", { value: "ACTIVE" }, "Active"),
    /* @__PURE__ */ React.createElement("option", { value: "UNDER_REVIEW" }, "Under Review"),
    /* @__PURE__ */ React.createElement("option", { value: "GRAND_JURY" }, "Grand Jury"),
    /* @__PURE__ */ React.createElement("option", { value: "CLOSED" }, "Closed")
  )), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-1.5" }, /* @__PURE__ */ React.createElement("span", { className: "text-[11px] text-tactical-neutral-500" }, "Priority:"), /* @__PURE__ */ React.createElement(
    "select",
    {
      className: "bg-tactical-neutral-100 dark:bg-tactical-neutral-800 px-2.5 py-1.5 rounded border border-tactical-neutral-300 dark:border-tactical-neutral-700 text-xs",
      value: priorityFilter,
      onChange: (e) => setPriorityFilter(e.target.value)
    },
    /* @__PURE__ */ React.createElement("option", { value: "ALL" }, "All Priorities"),
    /* @__PURE__ */ React.createElement("option", { value: "CRITICAL" }, "Critical"),
    /* @__PURE__ */ React.createElement("option", { value: "HIGH" }, "High"),
    /* @__PURE__ */ React.createElement("option", { value: "MEDIUM" }, "Medium")
  )))), /* @__PURE__ */ React.createElement("div", { className: "space-y-3" }, filteredCases.map((c) => /* @__PURE__ */ React.createElement(
    "div",
    {
      key: c.id,
      className: "p-5 bg-white dark:bg-tactical-neutral-900 rounded border border-tactical-neutral-200 dark:border-tactical-neutral-800 hover:border-tactical-primary-500 transition-colors space-y-4"
    },
    /* @__PURE__ */ React.createElement("div", { className: "flex flex-col sm:flex-row sm:items-start justify-between gap-3" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 mb-1" }, /* @__PURE__ */ React.createElement("span", { className: "font-bold text-xs text-tactical-primary-700 dark:text-tactical-primary-400" }, c.caseNumber), /* @__PURE__ */ React.createElement(Badge, { variant: c.priority === "CRITICAL" ? "danger" : "warning", size: "sm" }, c.priority), /* @__PURE__ */ React.createElement("span", { className: "text-[10px] px-2 py-0.5 rounded bg-tactical-neutral-100 dark:bg-tactical-neutral-800 text-tactical-neutral-600 dark:text-tactical-neutral-400" }, c.classification), c.grandJuryNumber && /* @__PURE__ */ React.createElement("span", { className: "text-[10px] px-1.5 py-0.5 rounded bg-tactical-danger-50 dark:bg-tactical-danger-950/80 text-tactical-danger-700 dark:text-tactical-danger-300 font-bold border border-tactical-danger-200 dark:border-tactical-danger-800" }, "SEALED GRAND JURY")), /* @__PURE__ */ React.createElement("h3", { className: "font-bold text-base text-tactical-neutral-900 dark:text-tactical-neutral-100" }, c.title)), /* @__PURE__ */ React.createElement(
      Button,
      {
        variant: "primary",
        size: "sm",
        onClick: () => navigate(`/cases/${c.id}`),
        icon: /* @__PURE__ */ React.createElement(ArrowRight, { className: "w-3.5 h-3.5" })
      },
      "Inspect Vault"
    )),
    /* @__PURE__ */ React.createElement("p", { className: "text-xs text-tactical-neutral-600 dark:text-tactical-neutral-400 font-sans leading-relaxed" }, c.summary),
    /* @__PURE__ */ React.createElement("div", { className: "pt-3 border-t border-tactical-neutral-100 dark:border-tactical-neutral-800 flex flex-wrap items-center justify-between gap-3 text-[11px] text-tactical-neutral-500" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-4" }, /* @__PURE__ */ React.createElement("span", null, "Authority: ", /* @__PURE__ */ React.createElement("strong", { className: "text-tactical-neutral-800 dark:text-tactical-neutral-200" }, c.statutoryAuthority || "18 U.S.C.")), /* @__PURE__ */ React.createElement("span", null, "Jurisdiction: ", /* @__PURE__ */ React.createElement("strong", { className: "text-tactical-neutral-800 dark:text-tactical-neutral-200" }, c.primaryJurisdiction)), /* @__PURE__ */ React.createElement("span", null, "Evidence: ", /* @__PURE__ */ React.createElement("strong", { className: "text-tactical-neutral-800 dark:text-tactical-neutral-200" }, c.evidenceCount, " Files"))), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React.createElement("span", null, "Lead: ", c.leadInvestigator)))
  ))), /* @__PURE__ */ React.createElement(
    Modal,
    {
      isOpen: isModalOpen,
      onClose: () => setIsModalOpen(false),
      title: "INITIALIZE NEW INVESTIGATIVE DOCKET",
      subtitle: "Open Title 18 Federal Crime Dossier & Cryptographic Evidentiary Vault",
      size: "lg"
    },
    /* @__PURE__ */ React.createElement("form", { onSubmit: handleCreateCase, className: "space-y-4" }, /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-2 gap-4" }, /* @__PURE__ */ React.createElement(
      Input,
      {
        label: "Assigned Docket #",
        value: newNumber,
        disabled: true,
        hint: "System generated FIPS sequence"
      }
    ), /* @__PURE__ */ React.createElement(
      Select,
      {
        label: "Priority Classification",
        value: newPriority,
        onChange: (e) => setNewPriority(e.target.value),
        options: [
          { value: "CRITICAL", label: "CRITICAL (Active Threat)" },
          { value: "HIGH", label: "HIGH (Imminent Transfer)" },
          { value: "MEDIUM", label: "MEDIUM (Long-term Monitoring)" }
        ]
      }
    )), /* @__PURE__ */ React.createElement(
      Input,
      {
        label: "Docket Title / Operation Codename",
        value: newTitle,
        onChange: (e) => setNewTitle(e.target.value),
        placeholder: "e.g. Operation Nightshade - Eastern Seaboard Hawala",
        required: true
      }
    ), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-2 gap-4" }, /* @__PURE__ */ React.createElement(
      Input,
      {
        label: "Primary Federal Classification",
        value: newClassification,
        onChange: (e) => setNewClassification(e.target.value),
        placeholder: "e.g. 18 U.S.C. \xA7 1962 (RICO)",
        required: true
      }
    ), /* @__PURE__ */ React.createElement(
      Input,
      {
        label: "Lead Special Agent",
        value: newLead,
        onChange: (e) => setNewLead(e.target.value),
        required: true
      }
    )), /* @__PURE__ */ React.createElement(
      Textarea,
      {
        label: "Executive Summary & Probable Cause Overview",
        value: newSummary,
        onChange: (e) => setNewSummary(e.target.value),
        rows: 3,
        placeholder: "Detail initial articulable suspicion, multi-agency referrals, and primary targets...",
        required: true
      }
    ), /* @__PURE__ */ React.createElement("div", { className: "flex justify-end gap-2 pt-2 border-t border-tactical-neutral-200 dark:border-tactical-neutral-700" }, /* @__PURE__ */ React.createElement(Button, { variant: "secondary", size: "sm", onClick: () => setIsModalOpen(false) }, "Cancel"), /* @__PURE__ */ React.createElement(Button, { variant: "primary", size: "sm", type: "submit" }, "Anchor Docket in Chain of Custody")))
  ));
};
export {
  CasesPage
};
