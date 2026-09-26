import React from "react";
import {
  X,
  Sparkles,
  CheckCircle2,
  Share2,
  Database,
  Clock,
  Fingerprint,
  AlertTriangle,
  HelpCircle
} from "lucide-react";
const WhyThisLeadModal = ({
  isOpen,
  onClose,
  data
}) => {
  if (!isOpen || !data) return null;
  return /* @__PURE__ */ React.createElement("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-navy-950/85 backdrop-blur-md select-none overflow-y-auto" }, /* @__PURE__ */ React.createElement("div", { className: "w-full max-w-3xl bg-[#0D1B2A] border border-[#263B55] rounded-xl shadow-2xl overflow-hidden font-sans my-auto" }, /* @__PURE__ */ React.createElement("div", { className: "bg-[#07111F] px-5 py-3.5 border-b border-[#263B55] flex items-center justify-between" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-3" }, /* @__PURE__ */ React.createElement("div", { className: "w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400" }, /* @__PURE__ */ React.createElement(Sparkles, { className: "w-4 h-4 text-cyan-400" })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React.createElement("span", { className: "font-mono text-xs font-bold text-white tracking-wider" }, "EXPLAINABLE AI INVESTIGATIVE RATIONALE"), /* @__PURE__ */ React.createElement("span", { className: "px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold bg-cyan-950/60 text-cyan-300 border border-cyan-800" }, data.leadId)), /* @__PURE__ */ React.createElement("div", { className: "text-[11px] text-[#94A3B8]" }, "Transparent algorithmic provenance & evidence synthesis (Non-Black-Box AI)"))), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: onClose,
      className: "p-1.5 rounded-lg text-[#94A3B8] hover:text-white hover:bg-[#101F33] transition-colors"
    },
    /* @__PURE__ */ React.createElement(X, { className: "w-4 h-4" })
  )), /* @__PURE__ */ React.createElement("div", { className: "p-5 sm:p-6 space-y-5 max-h-[75vh] overflow-y-auto custom-scrollbar" }, /* @__PURE__ */ React.createElement("div", { className: "p-3.5 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-start gap-3" }, /* @__PURE__ */ React.createElement(AlertTriangle, { className: "w-4 h-4 text-[#F59E0B] shrink-0 mt-0.5" }), /* @__PURE__ */ React.createElement("div", { className: "text-xs" }, /* @__PURE__ */ React.createElement("span", { className: "font-semibold text-amber-200" }, "Investigator Safeguard: "), /* @__PURE__ */ React.createElement("span", { className: "text-amber-300/90" }, "AI-generated investigative lead \u2014 requires investigator verification. IntelliTrack provides explainable probabilistic indicators to assist sworn analysts; it does not replace legal evidentiary burden or human discretion."))), /* @__PURE__ */ React.createElement("div", { className: "bg-[#101F33] p-4 rounded-xl border border-[#263B55] flex flex-col sm:flex-row sm:items-center justify-between gap-4" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 mb-1" }, /* @__PURE__ */ React.createElement(
    "span",
    {
      className: `text-[10px] font-mono font-bold px-2 py-0.5 rounded ${data.priority === "HIGH" ? "bg-red-500/20 text-[#EF4444] border border-red-500/30" : "bg-amber-500/20 text-[#F59E0B] border border-amber-500/30"}`
    },
    data.priority,
    " PRIORITY"
  ), /* @__PURE__ */ React.createElement("span", { className: "text-xs text-[#94A3B8] font-mono" }, "Synthesized across ", data.dataSources.length, " intelligence feeds")), /* @__PURE__ */ React.createElement("h3", { className: "text-base font-bold text-white" }, data.title), /* @__PURE__ */ React.createElement("p", { className: "text-xs text-slate-300 mt-1 leading-relaxed" }, data.summary)), /* @__PURE__ */ React.createElement("div", { className: "shrink-0 flex sm:flex-col items-center sm:items-end justify-between border-t sm:border-t-0 pt-2 sm:pt-0 border-[#263B55]" }, /* @__PURE__ */ React.createElement("div", { className: "text-[10px] uppercase font-mono text-[#94A3B8]" }, "Confidence Score"), /* @__PURE__ */ React.createElement("div", { className: "text-2xl font-black font-mono text-[#06B6D4] flex items-center gap-1" }, data.confidence, "%", /* @__PURE__ */ React.createElement("span", { className: "text-xs font-normal text-emerald-400 font-mono" }, "High")), /* @__PURE__ */ React.createElement("div", { className: "w-24 h-1.5 bg-[#07111F] rounded-full overflow-hidden mt-1 hidden sm:block" }, /* @__PURE__ */ React.createElement(
    "div",
    {
      className: "h-full bg-linear-to-r from-blue-500 to-cyan-400 rounded-full",
      style: { width: `${data.confidence}%` }
    }
  )))), /* @__PURE__ */ React.createElement("div", { className: "bg-[#101F33] p-4 rounded-xl border border-[#263B55] space-y-2.5" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between" }, /* @__PURE__ */ React.createElement("span", { className: "text-xs font-bold uppercase font-mono text-white tracking-wider flex items-center gap-2" }, /* @__PURE__ */ React.createElement(HelpCircle, { className: "w-3.5 h-3.5 text-cyan-400" }), "WHY PRIORITIZED?"), /* @__PURE__ */ React.createElement("span", { className: "text-[10px] font-mono text-emerald-400 font-semibold" }, "ALL 4 PILLARS VALIDATED")), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 font-mono text-xs" }, data.whyPrioritized.map((item, idx) => /* @__PURE__ */ React.createElement(
    "div",
    {
      key: idx,
      className: "flex items-center gap-2 p-2 rounded bg-[#07111F] border border-[#263B55] text-slate-200"
    },
    /* @__PURE__ */ React.createElement(CheckCircle2, { className: "w-4 h-4 text-[#10B981] shrink-0" }),
    /* @__PURE__ */ React.createElement("span", { className: "truncate" }, item)
  )))), /* @__PURE__ */ React.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ React.createElement("div", { className: "text-xs font-bold uppercase font-mono text-slate-300 flex items-center gap-2" }, /* @__PURE__ */ React.createElement(Share2, { className: "w-3.5 h-3.5 text-blue-400" }), "1. SUPPORTING RELATIONSHIPS IN GRAPH"), /* @__PURE__ */ React.createElement("div", { className: "overflow-x-auto border border-[#263B55] rounded-lg" }, /* @__PURE__ */ React.createElement("table", { className: "w-full text-left text-xs font-mono" }, /* @__PURE__ */ React.createElement("thead", { className: "bg-[#07111F] text-[#94A3B8] border-b border-[#263B55]" }, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("th", { className: "p-2.5" }, "Source Entity"), /* @__PURE__ */ React.createElement("th", { className: "p-2.5" }, "Relationship"), /* @__PURE__ */ React.createElement("th", { className: "p-2.5" }, "Target Entity"), /* @__PURE__ */ React.createElement("th", { className: "p-2.5" }, "Confidence"), /* @__PURE__ */ React.createElement("th", { className: "p-2.5" }, "Status"))), /* @__PURE__ */ React.createElement("tbody", { className: "divide-y divide-[#263B55] bg-[#101F33]" }, data.supportingRelationships.map((rel, idx) => /* @__PURE__ */ React.createElement("tr", { key: idx, className: "hover:bg-[#12243A] transition-colors" }, /* @__PURE__ */ React.createElement("td", { className: "p-2.5 text-white font-semibold" }, rel.source), /* @__PURE__ */ React.createElement("td", { className: "p-2.5 text-cyan-400" }, rel.relationship), /* @__PURE__ */ React.createElement("td", { className: "p-2.5 text-slate-300" }, rel.target), /* @__PURE__ */ React.createElement("td", { className: "p-2.5 font-bold text-slate-200" }, rel.confidence, "%"), /* @__PURE__ */ React.createElement("td", { className: "p-2.5" }, /* @__PURE__ */ React.createElement(
    "span",
    {
      className: `text-[10px] px-1.5 py-0.5 rounded font-semibold ${rel.status === "VERIFIED" ? "bg-emerald-500/20 text-[#10B981] border border-emerald-500/30" : rel.status === "SUSPICIOUS" ? "bg-red-500/20 text-[#EF4444] border border-red-500/30" : "bg-amber-500/20 text-[#F59E0B] border border-amber-500/30"}`
    },
    rel.status
  )))))))), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4" }, /* @__PURE__ */ React.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ React.createElement("div", { className: "text-xs font-bold uppercase font-mono text-slate-300 flex items-center gap-2" }, /* @__PURE__ */ React.createElement(Database, { className: "w-3.5 h-3.5 text-emerald-400" }), "2. DATA SOURCES & RECORD EXCERPTS"), /* @__PURE__ */ React.createElement("div", { className: "space-y-2" }, data.dataSources.map((ds, idx) => /* @__PURE__ */ React.createElement(
    "div",
    {
      key: idx,
      className: "p-2.5 rounded-lg bg-[#101F33] border border-[#263B55] text-xs font-mono"
    },
    /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between text-[#94A3B8] mb-1" }, /* @__PURE__ */ React.createElement("span", { className: "text-cyan-400 font-semibold" }, ds.type), /* @__PURE__ */ React.createElement("span", null, ds.date)),
    /* @__PURE__ */ React.createElement("div", { className: "text-white text-[11px] font-semibold mb-1" }, ds.recordId),
    /* @__PURE__ */ React.createElement("div", { className: "text-slate-300 text-[11px] leading-relaxed bg-[#07111F] p-2 rounded border border-[#263B55]/60" }, ds.snippet)
  )))), /* @__PURE__ */ React.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ React.createElement("div", { className: "text-xs font-bold uppercase font-mono text-slate-300 flex items-center gap-2" }, /* @__PURE__ */ React.createElement(Fingerprint, { className: "w-3.5 h-3.5 text-purple-400" }), "3. MATCHING IDENTIFIERS & ATTRIBUTES"), /* @__PURE__ */ React.createElement("div", { className: "space-y-2" }, data.matchingAttributes.map((attr, idx) => /* @__PURE__ */ React.createElement(
    "div",
    {
      key: idx,
      className: "p-2.5 rounded-lg bg-[#101F33] border border-[#263B55] flex items-center justify-between text-xs font-mono"
    },
    /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "text-[10px] text-[#94A3B8]" }, attr.attribute), /* @__PURE__ */ React.createElement("div", { className: "text-white font-semibold mt-0.5" }, attr.value)),
    /* @__PURE__ */ React.createElement("div", { className: "text-right" }, /* @__PURE__ */ React.createElement("span", { className: "text-[10px] px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30" }, attr.matchType), /* @__PURE__ */ React.createElement("div", { className: "text-[10px] text-slate-400 mt-1" }, "Weight: ", attr.weight))
  ))))), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4" }, /* @__PURE__ */ React.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ React.createElement("div", { className: "text-xs font-bold uppercase font-mono text-slate-300 flex items-center gap-2" }, /* @__PURE__ */ React.createElement(Share2, { className: "w-3.5 h-3.5 text-cyan-400" }), "4. GRAPH TOPOLOGY SIGNALS"), /* @__PURE__ */ React.createElement("div", { className: "space-y-2" }, data.graphSignals.map((gs, idx) => /* @__PURE__ */ React.createElement(
    "div",
    {
      key: idx,
      className: "p-2.5 rounded-lg bg-[#101F33] border border-[#263B55] text-xs font-mono"
    },
    /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between" }, /* @__PURE__ */ React.createElement("span", { className: "text-slate-300" }, gs.metric), /* @__PURE__ */ React.createElement("span", { className: "text-cyan-400 font-bold" }, gs.score)),
    /* @__PURE__ */ React.createElement("div", { className: "text-[11px] text-[#94A3B8] mt-1" }, gs.description)
  )))), /* @__PURE__ */ React.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ React.createElement("div", { className: "text-xs font-bold uppercase font-mono text-slate-300 flex items-center gap-2" }, /* @__PURE__ */ React.createElement(Clock, { className: "w-3.5 h-3.5 text-amber-400" }), "5. TIMELINE TEMPORAL OVERLAP"), /* @__PURE__ */ React.createElement("div", { className: "space-y-2" }, data.timelineEvidence.map((te, idx) => /* @__PURE__ */ React.createElement(
    "div",
    {
      key: idx,
      className: "p-2.5 rounded-lg bg-[#101F33] border border-[#263B55] text-xs font-mono"
    },
    /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between text-[#94A3B8]" }, /* @__PURE__ */ React.createElement("span", { className: "text-amber-400 font-semibold" }, te.time), /* @__PURE__ */ React.createElement("span", { className: "text-[10px] px-1 py-0.2 rounded bg-amber-950/60 text-amber-300 border border-amber-800" }, te.overlapWindow)),
    /* @__PURE__ */ React.createElement("div", { className: "text-slate-200 mt-1" }, te.event)
  )))))), /* @__PURE__ */ React.createElement("div", { className: "bg-[#07111F] px-5 py-3.5 border-t border-[#263B55] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono" }, /* @__PURE__ */ React.createElement("div", { className: "text-[#94A3B8] text-[11px] text-center sm:text-left" }, /* @__PURE__ */ React.createElement("span", null, "AUDIT TRAIL: "), /* @__PURE__ */ React.createElement("span", { className: "text-slate-300" }, "INTELLITRACK-AI-v4.8 \u2022 SHA-256 PROVENANCE LOGGED")), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: onClose,
      className: "w-full sm:w-auto px-5 py-2 rounded-lg bg-[#2563EB] hover:bg-blue-600 text-white font-semibold transition-colors shadow-lg shadow-blue-500/20"
    },
    "Acknowledge & Close"
  ))));
};
export {
  WhyThisLeadModal
};
