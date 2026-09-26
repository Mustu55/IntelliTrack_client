import React, { useState } from "react";
import {
  RefreshCw,
  Clock,
  Terminal,
  X,
  Play,
  Cpu,
  Layers,
  Sparkles,
  Search
} from "lucide-react";
import toast from "react-hot-toast";
const INITIAL_JOBS = [
  {
    id: "JOB-901",
    sourceName: "Manhattan Cell Tower Dumps (AT&T Sector 4)",
    model: "IntelliTrack-NLP-v4.8 + NER Fast-Extract",
    status: "PROCESSING",
    progress: 68,
    entitiesFound: 38,
    relationshipsFound: 92,
    errorCount: 0,
    duration: "2m 14s",
    startedAt: "14:38:10 UTC"
  },
  {
    id: "JOB-900",
    sourceName: "FinCEN SAR Transaction Matrix",
    model: "Financial Entity Extractor v3.1",
    status: "COMPLETED",
    progress: 100,
    entitiesFound: 142,
    relationshipsFound: 310,
    errorCount: 2,
    duration: "4m 02s",
    startedAt: "13:50:00 UTC"
  },
  {
    id: "JOB-899",
    sourceName: "Port Authority ALPR Optical Image Stream",
    model: "YOLOv10-Tactical-ALPR + OCR-License",
    status: "COMPLETED",
    progress: 100,
    entitiesFound: 512,
    relationshipsFound: 840,
    errorCount: 0,
    duration: "8m 45s",
    startedAt: "12:15:30 UTC"
  },
  {
    id: "JOB-898",
    sourceName: "Encrypted Wiretap VoLTE Audio Transcripts",
    model: "Whisper-LawEnforcement-FineTune + Speaker Diarization",
    status: "COMPLETED",
    progress: 100,
    entitiesFound: 64,
    relationshipsFound: 148,
    errorCount: 1,
    duration: "11m 20s",
    startedAt: "10:04:12 UTC"
  }
];
const ExtractionJobsPage = () => {
  const [jobs, setJobs] = useState(INITIAL_JOBS);
  const [selectedLogsJob, setSelectedLogsJob] = useState(null);
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const handleRerun = (id, name) => {
    toast.success(`Triggered extraction re-run for ${name}`);
    setJobs(
      (prev) => prev.map(
        (j) => j.id === id ? { ...j, status: "PROCESSING", progress: 12 } : j
      )
    );
  };
  const filteredJobs = jobs.filter((j) => {
    const matchesStatus = statusFilter === "ALL" || j.status === statusFilter;
    const matchesSearch = j.sourceName.toLowerCase().includes(searchQuery.toLowerCase()) || j.model.toLowerCase().includes(searchQuery.toLowerCase()) || j.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });
  return /* @__PURE__ */ React.createElement("div", { className: "space-y-6 max-w-7xl mx-auto font-sans pb-16" }, /* @__PURE__ */ React.createElement("div", { className: "bg-[#0e221c] border border-[#15382e] rounded-xl p-6 shadow-xl shadow-emerald-950/40 relative overflow-hidden" }, /* @__PURE__ */ React.createElement("div", { className: "absolute top-0 right-0 w-96 h-48 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" }), /* @__PURE__ */ React.createElement("div", { className: "flex flex-col lg:flex-row lg:items-center justify-between gap-5 relative z-10" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 font-mono text-[11px] uppercase tracking-wider mb-2" }, /* @__PURE__ */ React.createElement(Sparkles, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ React.createElement("span", null, "AI EXTRACTION ENGINE \u2022 ACTIVE NLP & COMPUTER VISION")), /* @__PURE__ */ React.createElement("h1", { className: "text-2xl sm:text-3xl font-bold text-white tracking-tight" }, "Intelligence Entity Extraction Jobs"), /* @__PURE__ */ React.createElement("p", { className: "text-xs sm:text-sm text-emerald-200/70 mt-1 max-w-2xl leading-relaxed" }, "Automated named-entity recognition (NER), speaker diarization, ALPR OCR inference passes, and financial graph link discovery batch runs.")), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-3 self-start lg:self-auto" }, /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => toast.success("Scheduled batch extraction job for all active feeds"),
      className: "px-4 py-2.5 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-mono text-xs font-bold flex items-center gap-2 shadow-lg shadow-emerald-950/60 transition-all transform active:scale-95"
    },
    /* @__PURE__ */ React.createElement(Play, { className: "w-3.5 h-3.5" }),
    /* @__PURE__ */ React.createElement("span", null, "Execute Batch Run")
  )))), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4 font-mono" }, /* @__PURE__ */ React.createElement("div", { className: "bg-[#0e221c] border border-[#15382e] rounded-xl p-4 shadow-lg shadow-emerald-950/20" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between text-[11px] text-emerald-400 font-semibold mb-1" }, /* @__PURE__ */ React.createElement("span", null, "PIPELINES RUNNING"), /* @__PURE__ */ React.createElement(Cpu, { className: "w-3.5 h-3.5 text-emerald-400 animate-pulse" })), /* @__PURE__ */ React.createElement("div", { className: "text-2xl font-bold text-white tracking-tight" }, jobs.filter((j) => j.status === "PROCESSING").length, " Active"), /* @__PURE__ */ React.createElement("div", { className: "text-[10px] text-emerald-300/70 mt-1" }, jobs.length, " total batch jobs queued")), /* @__PURE__ */ React.createElement("div", { className: "bg-[#0e221c] border border-[#15382e] rounded-xl p-4 shadow-lg shadow-emerald-950/20" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between text-[11px] text-teal-400 font-semibold mb-1" }, /* @__PURE__ */ React.createElement("span", null, "ENTITIES EXTRACTED"), /* @__PURE__ */ React.createElement(Layers, { className: "w-3.5 h-3.5 text-teal-400" })), /* @__PURE__ */ React.createElement("div", { className: "text-2xl font-bold text-white tracking-tight" }, jobs.reduce((acc, j) => acc + j.entitiesFound, 0), " Total"), /* @__PURE__ */ React.createElement("div", { className: "text-[10px] text-teal-300/70 mt-1" }, "99.4% confidence rating")), /* @__PURE__ */ React.createElement("div", { className: "bg-[#0e221c] border border-[#15382e] rounded-xl p-4 shadow-lg shadow-emerald-950/20" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between text-[11px] text-emerald-400 font-semibold mb-1" }, /* @__PURE__ */ React.createElement("span", null, "RELATIONSHIPS FOUND"), /* @__PURE__ */ React.createElement(Sparkles, { className: "w-3.5 h-3.5 text-emerald-400" })), /* @__PURE__ */ React.createElement("div", { className: "text-2xl font-bold text-emerald-300 tracking-tight" }, jobs.reduce((acc, j) => acc + j.relationshipsFound, 0), " Edges"), /* @__PURE__ */ React.createElement("div", { className: "text-[10px] text-emerald-300/70 mt-1" }, "Graph linkages resolved")), /* @__PURE__ */ React.createElement("div", { className: "bg-[#0e221c] border border-[#15382e] rounded-xl p-4 shadow-lg shadow-emerald-950/20" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between text-[11px] text-emerald-400 font-semibold mb-1" }, /* @__PURE__ */ React.createElement("span", null, "AVG INFERENCE TIME"), /* @__PURE__ */ React.createElement(Clock, { className: "w-3.5 h-3.5 text-emerald-400" })), /* @__PURE__ */ React.createElement("div", { className: "text-2xl font-bold text-emerald-400 tracking-tight" }, "6m 30s"), /* @__PURE__ */ React.createElement("div", { className: "text-[10px] text-emerald-300/70 mt-1" }, "p95 parallel worker runtime"))), /* @__PURE__ */ React.createElement("div", { className: "bg-[#0e221c] border border-[#15382e] rounded-xl p-3 shadow-lg shadow-emerald-950/20 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-1.5 font-mono text-xs" }, ["ALL", "PROCESSING", "COMPLETED"].map((st) => /* @__PURE__ */ React.createElement(
    "button",
    {
      key: st,
      onClick: () => setStatusFilter(st),
      className: `px-3 py-1.5 rounded-lg font-semibold transition-all ${statusFilter === st ? "bg-emerald-600 text-white shadow-md shadow-emerald-950/50" : "bg-[#081411] text-emerald-200/60 hover:text-emerald-300 hover:bg-[#132e26]"}`
    },
    st,
    " (",
    st === "ALL" ? jobs.length : jobs.filter((j) => j.status === st).length,
    ")"
  ))), /* @__PURE__ */ React.createElement("div", { className: "relative min-w-[240px]" }, /* @__PURE__ */ React.createElement(Search, { className: "w-3.5 h-3.5 text-emerald-400/60 absolute left-3 top-1/2 -translate-y-1/2" }), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "text",
      placeholder: "Search extraction jobs...",
      value: searchQuery,
      onChange: (e) => setSearchQuery(e.target.value),
      className: "w-full bg-[#081411] border border-[#15382e] focus:border-emerald-500 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder-emerald-200/40 focus:outline-none transition-colors font-mono"
    }
  ))), /* @__PURE__ */ React.createElement("div", { className: "bg-[#0e221c] border border-[#15382e] rounded-xl overflow-hidden shadow-xl shadow-emerald-950/30 font-mono text-xs" }, /* @__PURE__ */ React.createElement("div", { className: "overflow-x-auto" }, /* @__PURE__ */ React.createElement("table", { className: "w-full text-left" }, /* @__PURE__ */ React.createElement("thead", { className: "bg-[#081411] text-emerald-300/70 text-[11px] uppercase tracking-wider border-b border-[#15382e]" }, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("th", { className: "py-3 px-4" }, "Job ID & Source"), /* @__PURE__ */ React.createElement("th", { className: "py-3 px-4" }, "AI Model Pipeline"), /* @__PURE__ */ React.createElement("th", { className: "py-3 px-4" }, "Status & Progress"), /* @__PURE__ */ React.createElement("th", { className: "py-3 px-4 text-center" }, "Entities"), /* @__PURE__ */ React.createElement("th", { className: "py-3 px-4 text-center" }, "Relationships"), /* @__PURE__ */ React.createElement("th", { className: "py-3 px-4" }, "Duration"), /* @__PURE__ */ React.createElement("th", { className: "py-3 px-4 text-right" }, "Actions"))), /* @__PURE__ */ React.createElement("tbody", { className: "divide-y divide-[#15382e] text-slate-200" }, filteredJobs.map((job) => /* @__PURE__ */ React.createElement("tr", { key: job.id, className: "hover:bg-[#132e26]/60 transition-colors" }, /* @__PURE__ */ React.createElement("td", { className: "py-4 px-4" }, /* @__PURE__ */ React.createElement("div", { className: "font-bold text-emerald-400" }, job.id), /* @__PURE__ */ React.createElement("div", { className: "text-white font-sans font-semibold mt-0.5 max-w-xs truncate" }, job.sourceName)), /* @__PURE__ */ React.createElement("td", { className: "py-4 px-4 text-emerald-200/70 text-[11px]" }, /* @__PURE__ */ React.createElement("div", { className: "font-medium text-slate-200" }, job.model)), /* @__PURE__ */ React.createElement("td", { className: "py-4 px-4 min-w-[190px]" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between text-[10px] mb-1.5" }, /* @__PURE__ */ React.createElement(
    "span",
    {
      className: `font-bold uppercase ${job.status === "COMPLETED" ? "text-emerald-400" : job.status === "PROCESSING" ? "text-teal-300 animate-pulse" : "text-red-400"}`
    },
    "\u25CF ",
    job.status
  ), /* @__PURE__ */ React.createElement("span", { className: "text-emerald-300 font-bold" }, job.progress, "%")), /* @__PURE__ */ React.createElement("div", { className: "w-full bg-[#081411] rounded-full h-2 overflow-hidden border border-[#15382e]" }, /* @__PURE__ */ React.createElement(
    "div",
    {
      className: `h-full transition-all duration-300 ${job.status === "COMPLETED" ? "bg-gradient-to-r from-emerald-500 to-teal-400" : "bg-emerald-400 animate-pulse"}`,
      style: { width: `${job.progress}%` }
    }
  ))), /* @__PURE__ */ React.createElement("td", { className: "py-4 px-4 text-center font-bold text-white text-sm" }, job.entitiesFound), /* @__PURE__ */ React.createElement("td", { className: "py-4 px-4 text-center font-bold text-teal-400 text-sm" }, job.relationshipsFound), /* @__PURE__ */ React.createElement("td", { className: "py-4 px-4 text-emerald-200/70 text-[11px]" }, /* @__PURE__ */ React.createElement("div", { className: "font-semibold text-white" }, job.duration), /* @__PURE__ */ React.createElement("div", { className: "text-[10px] text-emerald-200/40" }, job.startedAt)), /* @__PURE__ */ React.createElement("td", { className: "py-4 px-4 text-right space-x-2" }, /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => setSelectedLogsJob(job),
      className: "px-2.5 py-1.5 rounded-lg bg-[#081411] hover:bg-[#132e26] border border-[#15382e] hover:border-emerald-500/40 text-emerald-300 text-[11px] inline-flex items-center gap-1 transition-colors",
      title: "Inspect Job Logs"
    },
    /* @__PURE__ */ React.createElement(Terminal, { className: "w-3 h-3 text-emerald-400" }),
    /* @__PURE__ */ React.createElement("span", null, "Logs")
  ), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => handleRerun(job.id, job.sourceName),
      className: "px-2.5 py-1.5 rounded-lg bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-500/40 text-emerald-300 text-[11px] inline-flex items-center gap-1 transition-colors",
      title: "Re-run extraction"
    },
    /* @__PURE__ */ React.createElement(RefreshCw, { className: "w-3 h-3" }),
    /* @__PURE__ */ React.createElement("span", null, "Re-run")
  )))))))), selectedLogsJob && /* @__PURE__ */ React.createElement("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm select-none font-mono" }, /* @__PURE__ */ React.createElement("div", { className: "w-full max-w-2xl bg-[#0e221c] border border-emerald-500/60 rounded-2xl shadow-2xl shadow-emerald-950/90 overflow-hidden" }, /* @__PURE__ */ React.createElement("div", { className: "bg-[#081411] px-5 py-3.5 border-b border-[#15382e] flex items-center justify-between" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React.createElement(Terminal, { className: "w-4 h-4 text-emerald-400" }), /* @__PURE__ */ React.createElement("span", { className: "text-xs font-bold text-white uppercase tracking-wider" }, "Parser Execution Logs \u2014 ", selectedLogsJob.id)), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => setSelectedLogsJob(null),
      className: "p-1 rounded text-emerald-200/60 hover:text-white"
    },
    /* @__PURE__ */ React.createElement(X, { className: "w-4 h-4" })
  )), /* @__PURE__ */ React.createElement("div", { className: "p-4 bg-[#081411]/95 text-[11px] text-emerald-200/90 space-y-2 h-72 overflow-y-auto font-mono leading-relaxed" }, /* @__PURE__ */ React.createElement("div", { className: "text-emerald-400/70" }, "[14:38:10 UTC] INFO: Initializing model weights ", selectedLogsJob.model), /* @__PURE__ */ React.createElement("div", { className: "text-emerald-400/70" }, "[14:38:11 UTC] INFO: Reading binary telemetry stream for ", selectedLogsJob.sourceName), /* @__PURE__ */ React.createElement("div", { className: "text-teal-300" }, "[14:38:14 UTC] DEBUG: Extracted 12 E164 Phone numbers, matching carrier registry"), /* @__PURE__ */ React.createElement("div", { className: "text-teal-300" }, "[14:38:19 UTC] DEBUG: Audio diarization resolved 2 dominant speakers (Confidence 98.2%)"), /* @__PURE__ */ React.createElement("div", { className: "text-emerald-300 font-semibold" }, "[14:38:22 UTC] SUCCESS: Entity 'Viktor Sokolov' linked to 3 phone IDs via co-occurrence"), /* @__PURE__ */ React.createElement("div", { className: "text-emerald-400" }, "[14:38:25 UTC] AUDIT: FRE 902(14) Cryptographic SHA-256 fingerprint anchored"), /* @__PURE__ */ React.createElement("div", { className: "text-emerald-400 font-bold bg-emerald-950/60 p-1.5 rounded border border-emerald-500/30" }, "[14:38:30 UTC] PROGRESS: Batch parsing reached ", selectedLogsJob.progress, "% completion")), /* @__PURE__ */ React.createElement("div", { className: "bg-[#081411] px-5 py-3 border-t border-[#15382e] flex justify-end" }, /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => setSelectedLogsJob(null),
      className: "px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors"
    },
    "Close Log"
  )))));
};
var stdin_default = ExtractionJobsPage;
export {
  ExtractionJobsPage,
  stdin_default as default
};
