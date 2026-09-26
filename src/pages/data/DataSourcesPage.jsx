import React, { useState } from "react";
import {
  Database,
  Plus,
  RefreshCw,
  Trash2,
  Settings,
  CheckCircle2,
  UploadCloud,
  ArrowRight,
  ShieldCheck,
  X,
  Search,
  Activity,
  Zap,
  HardDrive,
  Layers
} from "lucide-react";
import toast from "react-hot-toast";
const INITIAL_SOURCES = [
  {
    id: "src-1",
    name: "Metropolitan CAD 911 Incident Dispatches",
    type: "CAD/RMS Logs",
    status: "CONNECTED",
    lastSync: "4 mins ago",
    recordsCount: 42180,
    format: "REST API (Live Push)",
    classification: "CJI STANDARD L4",
    throughput: "340 ev/sec"
  },
  {
    id: "src-2",
    name: "Federal Title III Wiretap Cellular Intercepts",
    type: "CDR / Telephony",
    status: "CONNECTED",
    lastSync: "12 secs ago",
    recordsCount: 18450,
    format: "VoLTE SIP / PCAP Streams",
    classification: "FRE 902(14) ENCRYPTED",
    throughput: "1,200 ev/sec"
  },
  {
    id: "src-3",
    name: "FinCEN Suspicious Activity Reports (SAR)",
    type: "Financial Intel",
    status: "CONNECTED",
    lastSync: "1 hour ago",
    recordsCount: 8940,
    format: "FinCEN XML Gateway",
    classification: "BANK SECRECY ACT",
    throughput: "45 ev/sec"
  },
  {
    id: "src-4",
    name: "Port Authority ALPR Vehicle Scan Terminals",
    type: "Surveillance & ALPR",
    status: "CONNECTED",
    lastSync: "2 mins ago",
    recordsCount: 154200,
    format: "OCR Vector Database",
    classification: "LAW ENFORCEMENT SENSITIVE",
    throughput: "890 ev/sec"
  },
  {
    id: "src-5",
    name: "State Biometric Fingerprint & DNA Repository",
    type: "Biometric Records",
    status: "SYNCING",
    lastSync: "Syncing batch #4...",
    recordsCount: 6310,
    format: "NIST ANSI/NIST-ITL",
    classification: "FBI CJIS BIO-PORTAL",
    throughput: "120 ev/sec"
  },
  {
    id: "src-6",
    name: "Darknet Forum Telemetry & Telegram Scrapes",
    type: "Open Source (OSINT)",
    status: "DEGRADED",
    lastSync: "3 hours ago",
    recordsCount: 14200,
    format: "JSON / Tor Hidden Service",
    classification: "UNVERIFIED OSINT",
    throughput: "18 ev/sec"
  }
];
const DataSourcesPage = () => {
  const [sources, setSources] = useState(INITIAL_SOURCES);
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [wizardStep, setWizardStep] = useState(1);
  const [filterCategory, setFilterCategory] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [newSourceType, setNewSourceType] = useState("CDR Cellular Tower Dumps");
  const [newSourceName, setNewSourceName] = useState("");
  const [uploadFileName, setUploadFileName] = useState("");
  const handleSyncNow = (id, name) => {
    toast.success(`Triggered sync job for ${name}`);
    setSources(
      (prev) => prev.map(
        (s) => s.id === id ? { ...s, status: "SYNCING", lastSync: "Syncing right now..." } : s
      )
    );
    setTimeout(() => {
      setSources(
        (prev) => prev.map(
          (s) => s.id === id ? { ...s, status: "CONNECTED", lastSync: "Just now" } : s
        )
      );
      toast.success(`Sync complete for ${name}`);
    }, 2e3);
  };
  const handleFinishWizard = () => {
    const created = {
      id: `src-${Date.now()}`,
      name: newSourceName || "Custom Law Enforcement Telemetry Feed",
      type: newSourceType,
      status: "CONNECTED",
      lastSync: "Just now",
      recordsCount: Math.floor(1e3 + Math.random() * 5e3),
      format: "Standardized CJIS Ingestion Pipeline",
      classification: "LAW ENFORCEMENT SENSITIVE",
      throughput: "250 ev/sec"
    };
    setSources([created, ...sources]);
    setIsWizardOpen(false);
    setWizardStep(1);
    setNewSourceName("");
    setUploadFileName("");
    toast.success("New intelligence data source connected successfully");
  };
  const filteredSources = sources.filter((s) => {
    const matchesCat = filterCategory === "ALL" || filterCategory === "CDR" && s.type.includes("CDR") || filterCategory === "CAD" && s.type.includes("CAD") || filterCategory === "FIN" && s.type.includes("Financial") || filterCategory === "ALPR" && s.type.includes("ALPR") || filterCategory === "OSINT" && s.type.includes("OSINT");
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.type.toLowerCase().includes(searchQuery.toLowerCase()) || s.format.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });
  return /* @__PURE__ */ React.createElement("div", { className: "space-y-6 max-w-7xl mx-auto font-sans pb-16" }, /* @__PURE__ */ React.createElement("div", { className: "bg-[#0e221c] border border-[#15382e] rounded-xl p-6 shadow-xl shadow-emerald-950/40 relative overflow-hidden" }, /* @__PURE__ */ React.createElement("div", { className: "absolute top-0 right-0 w-96 h-48 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" }), /* @__PURE__ */ React.createElement("div", { className: "flex flex-col lg:flex-row lg:items-center justify-between gap-5 relative z-10" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 font-mono text-[11px] uppercase tracking-wider mb-2" }, /* @__PURE__ */ React.createElement("span", { className: "w-2 h-2 rounded-full bg-emerald-400 animate-pulse" }), /* @__PURE__ */ React.createElement(Database, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ React.createElement("span", null, "DATA INGESTION PIPELINE \u2022 ACTIVE HIGHWAY")), /* @__PURE__ */ React.createElement("h1", { className: "text-2xl sm:text-3xl font-bold text-white tracking-tight" }, "Connected Intelligence Data Sources"), /* @__PURE__ */ React.createElement("p", { className: "text-xs sm:text-sm text-emerald-200/70 mt-1 max-w-2xl leading-relaxed" }, "Real-time API feeds, telecommunications cell tower dumps, financial transaction logs, CAD dispatches, and ALPR optical stream ingest.")), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-3 self-start lg:self-auto" }, /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => {
        toast.success("Refreshing all live stream health checks...");
      },
      className: "px-3.5 py-2.5 rounded-lg bg-[#081411] hover:bg-[#132e26] border border-[#15382e] hover:border-emerald-500/40 text-emerald-300 font-mono text-xs font-semibold flex items-center gap-2 transition-all shadow-md"
    },
    /* @__PURE__ */ React.createElement(RefreshCw, { className: "w-3.5 h-3.5" }),
    /* @__PURE__ */ React.createElement("span", { className: "hidden sm:inline" }, "Refresh Feeds")
  ), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => setIsWizardOpen(true),
      className: "px-4 py-2.5 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-mono text-xs font-bold flex items-center gap-2 shadow-lg shadow-emerald-950/60 transition-all transform active:scale-95"
    },
    /* @__PURE__ */ React.createElement(Plus, { className: "w-4 h-4" }),
    /* @__PURE__ */ React.createElement("span", null, "Connect New Data Source")
  )))), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4 font-mono" }, /* @__PURE__ */ React.createElement("div", { className: "bg-[#0e221c] border border-[#15382e] rounded-xl p-4 shadow-lg shadow-emerald-950/20 relative overflow-hidden" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between text-[11px] text-emerald-400 font-semibold mb-1" }, /* @__PURE__ */ React.createElement("span", null, "ACTIVE FEEDS"), /* @__PURE__ */ React.createElement(Activity, { className: "w-3.5 h-3.5 text-emerald-400 animate-pulse" })), /* @__PURE__ */ React.createElement("div", { className: "text-2xl font-bold text-white tracking-tight" }, "6 / 6 Live"), /* @__PURE__ */ React.createElement("div", { className: "text-[10px] text-emerald-300/70 mt-1 flex items-center gap-1" }, /* @__PURE__ */ React.createElement("span", { className: "w-1.5 h-1.5 rounded-full bg-emerald-400" }), /* @__PURE__ */ React.createElement("span", null, "100% Ingress Highway Uptime"))), /* @__PURE__ */ React.createElement("div", { className: "bg-[#0e221c] border border-[#15382e] rounded-xl p-4 shadow-lg shadow-emerald-950/20 relative overflow-hidden" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between text-[11px] text-teal-400 font-semibold mb-1" }, /* @__PURE__ */ React.createElement("span", null, "TOTAL RECORDS"), /* @__PURE__ */ React.createElement(HardDrive, { className: "w-3.5 h-3.5 text-teal-400" })), /* @__PURE__ */ React.createElement("div", { className: "text-2xl font-bold text-white tracking-tight" }, "244,080"), /* @__PURE__ */ React.createElement("div", { className: "text-[10px] text-teal-300/70 mt-1" }, "+18.4% surge in last 24 hrs")), /* @__PURE__ */ React.createElement("div", { className: "bg-[#0e221c] border border-[#15382e] rounded-xl p-4 shadow-lg shadow-emerald-950/20 relative overflow-hidden" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between text-[11px] text-emerald-400 font-semibold mb-1" }, /* @__PURE__ */ React.createElement("span", null, "INGRESS LATENCY"), /* @__PURE__ */ React.createElement(Zap, { className: "w-3.5 h-3.5 text-emerald-400" })), /* @__PURE__ */ React.createElement("div", { className: "text-2xl font-bold text-emerald-300 tracking-tight" }, "12 ms"), /* @__PURE__ */ React.createElement("div", { className: "text-[10px] text-emerald-300/70 mt-1" }, "p99 streaming queue backlog: 0")), /* @__PURE__ */ React.createElement("div", { className: "bg-[#0e221c] border border-[#15382e] rounded-xl p-4 shadow-lg shadow-emerald-950/20 relative overflow-hidden" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between text-[11px] text-emerald-400 font-semibold mb-1" }, /* @__PURE__ */ React.createElement("span", null, "CHAIN OF CUSTODY"), /* @__PURE__ */ React.createElement(ShieldCheck, { className: "w-3.5 h-3.5 text-emerald-400" })), /* @__PURE__ */ React.createElement("div", { className: "text-2xl font-bold text-emerald-400 tracking-tight" }, "100% Valid"), /* @__PURE__ */ React.createElement("div", { className: "text-[10px] text-emerald-300/70 mt-1" }, "FRE 902(14) Cryptographic Seal"))), /* @__PURE__ */ React.createElement("div", { className: "bg-[#0e221c] border border-[#15382e] rounded-xl p-3 shadow-lg shadow-emerald-950/20 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3" }, /* @__PURE__ */ React.createElement("div", { className: "flex flex-wrap items-center gap-1.5 font-mono text-xs" }, [
    { id: "ALL", label: "All Sources", count: sources.length },
    { id: "CDR", label: "CDR Telephony", count: 1 },
    { id: "CAD", label: "CAD / 911", count: 1 },
    { id: "FIN", label: "Financial", count: 1 },
    { id: "ALPR", label: "ALPR / Scans", count: 1 },
    { id: "OSINT", label: "Darknet / OSINT", count: 1 }
  ].map((cat) => /* @__PURE__ */ React.createElement(
    "button",
    {
      key: cat.id,
      onClick: () => setFilterCategory(cat.id),
      className: `px-3 py-1.5 rounded-lg font-semibold transition-all ${filterCategory === cat.id ? "bg-emerald-600 text-white shadow-md shadow-emerald-950/50" : "bg-[#081411] text-emerald-200/60 hover:text-emerald-300 hover:bg-[#132e26]"}`
    },
    cat.label,
    " (",
    cat.count,
    ")"
  ))), /* @__PURE__ */ React.createElement("div", { className: "relative min-w-[240px]" }, /* @__PURE__ */ React.createElement(Search, { className: "w-3.5 h-3.5 text-emerald-400/60 absolute left-3 top-1/2 -translate-y-1/2" }), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "text",
      placeholder: "Search feed name, protocol, format...",
      value: searchQuery,
      onChange: (e) => setSearchQuery(e.target.value),
      className: "w-full bg-[#081411] border border-[#15382e] focus:border-emerald-500 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder-emerald-200/40 focus:outline-none transition-colors font-mono"
    }
  ))), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" }, filteredSources.map((src) => /* @__PURE__ */ React.createElement(
    "div",
    {
      key: src.id,
      className: "bg-[#0e221c] border border-[#15382e] hover:border-emerald-500/50 rounded-xl p-5 flex flex-col justify-between shadow-xl shadow-emerald-950/20 transition-all group"
    },
    /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "flex items-start justify-between gap-2 mb-3" }, /* @__PURE__ */ React.createElement("span", { className: "text-[10px] font-mono uppercase font-bold text-emerald-300 bg-[#081411] px-2.5 py-1 rounded-md border border-[#15382e]" }, src.type), /* @__PURE__ */ React.createElement(
      "span",
      {
        className: `text-[9px] font-mono px-2 py-0.5 rounded-md font-bold uppercase ${src.status === "CONNECTED" ? "bg-emerald-950/80 text-emerald-300 border border-emerald-500/30" : src.status === "SYNCING" ? "bg-teal-950/80 text-teal-300 border border-teal-500/30 animate-pulse" : "bg-amber-950/80 text-amber-300 border border-amber-500/30"}`
      },
      "\u25CF ",
      src.status
    )), /* @__PURE__ */ React.createElement("h3", { className: "text-base font-bold text-white group-hover:text-emerald-300 transition-colors mb-1.5 leading-snug" }, src.name), /* @__PURE__ */ React.createElement("div", { className: "text-xs font-mono text-emerald-200/60 mb-3 flex items-center gap-1.5" }, /* @__PURE__ */ React.createElement(Layers, { className: "w-3.5 h-3.5 text-teal-400" }), /* @__PURE__ */ React.createElement("span", null, src.format)), /* @__PURE__ */ React.createElement("div", { className: "p-3 rounded-lg bg-[#081411] border border-[#15382e] font-mono text-xs space-y-2 mb-4" }, /* @__PURE__ */ React.createElement("div", { className: "flex justify-between items-center" }, /* @__PURE__ */ React.createElement("span", { className: "text-emerald-200/50" }, "Total Records:"), /* @__PURE__ */ React.createElement("span", { className: "text-white font-bold" }, src.recordsCount.toLocaleString())), /* @__PURE__ */ React.createElement("div", { className: "flex justify-between items-center" }, /* @__PURE__ */ React.createElement("span", { className: "text-emerald-200/50" }, "Throughput:"), /* @__PURE__ */ React.createElement("span", { className: "text-teal-300 font-bold" }, src.throughput)), /* @__PURE__ */ React.createElement("div", { className: "flex justify-between items-center" }, /* @__PURE__ */ React.createElement("span", { className: "text-emerald-200/50" }, "Last Synced:"), /* @__PURE__ */ React.createElement("span", { className: "text-emerald-400 font-semibold" }, src.lastSync)), /* @__PURE__ */ React.createElement("div", { className: "flex justify-between items-center text-[10px] pt-1 border-t border-[#15382e]" }, /* @__PURE__ */ React.createElement("span", { className: "text-emerald-200/40" }, "Security Classification:"), /* @__PURE__ */ React.createElement("span", { className: "text-slate-300 font-semibold" }, src.classification)))),
    /* @__PURE__ */ React.createElement("div", { className: "pt-3 border-t border-[#15382e] flex items-center justify-between font-mono text-xs" }, /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => handleSyncNow(src.id, src.name),
        className: "px-3 py-1.5 rounded-lg bg-[#081411] hover:bg-[#132e26] border border-[#15382e] text-emerald-300 hover:text-emerald-200 flex items-center gap-1.5 transition-all shadow-sm",
        title: "Force Synchronization"
      },
      /* @__PURE__ */ React.createElement(RefreshCw, { className: "w-3.5 h-3.5" }),
      /* @__PURE__ */ React.createElement("span", null, "Sync Now")
    ), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-1.5" }, /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => toast.success(`Viewing mapping schema for ${src.name}`),
        className: "p-2 rounded-lg bg-[#081411] border border-[#15382e] hover:border-emerald-500/40 text-emerald-200/60 hover:text-emerald-300 transition-colors",
        title: "Configure Mapping"
      },
      /* @__PURE__ */ React.createElement(Settings, { className: "w-3.5 h-3.5" })
    ), /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => {
          setSources(sources.filter((s) => s.id !== src.id));
          toast.success(`Removed data source ${src.name}`);
        },
        className: "p-2 rounded-lg bg-[#081411] border border-[#15382e] hover:border-red-500/40 text-emerald-200/60 hover:text-red-400 transition-colors",
        title: "Remove Source"
      },
      /* @__PURE__ */ React.createElement(Trash2, { className: "w-3.5 h-3.5" })
    )))
  ))), isWizardOpen && /* @__PURE__ */ React.createElement("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm select-none font-sans" }, /* @__PURE__ */ React.createElement("div", { className: "w-full max-w-xl bg-[#0e221c] border border-emerald-500/50 rounded-2xl shadow-2xl shadow-emerald-950/80 overflow-hidden animate-in fade-in zoom-in-95 duration-150" }, /* @__PURE__ */ React.createElement("div", { className: "bg-[#081411] px-6 py-4 border-b border-[#15382e] flex items-center justify-between" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h2", { className: "text-base font-bold text-white flex items-center gap-2" }, /* @__PURE__ */ React.createElement(Database, { className: "w-4 h-4 text-emerald-400" }), /* @__PURE__ */ React.createElement("span", null, "Connect Ingestion Source Wizard")), /* @__PURE__ */ React.createElement("div", { className: "text-[11px] font-mono text-emerald-400 mt-0.5" }, "STEP ", wizardStep, " OF 4 \u2014", " ", wizardStep === 1 ? "SOURCE TYPE" : wizardStep === 2 ? "PAYLOAD CONNECTION" : wizardStep === 3 ? "SCHEMA MAPPING" : "VERIFY EXTRACT")), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => setIsWizardOpen(false),
      className: "p-1.5 rounded-lg text-emerald-200/60 hover:text-white hover:bg-[#132e26] transition-colors"
    },
    /* @__PURE__ */ React.createElement(X, { className: "w-4 h-4" })
  )), /* @__PURE__ */ React.createElement("div", { className: "p-6 space-y-4" }, wizardStep === 1 && /* @__PURE__ */ React.createElement("div", { className: "space-y-3 font-mono text-xs" }, /* @__PURE__ */ React.createElement("div", { className: "text-slate-200 font-sans text-sm font-semibold" }, "Select Data Source Category:"), [
    "CDR Cellular Tower Dumps (Telephony / VoLTE)",
    "CAD 911 Incident Records / Police Reports",
    "Financial Records & Hawala Transaction Ledgers",
    "Port Authority & Border Crossing ALPR Scans",
    "Surveillance Video Feeds & Latent Biometrics",
    "Darknet Forum & Messaging Intercepts"
  ].map((t) => /* @__PURE__ */ React.createElement(
    "label",
    {
      key: t,
      className: `flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${newSourceType === t ? "bg-[#132e26] border-emerald-500 text-white shadow-sm" : "bg-[#081411] border-[#15382e] text-emerald-200/70 hover:border-emerald-600/40"}`
    },
    /* @__PURE__ */ React.createElement(
      "input",
      {
        type: "radio",
        name: "sourceType",
        checked: newSourceType === t,
        onChange: () => setNewSourceType(t),
        className: "text-emerald-500 focus:ring-0 accent-emerald-500"
      }
    ),
    /* @__PURE__ */ React.createElement("span", { className: "font-sans font-medium" }, t)
  ))), wizardStep === 2 && /* @__PURE__ */ React.createElement("div", { className: "space-y-4 font-mono text-xs" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: "text-slate-300 block mb-1 font-semibold" }, "Source Name / Feed Title"), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "text",
      placeholder: "e.g., Manhattan North Task Force CDR Dump #12",
      value: newSourceName,
      onChange: (e) => setNewSourceName(e.target.value),
      className: "w-full bg-[#081411] border border-[#15382e] rounded-lg px-3.5 py-2 text-slate-100 focus:outline-none focus:border-emerald-500 transition-colors"
    }
  )), /* @__PURE__ */ React.createElement("div", { className: "p-6 rounded-xl border-2 border-dashed border-[#15382e] hover:border-emerald-500/50 bg-[#081411] text-center space-y-2.5 transition-colors" }, /* @__PURE__ */ React.createElement(UploadCloud, { className: "w-10 h-10 text-emerald-400 mx-auto" }), /* @__PURE__ */ React.createElement("div", { className: "text-slate-200 font-sans text-xs font-semibold" }, "Drag & Drop PCAP, CSV, XML, or JSON Telemetry Files"), /* @__PURE__ */ React.createElement("div", { className: "text-[10px] text-emerald-200/50" }, "Supports FRE 902(14) compliant digital custody packaging up to 2.5 GB"), /* @__PURE__ */ React.createElement(
    "button",
    {
      type: "button",
      onClick: () => setUploadFileName("CDR_CELL_TOWER_SECTOR4_DUMP.CSV"),
      className: "px-3.5 py-1.5 rounded-lg bg-[#132e26] hover:bg-emerald-950 border border-emerald-500/40 text-emerald-300 text-xs font-semibold transition-colors"
    },
    "Select Sample Evidence File"
  ), uploadFileName && /* @__PURE__ */ React.createElement("div", { className: "text-emerald-400 text-xs font-semibold pt-1 flex items-center justify-center gap-1.5" }, /* @__PURE__ */ React.createElement(CheckCircle2, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ React.createElement("span", null, "Loaded: ", uploadFileName, " (14.2 MB \u2022 SHA-256 Verified)")))), wizardStep === 3 && /* @__PURE__ */ React.createElement("div", { className: "space-y-3 font-mono text-xs" }, /* @__PURE__ */ React.createElement("div", { className: "text-slate-200 font-sans text-xs font-semibold" }, "Automatic Field Schema Mapping:"), /* @__PURE__ */ React.createElement("div", { className: "space-y-2 p-3.5 rounded-xl bg-[#081411] border border-[#15382e] text-[11px]" }, /* @__PURE__ */ React.createElement("div", { className: "flex justify-between py-1.5 border-b border-[#15382e]" }, /* @__PURE__ */ React.createElement("span", { className: "text-emerald-200/50" }, "CALLER_ANI_E164 \u2794"), /* @__PURE__ */ React.createElement("span", { className: "text-emerald-300 font-bold" }, "entity.phone.number")), /* @__PURE__ */ React.createElement("div", { className: "flex justify-between py-1.5 border-b border-[#15382e]" }, /* @__PURE__ */ React.createElement("span", { className: "text-emerald-200/50" }, "CALLED_DIALED_DIGITS \u2794"), /* @__PURE__ */ React.createElement("span", { className: "text-emerald-300 font-bold" }, "entity.phone.target")), /* @__PURE__ */ React.createElement("div", { className: "flex justify-between py-1.5 border-b border-[#15382e]" }, /* @__PURE__ */ React.createElement("span", { className: "text-emerald-200/50" }, "AZIMUTH_ANTENNA_BEAM \u2794"), /* @__PURE__ */ React.createElement("span", { className: "text-emerald-300 font-bold" }, "geo.cell_tower.bearing")), /* @__PURE__ */ React.createElement("div", { className: "flex justify-between py-1.5" }, /* @__PURE__ */ React.createElement("span", { className: "text-emerald-200/50" }, "IMEI_HARDWARE_SERIAL \u2794"), /* @__PURE__ */ React.createElement("span", { className: "text-emerald-300 font-bold" }, "device.imei.fingerprint")))), wizardStep === 4 && /* @__PURE__ */ React.createElement("div", { className: "space-y-3 font-mono text-xs" }, /* @__PURE__ */ React.createElement("div", { className: "text-slate-200 font-sans text-xs font-semibold" }, "Preview Extracted Entities (Sample 5 rows parsed):"), /* @__PURE__ */ React.createElement("div", { className: "p-3.5 rounded-xl bg-[#081411] border border-[#15382e] space-y-2.5 text-[11px]" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between text-slate-200" }, /* @__PURE__ */ React.createElement("span", null, "POI Extracted: ", /* @__PURE__ */ React.createElement("strong", null, "Viktor Sokolov (Alias: Sokol)")), /* @__PURE__ */ React.createElement("span", { className: "text-emerald-400 font-bold" }, "CONFIDENCE: 96%")), /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between text-slate-200" }, /* @__PURE__ */ React.createElement("span", null, "Burner Phone: ", /* @__PURE__ */ React.createElement("strong", null, "+1 (555) 019-8821")), /* @__PURE__ */ React.createElement("span", { className: "text-teal-300 font-bold" }, "14 CALL RECORDS")), /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between text-slate-200" }, /* @__PURE__ */ React.createElement("span", null, "Cell Tower Azimuth: ", /* @__PURE__ */ React.createElement("strong", null, "Tower #42 Sector B")), /* @__PURE__ */ React.createElement("span", { className: "text-emerald-400 font-bold" }, "CO-LOCATED"))))), /* @__PURE__ */ React.createElement("div", { className: "bg-[#081411] px-6 py-3.5 border-t border-[#15382e] flex items-center justify-between font-mono text-xs" }, /* @__PURE__ */ React.createElement(
    "button",
    {
      disabled: wizardStep === 1,
      onClick: () => setWizardStep(wizardStep - 1),
      className: "px-3.5 py-1.5 rounded-lg bg-[#0e221c] border border-[#15382e] hover:bg-[#132e26] disabled:opacity-40 text-slate-300 transition-colors"
    },
    "Back"
  ), wizardStep < 4 ? /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => setWizardStep(wizardStep + 1),
      className: "px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center gap-1.5 transition-all shadow-md"
    },
    /* @__PURE__ */ React.createElement("span", null, "Next Step"),
    /* @__PURE__ */ React.createElement(ArrowRight, { className: "w-3.5 h-3.5" })
  ) : /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: handleFinishWizard,
      className: "px-4 py-1.5 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold transition-all shadow-md"
    },
    "Complete Ingestion"
  )))));
};
var stdin_default = DataSourcesPage;
export {
  DataSourcesPage,
  stdin_default as default
};
