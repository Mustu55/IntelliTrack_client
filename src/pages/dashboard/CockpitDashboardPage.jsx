import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Briefcase,
  Users,
  Share2,
  Flame,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Database,
  FileText,
  DollarSign,
  Camera,
  Globe,
  History,
  Sparkles,
  Cpu,
  MapPin,
  Calendar,
  CreditCard,
  Phone,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  Loader2,
  Activity,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
} from "recharts";
import { WhyThisLeadModal } from "@/components/common/WhyThisLeadModal";
import { useGetDashboardSummaryQuery, useGetRecentActivityQuery } from "@/store/api/apiSlice";

const DEFAULT_ACTIVITY_DATA = [
  { day: "Day 01", communications: 45, transactions: 12, sightings: 8 },
  { day: "Day 05", communications: 62, transactions: 19, sightings: 14 },
  { day: "Day 10", communications: 98, transactions: 35, sightings: 22 },
  { day: "Day 15", communications: 145, transactions: 52, sightings: 39 },
  { day: "Day 20", communications: 110, transactions: 44, sightings: 28 },
  { day: "Day 25", communications: 185, transactions: 78, sightings: 48 },
  { day: "Day 30", communications: 160, transactions: 65, sightings: 42 },
];

const DEFAULT_ENTITY_DISTRIBUTION = [
  { name: "People (POI)", count: 482, color: "#2563EB" },
  { name: "Phones (CDR)", count: 390, color: "#06B6D4" },
  { name: "Organizations", count: 184, color: "#8B5CF6" },
  { name: "Vehicles", count: 142, color: "#10B981" },
  { name: "Locations", count: 168, color: "#F59E0B" },
  { name: "Transactions", count: 116, color: "#3B82F6" },
];

const DEFAULT_RELATIONSHIP_TYPES = [
  { type: "Communication", count: 2180 },
  { type: "Financial Transfer", count: 1420 },
  { type: "Co-Location", count: 1150 },
  { type: "Org / Shell Owner", count: 680 },
  { type: "Vehicle Association", count: 409 },
];

const DEMO_EXPLAINABILITY = {
  leadId: "LEAD #024",
  title: "Coordinated Hawala Fund Movement & Vehicle Meeting at Pier 42",
  confidence: 87,
  priority: "HIGH",
  summary: "Multiple observed relationships across communication, transaction and location records between Raj Mehta, Vikramaditya Singhania, and BlueStar Logistics.",
  whyPrioritized: [
    "✓ Shared phone number & IMEI rotation",
    "✓ Repeated location overlap at Pier 42",
    "✓ Related transaction ($142,000 NEFT)",
    "✓ Connected case records (CASE-2026-NIGHTSHADE)",
  ],
  supportingRelationships: [
    {
      source: "Raj Mehta",
      target: "Vikramaditya Singhania",
      relationship: "Co-Conspirator // Hawala Transfer",
      confidence: 94,
      status: "SUSPICIOUS",
    },
    {
      source: "Raj Mehta",
      target: "+91 98201 44921",
      relationship: "Handset Subscriber (IMEI Match)",
      confidence: 96,
      status: "VERIFIED",
    },
    {
      source: "Audi A8 [MH-01-EA-9902]",
      target: "Pier 42 Maritime Dock",
      relationship: "ALPR Optical Scan Sighting",
      confidence: 99,
      status: "VERIFIED",
    },
    {
      source: "BlueStar Logistics Pvt. Ltd.",
      target: "Astraea Trading Corp",
      relationship: "Inter-Company Wire Transit",
      confidence: 89,
      status: "REVIEW_REQUIRED",
    },
  ],
  dataSources: [
    {
      type: "Call Detail Record (CDR)",
      recordId: "CDR-2026-03-12-8821",
      date: "2026-03-12 14:22 UTC",
      snippet: "Encrypted VoLTE burst from burner phone to Hawala broker terminal prior to meeting.",
    },
    {
      type: "FIR / Police Report",
      recordId: "FIR No. 2026/098 (Crime Branch)",
      date: "2026-02-18 10:00 UTC",
      snippet: "Named in maritime contraband logistics docket under Sections 420 & 120B IPC.",
    },
    {
      type: "Financial Ledger",
      recordId: "RTGS-TRX-9902148",
      date: "2026-03-11 16:45 UTC",
      snippet: "$142,000 remitted through shell company account to BlueStar Logistics freight escrow.",
    },
  ],
  matchingAttributes: [
    { attribute: "Handset IMEI", value: "86129480112948", matchType: "Exact Hardware Match", weight: "High" },
    { attribute: "Toll FastTag ID", value: "TAG-MH01-9921", matchType: "Corroborated Plate Hit", weight: "High" },
    { attribute: "Shell Director DIN", value: "DIN-00928174", matchType: "Registrar of Companies Match", weight: "Medium" },
  ],
  graphSignals: [
    { metric: "Betweenness Centrality", score: "0.89 (Top 1%)", description: "Acts as sole bridge between logistics cluster and offshore capital cluster." },
    { metric: "Jaccard Co-Occurrence", score: "0.74", description: "High probability of co-presence across 7 distinct investigation incidents." },
    { metric: "Shortest Path Distance", score: "1 Hop", description: "Direct communication confirmed through telecom cell tower handoff." },
  ],
  timelineEvidence: [
    { time: "14:15 UTC", event: "Burner SIM dials Vikramaditya Singhania", overlapWindow: "T - 15m" },
    { time: "14:30 UTC", event: "Audi A8 passes JNPT Port Toll Plaza", overlapWindow: "T + 0m (Event)" },
    { time: "14:45 UTC", event: "Bank Wire $142,000 confirmed executed", overlapWindow: "T + 15m" },
  ],
};

const CockpitDashboardPage = () => {
  const navigate = useNavigate();
  const [selectedExplainLead, setSelectedExplainLead] = useState(null);
  const [activeWorkflowStage, setActiveWorkflowStage] = useState(null);

  const { data: summaryResponse, isLoading: isSummaryLoading, error: summaryError } = useGetDashboardSummaryQuery();
  const { data: recentActivityResponse } = useGetRecentActivityQuery();

  const summary = summaryResponse?.data;
  const counts = summary?.counts || {
    totalCases: 28,
    activeCases: 19,
    totalEntities: 1482,
    totalRelationships: 5839,
    priorityLeads: 14,
    totalEvidence: 124,
  };

  const workflowStages = [
    {
      step: "01",
      title: "COLLECT",
      desc: "Ingest multi-source structured & unstructured records",
      detail: "FIRs, CDR logs, wire transfers, OSINT, CCTV feeds",
    },
    {
      step: "02",
      title: "PROCESS",
      desc: "Clean, normalize, tokenize & deduplicate records",
      detail: "Noise filtering, timestamp unification, carrier normalization",
    },
    {
      step: "03",
      title: "EXTRACT",
      desc: "Named Entity Recognition & OCR identification",
      detail: "Entities, identifiers, phone numbers, addresses, vehicles",
    },
    {
      step: "04",
      title: "LINK",
      desc: "Probabilistic record linkage & entity resolution",
      detail: "Aliases, shared devices, co-locations, proxy ownerships",
    },
    {
      step: "05",
      title: "ANALYZE",
      desc: "Graph topology, centrality & temporal clustering",
      detail: "Betweenness scoring, syndicate hubs, co-presence detection",
    },
    {
      step: "06",
      title: "VISUALIZE",
      desc: "Interactive link charts, geospatial trails & timelines",
      detail: "Tactical vector map, force-directed graph, chronological playback",
    },
    {
      step: "07",
      title: "INVESTIGATE",
      desc: "Sworn human verification & lead actioning",
      detail: "Evidence dossiers, court-ready briefs, warrant affidavits",
    },
  ];

  const dataSources = [
    { title: "FIR / Police Reports", icon: FileText, color: "#2563EB", desc: "Case dockets, witness depositions, formal complaints" },
    { title: "Call Detail Records", icon: Phone, color: "#06B6D4", desc: "Telecom tower azimuths, IMSI/IMEI logs, call bursts" },
    { title: "Financial Records", icon: DollarSign, color: "#10B981", desc: "Bank wire slips, Hawala ledgers, shell account ledgers" },
    { title: "Surveillance Reports", icon: Camera, color: "#F59E0B", desc: "ALPR optical scans, checkpoint logs, CCTV timepins" },
    { title: "Social Media Intel", icon: Globe, color: "#8B5CF6", desc: "Open-source intelligence, digital footprint correlation" },
    { title: "Criminal History", icon: History, color: "#EF4444", desc: "Prior convictions, state repository biometrics, warrants" },
    { title: "Intelligence Reports", icon: ShieldCheck, color: "#0ea5e9", desc: "Cross-agency classified bulletins & taskforce intel" },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto font-sans pb-16">
      {/* Hero Header */}
      <div className="relative rounded-2xl bg-linear-to-b from-[#0D1B2A] via-[#101F33] to-[#07111F] border border-[#263B55] p-6 sm:p-10 overflow-hidden shadow-2xl">
        <div className="absolute inset-0 pointer-events-none opacity-25">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="heroLineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#2563EB" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#06B6D4" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#10B981" stopOpacity="0.2" />
              </linearGradient>
            </defs>
            <line x1="15%" y1="20%" x2="40%" y2="35%" stroke="url(#heroLineGrad)" strokeWidth="1.5" strokeDasharray="4 4" />
            <line x1="40%" y1="35%" x2="65%" y2="25%" stroke="url(#heroLineGrad)" strokeWidth="1.5" />
            <line x1="65%" y1="25%" x2="85%" y2="50%" stroke="url(#heroLineGrad)" strokeWidth="1.5" strokeDasharray="6 3" />
            <line x1="40%" y1="35%" x2="50%" y2="75%" stroke="url(#heroLineGrad)" strokeWidth="1.5" />
            <line x1="50%" y1="75%" x2="75%" y2="80%" stroke="url(#heroLineGrad)" strokeWidth="1.5" strokeDasharray="3 3" />
            <line x1="15%" y1="20%" x2="30%" y2="70%" stroke="url(#heroLineGrad)" strokeWidth="1" />
            <circle cx="15%" cy="20%" r="5" fill="#2563EB" className="animate-pulse" />
            <circle cx="40%" cy="35%" r="7" fill="#06B6D4" />
            <circle cx="65%" cy="25%" r="5" fill="#10B981" />
            <circle cx="85%" cy="50%" r="6" fill="#8B5CF6" />
            <circle cx="50%" cy="75%" r="5" fill="#F59E0B" />
            <circle cx="30%" cy="70%" r="4" fill="#2563EB" />
            <circle cx="75%" cy="80%" r="5" fill="#06B6D4" />
          </svg>
        </div>

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-xs font-mono text-[#06B6D4]">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>AI-POWERED CRIMINAL NETWORK & INVESTIGATIVE INTELLIGENCE SYSTEM</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Turn Fragmented Intelligence Into{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#2563EB] via-[#06B6D4] to-[#10B981]">
              Connected Investigations
            </span>
          </h1>
          <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
            IntelliTrack connects people, organizations, communications, transactions, locations and events into one explainable investigation intelligence platform.
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => navigate("/cases")}
              className="px-6 py-3 rounded-xl bg-[#2563EB] hover:bg-blue-600 text-white font-semibold text-sm transition-all shadow-lg shadow-blue-500/25 flex items-center gap-2 group cursor-pointer"
            >
              <span>Explore Investigation</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => navigate("/network")}
              className="px-6 py-3 rounded-xl bg-[#101F33] hover:bg-[#12243A] text-white border border-[#263B55] hover:border-[#06B6D4] font-semibold text-sm transition-all flex items-center gap-2 cursor-pointer"
            >
              <Share2 className="w-4 h-4 text-[#06B6D4]" />
              <span>View Network Graph</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-[#263B55] pb-3">
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-[#06B6D4] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
              INTELLIGENCE OVERVIEW
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight mt-0.5">Investigation Overview</h2>
            <p className="text-xs text-[#94A3B8] mt-0.5">Live telemetry from MongoDB Atlas & Graph Analytics</p>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#94A3B8]">
            {isSummaryLoading ? (
              <span className="flex items-center gap-1 text-steel-400">
                <Loader2 className="w-3.5 h-3.5 animate-spin" /> Syncing Backend Data...
              </span>
            ) : (
              <span className="px-2 py-1 rounded bg-[#101F33] border border-[#263B55]">
                Active Docket: <strong className="text-white">CASE #IT-2026-NIGHTSHADE</strong>
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-[#101F33] border border-[#263B55] rounded-xl p-4 hover:border-[#2563EB] transition-all group shadow-md">
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#94A3B8] font-medium">Active Investigations</span>
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-[#2563EB]">
                <Briefcase className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3">
              <div className="text-3xl font-extrabold text-white font-mono">{counts.totalCases}</div>
              <div className="flex items-center gap-1.5 text-[11px] text-[#10B981] font-mono mt-1">
                <TrendingUp className="w-3 h-3" />
                <span>{counts.activeCases} active multi-jurisdiction dockets</span>
              </div>
            </div>
          </div>

          <div className="bg-[#101F33] border border-[#263B55] rounded-xl p-4 hover:border-[#06B6D4] transition-all group shadow-md">
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#94A3B8] font-medium">Entities Identified</span>
              <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-[#06B6D4]">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3">
              <div className="text-3xl font-extrabold text-white font-mono">{counts.totalEntities}</div>
              <div className="flex items-center gap-1.5 text-[11px] text-[#06B6D4] font-mono mt-1">
                <CheckCircle2 className="w-3 h-3" />
                <span>94.2% entity resolution match</span>
              </div>
            </div>
          </div>

          <div className="bg-[#101F33] border border-[#263B55] rounded-xl p-4 hover:border-[#10B981] transition-all group shadow-md">
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#94A3B8] font-medium">Relationships Mapped</span>
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-[#10B981]">
                <Share2 className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3">
              <div className="text-3xl font-extrabold text-white font-mono">{counts.totalRelationships}</div>
              <div className="flex items-center gap-1.5 text-[11px] text-[#10B981] font-mono mt-1">
                <CheckCircle2 className="w-3 h-3" />
                <span>1,204 cross-verified relationships</span>
              </div>
            </div>
          </div>

          <div className="bg-[#101F33] border border-[#263B55] rounded-xl p-4 hover:border-[#EF4444] transition-all group shadow-md">
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#94A3B8] font-medium">High-Priority Leads</span>
              <div className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/30 flex items-center justify-center text-[#EF4444]">
                <Flame className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3">
              <div className="text-3xl font-extrabold text-white font-mono text-[#EF4444]">{counts.priorityLeads}</div>
              <div className="flex items-center gap-1.5 text-[11px] text-[#F59E0B] font-mono mt-1">
                <AlertTriangle className="w-3 h-3" />
                <span>Actionable signals requiring human verification</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Operational Lifecycle Pipeline */}
      <div className="bg-[#0D1B2A] border border-[#263B55] rounded-2xl p-5 sm:p-6 space-y-4 shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-[#06B6D4]">OPERATIONAL LIFECYCLE</div>
            <h3 className="text-lg font-bold text-white tracking-tight">IntelliTrack Core Investigation Flow</h3>
          </div>
          <span className="hidden sm:inline text-xs font-mono text-[#94A3B8]">Horizontal End-to-End Pipeline</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
          {workflowStages.map((st, idx) => (
            <div
              key={st.title}
              onMouseEnter={() => setActiveWorkflowStage(idx)}
              onMouseLeave={() => setActiveWorkflowStage(null)}
              className={`p-3 rounded-xl border transition-all duration-200 cursor-pointer relative overflow-hidden group ${
                activeWorkflowStage === idx
                  ? "bg-[#12243A] border-[#2563EB] shadow-lg scale-102"
                  : "bg-[#101F33] border-[#263B55] hover:border-slate-400"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono font-bold text-[#06B6D4]">{st.step}</span>
                {idx < workflowStages.length - 1 && (
                  <span className="text-[#263B55] group-hover:text-[#06B6D4] text-xs font-bold transition-colors">
                    →
                  </span>
                )}
              </div>
              <div className="text-xs font-extrabold font-mono text-white tracking-wider">{st.title}</div>
              <div className="text-[11px] text-[#94A3B8] mt-1 leading-snug">{st.desc}</div>
              <div className="text-[10px] text-cyan-300 font-mono mt-2 pt-1 border-t border-[#263B55]/50 opacity-0 group-hover:opacity-100 transition-opacity">
                {st.detail}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Ingestion & AI Architecture */}
      <div className="bg-[#0D1B2A] border border-[#263B55] rounded-2xl p-5 sm:p-6 space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#263B55] pb-3">
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-[#06B6D4]">MULTI-MODAL INGESTION</div>
            <h3 className="text-lg font-bold text-white tracking-tight">Data Sources & Intelligence Fusion Architecture</h3>
            <p className="text-xs text-[#94A3B8]">Heterogeneous investigative data ingested, normalized and transformed into connected intelligence</p>
          </div>
          <span className="text-xs font-mono px-2.5 py-1 rounded bg-[#101F33] text-[#10B981] border border-emerald-500/30">
            7 Ingestion Channels Active
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
          <div className="lg:col-span-4 space-y-2">
            <div className="text-[11px] font-mono text-[#94A3B8] uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5 text-cyan-400" />
              <span>RAW INVESTIGATION SOURCES</span>
            </div>
            <div className="space-y-1.5">
              {dataSources.map((ds) => {
                const IconComponent = ds.icon;
                return (
                  <div
                    key={ds.title}
                    className="p-2.5 rounded-lg bg-[#101F33] border border-[#263B55] hover:border-slate-400 transition-all flex items-center justify-between text-xs font-mono group"
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <div
                        className="w-6 h-6 rounded flex items-center justify-center shrink-0"
                        style={{ backgroundColor: `${ds.color}15`, color: ds.color }}
                      >
                        <IconComponent className="w-3.5 h-3.5" />
                      </div>
                      <div className="truncate">
                        <div className="text-white font-semibold truncate">{ds.title}</div>
                        <div className="text-[10px] text-[#94A3B8] truncate">{ds.desc}</div>
                      </div>
                    </div>
                    <span className="text-[10px] text-[#06B6D4] font-bold">→</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 rounded-2xl bg-gradient-to-b from-[#101F33] to-[#07111F] border-2 border-[#2563EB] shadow-2xl text-center space-y-3 relative">
            <div className="w-16 h-16 rounded-2xl bg-blue-500/10 border border-[#06B6D4]/40 flex items-center justify-center text-[#06B6D4] shadow-inner relative">
              <Cpu className="w-8 h-8 animate-pulse text-[#06B6D4]" />
              <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-[#10B981] animate-ping" />
            </div>
            <div>
              <div className="text-[10px] font-mono tracking-widest text-[#06B6D4] uppercase font-bold">CENTRAL PROCESSING</div>
              <h4 className="text-lg font-black text-white font-mono tracking-wider mt-0.5">INTELLITRACK AI ENGINE</h4>
              <p className="text-xs text-[#94A3B8] mt-1 max-w-xs mx-auto">
                Neural entity resolution, graph centrality algorithms, and multi-factor explainability scoring.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-1.5 text-[10px] font-mono text-slate-300 pt-1">
              <span className="px-2 py-0.5 rounded bg-[#07111F] border border-[#263B55]">Fast-Fuzzy Match</span>
              <span className="px-2 py-0.5 rounded bg-[#07111F] border border-[#263B55]">Graph Centrality</span>
              <span className="px-2 py-0.5 rounded bg-[#07111F] border border-[#263B55]">Merkle Ledger</span>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-2">
            <div className="text-[11px] font-mono text-[#94A3B8] uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <Share2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>SYNTHESIZED INTELLIGENCE OBJECTS</span>
            </div>
            <div className="space-y-2">
              <div className="p-3 rounded-lg bg-[#101F33] border border-[#263B55] flex items-center gap-3">
                <Users className="w-4 h-4 text-[#2563EB] shrink-0" />
                <div>
                  <div className="text-xs font-bold text-white font-mono">ENTITIES ({counts.totalEntities})</div>
                  <div className="text-[11px] text-[#94A3B8]">Resolved persons of interest, aliases & shell companies</div>
                </div>
              </div>
              <div className="p-3 rounded-lg bg-[#101F33] border border-[#263B55] flex items-center gap-3">
                <Share2 className="w-4 h-4 text-[#06B6D4] shrink-0" />
                <div>
                  <div className="text-xs font-bold text-white font-mono">RELATIONSHIPS ({counts.totalRelationships})</div>
                  <div className="text-[11px] text-[#94A3B8]">Weighted link edges, communications & co-presence</div>
                </div>
              </div>
              <div className="p-3 rounded-lg bg-[#101F33] border border-[#263B55] flex items-center gap-3">
                <MapPin className="w-4 h-4 text-[#10B981] shrink-0" />
                <div>
                  <div className="text-xs font-bold text-white font-mono">LOCATIONS (Active Coordinates)</div>
                  <div className="text-[11px] text-[#94A3B8]">Repeated meeting points, safehouses & toll hits</div>
                </div>
              </div>
              <div className="p-3 rounded-lg bg-[#101F33] border border-[#263B55] flex items-center gap-3">
                <Calendar className="w-4 h-4 text-[#F59E0B] shrink-0" />
                <div>
                  <div className="text-xs font-bold text-white font-mono">CHRONOLOGICAL EVENTS</div>
                  <div className="text-[11px] text-[#94A3B8]">Chronological incidents, call bursts & dock arrivals</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Analytics Charts */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-[#263B55] pb-2">
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-[#06B6D4]">ANALYTIC TELEMETRY</div>
            <h3 className="text-xl font-bold text-white tracking-tight">Investigative Intelligence Analytics</h3>
          </div>
          <span className="text-xs font-mono text-[#94A3B8]">Color System: Blue / Cyan / Green / Amber / Red</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          <div className="lg:col-span-7 bg-[#101F33] border border-[#263B55] rounded-xl p-4 sm:p-5 shadow-lg space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-white font-mono">Activity Over Time (30-Day Syndicate Pulse)</h4>
                <p className="text-[11px] text-[#94A3B8]">Temporal frequency of encrypted calls, financial wire transfers and surveillance hits</p>
              </div>
              <div className="flex items-center gap-3 text-[10px] font-mono">
                <span className="flex items-center gap-1 text-[#06B6D4]">
                  <span className="w-2 h-2 rounded-full bg-[#06B6D4]" /> Communications
                </span>
                <span className="flex items-center gap-1 text-[#2563EB]">
                  <span className="w-2 h-2 rounded-full bg-[#2563EB]" /> Transactions
                </span>
              </div>
            </div>

            <div className="h-60 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={DEFAULT_ACTIVITY_DATA}>
                  <defs>
                    <linearGradient id="commGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#06B6D4" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="transGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563EB" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#263B55" vertical={false} />
                  <XAxis dataKey="day" stroke="#94A3B8" fontSize={10} tickLine={false} />
                  <YAxis stroke="#94A3B8" fontSize={10} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#0D1B2A",
                      borderColor: "#263B55",
                      borderRadius: "8px",
                      color: "#F8FAFC",
                      fontSize: "11px",
                      fontFamily: "monospace",
                    }}
                  />
                  <Area type="monotone" dataKey="communications" stroke="#06B6D4" strokeWidth={2} fillOpacity={1} fill="url(#commGrad)" />
                  <Area type="monotone" dataKey="transactions" stroke="#2563EB" strokeWidth={2} fillOpacity={1} fill="url(#transGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="lg:col-span-5 bg-[#101F33] border border-[#263B55] rounded-xl p-4 sm:p-5 shadow-lg space-y-3">
            <div>
              <h4 className="text-sm font-bold text-white font-mono">Entity Distribution by Classification</h4>
              <p className="text-[11px] text-[#94A3B8]">{counts.totalEntities} mapped entities across forensic categories</p>
            </div>
            <div className="h-60 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={DEFAULT_ENTITY_DISTRIBUTION}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="count"
                  >
                    {DEFAULT_ENTITY_DISTRIBUTION.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#0D1B2A",
                      borderColor: "#263B55",
                      borderRadius: "8px",
                      color: "#F8FAFC",
                      fontSize: "11px",
                      fontFamily: "monospace",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-1.5 text-[10px] font-mono">
              {DEFAULT_ENTITY_DISTRIBUTION.map((item) => (
                <div key={item.name} className="flex items-center gap-1.5 text-[#94A3B8]">
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                  <span className="truncate">{item.name}:</span>
                  <span className="text-white font-bold">{item.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Featured Explainable Lead */}
      <div className="bg-[#0D1B2A] border border-[#263B55] rounded-2xl p-5 sm:p-6 space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#263B55] pb-3">
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-[#EF4444] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#EF4444] animate-pulse" />
              PRIORITIZED INVESTIGATIVE SIGNAL
            </div>
            <h3 className="text-lg font-bold text-white tracking-tight mt-0.5">Featured Explainable Lead: LEAD #024</h3>
            <p className="text-xs text-[#94A3B8]">Demonstrating transparent, non-black-box algorithmic rationale with sworn human verification</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedExplainLead(DEMO_EXPLAINABILITY)}
              className="px-4 py-2 rounded-lg bg-blue-500/10 border border-[#2563EB] hover:bg-[#2563EB] text-[#06B6D4] hover:text-white text-xs font-mono font-bold transition-all flex items-center gap-2 cursor-pointer shadow-md"
            >
              <HelpCircle className="w-4 h-4 text-cyan-400" />
              <span>Why this lead?</span>
            </button>
            <button
              onClick={() => navigate("/leads")}
              className="px-3 py-2 rounded-lg bg-[#101F33] hover:bg-[#12243A] text-white border border-[#263B55] text-xs font-mono transition-colors cursor-pointer"
            >
              All Leads →
            </button>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#101F33] border border-[#263B55] space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2.5">
              <span className="px-2 py-0.5 rounded bg-red-500/20 text-[#EF4444] font-mono text-xs font-bold border border-red-500/30">
                HIGH PRIORITY
              </span>
              <span className="font-mono text-xs text-white font-bold">
                LEAD #024: Hawala Fund Movement & Vehicle Rendezvous
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="text-[#94A3B8]">Confidence:</span>
              <span className="text-[#06B6D4] font-extrabold text-sm">87%</span>
            </div>
          </div>

          <div className="text-xs text-slate-300 leading-relaxed">
            "Multiple observed relationships across communication, transaction and location records connecting Raj Mehta, Vikramaditya Singhania, and BlueStar Logistics."
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 font-mono text-xs">
            <div className="p-2 rounded bg-[#07111F] border border-[#263B55] flex items-center gap-2">
              <Users className="w-3.5 h-3.5 text-blue-400" />
              <span className="text-white font-bold">4 Linked Entities</span>
            </div>
            <div className="p-2 rounded bg-[#07111F] border border-[#263B55] flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-cyan-400" />
              <span className="text-white font-bold">3 CDR Records</span>
            </div>
            <div className="p-2 rounded bg-[#07111F] border border-[#263B55] flex items-center gap-2">
              <CreditCard className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-white font-bold">2 Transactions</span>
            </div>
            <div className="p-2 rounded bg-[#07111F] border border-[#263B55] flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-white font-bold">2 Shared Locations</span>
            </div>
          </div>

          <div className="pt-2 flex flex-wrap items-center justify-between gap-2 border-t border-[#263B55]/60 text-xs font-mono">
            <div className="text-[11px] text-[#F59E0B] flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
              <span>AI-generated investigative lead — requires investigator verification</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSelectedExplainLead(DEMO_EXPLAINABILITY)}
                className="px-3 py-1.5 rounded bg-blue-500/10 text-cyan-300 border border-blue-500/30 hover:bg-blue-500/20 transition-colors font-semibold"
              >
                Why this lead?
              </button>
              <button
                onClick={() => navigate("/evidence")}
                className="px-3 py-1.5 rounded bg-[#07111F] text-slate-300 border border-[#263B55] hover:text-white transition-colors"
              >
                View Evidence
              </button>
              <button
                onClick={() => navigate("/network")}
                className="px-3 py-1.5 rounded bg-[#07111F] text-slate-300 border border-[#263B55] hover:text-white transition-colors"
              >
                Open Network
              </button>
            </div>
          </div>
        </div>
      </div>

      <WhyThisLeadModal
        isOpen={!!selectedExplainLead}
        onClose={() => setSelectedExplainLead(null)}
        data={selectedExplainLead}
      />
    </div>
  );
};

export { CockpitDashboardPage };
export default CockpitDashboardPage;
