import React, { useState } from "react";
import {
  Sparkles,
  Download,
  RefreshCw,
  Printer
} from "lucide-react";
import { useActiveCase } from "@/context/CaseContext";
import toast from "react-hot-toast";
const IntelligenceSummaryPage = () => {
  const { activeCase } = useActiveCase();
  const [focusAngle, setFocusAngle] = useState("ALL");
  const [isGenerating, setIsGenerating] = useState(false);
  const handleRegenerate = (angle) => {
    setFocusAngle(angle);
    setIsGenerating(true);
    toast.success(`Regenerating synthesis focused on ${angle} angle...`);
    setTimeout(() => {
      setIsGenerating(false);
      toast.success("Case intelligence briefing updated with latest telemetry");
    }, 1200);
  };
  const handleExport = (format) => {
    toast.success(`Exporting classified dossier in ${format} format...`);
  };
  return /* @__PURE__ */ React.createElement("div", { className: "space-y-6 max-w-5xl mx-auto font-sans pb-16" }, /* @__PURE__ */ React.createElement("div", { className: "bg-[#220e14] border border-[#3d1622] rounded-xl p-6 shadow-xl shadow-rose-950/40 relative overflow-hidden" }, /* @__PURE__ */ React.createElement("div", { className: "absolute top-0 right-0 w-96 h-48 bg-rose-500/5 rounded-full blur-3xl pointer-events-none" }), /* @__PURE__ */ React.createElement("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-5 relative z-10" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-rose-950/80 border border-rose-500/40 text-rose-300 font-mono text-[11px] uppercase tracking-wider mb-2" }, /* @__PURE__ */ React.createElement(Sparkles, { className: "w-3.5 h-3.5 text-rose-400" }), /* @__PURE__ */ React.createElement("span", null, "EXECUTIVE SYNTHESIS GENERATOR \u2022 DOJ STANDARD")), /* @__PURE__ */ React.createElement("h1", { className: "text-2xl sm:text-3xl font-bold text-white tracking-tight" }, "Case Intelligence Briefing & Summary"), /* @__PURE__ */ React.createElement("p", { className: "text-xs sm:text-sm text-rose-200/70 mt-1 max-w-2xl leading-relaxed" }, "NLP-compiled prosecutorial and command memorandum synthesizing all corroborated evidence, graph topology, and prioritized leads.")), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2.5 font-mono text-xs self-start sm:self-auto" }, /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => handleExport("PDF (FIPS Sealed)"),
      className: "px-4 py-2.5 rounded-lg bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold flex items-center gap-2 shadow-lg shadow-rose-950/60 transition-all transform active:scale-95"
    },
    /* @__PURE__ */ React.createElement(Download, { className: "w-3.5 h-3.5" }),
    /* @__PURE__ */ React.createElement("span", null, "Export PDF Dossier")
  ), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => handleExport("DOCX / Grand Jury Packet"),
      className: "px-3.5 py-2.5 rounded-lg bg-[#160a0d] hover:bg-[#30131c] border border-[#3d1622] text-rose-200 font-medium flex items-center gap-1.5 transition-colors"
    },
    /* @__PURE__ */ React.createElement(Printer, { className: "w-3.5 h-3.5" }),
    /* @__PURE__ */ React.createElement("span", null, "Print Packet")
  )))), /* @__PURE__ */ React.createElement("div", { className: "bg-[#220e14] border border-[#3d1622] p-3 rounded-xl flex flex-wrap items-center justify-between gap-3 font-mono text-xs shadow-lg shadow-rose-950/20" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React.createElement("span", { className: "text-rose-300/50 uppercase text-[10px] font-bold" }, "Perspective:"), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => handleRegenerate("ALL"),
      className: `px-3 py-1.5 rounded-lg font-semibold transition-all ${focusAngle === "ALL" ? "bg-rose-600 text-white shadow-md shadow-rose-950/50" : "bg-[#160a0d] text-rose-200/60 hover:text-white"}`
    },
    "Unified Case Synthesis"
  ), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => handleRegenerate("FINANCIAL"),
      className: `px-3 py-1.5 rounded-lg font-semibold transition-all ${focusAngle === "FINANCIAL" ? "bg-rose-600 text-white shadow-md shadow-rose-950/50" : "bg-[#160a0d] text-rose-200/60 hover:text-white"}`
    },
    "Hawala & Financial Angle"
  ), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => handleRegenerate("COMMUNICATIONS"),
      className: `px-3 py-1.5 rounded-lg font-semibold transition-all ${focusAngle === "COMMUNICATIONS" ? "bg-rose-600 text-white shadow-md shadow-rose-950/50" : "bg-[#160a0d] text-rose-200/60 hover:text-white"}`
    },
    "Telephony & Intercepts"
  )), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => handleRegenerate(focusAngle),
      disabled: isGenerating,
      className: "text-rose-400 hover:text-rose-300 flex items-center gap-1.5 text-[11px] font-semibold transition-colors"
    },
    /* @__PURE__ */ React.createElement(RefreshCw, { className: `w-3.5 h-3.5 ${isGenerating ? "animate-spin" : ""}` }),
    /* @__PURE__ */ React.createElement("span", null, "Regenerate Summary")
  )), /* @__PURE__ */ React.createElement("div", { className: "bg-[#220e14] border border-[#3d1622] rounded-2xl shadow-2xl shadow-rose-950/30 p-7 sm:p-10 font-sans space-y-6 relative overflow-hidden" }, /* @__PURE__ */ React.createElement("div", { className: "text-center border-b border-[#3d1622] pb-5" }, /* @__PURE__ */ React.createElement("div", { className: "inline-block px-3.5 py-1 rounded-full bg-rose-950/90 border border-rose-500/50 text-rose-300 font-mono font-bold text-xs uppercase tracking-widest mb-2.5 shadow-sm" }, "TOP SECRET // LAW ENFORCEMENT SENSITIVE // NOFORN"), /* @__PURE__ */ React.createElement("h2", { className: "text-xl font-bold text-white uppercase tracking-tight" }, "UNITED STATES DEPARTMENT OF JUSTICE"), /* @__PURE__ */ React.createElement("div", { className: "font-mono text-xs text-rose-400 mt-1 font-semibold" }, "CRIMINAL INVESTIGATIVE DIVISION \u2022 INTERAGENCY TASK FORCE MEMORANDUM"), /* @__PURE__ */ React.createElement("div", { className: "font-mono text-[11px] text-rose-300/60 mt-1" }, "DOCKET: ", activeCase.caseNumber, " \u2022 DATE: ", (/* @__PURE__ */ new Date()).toLocaleDateString())), /* @__PURE__ */ React.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ React.createElement("h3", { className: "text-sm font-bold font-mono text-rose-300 uppercase tracking-wider border-l-2 border-rose-500 pl-2.5" }, "1. Executive Overview & Investigative Thesis"), /* @__PURE__ */ React.createElement("p", { className: "text-xs sm:text-sm text-rose-100/80 leading-relaxed font-sans" }, "Operation Black Briar focuses on dismantling Transnational Criminal Syndicate #04, an organized money laundering and narcotics trafficking enterprise operating across the Southern District of New York and maritime ports. Analysis of 48 entities and 114 corroborated relationships reveals a tiered conspiratorial structure commanded by primary target ", /* @__PURE__ */ React.createElement("strong", null, "Viktor Konstantin Sokolov"), ".")), /* @__PURE__ */ React.createElement("div", { className: "space-y-2.5" }, /* @__PURE__ */ React.createElement("h3", { className: "text-sm font-bold font-mono text-rose-300 uppercase tracking-wider border-l-2 border-rose-500 pl-2.5" }, "2. Key Entities & Conspiratorial Roles"), /* @__PURE__ */ React.createElement("div", { className: "space-y-2.5 font-mono text-xs" }, /* @__PURE__ */ React.createElement("div", { className: "p-4 rounded-xl bg-[#160a0d] border border-[#3d1622] space-y-1.5 shadow-inner" }, /* @__PURE__ */ React.createElement("div", { className: "flex justify-between items-center" }, /* @__PURE__ */ React.createElement("span", { className: "text-white font-bold text-sm" }, "Viktor Konstantin Sokolov (Alias: Sokol)"), /* @__PURE__ */ React.createElement("span", { className: "text-rose-400 font-bold bg-rose-950/80 px-2 py-0.5 rounded border border-rose-500/30 text-[10px]" }, "ROLE: PRIMARY COORDINATOR")), /* @__PURE__ */ React.createElement("div", { className: "text-rose-200/70 text-[11px] leading-relaxed" }, "High betweenness centrality (0.89). Acts as exclusive broker between Hawala banking nodes and port logistics coordinators.")), /* @__PURE__ */ React.createElement("div", { className: "p-4 rounded-xl bg-[#160a0d] border border-[#3d1622] space-y-1.5 shadow-inner" }, /* @__PURE__ */ React.createElement("div", { className: "flex justify-between items-center" }, /* @__PURE__ */ React.createElement("span", { className: "text-white font-bold text-sm" }, "Dmitri Volkov (Alias: The Anchor)"), /* @__PURE__ */ React.createElement("span", { className: "text-amber-400 font-bold bg-amber-950/80 px-2 py-0.5 rounded border border-amber-500/30 text-[10px]" }, "ROLE: MARITIME LOGISTICS")), /* @__PURE__ */ React.createElement("div", { className: "text-rose-200/70 text-[11px] leading-relaxed" }, "Supervises loading berth arrivals at Pier 42. Co-located 7 times with target vehicle Audi A8.")))), /* @__PURE__ */ React.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ React.createElement("h3", { className: "text-sm font-bold font-mono text-rose-300 uppercase tracking-wider border-l-2 border-rose-500 pl-2.5" }, "3. Operational Locations & Temporal Patterns"), /* @__PURE__ */ React.createElement("div", { className: "p-4 rounded-xl bg-[#160a0d] border border-[#3d1622] text-xs sm:text-sm text-rose-100/80 leading-relaxed font-sans shadow-inner" }, "Pier 42 Maritime Terminal loading berth 4 represents the primary physical nexus. Electronic surveillance and ALPR scan corroboration establish a recurring pattern of convergence on Tuesday and Friday evenings between 19:00 and 21:00 UTC, immediately preceded by structured cash withdrawals under the $10,000 Bank Secrecy Act threshold.")), /* @__PURE__ */ React.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ React.createElement("h3", { className: "text-sm font-bold font-mono text-rose-300 uppercase tracking-wider border-l-2 border-rose-500 pl-2.5" }, "4. Recommended Enforcement Actions & Warrants"), /* @__PURE__ */ React.createElement("ul", { className: "space-y-2 font-mono text-xs text-rose-100/80" }, /* @__PURE__ */ React.createElement("li", { className: "flex items-start gap-2.5" }, /* @__PURE__ */ React.createElement("span", { className: "text-rose-400 font-bold" }, "1."), /* @__PURE__ */ React.createElement("span", null, "Execute Rule 41 Search Warrant on Safehouse 04 (Brooklyn) based on biometric latent print match.")), /* @__PURE__ */ React.createElement("li", { className: "flex items-start gap-2.5" }, /* @__PURE__ */ React.createElement("span", { className: "text-rose-400 font-bold" }, "2."), /* @__PURE__ */ React.createElement("span", null, "Extend Title III wiretap interception on secondary burner telephony (+1 555 019-8821).")), /* @__PURE__ */ React.createElement("li", { className: "flex items-start gap-2.5" }, /* @__PURE__ */ React.createElement("span", { className: "text-rose-400 font-bold" }, "3."), /* @__PURE__ */ React.createElement("span", null, "Issue FinCEN 314(a) emergency freezing orders against shell accounts associated with Astraea Trading Corp.")))), /* @__PURE__ */ React.createElement("div", { className: "pt-4 border-t border-[#3d1622] flex flex-wrap items-center justify-between text-[10px] font-mono text-rose-300/50" }, /* @__PURE__ */ React.createElement("div", null, "EVIDENTIARY HASH: SHA-256 [0x992fa...14cb] \u2022 FRE 902(14) CERTIFIED"), /* @__PURE__ */ React.createElement("div", null, "AUTHORIZED BY: SAIC MARCUS VANCE \u2022 BADGE #FED-0982"))));
};
var stdin_default = IntelligenceSummaryPage;
export {
  IntelligenceSummaryPage,
  stdin_default as default
};
