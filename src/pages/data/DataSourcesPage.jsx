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
  Layers,
  FileText
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
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
    classification: "CJIS STANDARD L4",
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

export const DataSourcesPage = () => {
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
    setSources((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: "SYNCING", lastSync: "Syncing right now..." } : s))
    );
    setTimeout(() => {
      setSources((prev) =>
        prev.map((s) => (s.id === id ? { ...s, status: "CONNECTED", lastSync: "Just now" } : s))
      );
      toast.success(`Sync complete for ${name}`);
    }, 1500);
  };

  const handleFinishWizard = () => {
    const created = {
      id: `src-${Date.now()}`,
      name: newSourceName || "Custom Telemetry Ingestion Feed",
      type: newSourceType,
      status: "CONNECTED",
      lastSync: "Just now",
      recordsCount: Math.floor(1000 + Math.random() * 5000),
      format: "Standardized Ingestion Pipeline",
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
    const matchesCat =
      filterCategory === "ALL" ||
      (filterCategory === "CDR" && s.type.includes("CDR")) ||
      (filterCategory === "CAD" && s.type.includes("CAD")) ||
      (filterCategory === "FIN" && s.type.includes("Financial")) ||
      (filterCategory === "ALPR" && s.type.includes("ALPR")) ||
      (filterCategory === "OSINT" && s.type.includes("OSINT"));
    const matchesSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.format.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto font-sans pb-16">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 pb-4 border-b border-[#222731]">
        <div>
          <div className="flex items-center gap-2 text-tactical-neutral-500 text-[11px] uppercase tracking-wider font-mono mb-1">
            <span>INGESTION PIPELINES</span>
            <span>/</span>
            <span className="text-tactical-sage-400 font-semibold">DATA SOURCES</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Connected Intelligence Data Feeds
          </h1>
          <p className="text-xs sm:text-sm text-tactical-neutral-400 mt-1 max-w-2xl leading-relaxed">
            Real-time API streams, telecommunications cell tower dumps, financial transaction logs, and ALPR ingest
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => toast.success("Refreshing all stream health checks...")}
            icon={<RefreshCw className="w-3.5 h-3.5" />}
            className="text-xs font-mono border-[#222731]"
          >
            Refresh Feeds
          </Button>
          <Button
            variant="sage"
            size="sm"
            onClick={() => setIsWizardOpen(true)}
            icon={<Plus className="w-3.5 h-3.5" />}
            className="text-xs font-mono"
          >
            Connect Source
          </Button>
        </div>
      </div>

      {/* KPI Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-mono text-xs">
        <div className="bg-[#14171c] border border-[#222731] rounded-xl p-4">
          <div className="flex items-center justify-between text-[11px] text-tactical-neutral-400 font-semibold mb-1">
            <span>ACTIVE FEEDS</span>
            <Activity className="w-3.5 h-3.5 text-tactical-sage-400" />
          </div>
          <div className="text-xl font-bold text-white tracking-tight">6 / 6 Live</div>
          <div className="text-[10px] text-tactical-neutral-500 mt-1">100% Ingress Highway Uptime</div>
        </div>

        <div className="bg-[#14171c] border border-[#222731] rounded-xl p-4">
          <div className="flex items-center justify-between text-[11px] text-tactical-neutral-400 font-semibold mb-1">
            <span>TOTAL RECORDS</span>
            <HardDrive className="w-3.5 h-3.5 text-tactical-neutral-400" />
          </div>
          <div className="text-xl font-bold text-white tracking-tight">244,080</div>
          <div className="text-[10px] text-tactical-neutral-500 mt-1">+18.4% surge in last 24 hrs</div>
        </div>

        <div className="bg-[#14171c] border border-[#222731] rounded-xl p-4">
          <div className="flex items-center justify-between text-[11px] text-tactical-neutral-400 font-semibold mb-1">
            <span>INGRESS LATENCY</span>
            <Zap className="w-3.5 h-3.5 text-tactical-sage-400" />
          </div>
          <div className="text-xl font-bold text-tactical-sage-400 tracking-tight">12 ms</div>
          <div className="text-[10px] text-tactical-neutral-500 mt-1">Queue backlog: 0</div>
        </div>

        <div className="bg-[#14171c] border border-[#222731] rounded-xl p-4">
          <div className="flex items-center justify-between text-[11px] text-tactical-neutral-400 font-semibold mb-1">
            <span>CHAIN OF CUSTODY</span>
            <ShieldCheck className="w-3.5 h-3.5 text-tactical-success-400" />
          </div>
          <div className="text-xl font-bold text-tactical-success-400 tracking-tight">100% Valid</div>
          <div className="text-[10px] text-tactical-neutral-500 mt-1">FRE 902(14) Cryptographic Seal</div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[#14171c] border border-[#222731] rounded-xl p-3 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-1.5 font-mono text-xs">
          {[
            { id: "ALL", label: "All Sources", count: sources.length },
            { id: "CDR", label: "CDR Telephony", count: 1 },
            { id: "CAD", label: "CAD / 911", count: 1 },
            { id: "FIN", label: "Financial", count: 1 },
            { id: "ALPR", label: "ALPR", count: 1 },
            { id: "OSINT", label: "Darknet / OSINT", count: 1 }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilterCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                filterCategory === cat.id
                  ? "bg-[#1c222b] text-white border border-[#2e3644] shadow-sm"
                  : "bg-[#101317] text-tactical-neutral-400 hover:text-white border border-[#222731]"
              }`}
            >
              {cat.label} ({cat.count})
            </button>
          ))}
        </div>

        <div className="relative min-w-[240px]">
          <Search className="w-3.5 h-3.5 text-tactical-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search feeds..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#101317] border border-[#222731] focus:border-tactical-sage-400/50 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder-tactical-neutral-600 focus:outline-none transition-colors font-mono"
          />
        </div>
      </div>

      {/* Grid of Data Sources */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSources.map((src) => (
          <div
            key={src.id}
            className="bg-[#14171c] border border-[#222731] hover:border-[#2e3644] rounded-xl p-5 flex flex-col justify-between transition-all"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-3">
                <span className="text-[10px] font-mono uppercase font-bold text-tactical-sage-400 bg-[#101317] px-2.5 py-1 rounded-md border border-[#222731]">
                  {src.type}
                </span>
                <Badge
                  variant={src.status === "CONNECTED" ? "success" : src.status === "SYNCING" ? "warning" : "danger"}
                  size="sm"
                  className="font-mono text-[9px] uppercase"
                >
                  ● {src.status}
                </Badge>
              </div>

              <h3 className="text-sm font-bold text-white mb-1.5 leading-snug">
                {src.name}
              </h3>

              <div className="text-xs font-mono text-tactical-neutral-400 mb-3 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-tactical-neutral-500" />
                <span>{src.format}</span>
              </div>

              <div className="p-3 rounded-lg bg-[#101317] border border-[#222731] font-mono text-xs space-y-2 mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-tactical-neutral-500">Records:</span>
                  <span className="text-white font-bold">{src.recordsCount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-tactical-neutral-500">Throughput:</span>
                  <span className="text-tactical-sage-400 font-bold">{src.throughput}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-tactical-neutral-500">Last Synced:</span>
                  <span className="text-tactical-neutral-300 font-semibold">{src.lastSync}</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-[#222731] flex items-center justify-between font-mono text-xs">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => handleSyncNow(src.id, src.name)}
                icon={<RefreshCw className="w-3 h-3" />}
                className="text-[11px] py-1 border-[#222731]"
              >
                Sync Now
              </Button>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => toast.success(`Viewing schema for ${src.name}`)}
                  className="p-1.5 rounded-lg bg-[#101317] border border-[#222731] hover:border-[#2e3644] text-tactical-neutral-400 hover:text-white transition-colors"
                  title="Configure Mapping"
                >
                  <Settings className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => {
                    setSources(sources.filter((s) => s.id !== src.id));
                    toast.success(`Removed data source ${src.name}`);
                  }}
                  className="p-1.5 rounded-lg bg-[#101317] border border-[#222731] hover:border-tactical-danger-500/40 text-tactical-neutral-400 hover:text-tactical-danger-400 transition-colors"
                  title="Remove Source"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Wizard Modal */}
      {isWizardOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm select-none font-sans">
          <div className="w-full max-w-xl bg-[#14171c] border border-[#222731] rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="bg-[#101317] px-6 py-4 border-b border-[#222731] flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <Database className="w-4 h-4 text-tactical-sage-400" />
                  <span>Connect Ingestion Source Wizard</span>
                </h2>
                <div className="text-[11px] font-mono text-tactical-neutral-400 mt-0.5">
                  STEP {wizardStep} OF 4 —{" "}
                  {wizardStep === 1
                    ? "SOURCE TYPE"
                    : wizardStep === 2
                    ? "PAYLOAD CONNECTION"
                    : wizardStep === 3
                    ? "SCHEMA MAPPING"
                    : "VERIFY EXTRACT"}
                </div>
              </div>
              <button
                onClick={() => setIsWizardOpen(false)}
                className="p-1.5 rounded-lg text-tactical-neutral-400 hover:text-white hover:bg-[#181d24] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              {wizardStep === 1 && (
                <div className="space-y-3 font-mono text-xs">
                  <div className="text-tactical-neutral-300 font-sans text-sm font-semibold">
                    Select Data Source Category:
                  </div>
                  {[
                    "CDR Cellular Tower Dumps (Telephony / VoLTE)",
                    "CAD 911 Incident Records / Police Reports",
                    "Financial Records & Hawala Transaction Ledgers",
                    "Port Authority & Border Crossing ALPR Scans",
                    "Surveillance Video Feeds & Latent Biometrics",
                    "Darknet Forum & Messaging Intercepts"
                  ].map((t) => (
                    <label
                      key={t}
                      className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                        newSourceType === t
                          ? "bg-[#1c222b] border-tactical-sage-400/60 text-white shadow-sm"
                          : "bg-[#101317] border-[#222731] text-tactical-neutral-400 hover:border-[#2e3644]"
                      }`}
                    >
                      <input
                        type="radio"
                        name="sourceType"
                        checked={newSourceType === t}
                        onChange={() => setNewSourceType(t)}
                        className="text-tactical-sage-500 focus:ring-0 accent-tactical-sage-500"
                      />
                      <span className="font-sans font-medium">{t}</span>
                    </label>
                  ))}
                </div>
              )}

              {wizardStep === 2 && (
                <div className="space-y-4 font-mono text-xs">
                  <div>
                    <label className="text-tactical-neutral-300 block mb-1 font-semibold">
                      Source Name / Feed Title
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Task Force Cell Tower Sector 4"
                      value={newSourceName}
                      onChange={(e) => setNewSourceName(e.target.value)}
                      className="w-full bg-[#101317] border border-[#222731] rounded-lg px-3.5 py-2 text-white focus:outline-none focus:border-tactical-sage-400/50 transition-colors"
                    />
                  </div>

                  <div className="p-6 rounded-xl border-2 border-dashed border-[#222731] hover:border-[#2e3644] bg-[#101317] text-center space-y-2.5 transition-colors">
                    <UploadCloud className="w-10 h-10 text-tactical-sage-400 mx-auto" />
                    <div className="text-white font-sans text-xs font-semibold">
                      Drag & Drop PCAP, CSV, XML, or JSON Telemetry Files
                    </div>
                    <div className="text-[10px] text-tactical-neutral-500">
                      Supports FRE 902(14) digital custody packaging
                    </div>
                    <button
                      type="button"
                      onClick={() => setUploadFileName("CDR_CELL_TOWER_SECTOR4_DUMP.CSV")}
                      className="px-3.5 py-1.5 rounded-lg bg-[#181d24] hover:bg-[#1f242c] border border-[#222731] text-tactical-sage-400 text-xs font-semibold transition-colors"
                    >
                      Select Sample File
                    </button>
                    {uploadFileName && (
                      <div className="text-tactical-sage-400 text-xs font-semibold pt-1 flex items-center justify-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Loaded: {uploadFileName} (14.2 MB · Verified)</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {wizardStep === 3 && (
                <div className="space-y-3 font-mono text-xs">
                  <div className="text-white font-sans text-xs font-semibold">
                    Automatic Field Schema Mapping:
                  </div>
                  <div className="space-y-2 p-3.5 rounded-xl bg-[#101317] border border-[#222731] text-[11px]">
                    <div className="flex justify-between py-1.5 border-b border-[#222731]">
                      <span className="text-tactical-neutral-400">CALLER_ANI_E164 →</span>
                      <span className="text-tactical-sage-400 font-bold">entity.phone.number</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-[#222731]">
                      <span className="text-tactical-neutral-400">CALLED_DIALED_DIGITS →</span>
                      <span className="text-tactical-sage-400 font-bold">entity.phone.target</span>
                    </div>
                    <div className="flex justify-between py-1.5">
                      <span className="text-tactical-neutral-400">IMEI_HARDWARE_SERIAL →</span>
                      <span className="text-tactical-sage-400 font-bold">device.imei.fingerprint</span>
                    </div>
                  </div>
                </div>
              )}

              {wizardStep === 4 && (
                <div className="space-y-3 font-mono text-xs">
                  <div className="text-white font-sans text-xs font-semibold">
                    Preview Extracted Entities:
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#101317] border border-[#222731] space-y-2 text-[11px]">
                    <div className="flex items-center justify-between text-white">
                      <span>POI Extracted: <strong>Viktor Sokolov</strong></span>
                      <Badge variant="success" size="sm">96% CONF</Badge>
                    </div>
                    <div className="flex items-center justify-between text-white">
                      <span>Burner Phone: <strong>+1 (555) 019-8821</strong></span>
                      <Badge variant="neutral" size="sm">14 CALLS</Badge>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-[#101317] px-6 py-3.5 border-t border-[#222731] flex items-center justify-between font-mono text-xs">
              <Button
                variant="secondary"
                size="sm"
                disabled={wizardStep === 1}
                onClick={() => setWizardStep(wizardStep - 1)}
                className="border-[#222731]"
              >
                Back
              </Button>
              {wizardStep < 4 ? (
                <Button
                  variant="sage"
                  size="sm"
                  onClick={() => setWizardStep(wizardStep + 1)}
                  icon={<ArrowRight className="w-3.5 h-3.5" />}
                >
                  Next Step
                </Button>
              ) : (
                <Button
                  variant="sage"
                  size="sm"
                  onClick={handleFinishWizard}
                >
                  Complete Ingestion
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataSourcesPage;
