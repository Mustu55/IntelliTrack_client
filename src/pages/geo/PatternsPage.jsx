import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Activity,
  Flame,
  Sparkles,
  CheckCircle2
} from "lucide-react";
import toast from "react-hot-toast";
const PATTERNS_LIST = [
  {
    id: "pat-1",
    title: "Bi-Weekly Co-Location Convergence at Pier 42",
    type: "CO_LOCATION",
    plainDescription: "Audi A8 vehicle plate and Burner SIM #1 consistently arrive at Pier 42 loading berth 4 on Tuesday and Friday evenings between 19:00 and 21:00 UTC, preceding maritime cargo unloads.",
    involvedEntities: ["Viktor Sokolov", "Audi A8 [NY: TRK-9902]", "Burner +1 (555) 019-8821"],
    involvedLocations: ["Pier 42 Maritime Facility Berth 4"],
    timeWindow: "Tues / Fri 19:00-21:00 UTC",
    frequency: "7 Occurrences in 21 days",
    evidenceCount: 22,
    promotedToLead: true
  },
  {
    id: "pat-2",
    title: "Systematic SIM Card Swap Rotation Every 72 Hours",
    type: "TELEPHONY_ROTATION",
    plainDescription: "IMEI Hardware device #8612-9481 systematically drops registration and re-activates with fresh prepaid IMSI tokens every 72 hours, matching encrypted logistics handoffs.",
    involvedEntities: ["Burner SIM #1", "Burner SIM #2", "Dmitri Volkov"],
    involvedLocations: ["Cell Tower Sector 4", "Safehouse 04"],
    timeWindow: "Every 72 Hours (Systematic)",
    frequency: "4 Consecutive Swaps Logged",
    evidenceCount: 16,
    promotedToLead: false
  },
  {
    id: "pat-3",
    title: "Smurfing / Structured Cash Withdrawals Below $10k Threshold",
    type: "FINANCIAL_STRUCTURING",
    plainDescription: "Astraea Trading Corp accounts issue recurring wire transfers between $9,200 and $9,800 to multiple Hawala broker accounts within 30 minutes of physical Pier 42 departures.",
    involvedEntities: ["Astraea Trading Corp", "Hawala Broker #4", "Mikhail Kozlov"],
    involvedLocations: ["Atlantic Ave Financial Corridor"],
    timeWindow: "Post-Meeting +30 Minutes",
    frequency: "5 Structured Wires",
    evidenceCount: 19,
    promotedToLead: false
  }
];
const PatternsPage = () => {
  const navigate = useNavigate();
  const [patterns, setPatterns] = useState(PATTERNS_LIST);
  const handlePromoteToLead = (id, title) => {
    setPatterns(
      (prev) => prev.map((p) => p.id === id ? { ...p, promotedToLead: true } : p)
    );
    toast.success(`Pattern promoted to active investigative lead: ${title}`);
  };
  return /* @__PURE__ */ React.createElement("div", { className: "space-y-6 max-w-7xl mx-auto font-sans pb-16" }, /* @__PURE__ */ React.createElement("div", { className: "bg-[#111f15] border border-[#1a3321] rounded-xl p-6 shadow-xl shadow-lime-950/40 relative overflow-hidden" }, /* @__PURE__ */ React.createElement("div", { className: "absolute top-0 right-0 w-96 h-48 bg-lime-500/5 rounded-full blur-3xl pointer-events-none" }), /* @__PURE__ */ React.createElement("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-5 relative z-10" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-lime-950/80 border border-lime-500/40 text-lime-400 font-mono text-[11px] uppercase tracking-wider mb-2" }, /* @__PURE__ */ React.createElement(Activity, { className: "w-3.5 h-3.5 text-lime-400" }), /* @__PURE__ */ React.createElement("span", null, "SPATIO-TEMPORAL BEHAVIORAL PATTERN INTELLIGENCE")), /* @__PURE__ */ React.createElement("h1", { className: "text-2xl sm:text-3xl font-bold text-white tracking-tight" }, "Machine-Detected Operational Patterns"), /* @__PURE__ */ React.createElement("p", { className: "text-xs sm:text-sm text-lime-200/70 mt-1 max-w-2xl leading-relaxed" }, "Algorithmic spatial and temporal anomaly discovery detecting recurring co-locations, burner telephony swaps, and financial structuring.")), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => navigate("/leads"),
      className: "px-4 py-2.5 rounded-lg bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-mono text-xs font-bold flex items-center gap-2 shadow-lg shadow-rose-950/50 transition-all self-start sm:self-auto transform active:scale-95"
    },
    /* @__PURE__ */ React.createElement(Flame, { className: "w-4 h-4" }),
    /* @__PURE__ */ React.createElement("span", null, "Review Active Leads Queue")
  ))), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4 font-mono" }, /* @__PURE__ */ React.createElement("div", { className: "bg-[#111f15] border border-[#1a3321] rounded-xl p-4 shadow-lg shadow-lime-950/20" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between text-[11px] text-lime-400 font-semibold mb-1" }, /* @__PURE__ */ React.createElement("span", null, "DISCOVERED PATTERNS"), /* @__PURE__ */ React.createElement(Activity, { className: "w-3.5 h-3.5 text-lime-400" })), /* @__PURE__ */ React.createElement("div", { className: "text-2xl font-bold text-white tracking-tight" }, "3 Patterns"), /* @__PURE__ */ React.createElement("div", { className: "text-[10px] text-lime-200/50 mt-1" }, "Autonomous recurrent heuristics")), /* @__PURE__ */ React.createElement("div", { className: "bg-[#111f15] border border-[#1a3321] rounded-xl p-4 shadow-lg shadow-lime-950/20" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between text-[11px] text-emerald-400 font-semibold mb-1" }, /* @__PURE__ */ React.createElement("span", null, "DETECTION CONFIDENCE"), /* @__PURE__ */ React.createElement(Sparkles, { className: "w-3.5 h-3.5 text-emerald-400" })), /* @__PURE__ */ React.createElement("div", { className: "text-2xl font-bold text-emerald-300 tracking-tight" }, "98.2% Anomaly"), /* @__PURE__ */ React.createElement("div", { className: "text-[10px] text-emerald-200/50 mt-1" }, "Chi-Square P-Value < 0.001")), /* @__PURE__ */ React.createElement("div", { className: "bg-[#111f15] border border-[#1a3321] rounded-xl p-4 shadow-lg shadow-lime-950/20" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between text-[11px] text-rose-400 font-semibold mb-1" }, /* @__PURE__ */ React.createElement("span", null, "LEAD CONVERSIONS"), /* @__PURE__ */ React.createElement(Flame, { className: "w-3.5 h-3.5 text-rose-400" })), /* @__PURE__ */ React.createElement("div", { className: "text-2xl font-bold text-rose-300 tracking-tight" }, "1 Active Lead"), /* @__PURE__ */ React.createElement("div", { className: "text-[10px] text-rose-200/50 mt-1" }, "Direct warrant escalation"))), /* @__PURE__ */ React.createElement("div", { className: "space-y-4" }, patterns.map((pat) => /* @__PURE__ */ React.createElement(
    "div",
    {
      key: pat.id,
      className: "bg-[#111f15] border border-[#1a3321] hover:border-lime-500/50 rounded-xl p-6 shadow-xl shadow-lime-950/20 transition-all group"
    },
    /* @__PURE__ */ React.createElement("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2.5 font-mono text-xs" }, /* @__PURE__ */ React.createElement("span", { className: "text-lime-400 font-bold uppercase" }, pat.id), /* @__PURE__ */ React.createElement("span", { className: "text-[#1a3321]" }, "\u2022"), /* @__PURE__ */ React.createElement(
      "span",
      {
        className: `px-2.5 py-0.5 rounded-full font-bold text-[10px] uppercase border ${pat.type === "CO_LOCATION" ? "bg-lime-950/80 text-lime-300 border-lime-500/40" : pat.type === "TELEPHONY_ROTATION" ? "bg-cyan-950/80 text-cyan-300 border-cyan-500/40" : "bg-amber-950/80 text-amber-300 border-amber-500/40"}`
      },
      "\u25CF ",
      pat.type.replace("_", " ")
    ), /* @__PURE__ */ React.createElement("span", { className: "text-lime-200/50 text-[11px]" }, "\u2022 ", pat.frequency)), pat.promotedToLead ? /* @__PURE__ */ React.createElement("span", { className: "px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 font-mono text-xs font-bold inline-flex items-center gap-1.5 self-start sm:self-auto" }, /* @__PURE__ */ React.createElement(CheckCircle2, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ React.createElement("span", null, "PROMOTED TO ACTIVE LEAD")) : /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => handlePromoteToLead(pat.id, pat.title),
        className: "px-3.5 py-1.5 rounded-lg bg-lime-600 hover:bg-lime-500 text-black font-mono text-xs font-bold flex items-center gap-1.5 shadow-md transition-all self-start sm:self-auto transform active:scale-95"
      },
      /* @__PURE__ */ React.createElement(Flame, { className: "w-3.5 h-3.5" }),
      /* @__PURE__ */ React.createElement("span", null, "Promote to Actionable Lead")
    )),
    /* @__PURE__ */ React.createElement("h3", { className: "text-lg font-bold text-white group-hover:text-lime-300 transition-colors mb-2" }, pat.title),
    /* @__PURE__ */ React.createElement("p", { className: "text-lime-100/70 text-xs sm:text-sm font-sans leading-relaxed mb-4" }, pat.plainDescription),
    /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-3 pt-3 border-t border-[#1a3321] font-mono text-xs" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", { className: "text-lime-200/50 text-[10px] uppercase font-bold block mb-1.5" }, "Involved Entities:"), /* @__PURE__ */ React.createElement("div", { className: "flex flex-wrap gap-1.5" }, pat.involvedEntities.map((ent, i) => /* @__PURE__ */ React.createElement(
      "span",
      {
        key: i,
        className: "px-2.5 py-1 rounded-md bg-[#0a120c] border border-[#1a3321] text-lime-300 text-[11px]"
      },
      ent
    )))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", { className: "text-lime-200/50 text-[10px] uppercase font-bold block mb-1.5" }, "Temporal Window & Evidence:"), /* @__PURE__ */ React.createElement("div", { className: "flex flex-wrap items-center gap-2 text-lime-300 text-[11px]" }, /* @__PURE__ */ React.createElement("span", { className: "px-2.5 py-1 rounded-md bg-[#0a120c] border border-[#1a3321]" }, pat.timeWindow), /* @__PURE__ */ React.createElement("span", { className: "px-2.5 py-1 rounded-md bg-[#0a120c] border border-[#1a3321] text-lime-400 font-bold" }, pat.evidenceCount, " Corroborating Logs"))))
  ))));
};
var stdin_default = PatternsPage;
export {
  PatternsPage,
  stdin_default as default
};
