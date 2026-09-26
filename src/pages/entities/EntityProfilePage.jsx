import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Users,
  Building,
  Phone,
  Car,
  MapPin,
  Share2,
  FileText,
  AlertTriangle,
  ChevronRight
} from "lucide-react";
const ENTITY_ROSTER = {
  "poi-1": {
    id: "poi-1",
    name: "Raj Mehta",
    entityType: "Person",
    confidence: 92,
    status: "Person of Interest",
    identityInfo: {
      knownAliases: ['"The Courier"', "R.K. Mehta", "Rajiv M.", "RM-Logistics"],
      phoneNumbers: [
        { number: "+91 98201 44921", type: "Primary Burner (VoLTE)", status: "Active", imei: "86129480112948" },
        { number: "+91 98110 33491", type: "Secondary eSIM", status: "Dormant", imei: "35918204918201" }
      ],
      locations: [
        { address: "Pier 42 Maritime Dock, JNPT Harbour", role: "Observed Meeting Point", lastSeen: "2024-03-12 14:30 UTC" },
        { address: "Worli Seaface Apt 402, Mumbai", role: "Suspected Safehouse", lastSeen: "2024-03-09 21:15 UTC" },
        { address: "Sector 18 Warehouse B-4", role: "Consignment Depot", lastSeen: "2024-02-28 11:00 UTC" }
      ],
      vehicles: [
        { plate: "MH-01-EA-9902", model: "Audi A8 Black Sedan", tag: "ALPR Scanned 3x" },
        { plate: "MH-04-AZ-4102", model: "Ashok Leyland Freight 1618", tag: "Consignment Conveyance" }
      ],
      organizations: [
        { name: "BlueStar Logistics Pvt. Ltd.", role: "Operations Consultant (Beneficial Owner)", status: "Shell Entity" },
        { name: "Astraea Trading Corp", role: "Broker / Signatory", status: "Under Scrutiny" }
      ]
    },
    relationships: [
      { targetName: "Vikramaditya Singhania", targetType: "Person", relationshipType: "Co-Conspirator // Direct Financial Recipient", confidence: 94, status: "SUSPICIOUS" },
      { targetName: "Maya Patel", targetType: "Person", relationshipType: "Escrow Account Signatory", confidence: 88, status: "REVIEW_REQUIRED" },
      { targetName: "Kabir Khan", targetType: "Person", relationshipType: "Fleet & Convoy Coordinator", confidence: 91, status: "VERIFIED" },
      { targetName: "BlueStar Logistics Pvt. Ltd.", targetType: "Organization", relationshipType: "Corporate Proxy & Shell Front", confidence: 95, status: "SUSPICIOUS" },
      { targetName: "Astraea Trading Corp", targetType: "Organization", relationshipType: "Trade Invoice Intermediary", confidence: 86, status: "REVIEW_REQUIRED" },
      { targetName: "Wire Transfer $142,000 (#WT-9921)", targetType: "Transaction", relationshipType: "Authorized Remittance Payout", confidence: 96, status: "SUSPICIOUS" },
      { targetName: "Pier 42 Maritime Dock", targetType: "Location", relationshipType: "Repeated Rendezvous Point (7x)", confidence: 98, status: "VERIFIED" },
      { targetName: "CASE #IT-2024-884", targetType: "Case", relationshipType: "Primary Syndicate Subject (Docket Exhibit A)", confidence: 99, status: "VERIFIED" }
    ],
    evidence: [
      {
        id: "ev-1",
        sourceRecord: "CDR Intercept #CDR-2024-0312-8821",
        date: "2024-03-12 14:22 UTC",
        relationshipType: "Telephony Voice Burst to Hawala Terminal",
        confidence: 96,
        badgeStatus: "GREEN",
        notes: "VoLTE packet stream confirmed originating from registered IMEI #86129480112948."
      },
      {
        id: "ev-2",
        sourceRecord: "Crime Branch FIR No. 2024/098",
        date: "2024-02-18 10:00 UTC",
        relationshipType: "Named Accused under IPC 420/120B",
        confidence: 99,
        badgeStatus: "GREEN",
        notes: 'Deposition statement from co-accused names "Raj Mehta / The Courier".'
      },
      {
        id: "ev-3",
        sourceRecord: "ALPR Sighting Log #CAM-JNPT-04",
        date: "2024-03-12 14:32 UTC",
        relationshipType: "Vehicle Scanned at Gate Checkpoint",
        confidence: 94,
        badgeStatus: "GREEN",
        notes: "Black Audi A8 [MH-01-EA-9902] optical OCR match 98.2%."
      },
      {
        id: "ev-4",
        sourceRecord: "Bank RTGS Slip #AXIS-TRX-9902148",
        date: "2024-03-11 16:45 UTC",
        relationshipType: "Hawala Shell Remittance Transit",
        confidence: 88,
        badgeStatus: "AMBER",
        notes: "Transaction ledger requires forensic auditor counter-signature."
      },
      {
        id: "ev-5",
        sourceRecord: "OSINT Telegram Group Handle Leak",
        date: "2024-03-01 08:30 UTC",
        relationshipType: "Encrypted Group Chat Administrator",
        confidence: 72,
        badgeStatus: "RED",
        notes: "Low-confidence heuristic match; shared burner recovery email alias."
      }
    ]
  }
};
const EntityProfilePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const entityId = id && ENTITY_ROSTER[id] ? id : "poi-1";
  const entity = ENTITY_ROSTER[entityId] || ENTITY_ROSTER["poi-1"];
  const [activeTab, setActiveTab] = useState("identity");
  const [evidenceFilter, setEvidenceFilter] = useState("ALL");
  const filteredEvidence = entity.evidence.filter(
    (ev) => evidenceFilter === "ALL" || ev.badgeStatus === evidenceFilter
  );
  return /* @__PURE__ */ React.createElement("div", { className: "space-y-6 max-w-7xl mx-auto font-sans pb-16" }, /* @__PURE__ */ React.createElement("div", { className: "p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3 shadow-md" }, /* @__PURE__ */ React.createElement(AlertTriangle, { className: "w-5 h-5 text-[#F59E0B] shrink-0 mt-0.5" }), /* @__PURE__ */ React.createElement("div", { className: "text-xs" }, /* @__PURE__ */ React.createElement("span", { className: "font-bold text-amber-200 uppercase tracking-wide" }, "Sworn Human Verification Safeguard:", " "), /* @__PURE__ */ React.createElement("span", { className: "text-amber-300/90 leading-relaxed" }, "AI-generated links are evidence-based leads requiring investigator verification. IntelliTrack provides probabilistic link intelligence to assist analytical commanders; it does not constitute judicial determination of guilt."))), /* @__PURE__ */ React.createElement("div", { className: "bg-[#0D1B2A] border border-[#263B55] rounded-2xl p-6 shadow-xl relative overflow-hidden" }, /* @__PURE__ */ React.createElement("div", { className: "flex flex-col md:flex-row md:items-center justify-between gap-5 relative z-10" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-start gap-4" }, /* @__PURE__ */ React.createElement("div", { className: "w-16 h-16 rounded-xl bg-[#101F33] border-2 border-[#2563EB] flex items-center justify-center text-[#06B6D4] shrink-0 shadow-lg" }, /* @__PURE__ */ React.createElement(Users, { className: "w-8 h-8" })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "flex flex-wrap items-center gap-2 mb-1.5 font-mono text-xs" }, /* @__PURE__ */ React.createElement("span", { className: "px-2.5 py-0.5 rounded font-bold bg-blue-500/20 text-[#06B6D4] border border-blue-500/30 uppercase" }, "ENTITY PROFILE"), /* @__PURE__ */ React.createElement("span", { className: "px-2.5 py-0.5 rounded font-semibold bg-[#101F33] text-slate-300 border border-[#263B55]" }, "Type: ", entity.entityType), /* @__PURE__ */ React.createElement("span", { className: "px-2.5 py-0.5 rounded font-semibold bg-amber-500/10 text-amber-300 border border-amber-500/30" }, entity.status)), /* @__PURE__ */ React.createElement("h1", { className: "text-2xl sm:text-3xl font-extrabold text-white tracking-tight" }, entity.name), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 text-xs font-mono text-[#94A3B8] mt-1" }, /* @__PURE__ */ React.createElement("span", null, "Confidence:"), /* @__PURE__ */ React.createElement("span", { className: "text-[#10B981] font-bold text-sm" }, entity.confidence, "% MATCH"), /* @__PURE__ */ React.createElement("span", null, "\u2022"), /* @__PURE__ */ React.createElement("span", null, "ID: ", entity.id.toUpperCase()), /* @__PURE__ */ React.createElement("span", null, "\u2022"), /* @__PURE__ */ React.createElement("span", null, "Active Docket: CASE #IT-2024-884")))), /* @__PURE__ */ React.createElement("div", { className: "flex flex-wrap items-center gap-2.5 font-mono text-xs" }, /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => navigate("/network"),
      className: "px-4 py-2.5 rounded-lg bg-[#2563EB] hover:bg-blue-600 text-white font-bold flex items-center gap-2 shadow-md transition-colors cursor-pointer"
    },
    /* @__PURE__ */ React.createElement(Share2, { className: "w-4 h-4" }),
    /* @__PURE__ */ React.createElement("span", null, "Explore in Network Graph")
  ), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => navigate("/geo"),
      className: "px-3.5 py-2.5 rounded-lg bg-[#101F33] hover:bg-[#12243A] border border-[#263B55] text-slate-200 transition-colors flex items-center gap-2 cursor-pointer"
    },
    /* @__PURE__ */ React.createElement(MapPin, { className: "w-4 h-4 text-emerald-400" }),
    /* @__PURE__ */ React.createElement("span", null, "Surveillance Map")
  ))), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 border-t border-[#263B55] mt-6 pt-4 font-mono text-xs" }, /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => setActiveTab("identity"),
      className: `px-4 py-2 rounded-lg transition-colors font-semibold flex items-center gap-2 cursor-pointer ${activeTab === "identity" ? "bg-[#101F33] text-white border border-[#2563EB]" : "text-[#94A3B8] hover:text-white hover:bg-[#101F33]"}`
    },
    /* @__PURE__ */ React.createElement(Users, { className: "w-3.5 h-3.5 text-cyan-400" }),
    /* @__PURE__ */ React.createElement("span", null, "Identity Information")
  ), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => setActiveTab("relationships"),
      className: `px-4 py-2 rounded-lg transition-colors font-semibold flex items-center gap-2 cursor-pointer ${activeTab === "relationships" ? "bg-[#101F33] text-white border border-[#2563EB]" : "text-[#94A3B8] hover:text-white hover:bg-[#101F33]"}`
    },
    /* @__PURE__ */ React.createElement(Share2, { className: "w-3.5 h-3.5 text-blue-400" }),
    /* @__PURE__ */ React.createElement("span", null, "Relationships (", entity.relationships.length, ")")
  ), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => setActiveTab("evidence"),
      className: `px-4 py-2 rounded-lg transition-colors font-semibold flex items-center gap-2 cursor-pointer ${activeTab === "evidence" ? "bg-[#101F33] text-white border border-[#2563EB]" : "text-[#94A3B8] hover:text-white hover:bg-[#101F33]"}`
    },
    /* @__PURE__ */ React.createElement(FileText, { className: "w-3.5 h-3.5 text-emerald-400" }),
    /* @__PURE__ */ React.createElement("span", null, "Evidence Records (", entity.evidence.length, ")")
  ))), activeTab === "identity" && /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-5" }, /* @__PURE__ */ React.createElement("div", { className: "bg-[#101F33] border border-[#263B55] rounded-xl p-5 shadow-lg space-y-3" }, /* @__PURE__ */ React.createElement("h3", { className: "text-sm font-bold text-white font-mono uppercase tracking-wider flex items-center gap-2" }, /* @__PURE__ */ React.createElement(Users, { className: "w-4 h-4 text-cyan-400" }), /* @__PURE__ */ React.createElement("span", null, "Known Names / Aliases")), /* @__PURE__ */ React.createElement("div", { className: "flex flex-wrap gap-2 pt-1 font-mono text-xs" }, entity.identityInfo.knownAliases.map((alias, idx) => /* @__PURE__ */ React.createElement(
    "span",
    {
      key: idx,
      className: "px-3 py-1.5 rounded-lg bg-[#07111F] border border-[#263B55] text-slate-200 font-semibold"
    },
    alias
  ))), /* @__PURE__ */ React.createElement("div", { className: "text-[11px] text-[#94A3B8] font-mono pt-2 border-t border-[#263B55]/50" }, "Resolved through telecom CDR subscribers, witness statements, and corporate filings.")), /* @__PURE__ */ React.createElement("div", { className: "bg-[#101F33] border border-[#263B55] rounded-xl p-5 shadow-lg space-y-3" }, /* @__PURE__ */ React.createElement("h3", { className: "text-sm font-bold text-white font-mono uppercase tracking-wider flex items-center gap-2" }, /* @__PURE__ */ React.createElement(Phone, { className: "w-4 h-4 text-[#06B6D4]" }), /* @__PURE__ */ React.createElement("span", null, "Phone Numbers & Handsets")), /* @__PURE__ */ React.createElement("div", { className: "space-y-2 font-mono text-xs" }, entity.identityInfo.phoneNumbers.map((ph, idx) => /* @__PURE__ */ React.createElement(
    "div",
    {
      key: idx,
      className: "p-3 rounded-lg bg-[#07111F] border border-[#263B55] flex items-center justify-between"
    },
    /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "text-white font-bold" }, ph.number), /* @__PURE__ */ React.createElement("div", { className: "text-[10px] text-[#94A3B8] mt-0.5" }, "IMEI: ", ph.imei, " \u2022 ", ph.type)),
    /* @__PURE__ */ React.createElement(
      "span",
      {
        className: `text-[10px] px-2 py-0.5 rounded font-bold ${ph.status === "Active" ? "bg-emerald-500/20 text-[#10B981] border border-emerald-500/30" : "bg-slate-800 text-slate-400"}`
      },
      ph.status
    )
  )))), /* @__PURE__ */ React.createElement("div", { className: "bg-[#101F33] border border-[#263B55] rounded-xl p-5 shadow-lg space-y-3" }, /* @__PURE__ */ React.createElement("h3", { className: "text-sm font-bold text-white font-mono uppercase tracking-wider flex items-center gap-2" }, /* @__PURE__ */ React.createElement(MapPin, { className: "w-4 h-4 text-amber-400" }), /* @__PURE__ */ React.createElement("span", null, "Locations & Associated Sites")), /* @__PURE__ */ React.createElement("div", { className: "space-y-2 font-mono text-xs" }, entity.identityInfo.locations.map((loc, idx) => /* @__PURE__ */ React.createElement(
    "div",
    {
      key: idx,
      className: "p-3 rounded-lg bg-[#07111F] border border-[#263B55] space-y-1"
    },
    /* @__PURE__ */ React.createElement("div", { className: "text-white font-semibold flex items-center justify-between" }, /* @__PURE__ */ React.createElement("span", null, loc.address), /* @__PURE__ */ React.createElement("span", { className: "text-[10px] text-[#06B6D4]" }, loc.role)),
    /* @__PURE__ */ React.createElement("div", { className: "text-[10px] text-[#94A3B8]" }, "Last Sighting: ", loc.lastSeen)
  )))), /* @__PURE__ */ React.createElement("div", { className: "space-y-5" }, /* @__PURE__ */ React.createElement("div", { className: "bg-[#101F33] border border-[#263B55] rounded-xl p-5 shadow-lg space-y-3" }, /* @__PURE__ */ React.createElement("h3", { className: "text-sm font-bold text-white font-mono uppercase tracking-wider flex items-center gap-2" }, /* @__PURE__ */ React.createElement(Car, { className: "w-4 h-4 text-emerald-400" }), /* @__PURE__ */ React.createElement("span", null, "Vehicles")), /* @__PURE__ */ React.createElement("div", { className: "space-y-2 font-mono text-xs" }, entity.identityInfo.vehicles.map((v, idx) => /* @__PURE__ */ React.createElement(
    "div",
    {
      key: idx,
      className: "p-3 rounded-lg bg-[#07111F] border border-[#263B55] flex items-center justify-between"
    },
    /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "text-white font-bold" }, v.plate), /* @__PURE__ */ React.createElement("div", { className: "text-[10px] text-[#94A3B8]" }, v.model)),
    /* @__PURE__ */ React.createElement("span", { className: "text-[10px] px-2 py-0.5 rounded bg-blue-500/20 text-[#06B6D4] border border-blue-500/30" }, v.tag)
  )))), /* @__PURE__ */ React.createElement("div", { className: "bg-[#101F33] border border-[#263B55] rounded-xl p-5 shadow-lg space-y-3" }, /* @__PURE__ */ React.createElement("h3", { className: "text-sm font-bold text-white font-mono uppercase tracking-wider flex items-center gap-2" }, /* @__PURE__ */ React.createElement(Building, { className: "w-4 h-4 text-purple-400" }), /* @__PURE__ */ React.createElement("span", null, "Organizations & Corporate Fronts")), /* @__PURE__ */ React.createElement("div", { className: "space-y-2 font-mono text-xs" }, entity.identityInfo.organizations.map((org, idx) => /* @__PURE__ */ React.createElement(
    "div",
    {
      key: idx,
      className: "p-3 rounded-lg bg-[#07111F] border border-[#263B55] flex items-center justify-between"
    },
    /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "text-white font-bold" }, org.name), /* @__PURE__ */ React.createElement("div", { className: "text-[10px] text-[#94A3B8]" }, org.role)),
    /* @__PURE__ */ React.createElement("span", { className: "text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-[#F59E0B] border border-amber-500/30" }, org.status)
  )))))), activeTab === "relationships" && /* @__PURE__ */ React.createElement("div", { className: "bg-[#101F33] border border-[#263B55] rounded-xl p-5 shadow-lg space-y-4" }, /* @__PURE__ */ React.createElement("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#263B55] pb-3" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h3", { className: "text-sm font-bold text-white font-mono uppercase tracking-wider" }, "Graph Relationships (", entity.relationships.length, " Active Links)"), /* @__PURE__ */ React.createElement("p", { className: "text-xs text-[#94A3B8]" }, "People, organizations, transactions, locations, and cases connected to ", entity.name)), /* @__PURE__ */ React.createElement("span", { className: "text-xs font-mono text-[#06B6D4]" }, "Multi-Hop Link Centrality: 0.89")), /* @__PURE__ */ React.createElement("div", { className: "overflow-x-auto" }, /* @__PURE__ */ React.createElement("table", { className: "w-full text-left text-xs font-mono" }, /* @__PURE__ */ React.createElement("thead", { className: "bg-[#07111F] text-[#94A3B8] border-b border-[#263B55]" }, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("th", { className: "p-3" }, "Connected Entity"), /* @__PURE__ */ React.createElement("th", { className: "p-3" }, "Entity Type"), /* @__PURE__ */ React.createElement("th", { className: "p-3" }, "Relationship Type"), /* @__PURE__ */ React.createElement("th", { className: "p-3" }, "Confidence"), /* @__PURE__ */ React.createElement("th", { className: "p-3" }, "Investigation Status"), /* @__PURE__ */ React.createElement("th", { className: "p-3 text-right" }, "Actions"))), /* @__PURE__ */ React.createElement("tbody", { className: "divide-y divide-[#263B55] bg-[#0D1B2A]" }, entity.relationships.map((rel, idx) => /* @__PURE__ */ React.createElement("tr", { key: idx, className: "hover:bg-[#12243A] transition-colors" }, /* @__PURE__ */ React.createElement("td", { className: "p-3 text-white font-bold" }, rel.targetName), /* @__PURE__ */ React.createElement("td", { className: "p-3" }, /* @__PURE__ */ React.createElement("span", { className: "text-[10px] px-2 py-0.5 rounded bg-[#07111F] text-[#94A3B8] border border-[#263B55]" }, rel.targetType)), /* @__PURE__ */ React.createElement("td", { className: "p-3 text-[#06B6D4] font-semibold" }, rel.relationshipType), /* @__PURE__ */ React.createElement("td", { className: "p-3 text-white font-bold" }, rel.confidence, "%"), /* @__PURE__ */ React.createElement("td", { className: "p-3" }, /* @__PURE__ */ React.createElement(
    "span",
    {
      className: `text-[10px] px-2 py-0.5 rounded font-bold ${rel.status === "VERIFIED" ? "bg-emerald-500/20 text-[#10B981] border border-emerald-500/30" : rel.status === "SUSPICIOUS" ? "bg-red-500/20 text-[#EF4444] border border-red-500/30" : "bg-amber-500/20 text-[#F59E0B] border border-amber-500/30"}`
    },
    rel.status
  )), /* @__PURE__ */ React.createElement("td", { className: "p-3 text-right" }, /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => navigate("/network"),
      className: "text-[11px] text-[#2563EB] hover:text-[#06B6D4] font-semibold inline-flex items-center gap-1 cursor-pointer"
    },
    /* @__PURE__ */ React.createElement("span", null, "Focus"),
    /* @__PURE__ */ React.createElement(ChevronRight, { className: "w-3 h-3" })
  )))))))), activeTab === "evidence" && /* @__PURE__ */ React.createElement("div", { className: "bg-[#101F33] border border-[#263B55] rounded-xl p-5 shadow-lg space-y-4" }, /* @__PURE__ */ React.createElement("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#263B55] pb-3" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h3", { className: "text-sm font-bold text-white font-mono uppercase tracking-wider" }, "Evidentiary Source Records & Proofs"), /* @__PURE__ */ React.createElement("p", { className: "text-xs text-[#94A3B8]" }, "Underlying forensic records anchoring identity linkages")), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 font-mono text-xs" }, /* @__PURE__ */ React.createElement("span", { className: "text-[#94A3B8] text-[10px]" }, "CONFIDENCE FILTER:"), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => setEvidenceFilter("ALL"),
      className: `px-2.5 py-1 rounded cursor-pointer ${evidenceFilter === "ALL" ? "bg-[#2563EB] text-white" : "bg-[#07111F] text-slate-400 hover:text-white"}`
    },
    "All"
  ), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => setEvidenceFilter("GREEN"),
      className: `px-2.5 py-1 rounded cursor-pointer flex items-center gap-1 ${evidenceFilter === "GREEN" ? "bg-emerald-500/20 text-[#10B981] border border-emerald-500/30 font-bold" : "bg-[#07111F] text-slate-400"}`
    },
    /* @__PURE__ */ React.createElement("span", { className: "w-2 h-2 rounded-full bg-[#10B981]" }),
    "High"
  ), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => setEvidenceFilter("AMBER"),
      className: `px-2.5 py-1 rounded cursor-pointer flex items-center gap-1 ${evidenceFilter === "AMBER" ? "bg-amber-500/20 text-[#F59E0B] border border-amber-500/30 font-bold" : "bg-[#07111F] text-slate-400"}`
    },
    /* @__PURE__ */ React.createElement("span", { className: "w-2 h-2 rounded-full bg-[#F59E0B]" }),
    "Review"
  ), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => setEvidenceFilter("RED"),
      className: `px-2.5 py-1 rounded cursor-pointer flex items-center gap-1 ${evidenceFilter === "RED" ? "bg-red-500/20 text-[#EF4444] border border-red-500/30 font-bold" : "bg-[#07111F] text-slate-400"}`
    },
    /* @__PURE__ */ React.createElement("span", { className: "w-2 h-2 rounded-full bg-[#EF4444]" }),
    "Low/Risk"
  ))), /* @__PURE__ */ React.createElement("div", { className: "space-y-3 font-mono text-xs" }, filteredEvidence.map((ev) => /* @__PURE__ */ React.createElement(
    "div",
    {
      key: ev.id,
      className: "p-4 rounded-xl bg-[#0D1B2A] border border-[#263B55] hover:border-[#2563EB] transition-all space-y-2"
    },
    /* @__PURE__ */ React.createElement("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-2" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React.createElement(FileText, { className: "w-4 h-4 text-cyan-400 shrink-0" }), /* @__PURE__ */ React.createElement("span", { className: "text-white font-bold text-sm" }, ev.sourceRecord)), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React.createElement("span", { className: "text-[#94A3B8]" }, ev.date), /* @__PURE__ */ React.createElement(
      "span",
      {
        className: `px-2.5 py-0.5 rounded text-[10px] font-extrabold border ${ev.badgeStatus === "GREEN" ? "bg-emerald-500/20 text-[#10B981] border-emerald-500/40" : ev.badgeStatus === "AMBER" ? "bg-amber-500/20 text-[#F59E0B] border-amber-500/40" : "bg-red-500/20 text-[#EF4444] border-red-500/40"}`
      },
      ev.confidence,
      "% CONFIDENCE (",
      ev.badgeStatus === "GREEN" ? "HIGH" : ev.badgeStatus === "AMBER" ? "REQUIRES REVIEW" : "LOW / RISK",
      ")"
    ))),
    /* @__PURE__ */ React.createElement("div", { className: "text-slate-200" }, /* @__PURE__ */ React.createElement("span", { className: "text-[#94A3B8]" }, "Relationship Type: "), /* @__PURE__ */ React.createElement("span", { className: "text-[#06B6D4] font-semibold" }, ev.relationshipType)),
    /* @__PURE__ */ React.createElement("div", { className: "text-[11px] text-[#94A3B8] bg-[#07111F] p-2.5 rounded-lg border border-[#263B55]" }, ev.notes)
  ))), /* @__PURE__ */ React.createElement("div", { className: "pt-3 border-t border-[#263B55] flex justify-between items-center text-xs font-mono" }, /* @__PURE__ */ React.createElement("span", { className: "text-[#94A3B8]" }, "Evidence items anchored by cryptographic SHA-256 integrity proofs."), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => navigate("/evidence"),
      className: "text-[#06B6D4] hover:underline font-semibold"
    },
    "Drill down in Evidence Traceability View \u2192"
  ))));
};
var stdin_default = EntityProfilePage;
export {
  EntityProfilePage,
  stdin_default as default
};
