import React, { useState } from "react";
import {
  GitBranch,
  CheckCircle2,
  HelpCircle,
  Check,
  X,
  History
} from "lucide-react";
import toast from "react-hot-toast";
const INITIAL_CANDIDATES = [
  {
    id: "CAND-01",
    sourceA: {
      recordId: "REC-NYPD-8910",
      source: "Metropolitan Arrest Booking (2024)",
      name: "Viktor Konstantin Sokolov",
      alias: "Sokol",
      phone: "+1 (555) 019-8821",
      address: "742 Waterfront Pier Road, Brooklyn NY",
      vehiclePlate: "NY: TRK-9902",
      dob: "14-MAY-1981"
    },
    sourceB: {
      recordId: "REC-FINCEN-4421",
      source: "FinCEN SAR Transaction Wire #4421",
      name: "Victor Sokoloff",
      alias: "V. Sokolov / Astraea Ltd",
      phone: "+1 (555) 019-8821",
      address: "742 Waterfront Pier Rd Apt 4B, Brooklyn",
      vehiclePlate: "NY: TRK-9902",
      dob: "14-MAY-1981"
    },
    confidence: 96.4,
    matchFactors: ["Identical Phone ANI (+1 555 019-8821)", "Soundex Collision (S241)", "Vehicle Plate Match", "Exact DOB Match"],
    status: "PENDING"
  },
  {
    id: "CAND-02",
    sourceA: {
      recordId: "REC-CAD-1029",
      source: "CAD 911 Incident Dispatch #1029",
      name: "Dmitri Volkov",
      alias: "Dima",
      phone: "+1 (555) 014-9902",
      address: "Pier 42 Maritime Terminal Shed 3",
      vehiclePlate: "NJ: XTR-4410",
      dob: "08-AUG-1979"
    },
    sourceB: {
      recordId: "REC-PORT-5510",
      source: "Port Authority Cargo Manifest",
      name: "D. M. Volkov Logistics",
      alias: "The Anchor",
      phone: "+1 (555) 014-9902",
      address: "Pier 42 Berth 4 Gate B",
      vehiclePlate: "NJ: XTR-4410",
      dob: "08-AUG-1979"
    },
    confidence: 91.8,
    matchFactors: ["Shared Burner Phone (+1 555 014-9902)", "Pier 42 Co-location", "ALPR Plate Overlap"],
    status: "PENDING"
  },
  {
    id: "CAND-03",
    sourceA: {
      recordId: "REC-TEL-3310",
      source: "T-Mobile Subscriber Dump",
      name: "Alexei Morozov",
      alias: "Lyokha",
      phone: "+1 (555) 018-7711",
      address: "12 Harbor View Ave, Queens NY",
      vehiclePlate: "NY: GRM-3310",
      dob: "22-NOV-1985"
    },
    sourceB: {
      recordId: "REC-STATE-0941",
      source: "State Prison Parole Registry",
      name: "Alexey Marozoff",
      alias: "Moroz",
      phone: "+1 (555) 018-7711",
      address: "12 Harbor View Avenue, Queens NY",
      vehiclePlate: "UNREGISTERED",
      dob: "22-NOV-1985"
    },
    confidence: 88.5,
    matchFactors: ["Phonetic Levenshtein Distance (0.89)", "Shared Address Token", "Exact DOB Match"],
    status: "PENDING"
  }
];
const EntityResolutionWorkbenchPage = () => {
  const [candidates, setCandidates] = useState(INITIAL_CANDIDATES);
  const [auditLog, setAuditLog] = useState([]);
  const handleDecision = (id, decision) => {
    setCandidates(
      (prev) => prev.map((c) => c.id === id ? { ...c, status: decision } : c)
    );
    const label = decision === "CONFIRMED" ? "Confirmed Same Entity (Merged)" : decision === "REJECTED" ? "Rejected Match Discrepancy" : "Escalated to Supervisory Review";
    toast.success(`Action applied: ${label}`);
    setAuditLog((prev) => [
      {
        id: `aud-${Date.now()}`,
        action: `${label} on pair ${id}`,
        time: (/* @__PURE__ */ new Date()).toLocaleTimeString() + " UTC"
      },
      ...prev
    ]);
  };
  return /* @__PURE__ */ React.createElement("div", { className: "space-y-6 max-w-7xl mx-auto font-sans pb-16" }, /* @__PURE__ */ React.createElement("div", { className: "bg-[#181126] border border-[#2c1d47] rounded-xl p-6 shadow-xl shadow-purple-950/40 relative overflow-hidden" }, /* @__PURE__ */ React.createElement("div", { className: "absolute top-0 right-0 w-96 h-48 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" }), /* @__PURE__ */ React.createElement("div", { className: "flex flex-col lg:flex-row lg:items-center justify-between gap-5 relative z-10" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-purple-950/80 border border-purple-500/40 text-purple-300 font-mono text-[11px] uppercase tracking-wider mb-2" }, /* @__PURE__ */ React.createElement(GitBranch, { className: "w-3.5 h-3.5 text-purple-400" }), /* @__PURE__ */ React.createElement("span", null, "PROBABILISTIC IDENTITY RESOLUTION WORKBENCH")), /* @__PURE__ */ React.createElement("h1", { className: "text-2xl sm:text-3xl font-bold text-white tracking-tight" }, "Entity Resolution & Identity Linking"), /* @__PURE__ */ React.createElement("p", { className: "text-xs sm:text-sm text-purple-200/70 mt-1 max-w-2xl leading-relaxed" }, "Algorithmic deduplication engine pairing disparate telemetry, aliases, and biometrics with attribute-level diff verification.")), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-3 self-start lg:self-auto font-mono text-xs" }, /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => {
        candidates.forEach((c) => {
          if (c.status === "PENDING" && c.confidence > 90) {
            handleDecision(c.id, "CONFIRMED");
          }
        });
        toast.success("Bulk confirmed all candidate matches > 90% confidence");
      },
      className: "px-4 py-2.5 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold flex items-center gap-2 shadow-lg shadow-purple-950/60 transition-all transform active:scale-95"
    },
    /* @__PURE__ */ React.createElement(CheckCircle2, { className: "w-4 h-4" }),
    /* @__PURE__ */ React.createElement("span", null, "Bulk Confirm > 90%")
  )))), /* @__PURE__ */ React.createElement("div", { className: "space-y-6" }, candidates.map((cand) => /* @__PURE__ */ React.createElement(
    "div",
    {
      key: cand.id,
      className: `bg-[#181126] border rounded-xl overflow-hidden shadow-xl shadow-purple-950/20 transition-all ${cand.status === "CONFIRMED" ? "border-emerald-500/50 bg-[#141d24]/60" : cand.status === "REJECTED" ? "border-rose-500/40 opacity-60" : "border-[#2c1d47]"}`
    },
    /* @__PURE__ */ React.createElement("div", { className: "bg-[#0f0b18] px-5 py-3.5 border-b border-[#2c1d47] flex flex-wrap items-center justify-between gap-3 font-mono text-xs" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-3" }, /* @__PURE__ */ React.createElement("span", { className: "text-purple-400 font-bold uppercase" }, cand.id), /* @__PURE__ */ React.createElement("span", { className: "text-[#2c1d47]" }, "\u2022"), /* @__PURE__ */ React.createElement("span", { className: "text-purple-200/80" }, "Confidence Score: ", /* @__PURE__ */ React.createElement("strong", { className: "text-purple-300 text-sm font-bold" }, cand.confidence, "%")), /* @__PURE__ */ React.createElement("span", { className: "text-[#2c1d47]" }, "\u2022"), /* @__PURE__ */ React.createElement("span", { className: "text-purple-300/50" }, "Soundex & Telemetry Collocated")), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React.createElement(
      "span",
      {
        className: `px-2.5 py-0.5 rounded-full font-bold uppercase text-[10px] ${cand.status === "CONFIRMED" ? "bg-emerald-950/80 text-emerald-300 border border-emerald-500/40" : cand.status === "REJECTED" ? "bg-rose-950/80 text-rose-300 border border-rose-500/40" : "bg-amber-950/80 text-amber-300 border border-amber-500/40"}`
      },
      "\u25CF ",
      cand.status
    ))),
    /* @__PURE__ */ React.createElement("div", { className: "p-6 grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs" }, /* @__PURE__ */ React.createElement("div", { className: "p-4 rounded-xl bg-[#0f0b18] border border-[#2c1d47] space-y-3 shadow-inner" }, /* @__PURE__ */ React.createElement("div", { className: "flex justify-between items-center border-b border-[#2c1d47] pb-2.5" }, /* @__PURE__ */ React.createElement("span", { className: "text-purple-400 font-bold uppercase text-[10px]" }, "RECORD A: ", cand.sourceA.recordId), /* @__PURE__ */ React.createElement("span", { className: "text-purple-300/60 text-[10px]" }, cand.sourceA.source)), /* @__PURE__ */ React.createElement("div", { className: "space-y-2 text-slate-300 text-[11px]" }, /* @__PURE__ */ React.createElement("div", null, "Name: ", /* @__PURE__ */ React.createElement("strong", { className: "text-white text-sm font-sans" }, cand.sourceA.name)), /* @__PURE__ */ React.createElement("div", null, "Alias: ", /* @__PURE__ */ React.createElement("span", { className: "text-purple-200/70" }, cand.sourceA.alias)), /* @__PURE__ */ React.createElement("div", null, "Phone: ", /* @__PURE__ */ React.createElement("span", { className: "text-purple-300 font-bold bg-[#181126] px-2 py-0.5 rounded border border-[#2c1d47]" }, cand.sourceA.phone)), /* @__PURE__ */ React.createElement("div", null, "Address: ", /* @__PURE__ */ React.createElement("span", { className: "text-slate-300" }, cand.sourceA.address)), /* @__PURE__ */ React.createElement("div", null, "Plate: ", /* @__PURE__ */ React.createElement("span", { className: "text-amber-300 bg-amber-950/50 px-2 py-0.5 rounded border border-amber-500/30" }, cand.sourceA.vehiclePlate)), /* @__PURE__ */ React.createElement("div", null, "DOB: ", /* @__PURE__ */ React.createElement("span", { className: "text-slate-300" }, cand.sourceA.dob)))), /* @__PURE__ */ React.createElement("div", { className: "p-4 rounded-xl bg-[#0f0b18] border border-[#2c1d47] space-y-3 shadow-inner" }, /* @__PURE__ */ React.createElement("div", { className: "flex justify-between items-center border-b border-[#2c1d47] pb-2.5" }, /* @__PURE__ */ React.createElement("span", { className: "text-indigo-400 font-bold uppercase text-[10px]" }, "RECORD B: ", cand.sourceB.recordId), /* @__PURE__ */ React.createElement("span", { className: "text-indigo-300/60 text-[10px]" }, cand.sourceB.source)), /* @__PURE__ */ React.createElement("div", { className: "space-y-2 text-slate-300 text-[11px]" }, /* @__PURE__ */ React.createElement("div", null, "Name: ", /* @__PURE__ */ React.createElement("strong", { className: "text-white text-sm font-sans" }, cand.sourceB.name)), /* @__PURE__ */ React.createElement("div", null, "Alias: ", /* @__PURE__ */ React.createElement("span", { className: "text-purple-200/70" }, cand.sourceB.alias)), /* @__PURE__ */ React.createElement("div", null, "Phone: ", /* @__PURE__ */ React.createElement("span", { className: "text-purple-300 font-bold bg-[#181126] px-2 py-0.5 rounded border border-[#2c1d47]" }, cand.sourceB.phone)), /* @__PURE__ */ React.createElement("div", null, "Address: ", /* @__PURE__ */ React.createElement("span", { className: "text-slate-300" }, cand.sourceB.address)), /* @__PURE__ */ React.createElement("div", null, "Plate: ", /* @__PURE__ */ React.createElement("span", { className: "text-amber-300 bg-amber-950/50 px-2 py-0.5 rounded border border-amber-500/30" }, cand.sourceB.vehiclePlate)), /* @__PURE__ */ React.createElement("div", null, "DOB: ", /* @__PURE__ */ React.createElement("span", { className: "text-slate-300" }, cand.sourceB.dob))))),
    /* @__PURE__ */ React.createElement("div", { className: "bg-[#0f0b18]/80 px-6 py-3.5 border-t border-[#2c1d47] flex flex-wrap items-center justify-between gap-3 font-mono text-xs" }, /* @__PURE__ */ React.createElement("div", { className: "flex flex-wrap items-center gap-1.5" }, /* @__PURE__ */ React.createElement("span", { className: "text-purple-300/60 text-[10px] uppercase font-bold mr-1" }, "Corroborating Signals:"), cand.matchFactors.map((fac, idx) => /* @__PURE__ */ React.createElement(
      "span",
      {
        key: idx,
        className: "px-2.5 py-1 rounded-md bg-[#181126] border border-[#2c1d47] text-purple-300 text-[10px]"
      },
      "\u2713 ",
      fac
    ))), cand.status === "PENDING" && /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => handleDecision(cand.id, "REJECTED"),
        className: "px-3.5 py-1.5 rounded-lg bg-[#0f0b18] hover:bg-rose-950/50 text-rose-400 border border-rose-500/40 font-semibold flex items-center gap-1.5 transition-colors"
      },
      /* @__PURE__ */ React.createElement(X, { className: "w-3.5 h-3.5" }),
      /* @__PURE__ */ React.createElement("span", null, "Reject")
    ), /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => handleDecision(cand.id, "REVIEW"),
        className: "px-3.5 py-1.5 rounded-lg bg-[#0f0b18] hover:bg-[#231838] text-purple-200 border border-[#2c1d47] font-medium flex items-center gap-1.5 transition-colors"
      },
      /* @__PURE__ */ React.createElement(HelpCircle, { className: "w-3.5 h-3.5" }),
      /* @__PURE__ */ React.createElement("span", null, "Request Review")
    ), /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => handleDecision(cand.id, "CONFIRMED"),
        className: "px-4 py-1.5 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold flex items-center gap-1.5 shadow-md transition-all"
      },
      /* @__PURE__ */ React.createElement(Check, { className: "w-3.5 h-3.5" }),
      /* @__PURE__ */ React.createElement("span", null, "Confirm Same Entity")
    )))
  ))), auditLog.length > 0 && /* @__PURE__ */ React.createElement("div", { className: "bg-[#181126] border border-[#2c1d47] rounded-xl p-5 font-mono text-xs space-y-3 shadow-xl shadow-purple-950/20" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 text-purple-300 font-bold uppercase text-[11px]" }, /* @__PURE__ */ React.createElement(History, { className: "w-4 h-4 text-purple-400" }), /* @__PURE__ */ React.createElement("span", null, "Investigator Resolution Decision Audit Log")), /* @__PURE__ */ React.createElement("div", { className: "space-y-1.5" }, auditLog.map((log) => /* @__PURE__ */ React.createElement("div", { key: log.id, className: "p-2.5 rounded-lg bg-[#0f0b18] border border-[#2c1d47] flex justify-between text-purple-200/70" }, /* @__PURE__ */ React.createElement("span", { className: "text-slate-200" }, "\u2713 ", log.action), /* @__PURE__ */ React.createElement("span", { className: "text-purple-400/50" }, log.time))))));
};
var stdin_default = EntityResolutionWorkbenchPage;
export {
  EntityResolutionWorkbenchPage,
  stdin_default as default
};
