import React, { useState } from "react";
import { mockAgents } from "@/constants/mockData";
import { ClearanceBadge } from "@/components/common/ClearanceBadge";
import { HashStamp } from "@/components/common/HashStamp";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Badge } from "@/components/ui/Badge";
import { Modal } from "@/components/ui/Modal";
import {
  UserPlus,
  Key,
  ShieldCheck,
  Search,
  RotateCw
} from "lucide-react";
const AgentManagementPage = () => {
  const [agents, setAgents] = useState(mockAgents);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterAgency, setFilterAgency] = useState("ALL");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [newBadge, setNewBadge] = useState("");
  const [newAgency, setNewAgency] = useState("FEDERAL_BUREAU_OF_INVESTIGATION");
  const [newClearance, setNewClearance] = useState("CJIS_LEVEL_4");
  const [newRole, setNewRole] = useState("AGENT");
  const [generatingKey, setGeneratingKey] = useState(false);
  const [generatedKeyHash, setGeneratedKeyHash] = useState("");
  const handleGenerateKey = () => {
    setGeneratingKey(true);
    setTimeout(() => {
      setGeneratedKeyHash("e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855");
      setGeneratingKey(false);
    }, 500);
  };
  const handleCreateAgent = (e) => {
    e.preventDefault();
    const newAgent = {
      id: `usr-${Date.now()}`,
      fullName: newName,
      badgeNumber: newBadge,
      email: `${newName.toLowerCase().replace(" ", ".")}@intellitrack.gov`,
      agency: newAgency,
      role: newRole === "ADMIN" ? "ADMIN" : "AGENT",
      clearanceLevel: newClearance,
      status: "ACTIVE",
      lastLogin: (/* @__PURE__ */ new Date()).toISOString(),
      publicKeyFingerprint: generatedKeyHash || "a4b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6",
      pivCardSerial: `PIV-${Math.floor(1e3 + Math.random() * 9e3)}-FED`
    };
    setAgents([newAgent, ...agents]);
    setIsModalOpen(false);
    setNewName("");
    setNewBadge("");
    setGeneratedKeyHash("");
  };
  const handleToggleStatus = (agentId) => {
    setAgents(agents.map((a) => {
      if (a.id === agentId) {
        return {
          ...a,
          status: a.status === "ACTIVE" ? "SUSPENDED" : "ACTIVE"
        };
      }
      return a;
    }));
  };
  const filteredAgents = agents.filter((agent) => {
    const matchesSearch = agent.fullName.toLowerCase().includes(searchQuery.toLowerCase()) || agent.badgeNumber.toLowerCase().includes(searchQuery.toLowerCase()) || agent.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesAgency = filterAgency === "ALL" || agent.agency === filterAgency;
    return matchesSearch && matchesAgency;
  });
  return /* @__PURE__ */ React.createElement("div", { className: "space-y-6 max-w-7xl mx-auto font-mono" }, /* @__PURE__ */ React.createElement("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-tactical-neutral-200 dark:border-tactical-neutral-800" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 text-tactical-neutral-500 text-[11px] uppercase tracking-wider mb-1" }, /* @__PURE__ */ React.createElement("span", null, "CJIS \xA7 5.4 PERSONNEL REPOSITORY"), /* @__PURE__ */ React.createElement("span", null, "/"), /* @__PURE__ */ React.createElement("span", { className: "text-tactical-primary-600 font-semibold" }, "FORM-SEC-89 COMPLIANT")), /* @__PURE__ */ React.createElement("h1", { className: "text-2xl font-bold tracking-tight text-tactical-neutral-900 dark:text-tactical-neutral-100" }, "Personnel Clearance & Hardware Token Roster")), /* @__PURE__ */ React.createElement(
    Button,
    {
      variant: "primary",
      size: "sm",
      onClick: () => {
        setIsModalOpen(true);
        handleGenerateKey();
      },
      icon: /* @__PURE__ */ React.createElement(UserPlus, { className: "w-4 h-4" })
    },
    "Issue Cryptographic Credentials"
  )), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" }, /* @__PURE__ */ React.createElement("div", { className: "p-4 bg-white dark:bg-tactical-neutral-900 rounded border border-tactical-neutral-200 dark:border-tactical-neutral-800" }, /* @__PURE__ */ React.createElement("div", { className: "text-[10px] uppercase text-tactical-neutral-500" }, "Active Task Force Agents"), /* @__PURE__ */ React.createElement("div", { className: "text-2xl font-black text-tactical-neutral-900 dark:text-tactical-neutral-100 my-1" }, agents.filter((a) => a.status === "ACTIVE").length), /* @__PURE__ */ React.createElement("div", { className: "text-[11px] text-tactical-success-600 font-semibold flex items-center gap-1" }, /* @__PURE__ */ React.createElement(ShieldCheck, { className: "w-3.5 h-3.5" }), " FIPS 140-3 Hardware Validated")), /* @__PURE__ */ React.createElement("div", { className: "p-4 bg-white dark:bg-tactical-neutral-900 rounded border border-tactical-neutral-200 dark:border-tactical-neutral-800" }, /* @__PURE__ */ React.createElement("div", { className: "text-[10px] uppercase text-tactical-neutral-500" }, "Suspended / Revoked"), /* @__PURE__ */ React.createElement("div", { className: "text-2xl font-black text-tactical-danger-600 my-1" }, agents.filter((a) => a.status === "SUSPENDED").length), /* @__PURE__ */ React.createElement("div", { className: "text-[11px] text-tactical-neutral-500" }, "Zero Active Access Granted")), /* @__PURE__ */ React.createElement("div", { className: "p-4 bg-white dark:bg-tactical-neutral-900 rounded border border-tactical-neutral-200 dark:border-tactical-neutral-800" }, /* @__PURE__ */ React.createElement("div", { className: "text-[10px] uppercase text-tactical-neutral-500" }, "Top Secret / SCI Clearances"), /* @__PURE__ */ React.createElement("div", { className: "text-2xl font-black text-tactical-primary-600 my-1" }, agents.filter((a) => a.clearanceLevel === "TOP_SECRET").length), /* @__PURE__ */ React.createElement("div", { className: "text-[11px] text-tactical-neutral-500" }, "Inter-Agency Fusion Access")), /* @__PURE__ */ React.createElement("div", { className: "p-4 bg-white dark:bg-tactical-neutral-900 rounded border border-tactical-neutral-200 dark:border-tactical-neutral-800" }, /* @__PURE__ */ React.createElement("div", { className: "text-[10px] uppercase text-tactical-neutral-500" }, "Hardware PIV Tokens Bound"), /* @__PURE__ */ React.createElement("div", { className: "text-2xl font-black text-tactical-neutral-900 dark:text-tactical-neutral-100 my-1" }, agents.length, " / ", agents.length), /* @__PURE__ */ React.createElement("div", { className: "text-[11px] text-tactical-success-600 font-semibold" }, "100% Cryptographic Binding"))), /* @__PURE__ */ React.createElement("div", { className: "p-3 bg-white dark:bg-tactical-neutral-900 rounded border border-tactical-neutral-200 dark:border-tactical-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 w-full sm:w-80" }, /* @__PURE__ */ React.createElement(Search, { className: "w-4 h-4 text-tactical-neutral-400 shrink-0" }), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "text",
      className: "w-full bg-tactical-neutral-100 dark:bg-tactical-neutral-800 px-3 py-1.5 rounded border border-tactical-neutral-300 dark:border-tactical-neutral-700 text-tactical-neutral-900 dark:text-tactical-neutral-100 placeholder-tactical-neutral-400 focus:outline-none focus:border-tactical-primary-500",
      placeholder: "Search by officer name, badge, email...",
      value: searchQuery,
      onChange: (e) => setSearchQuery(e.target.value)
    }
  )), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 w-full sm:w-auto" }, /* @__PURE__ */ React.createElement("span", { className: "text-tactical-neutral-500 text-[11px]" }, "Agency:"), /* @__PURE__ */ React.createElement(
    "select",
    {
      className: "bg-tactical-neutral-100 dark:bg-tactical-neutral-800 px-3 py-1.5 rounded border border-tactical-neutral-300 dark:border-tactical-neutral-700 text-tactical-neutral-900 dark:text-tactical-neutral-100 focus:outline-none text-xs",
      value: filterAgency,
      onChange: (e) => setFilterAgency(e.target.value)
    },
    /* @__PURE__ */ React.createElement("option", { value: "ALL" }, "All Jurisdictional Agencies"),
    /* @__PURE__ */ React.createElement("option", { value: "FEDERAL_BUREAU_OF_INVESTIGATION" }, "FBI"),
    /* @__PURE__ */ React.createElement("option", { value: "DRUG_ENFORCEMENT_ADMINISTRATION" }, "DEA"),
    /* @__PURE__ */ React.createElement("option", { value: "HOMELAND_SECURITY_INVESTIGATIONS" }, "HSI")
  ))), /* @__PURE__ */ React.createElement("div", { className: "bg-white dark:bg-tactical-neutral-900 border border-tactical-neutral-200 dark:border-tactical-neutral-800 rounded overflow-hidden" }, /* @__PURE__ */ React.createElement("div", { className: "overflow-x-auto" }, /* @__PURE__ */ React.createElement("table", { className: "w-full text-left text-xs" }, /* @__PURE__ */ React.createElement("thead", { className: "bg-tactical-neutral-100 dark:bg-tactical-neutral-800/80 text-tactical-neutral-600 dark:text-tactical-neutral-400 uppercase text-[10px] tracking-wider border-b border-tactical-neutral-200 dark:border-tactical-neutral-700" }, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("th", { className: "px-4 py-2.5" }, "Officer / Badge"), /* @__PURE__ */ React.createElement("th", { className: "px-4 py-2.5" }, "Parent Agency"), /* @__PURE__ */ React.createElement("th", { className: "px-4 py-2.5" }, "Clearance Tier"), /* @__PURE__ */ React.createElement("th", { className: "px-4 py-2.5" }, "PIV Serial / RSA Key"), /* @__PURE__ */ React.createElement("th", { className: "px-4 py-2.5" }, "Status"), /* @__PURE__ */ React.createElement("th", { className: "px-4 py-2.5 text-right" }, "Actions"))), /* @__PURE__ */ React.createElement("tbody", { className: "divide-y divide-tactical-neutral-200 dark:divide-tactical-neutral-800" }, filteredAgents.map((agent) => /* @__PURE__ */ React.createElement("tr", { key: agent.id, className: "hover:bg-tactical-neutral-50 dark:hover:bg-tactical-neutral-800/40 transition-colors" }, /* @__PURE__ */ React.createElement("td", { className: "px-4 py-3" }, /* @__PURE__ */ React.createElement("div", { className: "font-bold text-tactical-neutral-900 dark:text-tactical-neutral-100" }, agent.fullName), /* @__PURE__ */ React.createElement("div", { className: "text-[10px] text-tactical-neutral-500" }, agent.badgeNumber, " \u2022 ", agent.email)), /* @__PURE__ */ React.createElement("td", { className: "px-4 py-3 text-tactical-neutral-700 dark:text-tactical-neutral-300" }, /* @__PURE__ */ React.createElement("span", { className: "text-[11px] px-2 py-0.5 rounded bg-tactical-neutral-100 dark:bg-tactical-neutral-800 border border-tactical-neutral-300 dark:border-tactical-neutral-700" }, agent.agency.replace(/_/g, " "))), /* @__PURE__ */ React.createElement("td", { className: "px-4 py-3" }, /* @__PURE__ */ React.createElement(ClearanceBadge, { level: agent.clearanceLevel })), /* @__PURE__ */ React.createElement("td", { className: "px-4 py-3" }, /* @__PURE__ */ React.createElement("div", { className: "text-[10px] text-tactical-neutral-500 mb-0.5" }, agent.pivCardSerial), /* @__PURE__ */ React.createElement(HashStamp, { hash: agent.publicKeyFingerprint, lead: 5, tail: 5 })), /* @__PURE__ */ React.createElement("td", { className: "px-4 py-3" }, /* @__PURE__ */ React.createElement(Badge, { variant: agent.status === "ACTIVE" ? "success" : "danger", size: "sm" }, agent.status)), /* @__PURE__ */ React.createElement("td", { className: "px-4 py-3 text-right" }, /* @__PURE__ */ React.createElement(
    Button,
    {
      variant: agent.status === "ACTIVE" ? "danger" : "secondary",
      size: "sm",
      onClick: () => handleToggleStatus(agent.id),
      className: "text-[10px] py-1"
    },
    agent.status === "ACTIVE" ? "Revoke Key" : "Reactivate PIV"
  )))))))), /* @__PURE__ */ React.createElement(
    Modal,
    {
      isOpen: isModalOpen,
      onClose: () => setIsModalOpen(false),
      title: "FORM-SEC-89 PERSONNEL ONBOARDING & KEY ENROLLMENT",
      subtitle: "Issue Statutory Cryptographic Credentials to Sworn Agent",
      size: "lg"
    },
    /* @__PURE__ */ React.createElement("form", { onSubmit: handleCreateAgent, className: "space-y-4" }, /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-2 gap-4" }, /* @__PURE__ */ React.createElement(
      Input,
      {
        label: "Full Name (Legal / Sworn)",
        value: newName,
        onChange: (e) => setNewName(e.target.value),
        placeholder: "e.g. Special Agent Robert Davis",
        required: true
      }
    ), /* @__PURE__ */ React.createElement(
      Input,
      {
        label: "Official Badge / Shield #",
        value: newBadge,
        onChange: (e) => setNewBadge(e.target.value),
        placeholder: "e.g. FBI-99401",
        required: true
      }
    )), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-2 gap-4" }, /* @__PURE__ */ React.createElement(
      Select,
      {
        label: "Department / Task Force",
        value: newAgency,
        onChange: (e) => setNewAgency(e.target.value),
        options: [
          { value: "FEDERAL_BUREAU_OF_INVESTIGATION", label: "FBI (Federal Bureau of Investigation)" },
          { value: "DRUG_ENFORCEMENT_ADMINISTRATION", label: "DEA (Drug Enforcement Administration)" },
          { value: "HOMELAND_SECURITY_INVESTIGATIONS", label: "HSI (Homeland Security Investigations)" },
          { value: "BUREAU_ALCOHOL_TOBACCO_FIREARMS", label: "ATF (Alcohol, Tobacco & Firearms)" }
        ]
      }
    ), /* @__PURE__ */ React.createElement(
      Select,
      {
        label: "Clearance Compartment",
        value: newClearance,
        onChange: (e) => setNewClearance(e.target.value),
        options: [
          { value: "CJIS_LEVEL_4", label: "CJIS Level 4" },
          { value: "LAW_ENFORCEMENT_SENSITIVE", label: "Law Enforcement Sensitive (LES)" },
          { value: "CONFIDENTIAL", label: "Confidential" },
          { value: "SECRET", label: "Secret" },
          { value: "TOP_SECRET", label: "Top Secret // SCI" }
        ]
      }
    )), /* @__PURE__ */ React.createElement("div", { className: "p-4 bg-tactical-neutral-100 dark:bg-tactical-neutral-800 rounded border border-tactical-neutral-300 dark:border-tactical-neutral-700 space-y-2" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between" }, /* @__PURE__ */ React.createElement("span", { className: "text-xs font-bold text-tactical-neutral-800 dark:text-tactical-neutral-200 uppercase flex items-center gap-1.5" }, /* @__PURE__ */ React.createElement(Key, { className: "w-4 h-4 text-tactical-primary-600" }), "RSA-4096 / Ed25519 Hardware Token Fingerprint"), /* @__PURE__ */ React.createElement(
      Button,
      {
        type: "button",
        variant: "secondary",
        size: "sm",
        onClick: handleGenerateKey,
        disabled: generatingKey,
        icon: /* @__PURE__ */ React.createElement(RotateCw, { className: `w-3.5 h-3.5 ${generatingKey ? "animate-spin" : ""}` })
      },
      "Regenerate Key"
    )), /* @__PURE__ */ React.createElement("div", { className: "font-mono text-xs text-tactical-neutral-600 dark:text-tactical-neutral-300 bg-white dark:bg-tactical-neutral-900 p-2.5 rounded border border-tactical-neutral-300 dark:border-tactical-neutral-700 break-all" }, generatedKeyHash || "Generating cryptographic hardware signature...")), /* @__PURE__ */ React.createElement("div", { className: "flex justify-end gap-2 pt-2 border-t border-tactical-neutral-200 dark:border-tactical-neutral-700" }, /* @__PURE__ */ React.createElement(Button, { variant: "secondary", size: "sm", onClick: () => setIsModalOpen(false) }, "Cancel"), /* @__PURE__ */ React.createElement(Button, { variant: "primary", size: "sm", type: "submit", icon: /* @__PURE__ */ React.createElement(ShieldCheck, { className: "w-4 h-4" }) }, "Enroll Agent in CJIS Ledger")))
  ));
};
export {
  AgentManagementPage
};
