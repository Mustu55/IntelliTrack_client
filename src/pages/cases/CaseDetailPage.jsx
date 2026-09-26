import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { mockCases, mockPersons, mockEvidence } from "@/constants/mockData";
import { HashStamp } from "@/components/common/HashStamp";
import { MerkleModal } from "@/components/common/MerkleModal";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Textarea } from "@/components/ui/Textarea";
import {
  Briefcase,
  ArrowLeft,
  FileText,
  UserCheck,
  Clock,
  FileCheck,
  Lock,
  Key,
  Shield,
  Network
} from "lucide-react";
const CaseDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const caseData = mockCases.find((c) => c.id === id) || mockCases[0];
  const [activeTab, setActiveTab] = useState("summary");
  const [evidenceList, setEvidenceList] = useState(mockEvidence);
  const [notes, setNotes] = useState([
    {
      id: "NOTE-01",
      author: "SA Marcus Vance (FBI-89412)",
      timestamp: "2026-03-29T14:22:10Z",
      content: "Surveillance unit confirmed Valkov meeting with financial cut-out at Pier 54 safehouse. Vehicle NY-TAG-7892 departed southbound.",
      signature: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
    },
    {
      id: "NOTE-02",
      author: "Det. Sarah Lin (NYPD-TOC)",
      timestamp: "2026-03-29T17:45:00Z",
      content: "FinCEN SAR match received: $450,000 structured wire routed through Cyprus shell account. Linked to Target 01.",
      signature: "9b1d8cd98f00b204e9800998ecf8427e02d4251ea15b64f5d4e5f6a7b8c9d0e1"
    }
  ]);
  const [newNoteText, setNewNoteText] = useState("");
  const [merkleModalOpen, setMerkleModalOpen] = useState(false);
  const [selectedHash, setSelectedHash] = useState("");
  const handleAddNote = (e) => {
    e.preventDefault();
    if (!newNoteText.trim()) return;
    const newN = {
      id: `NOTE-${Date.now()}`,
      author: "SA Marcus Vance (FBI-89412)",
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      content: newNoteText,
      signature: "a4b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b67890123456789abcdef01234"
    };
    setNotes([newN, ...notes]);
    setNewNoteText("");
  };
  const handleVerifyEvidence = (hash) => {
    setSelectedHash(hash);
    setMerkleModalOpen(true);
  };
  return /* @__PURE__ */ React.createElement("div", { className: "space-y-6 max-w-7xl mx-auto font-mono" }, /* @__PURE__ */ React.createElement("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-tactical-neutral-200 dark:border-tactical-neutral-800" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-3" }, /* @__PURE__ */ React.createElement(
    Button,
    {
      variant: "secondary",
      size: "sm",
      onClick: () => navigate("/cases"),
      icon: /* @__PURE__ */ React.createElement(ArrowLeft, { className: "w-3.5 h-3.5" })
    },
    "All Dockets"
  ), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 text-xs" }, /* @__PURE__ */ React.createElement("span", { className: "font-bold text-tactical-primary-600 dark:text-tactical-primary-400" }, caseData.caseNumber), /* @__PURE__ */ React.createElement(Badge, { variant: caseData.priority === "CRITICAL" ? "danger" : "warning", size: "sm" }, caseData.priority), caseData.grandJuryNumber && /* @__PURE__ */ React.createElement("span", { className: "text-[10px] px-2 py-0.5 rounded bg-tactical-neutral-200 dark:bg-tactical-neutral-800 text-tactical-neutral-700 dark:text-tactical-neutral-300 font-bold" }, caseData.grandJuryNumber)), /* @__PURE__ */ React.createElement("h1", { className: "text-xl font-bold tracking-tight text-tactical-neutral-900 dark:text-tactical-neutral-100" }, caseData.title))), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React.createElement(
    Button,
    {
      variant: "secondary",
      size: "sm",
      onClick: () => navigate("/network-graph"),
      icon: /* @__PURE__ */ React.createElement(Network, { className: "w-4 h-4 text-tactical-primary-600" })
    },
    "Launch Syndicate Graph"
  ), /* @__PURE__ */ React.createElement(
    Button,
    {
      variant: "primary",
      size: "sm",
      onClick: () => navigate("/reports"),
      icon: /* @__PURE__ */ React.createElement(FileText, { className: "w-4 h-4" })
    },
    "Generate Court Dossier"
  ))), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-1 border-b border-tactical-neutral-200 dark:border-tactical-neutral-800 overflow-x-auto text-xs pb-1" }, /* @__PURE__ */ React.createElement(
    "button",
    {
      type: "button",
      onClick: () => setActiveTab("summary"),
      className: `px-3 py-2 rounded-t font-semibold transition-colors flex items-center gap-1.5 ${activeTab === "summary" ? "bg-white dark:bg-tactical-neutral-900 border-t-2 border-t-tactical-primary-600 border-x border-tactical-neutral-200 dark:border-tactical-neutral-800 text-tactical-neutral-900 dark:text-tactical-neutral-100" : "text-tactical-neutral-500 hover:text-tactical-neutral-900"}`
    },
    /* @__PURE__ */ React.createElement(Briefcase, { className: "w-3.5 h-3.5" }),
    /* @__PURE__ */ React.createElement("span", null, "Executive Summary")
  ), /* @__PURE__ */ React.createElement(
    "button",
    {
      type: "button",
      onClick: () => setActiveTab("pois"),
      className: `px-3 py-2 rounded-t font-semibold transition-colors flex items-center gap-1.5 ${activeTab === "pois" ? "bg-white dark:bg-tactical-neutral-900 border-t-2 border-t-tactical-primary-600 border-x border-tactical-neutral-200 dark:border-tactical-neutral-800 text-tactical-neutral-900 dark:text-tactical-neutral-100" : "text-tactical-neutral-500 hover:text-tactical-neutral-900"}`
    },
    /* @__PURE__ */ React.createElement(UserCheck, { className: "w-3.5 h-3.5" }),
    /* @__PURE__ */ React.createElement("span", null, "Target POIs (", mockPersons.length, ")")
  ), /* @__PURE__ */ React.createElement(
    "button",
    {
      type: "button",
      onClick: () => setActiveTab("evidence"),
      className: `px-3 py-2 rounded-t font-semibold transition-colors flex items-center gap-1.5 ${activeTab === "evidence" ? "bg-white dark:bg-tactical-neutral-900 border-t-2 border-t-tactical-primary-600 border-x border-tactical-neutral-200 dark:border-tactical-neutral-800 text-tactical-neutral-900 dark:text-tactical-neutral-100" : "text-tactical-neutral-500 hover:text-tactical-neutral-900"}`
    },
    /* @__PURE__ */ React.createElement(Lock, { className: "w-3.5 h-3.5 text-tactical-success-600" }),
    /* @__PURE__ */ React.createElement("span", null, "Evidentiary Vault (", evidenceList.length, ")")
  ), /* @__PURE__ */ React.createElement(
    "button",
    {
      type: "button",
      onClick: () => setActiveTab("timeline"),
      className: `px-3 py-2 rounded-t font-semibold transition-colors flex items-center gap-1.5 ${activeTab === "timeline" ? "bg-white dark:bg-tactical-neutral-900 border-t-2 border-t-tactical-primary-600 border-x border-tactical-neutral-200 dark:border-tactical-neutral-800 text-tactical-neutral-900 dark:text-tactical-neutral-100" : "text-tactical-neutral-500 hover:text-tactical-neutral-900"}`
    },
    /* @__PURE__ */ React.createElement(Clock, { className: "w-3.5 h-3.5" }),
    /* @__PURE__ */ React.createElement("span", null, "Timeline Milestones")
  ), /* @__PURE__ */ React.createElement(
    "button",
    {
      type: "button",
      onClick: () => setActiveTab("notes"),
      className: `px-3 py-2 rounded-t font-semibold transition-colors flex items-center gap-1.5 ${activeTab === "notes" ? "bg-white dark:bg-tactical-neutral-900 border-t-2 border-t-tactical-primary-600 border-x border-tactical-neutral-200 dark:border-tactical-neutral-800 text-tactical-neutral-900 dark:text-tactical-neutral-100" : "text-tactical-neutral-500 hover:text-tactical-neutral-900"}`
    },
    /* @__PURE__ */ React.createElement(FileCheck, { className: "w-3.5 h-3.5" }),
    /* @__PURE__ */ React.createElement("span", null, "Signed Field Notes (", notes.length, ")")
  )), activeTab === "summary" && /* @__PURE__ */ React.createElement("div", { className: "space-y-6" }, /* @__PURE__ */ React.createElement("div", { className: "p-5 bg-white dark:bg-tactical-neutral-900 rounded border border-tactical-neutral-200 dark:border-tactical-neutral-800 space-y-4" }, /* @__PURE__ */ React.createElement("h2", { className: "text-sm font-bold uppercase text-tactical-neutral-900 dark:text-tactical-neutral-100" }, "Statutory Docket Profile & Probable Cause"), /* @__PURE__ */ React.createElement("p", { className: "text-xs text-tactical-neutral-700 dark:text-tactical-neutral-300 font-sans leading-relaxed" }, caseData.summary), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-tactical-neutral-100 dark:border-tactical-neutral-800 text-xs" }, /* @__PURE__ */ React.createElement("div", { className: "p-3 bg-tactical-neutral-50 dark:bg-tactical-neutral-800/50 rounded" }, /* @__PURE__ */ React.createElement("span", { className: "text-[10px] uppercase text-tactical-neutral-500 block mb-0.5" }, "Statutory Authority"), /* @__PURE__ */ React.createElement("span", { className: "font-bold text-tactical-neutral-900 dark:text-tactical-neutral-100" }, caseData.statutoryAuthority || "18 U.S.C. \xA7 1962 (RICO)")), /* @__PURE__ */ React.createElement("div", { className: "p-3 bg-tactical-neutral-50 dark:bg-tactical-neutral-800/50 rounded" }, /* @__PURE__ */ React.createElement("span", { className: "text-[10px] uppercase text-tactical-neutral-500 block mb-0.5" }, "Primary Jurisdiction"), /* @__PURE__ */ React.createElement("span", { className: "font-bold text-tactical-neutral-900 dark:text-tactical-neutral-100" }, caseData.primaryJurisdiction)), /* @__PURE__ */ React.createElement("div", { className: "p-3 bg-tactical-neutral-50 dark:bg-tactical-neutral-800/50 rounded" }, /* @__PURE__ */ React.createElement("span", { className: "text-[10px] uppercase text-tactical-neutral-500 block mb-0.5" }, "Lead Investigator"), /* @__PURE__ */ React.createElement("span", { className: "font-bold text-tactical-neutral-900 dark:text-tactical-neutral-100" }, caseData.leadInvestigator))))), activeTab === "pois" && /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4" }, mockPersons.map((poi) => /* @__PURE__ */ React.createElement(
    "div",
    {
      key: poi.id,
      className: "p-4 bg-white dark:bg-tactical-neutral-900 rounded border border-tactical-neutral-200 dark:border-tactical-neutral-800 hover:border-tactical-danger-500 transition-colors space-y-3"
    },
    /* @__PURE__ */ React.createElement("div", { className: "flex items-start justify-between" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 mb-1" }, /* @__PURE__ */ React.createElement("span", { className: "font-bold text-xs text-tactical-neutral-900 dark:text-tactical-neutral-100" }, poi.fullName), /* @__PURE__ */ React.createElement(Badge, { variant: "danger", size: "sm" }, poi.threatLevel)), /* @__PURE__ */ React.createElement("div", { className: "text-[11px] text-tactical-neutral-500" }, "PRIMARY ALIAS: ", /* @__PURE__ */ React.createElement("strong", { className: "text-tactical-danger-600" }, '"', poi.primaryAlias, '"'))), /* @__PURE__ */ React.createElement(
      Button,
      {
        variant: "secondary",
        size: "sm",
        onClick: () => navigate("/persons"),
        className: "text-[10px]"
      },
      "View Dossier"
    )),
    /* @__PURE__ */ React.createElement("div", { className: "p-2 bg-tactical-neutral-50 dark:bg-tactical-neutral-800 rounded text-[11px] space-y-0.5" }, /* @__PURE__ */ React.createElement("div", null, "FBI #: ", /* @__PURE__ */ React.createElement("strong", null, poi.fbiNumber || "PENDING")), /* @__PURE__ */ React.createElement("div", null, "CITIZENSHIP: ", /* @__PURE__ */ React.createElement("strong", null, poi.citizenship)), /* @__PURE__ */ React.createElement("div", null, "KNOWN ALIASES: ", /* @__PURE__ */ React.createElement("strong", null, poi.aliases.join(", "))))
  ))), activeTab === "evidence" && /* @__PURE__ */ React.createElement("div", { className: "space-y-4" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between text-xs" }, /* @__PURE__ */ React.createElement("span", { className: "text-tactical-neutral-500" }, "FRE 902(13) & 902(14) Cryptographically Sealed Digital Evidence Vault"), /* @__PURE__ */ React.createElement(
    Button,
    {
      variant: "secondary",
      size: "sm",
      onClick: () => handleVerifyEvidence("e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"),
      icon: /* @__PURE__ */ React.createElement(Shield, { className: "w-3.5 h-3.5 text-tactical-success-600" })
    },
    "Verify Complete Vault Merkle Proof"
  )), /* @__PURE__ */ React.createElement("div", { className: "bg-white dark:bg-tactical-neutral-900 rounded border border-tactical-neutral-200 dark:border-tactical-neutral-800 overflow-hidden" }, /* @__PURE__ */ React.createElement("div", { className: "overflow-x-auto" }, /* @__PURE__ */ React.createElement("table", { className: "w-full text-left text-xs" }, /* @__PURE__ */ React.createElement("thead", { className: "bg-tactical-neutral-100 dark:bg-tactical-neutral-800/80 text-tactical-neutral-600 dark:text-tactical-neutral-400 uppercase text-[10px] tracking-wider border-b border-tactical-neutral-200 dark:border-tactical-neutral-700" }, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("th", { className: "px-4 py-2.5" }, "Evidence ID / Title"), /* @__PURE__ */ React.createElement("th", { className: "px-4 py-2.5" }, "Type"), /* @__PURE__ */ React.createElement("th", { className: "px-4 py-2.5" }, "Ingested (UTC)"), /* @__PURE__ */ React.createElement("th", { className: "px-4 py-2.5" }, "Cryptographic SHA-256"), /* @__PURE__ */ React.createElement("th", { className: "px-4 py-2.5 text-right" }, "Integrity"))), /* @__PURE__ */ React.createElement("tbody", { className: "divide-y divide-tactical-neutral-200 dark:divide-tactical-neutral-800" }, evidenceList.map((item) => /* @__PURE__ */ React.createElement("tr", { key: item.id, className: "hover:bg-tactical-neutral-50 dark:hover:bg-tactical-neutral-800/40" }, /* @__PURE__ */ React.createElement("td", { className: "px-4 py-3" }, /* @__PURE__ */ React.createElement("div", { className: "font-bold text-tactical-neutral-900 dark:text-tactical-neutral-100" }, item.title), /* @__PURE__ */ React.createElement("div", { className: "text-[10px] text-tactical-neutral-500 font-mono" }, item.evidenceNumber, " \u2022 ", item.fileSize)), /* @__PURE__ */ React.createElement("td", { className: "px-4 py-3" }, /* @__PURE__ */ React.createElement(Badge, { variant: "neutral", size: "sm" }, item.type)), /* @__PURE__ */ React.createElement("td", { className: "px-4 py-3 text-tactical-neutral-600 dark:text-tactical-neutral-400" }, new Date(item.ingestedAt).toISOString().replace("T", " ").slice(0, 19), "Z"), /* @__PURE__ */ React.createElement("td", { className: "px-4 py-3" }, /* @__PURE__ */ React.createElement(HashStamp, { hash: item.sha256Hash, lead: 6, tail: 6 })), /* @__PURE__ */ React.createElement("td", { className: "px-4 py-3 text-right" }, /* @__PURE__ */ React.createElement(
    Button,
    {
      variant: "secondary",
      size: "sm",
      onClick: () => handleVerifyEvidence(item.sha256Hash),
      className: "text-[10px] py-1"
    },
    "Verify Root"
  ))))))))), activeTab === "timeline" && /* @__PURE__ */ React.createElement("div", { className: "p-5 bg-white dark:bg-tactical-neutral-900 rounded border border-tactical-neutral-200 dark:border-tactical-neutral-800 space-y-4" }, /* @__PURE__ */ React.createElement("h2", { className: "text-sm font-bold uppercase text-tactical-neutral-900 dark:text-tactical-neutral-100 mb-4" }, "Chronological Investigative Milestones"), /* @__PURE__ */ React.createElement("div", { className: "relative pl-6 space-y-6 border-l-2 border-tactical-neutral-300 dark:border-tactical-neutral-700" }, /* @__PURE__ */ React.createElement("div", { className: "relative" }, /* @__PURE__ */ React.createElement("span", { className: "absolute -left-[31px] top-0 w-3.5 h-3.5 rounded-full bg-tactical-primary-600 border-2 border-white dark:border-tactical-neutral-900" }), /* @__PURE__ */ React.createElement("div", { className: "text-[11px] text-tactical-neutral-500" }, "2026-03-29 18:00 ZULU"), /* @__PURE__ */ React.createElement("h4", { className: "font-bold text-xs text-tactical-neutral-900 dark:text-tactical-neutral-100" }, "Title III Wiretap Authorization Order USDC-SDNY-2026-W0084 Entered"), /* @__PURE__ */ React.createElement("p", { className: "text-xs text-tactical-neutral-600 dark:text-tactical-neutral-400 font-sans mt-0.5" }, "Magistrate judge approved 30-day continuous interception on target burner IMEI 869402049182049.")), /* @__PURE__ */ React.createElement("div", { className: "relative" }, /* @__PURE__ */ React.createElement("span", { className: "absolute -left-[31px] top-0 w-3.5 h-3.5 rounded-full bg-tactical-danger-500 border-2 border-white dark:border-tactical-neutral-900" }), /* @__PURE__ */ React.createElement("div", { className: "text-[11px] text-tactical-neutral-500" }, "2026-03-28 11:30 ZULU"), /* @__PURE__ */ React.createElement("h4", { className: "font-bold text-xs text-tactical-neutral-900 dark:text-tactical-neutral-100" }, "Co-Location Event Detected at Safehouse Sector 4"), /* @__PURE__ */ React.createElement("p", { className: "text-xs text-tactical-neutral-600 dark:text-tactical-neutral-400 font-sans mt-0.5" }, "Target burner and secondary courier phone synchronized within 15 meters on Tower NYC-889.")), /* @__PURE__ */ React.createElement("div", { className: "relative" }, /* @__PURE__ */ React.createElement("span", { className: "absolute -left-[31px] top-0 w-3.5 h-3.5 rounded-full bg-tactical-success-500 border-2 border-white dark:border-tactical-neutral-900" }), /* @__PURE__ */ React.createElement("div", { className: "text-[11px] text-tactical-neutral-500" }, "2026-03-20 09:00 ZULU"), /* @__PURE__ */ React.createElement("h4", { className: "font-bold text-xs text-tactical-neutral-900 dark:text-tactical-neutral-100" }, "Case Initiated Under Title 18 U.S.C. \xA7 1962 (RICO)"), /* @__PURE__ */ React.createElement("p", { className: "text-xs text-tactical-neutral-600 dark:text-tactical-neutral-400 font-sans mt-0.5" }, "Inter-agency referral from FinCEN regarding structured offshore transfers.")))), activeTab === "notes" && /* @__PURE__ */ React.createElement("div", { className: "space-y-6" }, /* @__PURE__ */ React.createElement("form", { onSubmit: handleAddNote, className: "p-4 bg-white dark:bg-tactical-neutral-900 rounded border border-tactical-neutral-200 dark:border-tactical-neutral-800 space-y-3" }, /* @__PURE__ */ React.createElement("h3", { className: "text-xs font-bold uppercase text-tactical-neutral-900 dark:text-tactical-neutral-100 flex items-center gap-1.5" }, /* @__PURE__ */ React.createElement(Key, { className: "w-4 h-4 text-tactical-primary-600" }), "Sworn Cryptographically Signed Field Entry"), /* @__PURE__ */ React.createElement(
    Textarea,
    {
      value: newNoteText,
      onChange: (e) => setNewNoteText(e.target.value),
      placeholder: "Record immediate evidentiary observation, intercepted transmission, or warrant execution detail...",
      rows: 3,
      required: true
    }
  ), /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between text-[11px] text-tactical-neutral-500" }, /* @__PURE__ */ React.createElement("span", null, "Signing Key: PIV-9904-8172-FED \u2022 FIPS 201 Valid"), /* @__PURE__ */ React.createElement(Button, { variant: "primary", size: "sm", type: "submit", icon: /* @__PURE__ */ React.createElement(FileCheck, { className: "w-4 h-4" }) }, "Sign & Append to Ledger"))), /* @__PURE__ */ React.createElement("div", { className: "space-y-3" }, notes.map((note) => /* @__PURE__ */ React.createElement(
    "div",
    {
      key: note.id,
      className: "p-4 bg-white dark:bg-tactical-neutral-900 rounded border border-tactical-neutral-200 dark:border-tactical-neutral-800 space-y-2"
    },
    /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between text-xs pb-1 border-b border-tactical-neutral-100 dark:border-tactical-neutral-800" }, /* @__PURE__ */ React.createElement("span", { className: "font-bold text-tactical-neutral-900 dark:text-tactical-neutral-100" }, note.author), /* @__PURE__ */ React.createElement("span", { className: "text-[11px] text-tactical-neutral-500" }, new Date(note.timestamp).toISOString().replace("T", " ").slice(0, 19), "Z")),
    /* @__PURE__ */ React.createElement("p", { className: "text-xs text-tactical-neutral-700 dark:text-tactical-neutral-300 font-sans leading-relaxed" }, note.content),
    /* @__PURE__ */ React.createElement("div", { className: "pt-2 flex items-center gap-2 text-[10px] text-tactical-neutral-400" }, /* @__PURE__ */ React.createElement("span", null, "DIGITAL SIGNATURE:"), /* @__PURE__ */ React.createElement(HashStamp, { hash: note.signature, lead: 8, tail: 8 }))
  )))), /* @__PURE__ */ React.createElement(
    MerkleModal,
    {
      isOpen: merkleModalOpen,
      onClose: () => setMerkleModalOpen(false),
      targetRecordId: caseData.caseNumber,
      targetHash: selectedHash || "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
    }
  ));
};
export {
  CaseDetailPage
};
