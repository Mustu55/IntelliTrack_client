import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Users2,
  Search,
  ChevronRight,
  ShieldAlert,
  Phone,
  Car,
  Building,
  MapPin,
  GitBranch,
  Sparkles
} from "lucide-react";
import { useActiveCase } from "@/context/CaseContext";
const ENTITIES_MOCK_DATA = [
  {
    id: "poi-1",
    name: "Viktor Konstantin Sokolov",
    primaryAlias: "Sokol / The Courier",
    type: "PERSON",
    linkedIdentitiesCount: 4,
    confidenceScore: 94,
    lastSeen: "14:32 UTC (Pier 42 Dock)",
    threatTier: "CRITICAL",
    activeWarrants: 2
  },
  {
    id: "poi-2",
    name: 'Dmitri "The Anchor" Volkov',
    primaryAlias: "Dima / Volkov Logistics",
    type: "PERSON",
    linkedIdentitiesCount: 3,
    confidenceScore: 89,
    lastSeen: "Yesterday 21:10 UTC",
    threatTier: "HIGH",
    activeWarrants: 1
  },
  {
    id: "phn-1",
    name: "+1 (555) 019-8821",
    primaryAlias: "Burner SIM (T-Mobile VoLTE)",
    type: "PHONE",
    linkedIdentitiesCount: 2,
    confidenceScore: 92,
    lastSeen: "12 mins ago (Cell Tower 42)",
    threatTier: "CRITICAL",
    activeWarrants: 0
  },
  {
    id: "veh-1",
    name: "Black Audi A8 [NY: TRK-9902]",
    primaryAlias: "VIN: 1WAUDI4890123",
    type: "VEHICLE",
    linkedIdentitiesCount: 2,
    confidenceScore: 87,
    lastSeen: "14:28 UTC (Industrial Park)",
    threatTier: "HIGH",
    activeWarrants: 0
  },
  {
    id: "loc-1",
    name: "Pier 42 Maritime Facility",
    primaryAlias: "Commercial Loading Berth 4",
    type: "LOCATION",
    linkedIdentitiesCount: 5,
    confidenceScore: 95,
    lastSeen: "Active Surveillance",
    threatTier: "CRITICAL",
    activeWarrants: 1
  },
  {
    id: "org-1",
    name: "Astraea Trading Corp (Cyprus)",
    primaryAlias: "Astraea Logistics Ltd",
    type: "ORGANIZATION",
    linkedIdentitiesCount: 3,
    confidenceScore: 78,
    lastSeen: "Wire Transfer 3 days ago",
    threatTier: "MEDIUM",
    activeWarrants: 0
  },
  {
    id: "poi-3",
    name: 'Mikhail "Kozel" Kozlov',
    primaryAlias: "Misha / Kozel Tech",
    type: "PERSON",
    linkedIdentitiesCount: 2,
    confidenceScore: 83,
    lastSeen: "Oct 12 (Safehouse 04)",
    threatTier: "MEDIUM",
    activeWarrants: 0
  }
];
const EntitiesListPage = () => {
  const navigate = useNavigate();
  const { activeCase } = useActiveCase();
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("ALL");
  const [threatFilter, setThreatFilter] = useState("ALL");
  const filteredEntities = ENTITIES_MOCK_DATA.filter((ent) => {
    const matchesSearch = ent.name.toLowerCase().includes(search.toLowerCase()) || ent.primaryAlias.toLowerCase().includes(search.toLowerCase());
    const matchesType = typeFilter === "ALL" || ent.type === typeFilter;
    const matchesThreat = threatFilter === "ALL" || ent.threatTier === threatFilter;
    return matchesSearch && matchesType && matchesThreat;
  });
  const getEntityIcon = (type) => {
    switch (type) {
      case "PERSON":
        return /* @__PURE__ */ React.createElement(Users2, { className: "w-4 h-4 text-purple-400" });
      case "PHONE":
        return /* @__PURE__ */ React.createElement(Phone, { className: "w-4 h-4 text-cyan-400" });
      case "VEHICLE":
        return /* @__PURE__ */ React.createElement(Car, { className: "w-4 h-4 text-amber-400" });
      case "LOCATION":
        return /* @__PURE__ */ React.createElement(MapPin, { className: "w-4 h-4 text-rose-400" });
      case "ORGANIZATION":
        return /* @__PURE__ */ React.createElement(Building, { className: "w-4 h-4 text-indigo-400" });
    }
  };
  return /* @__PURE__ */ React.createElement("div", { className: "space-y-6 max-w-7xl mx-auto font-sans pb-16" }, /* @__PURE__ */ React.createElement("div", { className: "bg-[#181126] border border-[#2c1d47] rounded-xl p-6 shadow-xl shadow-purple-950/40 relative overflow-hidden" }, /* @__PURE__ */ React.createElement("div", { className: "absolute top-0 right-0 w-96 h-48 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" }), /* @__PURE__ */ React.createElement("div", { className: "flex flex-col lg:flex-row lg:items-center justify-between gap-5 relative z-10" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-purple-950/80 border border-purple-500/40 text-purple-300 font-mono text-[11px] uppercase tracking-wider mb-2" }, /* @__PURE__ */ React.createElement(Users2, { className: "w-3.5 h-3.5 text-purple-400" }), /* @__PURE__ */ React.createElement("span", null, "CENTRAL CRIMINAL INTELLIGENCE REGISTRY \u2022 ACTIVE SYNDICATES")), /* @__PURE__ */ React.createElement("h1", { className: "text-2xl sm:text-3xl font-bold text-white tracking-tight" }, "Entities & Target Profiles"), /* @__PURE__ */ React.createElement("p", { className: "text-xs sm:text-sm text-purple-200/70 mt-1 max-w-2xl leading-relaxed" }, "Unified cross-source entity directory resolving persons of interest, burner telephony, tactical conveyances, safehouses, and shell syndicates.")), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-3 self-start lg:self-auto" }, /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => navigate("/entity-resolution"),
      className: "px-4 py-2.5 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-mono text-xs font-bold shadow-lg shadow-purple-950/60 flex items-center gap-2 transition-all transform active:scale-95"
    },
    /* @__PURE__ */ React.createElement(GitBranch, { className: "w-3.5 h-3.5" }),
    /* @__PURE__ */ React.createElement("span", null, "Resolve 4 Match Candidates")
  )))), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4 font-mono" }, /* @__PURE__ */ React.createElement("div", { className: "bg-[#181126] border border-[#2c1d47] rounded-xl p-4 shadow-lg shadow-purple-950/20" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between text-[11px] text-purple-400 font-semibold mb-1" }, /* @__PURE__ */ React.createElement("span", null, "TOTAL TRACKED"), /* @__PURE__ */ React.createElement(Users2, { className: "w-3.5 h-3.5 text-purple-400" })), /* @__PURE__ */ React.createElement("div", { className: "text-2xl font-bold text-white tracking-tight" }, "1,420"), /* @__PURE__ */ React.createElement("div", { className: "text-[10px] text-purple-300/70 mt-1" }, "520 POIs \u2022 410 Telephony")), /* @__PURE__ */ React.createElement("div", { className: "bg-[#181126] border border-[#2c1d47] rounded-xl p-4 shadow-lg shadow-purple-950/20" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between text-[11px] text-rose-400 font-semibold mb-1" }, /* @__PURE__ */ React.createElement("span", null, "HIGH / CRITICAL"), /* @__PURE__ */ React.createElement(ShieldAlert, { className: "w-3.5 h-3.5 text-rose-400" })), /* @__PURE__ */ React.createElement("div", { className: "text-2xl font-bold text-rose-300 tracking-tight" }, "86 Targets"), /* @__PURE__ */ React.createElement("div", { className: "text-[10px] text-rose-300/70 mt-1" }, "28 active arrest warrants")), /* @__PURE__ */ React.createElement("div", { className: "bg-[#181126] border border-[#2c1d47] rounded-xl p-4 shadow-lg shadow-purple-950/20" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between text-[11px] text-purple-400 font-semibold mb-1" }, /* @__PURE__ */ React.createElement("span", null, "AVG CONFIDENCE"), /* @__PURE__ */ React.createElement(Sparkles, { className: "w-3.5 h-3.5 text-purple-400" })), /* @__PURE__ */ React.createElement("div", { className: "text-2xl font-bold text-purple-300 tracking-tight" }, "94.2%"), /* @__PURE__ */ React.createElement("div", { className: "text-[10px] text-purple-300/70 mt-1" }, "Soundex & Telemetry Matched")), /* @__PURE__ */ React.createElement("div", { className: "bg-[#181126] border border-[#2c1d47] rounded-xl p-4 shadow-lg shadow-purple-950/20" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between text-[11px] text-indigo-400 font-semibold mb-1" }, /* @__PURE__ */ React.createElement("span", null, "PENDING MATCHES"), /* @__PURE__ */ React.createElement(GitBranch, { className: "w-3.5 h-3.5 text-indigo-400" })), /* @__PURE__ */ React.createElement("div", { className: "text-2xl font-bold text-indigo-300 tracking-tight" }, "4 Discrepancies"), /* @__PURE__ */ React.createElement("div", { className: "text-[10px] text-indigo-300/70 mt-1" }, "Ready in Resolution Workbench"))), /* @__PURE__ */ React.createElement("div", { className: "p-3 bg-[#181126] border border-[#2c1d47] rounded-xl flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono shadow-lg shadow-purple-950/20" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 w-full sm:w-80 relative" }, /* @__PURE__ */ React.createElement(Search, { className: "w-4 h-4 text-purple-400/60 absolute left-3 top-1/2 -translate-y-1/2" }), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "text",
      placeholder: "Search entity name, alias, phone, plate...",
      value: search,
      onChange: (e) => setSearch(e.target.value),
      className: "w-full bg-[#0f0b18] border border-[#2c1d47] focus:border-purple-500 rounded-lg pl-9 pr-3 py-1.5 text-white placeholder-purple-200/40 focus:outline-none transition-colors"
    }
  )), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 w-full sm:w-auto" }, /* @__PURE__ */ React.createElement(
    "select",
    {
      value: typeFilter,
      onChange: (e) => setTypeFilter(e.target.value),
      className: "bg-[#0f0b18] border border-[#2c1d47] rounded-lg px-3 py-1.5 text-purple-200 focus:outline-none focus:border-purple-500 transition-colors"
    },
    /* @__PURE__ */ React.createElement("option", { value: "ALL" }, "All Entity Types"),
    /* @__PURE__ */ React.createElement("option", { value: "PERSON" }, "Persons of Interest"),
    /* @__PURE__ */ React.createElement("option", { value: "PHONE" }, "Burner Telephony"),
    /* @__PURE__ */ React.createElement("option", { value: "VEHICLE" }, "Tactical Vehicles"),
    /* @__PURE__ */ React.createElement("option", { value: "LOCATION" }, "Locations / Safehouses"),
    /* @__PURE__ */ React.createElement("option", { value: "ORGANIZATION" }, "Organizations")
  ), /* @__PURE__ */ React.createElement(
    "select",
    {
      value: threatFilter,
      onChange: (e) => setThreatFilter(e.target.value),
      className: "bg-[#0f0b18] border border-[#2c1d47] rounded-lg px-3 py-1.5 text-purple-200 focus:outline-none focus:border-purple-500 transition-colors"
    },
    /* @__PURE__ */ React.createElement("option", { value: "ALL" }, "All Threat Tiers"),
    /* @__PURE__ */ React.createElement("option", { value: "CRITICAL" }, "Critical Threat"),
    /* @__PURE__ */ React.createElement("option", { value: "HIGH" }, "High Threat"),
    /* @__PURE__ */ React.createElement("option", { value: "MEDIUM" }, "Medium Threat"),
    /* @__PURE__ */ React.createElement("option", { value: "LOW" }, "Low Threat")
  ))), /* @__PURE__ */ React.createElement("div", { className: "bg-[#181126] border border-[#2c1d47] rounded-xl overflow-hidden shadow-xl shadow-purple-950/30 font-mono text-xs" }, /* @__PURE__ */ React.createElement("div", { className: "overflow-x-auto" }, /* @__PURE__ */ React.createElement("table", { className: "w-full text-left" }, /* @__PURE__ */ React.createElement("thead", { className: "bg-[#0f0b18] text-purple-300/70 text-[11px] uppercase tracking-wider border-b border-[#2c1d47]" }, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("th", { className: "py-3 px-4" }, "Entity Identifier"), /* @__PURE__ */ React.createElement("th", { className: "py-3 px-4" }, "Category"), /* @__PURE__ */ React.createElement("th", { className: "py-3 px-4" }, "Threat Level"), /* @__PURE__ */ React.createElement("th", { className: "py-3 px-4 text-center" }, "Linked Identities"), /* @__PURE__ */ React.createElement("th", { className: "py-3 px-4 text-center" }, "Confidence"), /* @__PURE__ */ React.createElement("th", { className: "py-3 px-4" }, "Last Telemetry Activity"), /* @__PURE__ */ React.createElement("th", { className: "py-3 px-4 text-right" }, "Action"))), /* @__PURE__ */ React.createElement("tbody", { className: "divide-y divide-[#2c1d47] text-slate-200" }, filteredEntities.map((ent) => /* @__PURE__ */ React.createElement(
    "tr",
    {
      key: ent.id,
      onClick: () => navigate(`/entities/${ent.id}`),
      className: "hover:bg-[#231838]/60 cursor-pointer transition-colors"
    },
    /* @__PURE__ */ React.createElement("td", { className: "py-3.5 px-4" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-3" }, /* @__PURE__ */ React.createElement("div", { className: "w-8 h-8 rounded-lg bg-[#0f0b18] border border-[#2c1d47] flex items-center justify-center shrink-0 shadow-inner" }, getEntityIcon(ent.type)), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "font-bold text-white text-sm font-sans hover:text-purple-300 transition-colors" }, ent.name), /* @__PURE__ */ React.createElement("div", { className: "text-[11px] text-purple-200/60 mt-0.5" }, ent.primaryAlias)))),
    /* @__PURE__ */ React.createElement("td", { className: "py-3.5 px-4 font-semibold text-purple-300 text-[11px]" }, ent.type),
    /* @__PURE__ */ React.createElement("td", { className: "py-3.5 px-4" }, /* @__PURE__ */ React.createElement(
      "span",
      {
        className: `inline-block px-2.5 py-0.5 rounded-full font-bold text-[10px] uppercase ${ent.threatTier === "CRITICAL" ? "bg-rose-950/80 text-rose-300 border border-rose-500/40" : ent.threatTier === "HIGH" ? "bg-amber-950/80 text-amber-300 border border-amber-500/40" : "bg-purple-950/80 text-purple-300 border border-purple-500/40"}`
      },
      "\u25CF ",
      ent.threatTier
    ), ent.activeWarrants > 0 && /* @__PURE__ */ React.createElement("span", { className: "ml-2 text-[10px] text-rose-400 font-bold" }, "(", ent.activeWarrants, " WARRANTS)")),
    /* @__PURE__ */ React.createElement("td", { className: "py-3.5 px-4 text-center font-bold text-white" }, ent.linkedIdentitiesCount, " Records"),
    /* @__PURE__ */ React.createElement("td", { className: "py-3.5 px-4 text-center" }, /* @__PURE__ */ React.createElement("span", { className: "px-2 py-0.5 rounded bg-[#0f0b18] border border-[#2c1d47] font-bold text-purple-300" }, ent.confidenceScore, "%")),
    /* @__PURE__ */ React.createElement("td", { className: "py-3.5 px-4 text-purple-200/70 text-[11px]" }, ent.lastSeen),
    /* @__PURE__ */ React.createElement("td", { className: "py-3.5 px-4 text-right" }, /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: (e) => {
          e.stopPropagation();
          navigate(`/entities/${ent.id}`);
        },
        className: "px-3 py-1.5 rounded-lg bg-[#0f0b18] hover:bg-[#231838] border border-[#2c1d47] hover:border-purple-500/40 text-purple-300 hover:text-white font-semibold transition-all inline-flex items-center gap-1 shadow-sm"
      },
      /* @__PURE__ */ React.createElement("span", null, "Profile"),
      /* @__PURE__ */ React.createElement(ChevronRight, { className: "w-3.5 h-3.5" })
    ))
  )))))));
};
var stdin_default = EntitiesListPage;
export {
  EntitiesListPage,
  stdin_default as default
};
