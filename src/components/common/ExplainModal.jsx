import React from "react";
import { X, Sparkles, CheckCircle2 } from "lucide-react";
const ExplainModal = ({
  isOpen,
  onClose,
  title,
  explanation,
  evidenceCount,
  metrics = []
}) => {
  if (!isOpen) return null;
  return /* @__PURE__ */ React.createElement("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-sm select-none" }, /* @__PURE__ */ React.createElement("div", { className: "w-full max-w-xl bg-navy-900 border border-steel-700/80 rounded-xl shadow-2xl overflow-hidden font-sans" }, /* @__PURE__ */ React.createElement("div", { className: "bg-navy-950 px-5 py-3.5 border-b border-navy-800 flex items-center justify-between" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React.createElement("div", { className: "w-6 h-6 rounded bg-steel-900 border border-steel-500/40 flex items-center justify-center text-steel-400" }, /* @__PURE__ */ React.createElement(Sparkles, { className: "w-3.5 h-3.5" })), /* @__PURE__ */ React.createElement("span", { className: "font-mono text-xs font-bold text-white uppercase tracking-wider" }, "Explainable AI Algorithmic Rationale")), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: onClose,
      className: "p-1 rounded text-slate-400 hover:text-white hover:bg-navy-800 transition-colors"
    },
    /* @__PURE__ */ React.createElement(X, { className: "w-4 h-4" })
  )), /* @__PURE__ */ React.createElement("div", { className: "p-6 space-y-4" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "text-[10px] font-mono uppercase text-steel-400 font-semibold mb-1" }, "HYPOTHESIS / SIGNAL"), /* @__PURE__ */ React.createElement("h3", { className: "text-base font-bold text-white" }, title), /* @__PURE__ */ React.createElement("p", { className: "text-xs text-slate-300 mt-2 leading-relaxed bg-navy-950 p-3 rounded border border-navy-800" }, explanation)), /* @__PURE__ */ React.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ React.createElement("div", { className: "text-[10px] font-mono uppercase text-slate-400 font-semibold" }, "SCORING WEIGHTS & MODEL FACTORS"), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-2 gap-2 font-mono" }, metrics.map((m, idx) => /* @__PURE__ */ React.createElement("div", { key: idx, className: "p-2.5 rounded bg-navy-950/70 border border-navy-800" }, /* @__PURE__ */ React.createElement("div", { className: "text-[10px] text-slate-400" }, m.label), /* @__PURE__ */ React.createElement("div", { className: "text-xs font-bold text-steel-300 mt-0.5" }, m.value))))), /* @__PURE__ */ React.createElement("div", { className: "p-3 bg-navy-950/80 rounded border border-navy-800 flex items-start gap-2.5 text-xs text-slate-400 font-mono" }, /* @__PURE__ */ React.createElement(CheckCircle2, { className: "w-4 h-4 text-threat-low shrink-0 mt-0.5" }), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", { className: "text-slate-200 font-semibold" }, "Fed. R. Evid. 902(14) Certified: "), "All ", evidenceCount, " supporting records are anchored by SHA-256 Merkle proofs, verified against state repository hash anchors."))), /* @__PURE__ */ React.createElement("div", { className: "bg-navy-950 px-5 py-3 border-t border-navy-800 flex items-center justify-between" }, /* @__PURE__ */ React.createElement("div", { className: "text-[10px] font-mono text-slate-500" }, "MODEL: INTELLITRACK-FED-v4.8 \u2022 CJIS AUDIT LOGGED"), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: onClose,
      className: "px-4 py-1.5 rounded bg-steel-600 hover:bg-steel-500 text-white font-mono text-xs font-semibold shadow-md transition-colors"
    },
    "Acknowledge & Dismiss"
  ))));
};
export {
  ExplainModal
};
