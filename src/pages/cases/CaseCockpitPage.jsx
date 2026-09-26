import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Briefcase,
  Users,
  Share2,
  MapPin,
  Clock,
  Flame,
  Database,
  Sliders,
  Lock,
  Download
} from "lucide-react";
import { useActiveCase, ACTIVE_CASES_ROSTER } from "@/context/CaseContext";
const CaseCockpitPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { activeCase, setActiveCaseId } = useActiveCase();
  const [activeTab, setActiveTab] = useState("overview");
  const caseData = ACTIVE_CASES_ROSTER.find((c) => c.id === id) || activeCase;
  return /* @__PURE__ */ React.createElement("div", { className: "space-y-6 max-w-7xl mx-auto font-sans pb-12" }, /* @__PURE__ */ React.createElement("div", { className: "bg-[#1c140d] border border-amber-900/40 rounded-2xl p-6 shadow-xl relative overflow-hidden" }, /* @__PURE__ */ React.createElement("div", { className: "absolute top-0 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" }), /* @__PURE__ */ React.createElement("div", { className: "flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 mb-2 font-mono text-[11px]" }, /* @__PURE__ */ React.createElement("span", { className: "px-2.5 py-0.5 rounded-md bg-amber-950 text-amber-300 font-bold border border-amber-700/60 shadow-xs" }, caseData.caseNumber), /* @__PURE__ */ React.createElement("span", { className: "px-2 py-0.5 rounded-md bg-rose-500/20 text-rose-400 font-semibold border border-rose-500/30" }, caseData.priority, " PRIORITY"), caseData.grandJuryProtected && /* @__PURE__ */ React.createElement("span", { className: "px-2 py-0.5 rounded-md bg-amber-950/80 border border-amber-600/50 text-amber-300 font-mono font-semibold flex items-center gap-1" }, /* @__PURE__ */ React.createElement(Lock, { className: "w-3 h-3 text-amber-400" }), " FED. R. CRIM. P. 6(e) SEALED")), /* @__PURE__ */ React.createElement("h1", { className: "text-xl sm:text-2xl font-bold text-white tracking-tight" }, caseData.title), /* @__PURE__ */ React.createElement("p", { className: "text-xs text-amber-200/70 mt-1 font-mono" }, "Lead Investigator: ", /* @__PURE__ */ React.createElement("strong", { className: "text-amber-100" }, caseData.leadInvestigator), " (Badge #", caseData.badgeNumber, ") \u2022 Classification: ", caseData.classification)), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2.5 shrink-0" }, /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => navigate("/intelligence/summary"),
      className: "px-3.5 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-mono text-xs font-semibold flex items-center gap-2 shadow-lg shadow-amber-600/30 transition-all"
    },
    /* @__PURE__ */ React.createElement(Download, { className: "w-3.5 h-3.5" }),
    /* @__PURE__ */ React.createElement("span", null, "Export Dossier")
  ), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => navigate("/network"),
      className: "px-3.5 py-2 rounded-xl bg-[#241a12] hover:bg-[#2d2117] border border-amber-900/50 text-amber-300 font-mono text-xs font-medium flex items-center gap-2 transition-all"
    },
    /* @__PURE__ */ React.createElement(Share2, { className: "w-3.5 h-3.5 text-amber-400" }),
    /* @__PURE__ */ React.createElement("span", null, "Inspect Graph")
  ))), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-1.5 overflow-x-auto border-t border-amber-900/30 mt-5 pt-3 font-mono text-xs" }, [
    { key: "overview", label: "Overview", icon: /* @__PURE__ */ React.createElement(Briefcase, { className: "w-3.5 h-3.5" }) },
    { key: "data", label: "Data Feeds (7)", icon: /* @__PURE__ */ React.createElement(Database, { className: "w-3.5 h-3.5" }) },
    { key: "entities", label: "Entities (48)", icon: /* @__PURE__ */ React.createElement(Users, { className: "w-3.5 h-3.5" }) },
    { key: "network", label: "Network Graph", icon: /* @__PURE__ */ React.createElement(Share2, { className: "w-3.5 h-3.5" }) },
    { key: "geo", label: "Geo Surveillance", icon: /* @__PURE__ */ React.createElement(MapPin, { className: "w-3.5 h-3.5" }) },
    { key: "timeline", label: "Event Timeline", icon: /* @__PURE__ */ React.createElement(Clock, { className: "w-3.5 h-3.5" }) },
    { key: "leads", label: "Leads (12)", icon: /* @__PURE__ */ React.createElement(Flame, { className: "w-3.5 h-3.5 text-rose-400" }) },
    { key: "settings", label: "Docket Settings", icon: /* @__PURE__ */ React.createElement(Sliders, { className: "w-3.5 h-3.5" }) }
  ].map((tab) => /* @__PURE__ */ React.createElement(
    "button",
    {
      key: tab.key,
      onClick: () => setActiveTab(tab.key),
      className: `px-3 py-1.5 rounded-lg flex items-center gap-1.5 font-semibold whitespace-nowrap transition-colors ${activeTab === tab.key ? "bg-amber-600/30 text-amber-300 border border-amber-500/50 shadow-xs" : "text-amber-200/60 hover:text-amber-100 hover:bg-[#241a12]"}`
    },
    tab.icon,
    /* @__PURE__ */ React.createElement("span", null, tab.label)
  )))), activeTab === "overview" && /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6" }, /* @__PURE__ */ React.createElement("div", { className: "lg:col-span-2 space-y-4" }, /* @__PURE__ */ React.createElement("div", { className: "bg-[#1c140d] border border-amber-900/30 rounded-xl p-5 space-y-3 shadow-md" }, /* @__PURE__ */ React.createElement("h2", { className: "text-sm font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2" }, /* @__PURE__ */ React.createElement("span", { className: "w-2 h-2 rounded-full bg-amber-400" }), "Executive Case Synopsis & Jurisdictional Bounds"), /* @__PURE__ */ React.createElement("p", { className: "text-xs text-amber-100/80 leading-relaxed font-sans" }, "Ongoing federal task force investigation targeting a transnational Hawala money laundering network operating in conjunction with clandestine maritime narcotics smuggling. Primary syndicates coordinate logistics via encrypted VoIP and disposable burner telephony rotated across 72-hour intervals."), /* @__PURE__ */ React.createElement("div", { className: "p-3.5 bg-[#120d08] rounded-lg border border-amber-900/40 font-mono text-xs space-y-1 text-amber-300/80" }, /* @__PURE__ */ React.createElement("div", null, "STATUTORY AUTHORITY: 18 U.S.C. \xA7 1956, 18 U.S.C. \xA7 1962 (RICO ACT)"), /* @__PURE__ */ React.createElement("div", null, "VENUE: United States District Court for the Southern District of New York"), /* @__PURE__ */ React.createElement("div", null, "EVIDENTIARY VAULT: 100% SHA-256 Anchored (FRE 902(14))"))), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-2 gap-4" }, /* @__PURE__ */ React.createElement(
    "div",
    {
      onClick: () => navigate("/network"),
      className: "p-4 rounded-xl bg-[#1c140d] border border-amber-900/30 hover:border-amber-500/60 cursor-pointer transition-all shadow-md group"
    },
    /* @__PURE__ */ React.createElement("div", { className: "text-xs font-mono text-amber-400 font-semibold mb-1 group-hover:text-amber-300" }, "SYNDICATE NETWORK"),
    /* @__PURE__ */ React.createElement("div", { className: "text-2xl font-bold text-white font-mono" }, caseData.relationshipsCount, " Links"),
    /* @__PURE__ */ React.createElement("div", { className: "text-[11px] text-amber-200/60 mt-1" }, "14 core nodes isolated with Betweenness centrality > 0.70")
  ), /* @__PURE__ */ React.createElement(
    "div",
    {
      onClick: () => navigate("/geo"),
      className: "p-4 rounded-xl bg-[#1c140d] border border-amber-900/30 hover:border-amber-500/60 cursor-pointer transition-all shadow-md group"
    },
    /* @__PURE__ */ React.createElement("div", { className: "text-xs font-mono text-rose-400 font-semibold mb-1 group-hover:text-rose-300" }, "GEO SURVEILLANCE"),
    /* @__PURE__ */ React.createElement("div", { className: "text-2xl font-bold text-white font-mono" }, "3 Hotspots"),
    /* @__PURE__ */ React.createElement("div", { className: "text-[11px] text-amber-200/60 mt-1" }, "Pier 42, Safehouse 4, Industrial Logistics Terminal B")
  ))), /* @__PURE__ */ React.createElement("div", { className: "space-y-4" }, /* @__PURE__ */ React.createElement("div", { className: "bg-[#1c140d] border border-amber-900/30 rounded-xl p-4 font-mono text-xs space-y-3 shadow-md" }, /* @__PURE__ */ React.createElement("div", { className: "text-[11px] uppercase tracking-wider text-amber-400 font-bold border-b border-amber-900/30 pb-2" }, "Chain of Custody Ledger"), /* @__PURE__ */ React.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ React.createElement("div", { className: "p-2.5 rounded-lg bg-[#120d08] border border-amber-900/40 text-[11px]" }, /* @__PURE__ */ React.createElement("div", { className: "text-amber-300 font-semibold" }, "FRE-902-14 Sealed Bundle"), /* @__PURE__ */ React.createElement("div", { className: "text-amber-400/60 text-[10px] mt-0.5" }, "SHA-256: 7f83b165...94c0"), /* @__PURE__ */ React.createElement("div", { className: "text-emerald-400 text-[9px] mt-0.5" }, "VERIFIED IN TACTICAL REPOSITORY")), /* @__PURE__ */ React.createElement("div", { className: "p-2.5 rounded-lg bg-[#120d08] border border-amber-900/40 text-[11px]" }, /* @__PURE__ */ React.createElement("div", { className: "text-amber-300 font-semibold" }, "Title III Wiretap Authorization"), /* @__PURE__ */ React.createElement("div", { className: "text-amber-400/60 text-[10px] mt-0.5" }, "DOCKET: WT-2026-0814"), /* @__PURE__ */ React.createElement("div", { className: "text-amber-400 text-[9px] mt-0.5" }, "ACTIVE TAP EXPIRES IN 14 DAYS")))))), activeTab === "data" && /* @__PURE__ */ React.createElement("div", { className: "bg-navy-900 border border-navy-800 rounded-lg p-5" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between mb-4" }, /* @__PURE__ */ React.createElement("h2", { className: "text-sm font-bold text-white font-mono uppercase" }, "Connected Case Feeds & Telemetry"), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => navigate("/data/sources"),
      className: "px-3 py-1.5 rounded bg-steel-600 hover:bg-steel-500 text-white font-mono text-xs font-semibold"
    },
    "Add New Source Feed"
  )), /* @__PURE__ */ React.createElement("div", { className: "space-y-2 font-mono text-xs" }, ["CAD 911 Dispatch Feeds", "CDR Cellular Tower Dump (T-Mobile/AT&T)", "FinCEN SAR Transaction Ledger", "Port Authority ALPR Scans", "Latent Biometric Fingerprint Registry"].map((feed, i) => /* @__PURE__ */ React.createElement("div", { key: i, className: "p-3 rounded bg-navy-950 border border-navy-800 flex items-center justify-between" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "text-slate-200 font-semibold" }, feed), /* @__PURE__ */ React.createElement("div", { className: "text-[10px] text-slate-500" }, "INGESTED VIA CJIS SECURE CONNECTOR \u2022 100% PARSED")), /* @__PURE__ */ React.createElement("span", { className: "px-2 py-0.5 rounded bg-threat-low/20 text-threat-low font-bold text-[10px]" }, "ACTIVE"))))), activeTab === "entities" && /* @__PURE__ */ React.createElement("div", { className: "bg-navy-900 border border-navy-800 rounded-lg p-5" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between mb-4" }, /* @__PURE__ */ React.createElement("h2", { className: "text-sm font-bold text-white font-mono uppercase" }, "Linked Entities & Suspects (", caseData.entitiesCount, ")"), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => navigate("/entities"),
      className: "px-3 py-1.5 rounded bg-steel-600 hover:bg-steel-500 text-white font-mono text-xs font-semibold"
    },
    "Open Full Entities Registry"
  )), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 font-mono text-xs" }, [
    { name: "Viktor K. Sokolov", type: "POI (PRIMARY TARGET)", score: 94, threat: "CRITICAL" },
    { name: 'Dmitri "The Anchor" Volkov', type: "POI (LOGISTICS)", score: 88, threat: "HIGH" },
    { name: "+1 (555) 019-8821", type: "BURNER TELEPHONY", score: 92, threat: "CRITICAL" },
    { name: "Black Audi A8 [NY: TRK-9902]", type: "TARGET VEHICLE", score: 85, threat: "HIGH" },
    { name: "Safehouse 04 (Pier 42)", type: "SUSPECT LOCATION", score: 91, threat: "CRITICAL" },
    { name: "Astraea Trading Corp (Cyprus)", type: "SHELL CORPORATION", score: 79, threat: "MEDIUM" }
  ].map((ent, i) => /* @__PURE__ */ React.createElement("div", { key: i, className: "p-3 rounded bg-navy-950 border border-navy-800 space-y-1" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between text-[10px]" }, /* @__PURE__ */ React.createElement("span", { className: "text-steel-400 font-semibold" }, ent.type), /* @__PURE__ */ React.createElement("span", { className: "text-threat-critical font-bold" }, ent.threat)), /* @__PURE__ */ React.createElement("div", { className: "text-slate-100 font-bold text-sm truncate" }, ent.name), /* @__PURE__ */ React.createElement("div", { className: "text-[10px] text-slate-500" }, "CONFIDENCE: ", ent.score, "% \u2022 LINKED"))))), activeTab === "network" && /* @__PURE__ */ React.createElement("div", { className: "bg-navy-900 border border-navy-800 rounded-lg p-6 text-center space-y-4" }, /* @__PURE__ */ React.createElement(Share2, { className: "w-12 h-12 text-steel-400 mx-auto" }), /* @__PURE__ */ React.createElement("h2", { className: "text-base font-bold text-white font-mono" }, "ForceAtlas2 Syndicate Link Graph Loaded"), /* @__PURE__ */ React.createElement("p", { className: "text-xs text-slate-400 max-w-md mx-auto" }, caseData.relationshipsCount, " validated relationship edges discovered across telephone intercepts, financial wire transactions, and shared safehouse premises."), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => navigate("/network"),
      className: "px-4 py-2 rounded bg-steel-600 hover:bg-steel-500 text-white font-mono text-xs font-semibold shadow-md inline-flex items-center gap-2"
    },
    /* @__PURE__ */ React.createElement(Share2, { className: "w-4 h-4" }),
    /* @__PURE__ */ React.createElement("span", null, "Launch Interactive Network Graph")
  )), activeTab === "geo" && /* @__PURE__ */ React.createElement("div", { className: "bg-navy-900 border border-navy-800 rounded-lg p-6 text-center space-y-4" }, /* @__PURE__ */ React.createElement(MapPin, { className: "w-12 h-12 text-threat-critical mx-auto" }), /* @__PURE__ */ React.createElement("h2", { className: "text-base font-bold text-white font-mono" }, "Geo-Temporal Surveillance & Cell Tower Triangulation"), /* @__PURE__ */ React.createElement("p", { className: "text-xs text-slate-400 max-w-md mx-auto" }, "Interactive GIS layers with cellular tower sector antennas, ALPR scans, and 24-hour timeline scrubber."), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => navigate("/geo"),
      className: "px-4 py-2 rounded bg-steel-600 hover:bg-steel-500 text-white font-mono text-xs font-semibold shadow-md inline-flex items-center gap-2"
    },
    /* @__PURE__ */ React.createElement(MapPin, { className: "w-4 h-4" }),
    /* @__PURE__ */ React.createElement("span", null, "Open Surveillance Map")
  )), activeTab === "timeline" && /* @__PURE__ */ React.createElement("div", { className: "bg-navy-900 border border-navy-800 rounded-lg p-6 text-center space-y-4" }, /* @__PURE__ */ React.createElement(Clock, { className: "w-12 h-12 text-steel-400 mx-auto" }), /* @__PURE__ */ React.createElement("h2", { className: "text-base font-bold text-white font-mono" }, "Multi-Track Chronological Event Stream"), /* @__PURE__ */ React.createElement("p", { className: "text-xs text-slate-400 max-w-md mx-auto" }, "Correlated multi-entity timeline of calls, financial transfers, meetings, and ALPR sightings with brush-zoom controls."), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => navigate("/timeline"),
      className: "px-4 py-2 rounded bg-steel-600 hover:bg-steel-500 text-white font-mono text-xs font-semibold shadow-md inline-flex items-center gap-2"
    },
    /* @__PURE__ */ React.createElement(Clock, { className: "w-4 h-4" }),
    /* @__PURE__ */ React.createElement("span", null, "Open Event Timeline")
  )), activeTab === "leads" && /* @__PURE__ */ React.createElement("div", { className: "bg-navy-900 border border-navy-800 rounded-lg p-6 text-center space-y-4" }, /* @__PURE__ */ React.createElement(Flame, { className: "w-12 h-12 text-threat-critical mx-auto" }), /* @__PURE__ */ React.createElement("h2", { className: "text-base font-bold text-white font-mono" }, "Explainable AI Lead Prioritization Matrix"), /* @__PURE__ */ React.createElement("p", { className: "text-xs text-slate-400 max-w-md mx-auto" }, caseData.activeLeadsCount, " active leads scored by machine models across source reliability, wiretap corroboration, and graph centrality signals."), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => navigate("/leads"),
      className: "px-4 py-2 rounded bg-threat-critical hover:bg-red-600 text-white font-mono text-xs font-semibold shadow-md inline-flex items-center gap-2"
    },
    /* @__PURE__ */ React.createElement(Flame, { className: "w-4 h-4" }),
    /* @__PURE__ */ React.createElement("span", null, "Review Prioritized Leads")
  )), activeTab === "settings" && /* @__PURE__ */ React.createElement("div", { className: "bg-navy-900 border border-navy-800 rounded-lg p-5 font-mono text-xs space-y-4" }, /* @__PURE__ */ React.createElement("h2", { className: "text-sm font-bold text-white uppercase tracking-wider" }, "Docket Governance & Security Controls"), /* @__PURE__ */ React.createElement("div", { className: "space-y-3" }, /* @__PURE__ */ React.createElement("div", { className: "p-3 bg-navy-950 rounded border border-navy-800 flex items-center justify-between" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "text-slate-200 font-semibold" }, "Grand Jury Sealing Protection"), /* @__PURE__ */ React.createElement("div", { className: "text-[10px] text-slate-500" }, "FED. R. CRIM. P. 6(e) CRIMINAL CONTEMPT ENFORCEMENT")), /* @__PURE__ */ React.createElement("span", { className: "px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800 font-bold text-[10px]" }, "ENABLED")), /* @__PURE__ */ React.createElement("div", { className: "p-3 bg-navy-950 rounded border border-navy-800 flex items-center justify-between" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "text-slate-200 font-semibold" }, "Cryptographic Hardware Key Requirement"), /* @__PURE__ */ React.createElement("div", { className: "text-[10px] text-slate-500" }, "FIPS-140-3 LEVEL 2 PIV CARD ENFORCEMENT")), /* @__PURE__ */ React.createElement("span", { className: "px-2 py-0.5 rounded bg-threat-low/20 text-threat-low font-bold text-[10px]" }, "ENFORCED")))));
};
var stdin_default = CaseCockpitPage;
export {
  CaseCockpitPage,
  stdin_default as default
};
