import React, { useState } from "react";
import { mockAuditLogs } from "@/constants/mockData";
import { HashStamp } from "@/components/common/HashStamp";
import { MerkleModal } from "@/components/common/MerkleModal";
import { Button } from "@/components/ui/Button";
import {
  ShieldCheck,
  Search,
  CheckCircle,
  FileCheck
} from "lucide-react";
const AuditLedgerPage = () => {
  const [logs, setLogs] = useState(mockAuditLogs);
  const [search, setSearch] = useState("");
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [merkleOpen, setMerkleOpen] = useState(false);
  const filteredLogs = logs.filter(
    (l) => l.action.toLowerCase().includes(search.toLowerCase()) || l.agentName.toLowerCase().includes(search.toLowerCase()) || l.badgeNumber.toLowerCase().includes(search.toLowerCase()) || l.sha256Hash.toLowerCase().includes(search.toLowerCase())
  );
  return /* @__PURE__ */ React.createElement("div", { className: "space-y-6 max-w-7xl mx-auto font-mono" }, /* @__PURE__ */ React.createElement("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-tactical-neutral-200 dark:border-tactical-neutral-800" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 text-tactical-neutral-500 text-[11px] uppercase tracking-wider mb-1" }, /* @__PURE__ */ React.createElement("span", null, "CHAIN-OF-CUSTODY IMMUTABLE REGISTRY"), /* @__PURE__ */ React.createElement("span", null, "/"), /* @__PURE__ */ React.createElement("span", { className: "text-tactical-success-600 font-semibold" }, "FRE 902(13) COMPLIANT")), /* @__PURE__ */ React.createElement("h1", { className: "text-2xl font-bold tracking-tight text-tactical-neutral-900 dark:text-tactical-neutral-100" }, "Cryptographic Audit & Evidentiary Ledger")), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React.createElement(
    Button,
    {
      variant: "secondary",
      size: "sm",
      onClick: () => setMerkleOpen(true),
      icon: /* @__PURE__ */ React.createElement(ShieldCheck, { className: "w-4 h-4 text-tactical-success-600" })
    },
    "Compute Merkle Tree Root"
  ), /* @__PURE__ */ React.createElement(
    Button,
    {
      variant: "primary",
      size: "sm",
      onClick: () => alert("Certificate FRE-902-CERT-2026-X generated with cryptographic signature."),
      icon: /* @__PURE__ */ React.createElement(FileCheck, { className: "w-4 h-4" })
    },
    "Export FRE 902 Certificate"
  ))), /* @__PURE__ */ React.createElement("div", { className: "p-4 bg-tactical-neutral-50 dark:bg-tactical-neutral-900 rounded border border-tactical-neutral-300 dark:border-tactical-neutral-700 flex flex-col md:flex-row md:items-center justify-between gap-4" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 mb-1" }, /* @__PURE__ */ React.createElement("span", { className: "w-2 h-2 rounded-full bg-tactical-success-500 animate-pulse" }), /* @__PURE__ */ React.createElement("span", { className: "text-xs font-bold uppercase text-tactical-neutral-900 dark:text-tactical-neutral-100" }, "Active Merkle Epoch Root Hash (Block #4102)")), /* @__PURE__ */ React.createElement(
    HashStamp,
    {
      hash: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
      lead: 16,
      tail: 16,
      className: "text-xs"
    }
  )), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-4 text-xs text-tactical-neutral-600 dark:text-tactical-neutral-400" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", { className: "text-[10px] text-tactical-neutral-500 block uppercase" }, "Consecutive Blocks"), /* @__PURE__ */ React.createElement("span", { className: "font-bold text-tactical-neutral-900 dark:text-tactical-neutral-100" }, "4,102 Valid")), /* @__PURE__ */ React.createElement("div", { className: "h-8 w-px bg-tactical-neutral-300 dark:bg-tactical-neutral-700" }), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", { className: "text-[10px] text-tactical-neutral-500 block uppercase" }, "Tamper Status"), /* @__PURE__ */ React.createElement("span", { className: "font-bold text-tactical-success-600" }, "0 Inconsistencies")))), /* @__PURE__ */ React.createElement("div", { className: "p-3 bg-white dark:bg-tactical-neutral-900 rounded border border-tactical-neutral-200 dark:border-tactical-neutral-800 flex items-center gap-2 text-xs" }, /* @__PURE__ */ React.createElement(Search, { className: "w-4 h-4 text-tactical-neutral-400 shrink-0" }), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "text",
      className: "w-full bg-transparent text-tactical-neutral-900 dark:text-tactical-neutral-100 placeholder-tactical-neutral-400 focus:outline-none",
      placeholder: "Filter by hash, officer, action, or case docket...",
      value: search,
      onChange: (e) => setSearch(e.target.value)
    }
  )), /* @__PURE__ */ React.createElement("div", { className: "bg-white dark:bg-tactical-neutral-900 border border-tactical-neutral-200 dark:border-tactical-neutral-800 rounded overflow-hidden" }, /* @__PURE__ */ React.createElement("div", { className: "overflow-x-auto" }, /* @__PURE__ */ React.createElement("table", { className: "w-full text-left text-xs" }, /* @__PURE__ */ React.createElement("thead", { className: "bg-tactical-neutral-100 dark:bg-tactical-neutral-800/80 text-tactical-neutral-600 dark:text-tactical-neutral-400 uppercase text-[10px] tracking-wider border-b border-tactical-neutral-200 dark:border-tactical-neutral-700" }, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("th", { className: "px-4 py-2.5" }, "Block / Hash"), /* @__PURE__ */ React.createElement("th", { className: "px-4 py-2.5" }, "Timestamp (UTC)"), /* @__PURE__ */ React.createElement("th", { className: "px-4 py-2.5" }, "Agent / Badge"), /* @__PURE__ */ React.createElement("th", { className: "px-4 py-2.5" }, "Action Executed"), /* @__PURE__ */ React.createElement("th", { className: "px-4 py-2.5" }, "Jurisdiction"), /* @__PURE__ */ React.createElement("th", { className: "px-4 py-2.5 text-right" }, "Verification"))), /* @__PURE__ */ React.createElement("tbody", { className: "divide-y divide-tactical-neutral-200 dark:divide-tactical-neutral-800" }, filteredLogs.map((log) => /* @__PURE__ */ React.createElement(
    "tr",
    {
      key: log.id,
      className: "hover:bg-tactical-neutral-50 dark:hover:bg-tactical-neutral-800/40 transition-colors cursor-pointer",
      onClick: () => {
        setSelectedRecord(log);
        setMerkleOpen(true);
      }
    },
    /* @__PURE__ */ React.createElement("td", { className: "px-4 py-3" }, /* @__PURE__ */ React.createElement(HashStamp, { hash: log.sha256Hash, lead: 6, tail: 6 }), /* @__PURE__ */ React.createElement("span", { className: "block text-[10px] text-tactical-neutral-400 font-mono mt-0.5" }, "BLOCK: #", log.id)),
    /* @__PURE__ */ React.createElement("td", { className: "px-4 py-3 text-tactical-neutral-600 dark:text-tactical-neutral-400" }, new Date(log.timestamp).toISOString().replace("T", " ").slice(0, 19), "Z"),
    /* @__PURE__ */ React.createElement("td", { className: "px-4 py-3" }, /* @__PURE__ */ React.createElement("div", { className: "font-bold text-tactical-neutral-900 dark:text-tactical-neutral-100" }, log.agentName), /* @__PURE__ */ React.createElement("div", { className: "text-[10px] text-tactical-neutral-500" }, log.badgeNumber)),
    /* @__PURE__ */ React.createElement("td", { className: "px-4 py-3" }, /* @__PURE__ */ React.createElement("div", { className: "font-semibold text-tactical-neutral-800 dark:text-tactical-neutral-200" }, log.action), /* @__PURE__ */ React.createElement("div", { className: "text-[10px] text-tactical-neutral-500" }, "Target: ", log.targetEntity)),
    /* @__PURE__ */ React.createElement("td", { className: "px-4 py-3" }, /* @__PURE__ */ React.createElement("span", { className: "text-[10px] px-2 py-0.5 rounded bg-tactical-neutral-100 dark:bg-tactical-neutral-800 border border-tactical-neutral-300 dark:border-tactical-neutral-700" }, log.jurisdiction)),
    /* @__PURE__ */ React.createElement("td", { className: "px-4 py-3 text-right" }, /* @__PURE__ */ React.createElement("span", { className: "inline-flex items-center gap-1 text-[11px] font-bold text-tactical-success-600 dark:text-tactical-success-400" }, /* @__PURE__ */ React.createElement(CheckCircle, { className: "w-3.5 h-3.5" }), "AUTHENTIC"))
  )))))), /* @__PURE__ */ React.createElement(
    MerkleModal,
    {
      isOpen: merkleOpen,
      onClose: () => setMerkleOpen(false),
      targetRecordId: selectedRecord?.id || "AUD-BLOCK-0089",
      targetHash: selectedRecord?.sha256Hash || "9b1d8cd98f00b204e9800998ecf8427e"
    }
  ));
};
export {
  AuditLedgerPage
};
