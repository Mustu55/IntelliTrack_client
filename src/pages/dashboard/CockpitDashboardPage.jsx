import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Briefcase,
  Users,
  Share2,
  Flame,
  ArrowRight,
  TrendingUp,
  FileText,
  DollarSign,
  Camera,
  Globe,
  Plus,
  HelpCircle,
  Loader2,
  Activity,
  CheckCircle2,
  AlertTriangle,
  Download,
  Calendar,
  Layers,
  ChevronRight
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
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

const ACTIVITY_PULSE_DATA = [
  { day: "01 Mar", comms: 45, wires: 12, sightings: 8 },
  { day: "05 Mar", comms: 68, wires: 19, sightings: 14 },
  { day: "10 Mar", comms: 110, wires: 35, sightings: 22 },
  { day: "15 Mar", comms: 155, wires: 52, sightings: 39 },
  { day: "20 Mar", comms: 120, wires: 44, sightings: 28 },
  { day: "25 Mar", comms: 195, wires: 78, sightings: 48 },
  { day: "30 Mar", comms: 165, wires: 65, sightings: 42 },
];

const ENTITY_DISTRIBUTION = [
  { name: "People (POI)", count: 482, color: "#9cae9b" },
  { name: "Phone CDRs", count: 390, color: "#7a8ba8" },
  { name: "Shell Orgs", count: 184, color: "#c4a265" },
  { name: "Vehicles", count: 142, color: "#8fa38d" },
  { name: "Locations", count: 168, color: "#d97768" },
  { name: "Wires", count: 116, color: "#52627d" },
];

const RECENT_CASES = [
  {
    id: "CASE-2024-884",
    title: "Hawala Network Syndicate Alpha",
    lead: "M. Kessler (Lead)",
    entities: 28,
    status: "Active",
    statusVariant: "active",
    lastActivity: "12m ago",
  },
  {
    id: "CASE-2024-871",
    title: "Port Pier 42 Freight Transshipment",
    lead: "S. Tanaka",
    entities: 19,
    status: "Under Review",
    statusVariant: "warning",
    lastActivity: "2h ago",
  },
  {
    id: "CASE-2024-850",
    title: "Shell Company Capital Flight",
    lead: "A. Rossi",
    entities: 34,
    status: "Active",
    statusVariant: "active",
    lastActivity: "1d ago",
  },
  {
    id: "CASE-2024-812",
    title: "Maritime Contraband Corridor",
    lead: "V. Sterling",
    entities: 12,
    status: "Monitoring",
    statusVariant: "neutral",
    lastActivity: "3d ago",
  },
];

const PRIORITY_LEADS_LIST = [
  {
    id: "LEAD-024",
    title: "Pier 42 Hotspot Rendezvous & Wire Execution",
    entity: "Raj Mehta ↔ Vikramaditya Singhania",
    reason: "ALPR optical vehicle scan matches phone tower burst 14 min prior to $142k wire transfer.",
    severity: "CRITICAL",
    confidence: 87,
  },
  {
    id: "LEAD-021",
    title: "SIM Rotation & Burner IMEI Handoff",
    entity: "Raj Mehta (+91 98201 44921)",
    reason: "New prepaid IMSI activated on handset IMEI previously associated with shell broker terminal.",
    severity: "HIGH",
    confidence: 94,
  },
  {
    id: "LEAD-019",
    title: "Offshore Shell Escrow Inflow",
    entity: "BlueStar Logistics Pvt. Ltd.",
    reason: "Inter-account transit wire from Astraea Trading without accompanying freight manifests.",
    severity: "MEDIUM",
    confidence: 79,
  },
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
    "✓ Connected case records (CASE-2024-884)",
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
  ],
};

const CockpitDashboardPage = () => {
  const navigate = useNavigate();
  const [selectedExplainLead, setSelectedExplainLead] = useState(null);
  const [timeRange, setTimeRange] = useState("30d");

  const { data: summaryResponse, isLoading: isSummaryLoading } = useGetDashboardSummaryQuery();

  const summary = summaryResponse?.data;
  const counts = summary?.counts || {
    totalCases: 28,
    activeCases: 19,
    totalEntities: 1482,
    totalRelationships: 5839,
    priorityLeads: 14,
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto font-sans antialiased text-[#f3f4f6]">
      {/* Top Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-1 border-b border-[#1e232a]">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-semibold text-white tracking-tight">
              Investigation Overview
            </h1>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#18261c] text-[#8fa38d] border border-[#25392b]">
              LIVE SYNDICATE
            </span>
          </div>
          <p className="text-xs text-[#9ca3af] mt-0.5">
            Cross-jurisdictional intelligence summary, active syndicate nodes, and prioritized investigative leads.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="h-8.5 px-3 bg-[#14171c] border border-[#222731] rounded-md text-xs text-[#d1d5db] focus:outline-none focus:border-[#9cae9b]"
          >
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last Quarter</option>
            <option value="1y">All Time</option>
          </select>

          <button
            onClick={() => navigate("/reports")}
            className="h-8.5 px-3 rounded-md bg-[#14171c] border border-[#222731] hover:bg-[#181c22] text-[#d1d5db] text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-[#9ca3af]" />
            <span>Export Dossier</span>
          </button>

          <button
            onClick={() => navigate("/cases")}
            className="h-8.5 px-3.5 rounded-md bg-[#9cae9b] text-[#0d130e] hover:bg-[#8da08c] text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Case</span>
          </button>
        </div>
      </div>

      {/* 4 Top Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Active Cases */}
        <div
          onClick={() => navigate("/cases")}
          className="bg-[#14171c] border border-[#222731] rounded-lg p-4 hover:border-[#2d3542] hover:bg-[#161a20] transition-all cursor-pointer group shadow-xs"
        >
          <div className="flex items-center justify-between text-[11px] font-mono text-[#9ca3af] uppercase tracking-wider">
            <span>Active Cases</span>
            <Briefcase className="w-3.5 h-3.5 text-[#8fa38d] group-hover:text-white transition-colors" />
          </div>
          <div className="mt-2 text-2xl font-bold font-mono text-white">
            {counts.totalCases}
          </div>
          <div className="mt-1 flex items-center gap-1.5 text-[11px] text-[#8fa38d] font-mono">
            <TrendingUp className="w-3 h-3" />
            <span>+3 new this month</span>
          </div>
        </div>

        {/* Entities Tracked */}
        <div
          onClick={() => navigate("/entities")}
          className="bg-[#14171c] border border-[#222731] rounded-lg p-4 hover:border-[#2d3542] hover:bg-[#161a20] transition-all cursor-pointer group shadow-xs"
        >
          <div className="flex items-center justify-between text-[11px] font-mono text-[#9ca3af] uppercase tracking-wider">
            <span>Entities Tracked</span>
            <Users className="w-3.5 h-3.5 text-[#8fa38d] group-hover:text-white transition-colors" />
          </div>
          <div className="mt-2 text-2xl font-bold font-mono text-white">
            {counts.totalEntities.toLocaleString()}
          </div>
          <div className="mt-1 flex items-center gap-1.5 text-[11px] text-[#9ca3af] font-mono">
            <span>94.2% resolution confidence</span>
          </div>
        </div>

        {/* Network Relationships */}
        <div
          onClick={() => navigate("/network")}
          className="bg-[#14171c] border border-[#222731] rounded-lg p-4 hover:border-[#2d3542] hover:bg-[#161a20] transition-all cursor-pointer group shadow-xs"
        >
          <div className="flex items-center justify-between text-[11px] font-mono text-[#9ca3af] uppercase tracking-wider">
            <span>Network Links</span>
            <Share2 className="w-3.5 h-3.5 text-[#8fa38d] group-hover:text-white transition-colors" />
          </div>
          <div className="mt-2 text-2xl font-bold font-mono text-white">
            {counts.totalRelationships.toLocaleString()}
          </div>
          <div className="mt-1 flex items-center gap-1.5 text-[11px] text-[#8fa38d] font-mono">
            <span>5 core clusters mapped</span>
          </div>
        </div>

        {/* Priority Leads */}
        <div
          onClick={() => navigate("/leads")}
          className="bg-[#14171c] border border-[#222731] rounded-lg p-4 hover:border-[#2d3542] hover:bg-[#161a20] transition-all cursor-pointer group shadow-xs"
        >
          <div className="flex items-center justify-between text-[11px] font-mono text-[#9ca3af] uppercase tracking-wider">
            <span>Priority Leads</span>
            <Flame className="w-3.5 h-3.5 text-[#dc7869] group-hover:text-white transition-colors" />
          </div>
          <div className="mt-2 text-2xl font-bold font-mono text-white">
            {counts.priorityLeads}
          </div>
          <div className="mt-1 flex items-center gap-1.5 text-[11px] text-[#c9a667] font-mono">
            <AlertTriangle className="w-3 h-3" />
            <span>5 require investigator review</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Activity Chart (Left) + Priority Leads (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Activity Chart */}
        <div className="lg:col-span-7 bg-[#14171c] border border-[#222731] rounded-lg p-5 flex flex-col justify-between shadow-xs">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#1e232a]">
              <div>
                <h3 className="text-xs font-semibold text-white font-mono uppercase tracking-wider">
                  Investigation Activity Pulse
                </h3>
                <p className="text-[11px] text-[#9ca3af] mt-0.5">
                  Chronological volume of intercepted communications, fund transfers, and optical ALPR hits.
                </p>
              </div>
              <div className="flex items-center gap-3 text-[10px] font-mono text-[#9ca3af]">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#9cae9b]" /> Comms
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#64748b]" /> Wires
                </span>
              </div>
            </div>

            <div className="h-64 w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={ACTIVITY_PULSE_DATA}>
                  <defs>
                    <linearGradient id="sageGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#9cae9b" stopOpacity={0.35} />
                      <stop offset="95%" stopColor="#9cae9b" stopOpacity={0.0} />
                    </linearGradient>
                    <linearGradient id="slateGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#64748b" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#64748b" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="2 2" stroke="#1e232a" vertical={false} />
                  <XAxis dataKey="day" stroke="#606875" fontSize={10} tickLine={false} />
                  <YAxis stroke="#606875" fontSize={10} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#101317",
                      borderColor: "#222731",
                      borderRadius: "6px",
                      color: "#f3f4f6",
                      fontSize: "11px",
                      fontFamily: "monospace",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="comms"
                    stroke="#9cae9b"
                    strokeWidth={1.5}
                    fillOpacity={1}
                    fill="url(#sageGrad)"
                  />
                  <Area
                    type="monotone"
                    dataKey="wires"
                    stroke="#64748b"
                    strokeWidth={1.5}
                    fillOpacity={1}
                    fill="url(#slateGrad)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#1e232a] flex items-center justify-between text-xs text-[#9ca3af]">
            <span className="font-mono text-[11px]">Aggregated across 28 dockets</span>
            <button
              onClick={() => navigate("/timeline")}
              className="text-[#9cae9b] hover:underline font-mono text-xs flex items-center gap-1 cursor-pointer"
            >
              <span>View Full Investigation Timeline</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Priority Leads List */}
        <div className="lg:col-span-5 bg-[#14171c] border border-[#222731] rounded-lg p-5 flex flex-col justify-between shadow-xs">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#1e232a]">
              <div>
                <h3 className="text-xs font-semibold text-white font-mono uppercase tracking-wider">
                  Prioritized AI Signals
                </h3>
                <p className="text-[11px] text-[#9ca3af] mt-0.5">
                  Algorithmic lead anomalies requiring sworn investigator validation.
                </p>
              </div>
              <button
                onClick={() => navigate("/leads")}
                className="text-[11px] font-mono text-[#9cae9b] hover:underline cursor-pointer"
              >
                All ({counts.priorityLeads}) →
              </button>
            </div>

            <div className="divide-y divide-[#1e232a] mt-2">
              {PRIORITY_LEADS_LIST.map((lead) => (
                <div
                  key={lead.id}
                  onClick={() => setSelectedExplainLead(DEMO_EXPLAINABILITY)}
                  className="py-3 hover:bg-[#181c22] px-2 rounded-md transition-colors cursor-pointer group"
                >
                  <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                    <span
                      className={`px-1.5 py-0.2 rounded font-semibold ${
                        lead.severity === "CRITICAL"
                          ? "bg-[#2b1719] text-[#dc7869] border border-[#442327]"
                          : lead.severity === "HIGH"
                          ? "bg-[#282215] text-[#c9a667] border border-[#3e3420]"
                          : "bg-[#161a20] text-[#9ca3af] border border-[#232832]"
                      }`}
                    >
                      {lead.severity}
                    </span>
                    <span className="text-[#8fa38d] font-semibold">{lead.confidence}% MATCH</span>
                  </div>

                  <div className="text-xs font-medium text-white group-hover:text-[#9cae9b] transition-colors">
                    {lead.title}
                  </div>
                  <div className="text-[11px] text-[#9ca3af] mt-1 line-clamp-2 leading-relaxed">
                    {lead.reason}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#1e232a] flex items-center justify-between text-[11px] font-mono text-[#606875]">
            <span>Explainable AI Engine v4.8</span>
            <button
              onClick={() => setSelectedExplainLead(DEMO_EXPLAINABILITY)}
              className="text-[#9cae9b] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Why this lead?</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Grid: Recent Cases Table (Left) + Entity Distribution & Metrics (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Recent Cases Table */}
        <div className="lg:col-span-7 bg-[#14171c] border border-[#222731] rounded-lg p-5 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-[#1e232a]">
            <div>
              <h3 className="text-xs font-semibold text-white font-mono uppercase tracking-wider">
                Active Investigation Cases
              </h3>
              <p className="text-[11px] text-[#9ca3af] mt-0.5">
                Primary cross-jurisdiction dockets under active surveillance.
              </p>
            </div>
            <button
              onClick={() => navigate("/cases")}
              className="text-[11px] font-mono text-[#9cae9b] hover:underline cursor-pointer"
            >
              View All Cases →
            </button>
          </div>

          <div className="overflow-x-auto mt-3">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#1e232a] text-[10px] font-mono text-[#606875] uppercase tracking-wider">
                  <th className="pb-2 font-semibold">Case ID / Title</th>
                  <th className="pb-2 font-semibold">Lead Investigator</th>
                  <th className="pb-2 font-semibold">Entities</th>
                  <th className="pb-2 font-semibold">Status</th>
                  <th className="pb-2 font-semibold text-right">Activity</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1e232a]/60">
                {RECENT_CASES.map((cs) => (
                  <tr
                    key={cs.id}
                    onClick={() => navigate(`/cases/${cs.id}`)}
                    className="hover:bg-[#181c22] transition-colors cursor-pointer group"
                  >
                    <td className="py-2.5 pr-2">
                      <div className="font-medium text-white group-hover:text-[#9cae9b] transition-colors">
                        {cs.title}
                      </div>
                      <div className="font-mono text-[10px] text-[#606875]">{cs.id}</div>
                    </td>
                    <td className="py-2.5 text-[#d1d5db] font-sans">{cs.lead}</td>
                    <td className="py-2.5 font-mono text-[#9ca3af]">{cs.entities}</td>
                    <td className="py-2.5">
                      <span
                        className={`inline-block px-1.5 py-0.2 rounded text-[10px] font-mono ${
                          cs.statusVariant === "active"
                            ? "bg-[#18261c] text-[#8fa38d] border border-[#25392b]"
                            : cs.statusVariant === "warning"
                            ? "bg-[#282215] text-[#c9a667] border border-[#3e3420]"
                            : "bg-[#14171c] text-[#9ca3af] border border-[#222731]"
                        }`}
                      >
                        {cs.status}
                      </span>
                    </td>
                    <td className="py-2.5 text-right font-mono text-[10px] text-[#606875]">
                      {cs.lastActivity}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Entity Classification Pie & Graph Metrics */}
        <div className="lg:col-span-5 bg-[#14171c] border border-[#222731] rounded-lg p-5 flex flex-col justify-between shadow-xs">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#1e232a]">
              <div>
                <h3 className="text-xs font-semibold text-white font-mono uppercase tracking-wider">
                  Entity Breakdown
                </h3>
                <p className="text-[11px] text-[#9ca3af] mt-0.5">
                  Distribution of 1,482 mapped intelligence objects
                </p>
              </div>
              <button
                onClick={() => navigate("/entities")}
                className="text-[11px] font-mono text-[#9cae9b] hover:underline cursor-pointer"
              >
                Directory →
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center mt-3">
              <div className="h-40 w-full flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={ENTITY_DISTRIBUTION}
                      cx="50%"
                      cy="50%"
                      innerRadius={36}
                      outerRadius={60}
                      paddingAngle={2}
                      dataKey="count"
                    >
                      {ENTITY_DISTRIBUTION.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#101317",
                        borderColor: "#222731",
                        borderRadius: "6px",
                        color: "#f3f4f6",
                        fontSize: "10px",
                        fontFamily: "monospace",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="space-y-1.5 text-[11px] font-mono">
                {ENTITY_DISTRIBUTION.map((item) => (
                  <div key={item.name} className="flex items-center justify-between text-[#9ca3af]">
                    <div className="flex items-center gap-1.5 truncate">
                      <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                      <span className="truncate">{item.name}</span>
                    </div>
                    <span className="text-white font-medium">{item.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#1e232a] flex items-center justify-between text-xs">
            <span className="text-[11px] text-[#606875] font-mono">
              Graph Centrality: <strong className="text-white">Raj Mehta (0.89)</strong>
            </span>
            <button
              onClick={() => navigate("/network")}
              className="text-xs font-mono text-[#9cae9b] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>Explore Graph</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Explainability Modal */}
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
