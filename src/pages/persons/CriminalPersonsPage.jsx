import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { mockPersons } from "@/constants/mockData";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Modal } from "@/components/ui/Modal";
import {
  UserPlus,
  Search,
  GitMerge,
  Network,
  ShieldAlert,
  MapPin,
  Fingerprint
} from "lucide-react";
const CriminalPersonsPage = () => {
  const navigate = useNavigate();
  const [persons, setPersons] = useState(mockPersons);
  const [search, setSearch] = useState("");
  const [threatFilter, setThreatFilter] = useState("ALL");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fullName, setFullName] = useState("");
  const [primaryAlias, setPrimaryAlias] = useState("");
  const [fbiNumber, setFbiNumber] = useState("");
  const [threatLevel, setThreatLevel] = useState("HIGH");
  const [citizenship, setCitizenship] = useState("United States");
  const [aliases, setAliases] = useState("");
  const handleCreatePOI = (e) => {
    e.preventDefault();
    const newP = {
      id: `POI-${Date.now()}`,
      fullName,
      primaryAlias,
      aliases: aliases.split(",").map((a) => a.trim()).filter(Boolean),
      dateOfBirth: "1982-05-14",
      citizenship,
      fbiNumber: fbiNumber || `FBI-${Math.floor(1e5 + Math.random() * 9e5)}`,
      threatLevel,
      status: "ACTIVE_WARRANT",
      biometrics: {
        height: `6'1"`,
        weight: "195 lbs",
        eyes: "Hazel",
        hair: "Dark Brown",
        scarsAndMarks: ["Scar on left temple"]
      },
      associatedCases: ["FED-2026-0042"],
      knownAssociates: ["Unknown Courier #4"],
      lastKnownLocation: {
        latitude: 40.758,
        longitude: -73.9855,
        address: "Midtown Manhattan, NY",
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      }
    };
    setPersons([newP, ...persons]);
    setIsModalOpen(false);
    setFullName("");
    setPrimaryAlias("");
    setAliases("");
  };
  const filteredPersons = persons.filter((p) => {
    const matchesSearch = p.fullName.toLowerCase().includes(search.toLowerCase()) || p.primaryAlias && p.primaryAlias.toLowerCase().includes(search.toLowerCase()) || p.fbiNumber && p.fbiNumber.toLowerCase().includes(search.toLowerCase()) || p.aliases.some((a) => a.toLowerCase().includes(search.toLowerCase()));
    const matchesThreat = threatFilter === "ALL" || p.threatLevel === threatFilter;
    return matchesSearch && matchesThreat;
  });
  return /* @__PURE__ */ React.createElement("div", { className: "space-y-6 max-w-7xl mx-auto font-mono" }, /* @__PURE__ */ React.createElement("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-tactical-neutral-200 dark:border-tactical-neutral-800" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 text-tactical-neutral-500 text-[11px] uppercase tracking-wider mb-1" }, /* @__PURE__ */ React.createElement("span", null, "CRIMINAL IDENTITY & BIOMETRIC REGISTRY"), /* @__PURE__ */ React.createElement("span", null, "/"), /* @__PURE__ */ React.createElement("span", { className: "text-tactical-danger-600 font-semibold" }, "NCIC-INTERPOL SYNCED")), /* @__PURE__ */ React.createElement("h1", { className: "text-2xl font-bold tracking-tight text-tactical-neutral-900 dark:text-tactical-neutral-100" }, "Persons of Interest (POI) Directory")), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React.createElement(
    Button,
    {
      variant: "secondary",
      size: "sm",
      onClick: () => navigate("/entity-resolution"),
      icon: /* @__PURE__ */ React.createElement(GitMerge, { className: "w-4 h-4 text-tactical-primary-600" })
    },
    "Entity Resolution Cluster"
  ), /* @__PURE__ */ React.createElement(
    Button,
    {
      variant: "primary",
      size: "sm",
      onClick: () => setIsModalOpen(true),
      icon: /* @__PURE__ */ React.createElement(UserPlus, { className: "w-4 h-4" })
    },
    "+ FORM-POI-2026 Intake"
  ))), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 sm:grid-cols-4 gap-4" }, /* @__PURE__ */ React.createElement("div", { className: "p-4 bg-white dark:bg-tactical-neutral-900 rounded border border-tactical-neutral-200 dark:border-tactical-neutral-800" }, /* @__PURE__ */ React.createElement("div", { className: "text-[10px] uppercase text-tactical-neutral-500" }, "Tracked Targets"), /* @__PURE__ */ React.createElement("div", { className: "text-2xl font-black text-tactical-neutral-900 dark:text-tactical-neutral-100 my-1" }, persons.length), /* @__PURE__ */ React.createElement("div", { className: "text-[11px] text-tactical-neutral-500" }, "Biometrically Enrolled")), /* @__PURE__ */ React.createElement("div", { className: "p-4 bg-white dark:bg-tactical-neutral-900 rounded border border-tactical-neutral-200 dark:border-tactical-neutral-800" }, /* @__PURE__ */ React.createElement("div", { className: "text-[10px] uppercase text-tactical-neutral-500" }, "Active Federal Warrants"), /* @__PURE__ */ React.createElement("div", { className: "text-2xl font-black text-tactical-danger-600 my-1" }, persons.filter((p) => p.status === "ACTIVE_WARRANT").length), /* @__PURE__ */ React.createElement("div", { className: "text-[11px] text-tactical-danger-600 font-semibold" }, "Immediate Apprehension")), /* @__PURE__ */ React.createElement("div", { className: "p-4 bg-white dark:bg-tactical-neutral-900 rounded border border-tactical-neutral-200 dark:border-tactical-neutral-800" }, /* @__PURE__ */ React.createElement("div", { className: "text-[10px] uppercase text-tactical-neutral-500" }, "Critical Threat Tier"), /* @__PURE__ */ React.createElement("div", { className: "text-2xl font-black text-tactical-primary-600 my-1" }, persons.filter((p) => p.threatLevel === "CRITICAL").length), /* @__PURE__ */ React.createElement("div", { className: "text-[11px] text-tactical-neutral-500" }, "Armed & Transnational")), /* @__PURE__ */ React.createElement("div", { className: "p-4 bg-white dark:bg-tactical-neutral-900 rounded border border-tactical-neutral-200 dark:border-tactical-neutral-800" }, /* @__PURE__ */ React.createElement("div", { className: "text-[10px] uppercase text-tactical-neutral-500" }, "Cross-Jurisdiction Matches"), /* @__PURE__ */ React.createElement("div", { className: "text-2xl font-black text-tactical-neutral-900 dark:text-tactical-neutral-100 my-1" }, "3 Clusters"), /* @__PURE__ */ React.createElement("div", { className: "text-[11px] text-tactical-primary-600 font-semibold" }, "Deduplication Pending"))), /* @__PURE__ */ React.createElement("div", { className: "p-3 bg-white dark:bg-tactical-neutral-900 rounded border border-tactical-neutral-200 dark:border-tactical-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 w-full sm:w-80" }, /* @__PURE__ */ React.createElement(Search, { className: "w-4 h-4 text-tactical-neutral-400 shrink-0" }), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "text",
      className: "w-full bg-tactical-neutral-100 dark:bg-tactical-neutral-800 px-3 py-1.5 rounded border border-tactical-neutral-300 dark:border-tactical-neutral-700 text-tactical-neutral-900 dark:text-tactical-neutral-100 placeholder-tactical-neutral-400 focus:outline-none",
      placeholder: "Search by legal name, alias, FBI #, passport...",
      value: search,
      onChange: (e) => setSearch(e.target.value)
    }
  )), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 w-full sm:w-auto" }, /* @__PURE__ */ React.createElement("span", { className: "text-[11px] text-tactical-neutral-500" }, "Threat Tier:"), /* @__PURE__ */ React.createElement(
    "select",
    {
      className: "bg-tactical-neutral-100 dark:bg-tactical-neutral-800 px-3 py-1.5 rounded border border-tactical-neutral-300 dark:border-tactical-neutral-700 text-xs",
      value: threatFilter,
      onChange: (e) => setThreatFilter(e.target.value)
    },
    /* @__PURE__ */ React.createElement("option", { value: "ALL" }, "All Threat Levels"),
    /* @__PURE__ */ React.createElement("option", { value: "CRITICAL" }, "Critical"),
    /* @__PURE__ */ React.createElement("option", { value: "HIGH" }, "High"),
    /* @__PURE__ */ React.createElement("option", { value: "MEDIUM" }, "Medium"),
    /* @__PURE__ */ React.createElement("option", { value: "LOW" }, "Low")
  ))), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" }, filteredPersons.map((person) => /* @__PURE__ */ React.createElement(
    "div",
    {
      key: person.id,
      className: "p-5 bg-white dark:bg-tactical-neutral-900 rounded border border-tactical-neutral-200 dark:border-tactical-neutral-800 hover:border-tactical-danger-500 transition-colors flex flex-col justify-between space-y-4"
    },
    /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "flex items-start justify-between gap-2 mb-2" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React.createElement("div", { className: "w-10 h-10 rounded bg-tactical-neutral-800 text-white flex items-center justify-center font-bold text-xs border border-tactical-neutral-700" }, person.fullName.split(" ").map((n) => n[0]).join("")), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h3", { className: "font-bold text-sm text-tactical-neutral-900 dark:text-tactical-neutral-100" }, person.fullName), /* @__PURE__ */ React.createElement("span", { className: "text-[11px] text-tactical-danger-600 font-semibold block" }, '"', person.primaryAlias || "NO ALIAS", '"'))), /* @__PURE__ */ React.createElement(
      Badge,
      {
        variant: person.threatLevel === "CRITICAL" ? "danger" : "warning",
        size: "sm"
      },
      person.threatLevel
    )), /* @__PURE__ */ React.createElement("div", { className: "p-2.5 bg-tactical-neutral-50 dark:bg-tactical-neutral-800/60 rounded text-[11px] space-y-1 border border-tactical-neutral-200 dark:border-tactical-neutral-700/60" }, /* @__PURE__ */ React.createElement("div", { className: "flex justify-between" }, /* @__PURE__ */ React.createElement("span", { className: "text-tactical-neutral-500" }, "FBI #:"), /* @__PURE__ */ React.createElement("span", { className: "font-semibold text-tactical-neutral-800 dark:text-tactical-neutral-200" }, person.fbiNumber || "PENDING")), /* @__PURE__ */ React.createElement("div", { className: "flex justify-between" }, /* @__PURE__ */ React.createElement("span", { className: "text-tactical-neutral-500" }, "Citizenship:"), /* @__PURE__ */ React.createElement("span", { className: "text-tactical-neutral-800 dark:text-tactical-neutral-200" }, person.citizenship)), /* @__PURE__ */ React.createElement("div", { className: "flex justify-between" }, /* @__PURE__ */ React.createElement("span", { className: "text-tactical-neutral-500" }, "Status:"), /* @__PURE__ */ React.createElement("span", { className: "font-bold text-tactical-danger-600" }, person.status.replace("_", " "))), person.lastKnownLocation && /* @__PURE__ */ React.createElement("div", { className: "flex justify-between" }, /* @__PURE__ */ React.createElement("span", { className: "text-tactical-neutral-500" }, "Last Fix:"), /* @__PURE__ */ React.createElement("span", { className: "text-tactical-neutral-700 dark:text-tactical-neutral-300 truncate max-w-[140px]" }, person.lastKnownLocation.address)))),
    /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between pt-2 border-t border-tactical-neutral-100 dark:border-tactical-neutral-800 text-xs" }, /* @__PURE__ */ React.createElement(
      Button,
      {
        variant: "secondary",
        size: "sm",
        onClick: () => navigate("/network-graph"),
        icon: /* @__PURE__ */ React.createElement(Network, { className: "w-3.5 h-3.5" }),
        className: "text-[10px]"
      },
      "Graph Links"
    ), /* @__PURE__ */ React.createElement(
      Button,
      {
        variant: "secondary",
        size: "sm",
        onClick: () => navigate("/geo-temporal"),
        icon: /* @__PURE__ */ React.createElement(MapPin, { className: "w-3.5 h-3.5" }),
        className: "text-[10px]"
      },
      "Track Radiometry"
    ))
  ))), /* @__PURE__ */ React.createElement(
    Modal,
    {
      isOpen: isModalOpen,
      onClose: () => setIsModalOpen(false),
      title: "FORM-POI-2026 CRIMINAL ENTITY INTAKE",
      subtitle: "Sworn Registration of Target Person of Interest",
      size: "lg"
    },
    /* @__PURE__ */ React.createElement("form", { onSubmit: handleCreatePOI, className: "space-y-4" }, /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-2 gap-4" }, /* @__PURE__ */ React.createElement(
      Input,
      {
        label: "Legal Full Name",
        value: fullName,
        onChange: (e) => setFullName(e.target.value),
        placeholder: "e.g. Konstantin Valkov",
        required: true
      }
    ), /* @__PURE__ */ React.createElement(
      Input,
      {
        label: "Primary Street Alias",
        value: primaryAlias,
        onChange: (e) => setPrimaryAlias(e.target.value),
        placeholder: "e.g. Kostya",
        required: true
      }
    )), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-2 gap-4" }, /* @__PURE__ */ React.createElement(
      Input,
      {
        label: "FBI Identification #",
        value: fbiNumber,
        onChange: (e) => setFbiNumber(e.target.value),
        placeholder: "e.g. FBI-994012-NY"
      }
    ), /* @__PURE__ */ React.createElement(
      Select,
      {
        label: "Threat Classification",
        value: threatLevel,
        onChange: (e) => setThreatLevel(e.target.value),
        options: [
          { value: "CRITICAL", label: "CRITICAL (Armed & Dangerous)" },
          { value: "HIGH", label: "HIGH (Syndicate Leadership)" },
          { value: "MEDIUM", label: "MEDIUM (Operational Courier)" },
          { value: "LOW", label: "LOW (Peripheral Associate)" }
        ]
      }
    )), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-2 gap-4" }, /* @__PURE__ */ React.createElement(
      Input,
      {
        label: "Known Aliases (Comma separated)",
        value: aliases,
        onChange: (e) => setAliases(e.target.value),
        placeholder: "Kostya, The Wolf, K. Valkov"
      }
    ), /* @__PURE__ */ React.createElement(
      Input,
      {
        label: "Citizenship / Nationality",
        value: citizenship,
        onChange: (e) => setCitizenship(e.target.value),
        placeholder: "Russian Federation / USA",
        required: true
      }
    )), /* @__PURE__ */ React.createElement("div", { className: "p-3 rounded bg-tactical-neutral-100 dark:bg-tactical-neutral-800 text-xs text-tactical-neutral-600 dark:text-tactical-neutral-400" }, /* @__PURE__ */ React.createElement(Fingerprint, { className: "w-4 h-4 text-tactical-primary-600 inline mr-1" }), "Upon intake submission, Jaro-Winkler phonetic deduplication will immediately compare this profile against 240,000 national records for cross-jurisdictional alias matches."), /* @__PURE__ */ React.createElement("div", { className: "flex justify-end gap-2 pt-2 border-t border-tactical-neutral-200 dark:border-tactical-neutral-700" }, /* @__PURE__ */ React.createElement(Button, { variant: "secondary", size: "sm", onClick: () => setIsModalOpen(false) }, "Cancel"), /* @__PURE__ */ React.createElement(Button, { variant: "primary", size: "sm", type: "submit", icon: /* @__PURE__ */ React.createElement(ShieldAlert, { className: "w-4 h-4" }) }, "Anchor POI Dossier to Ledger")))
  ));
};
export {
  CriminalPersonsPage
};
