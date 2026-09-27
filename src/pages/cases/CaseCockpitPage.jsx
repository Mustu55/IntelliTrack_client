import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Briefcase,
  Users,
  Share2,
  MapPin,
  Clock,
  Flame,
  FileCheck,
  FileText,
  Lock,
  Download,
  Plus,
  ArrowRight,
  Shield,
  Activity,
  CheckCircle2,
  AlertTriangle,
  ChevronRight
} from "lucide-react";
import { useActiveCase, ACTIVE_CASES_ROSTER } from "@/context/CaseContext";

const CaseCockpitPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { activeCase } = useActiveCase();
  const [activeTab, setActiveTab] = useState("overview");

  const caseData =
    ACTIVE_CASES_ROSTER.find((c) => c.id === id || c.caseId === id || c.caseNumber === id) ||
    activeCase || {
      id: "case-1",
      caseNumber: "CASE #IT-2024-884",
      title: "Hawala Network Syndicate Alpha",
      priority: "HIGH",
      status: "ACTIVE",
      leadInvestigator: "M. Kessler",
      badgeNumber: "FBI-89412",
      classification: "RESTRICTED // LAW ENFORCEMENT SENSITIVE",
      entitiesCount: 28,
      relationshipsCount: 42,
      activeLeadsCount: 14,
    };

  return (
    <div className="space-y-6 max-w-7xl mx-auto font-sans antialiased text-[#f3f4f6]">
      {/* Top Banner Card */}
      <div className="bg-[#14171c] border border-[#222731] rounded-xl p-6 shadow-xs relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2 font-mono text-[11px]">
              <span className="px-2 py-0.5 rounded-md bg-[#101317] text-[#9cae9b] font-semibold border border-[#222731]">
                {caseData.caseNumber}
              </span>
              <span className="px-2 py-0.5 rounded-md bg-[#282215] text-[#c4a265] font-semibold border border-[#3e3420]">
                {caseData.priority} PRIORITY
              </span>
              <span className="px-2 py-0.5 rounded-md bg-[#18261c] text-[#8fa38d] font-semibold border border-[#25392b]">
                {caseData.status}
              </span>
              {caseData.grandJuryProtected && (
                <span className="px-2 py-0.5 rounded-md bg-[#181c22] border border-[#2a313d] text-[#c4a265] font-mono text-[10px] flex items-center gap-1">
                  <Lock className="w-2.5 h-2.5" />
                  SEALED DOCKET
                </span>
              )}
            </div>

            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              {caseData.title}
            </h1>
            <p className="text-xs text-[#9ca3af] mt-1 font-mono">
              Lead Investigator: <strong className="text-white">{caseData.leadInvestigator}</strong> (Badge #{caseData.badgeNumber || "FBI-89412"}) • {caseData.classification}
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={() => navigate("/reports")}
              className="h-8.5 px-3 rounded-md bg-[#101317] border border-[#222731] hover:bg-[#181c22] text-[#d1d5db] text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-[#9ca3af]" />
              <span>Export Dossier</span>
            </button>
            <button
              onClick={() => navigate("/network")}
              className="h-8.5 px-3.5 rounded-md bg-[#9cae9b] text-[#0d130e] hover:bg-[#8da08c] text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Inspect Network</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1 overflow-x-auto border-t border-[#222731] mt-5 pt-3 font-mono text-xs">
          {[
            { key: "overview", label: "Overview", icon: Briefcase },
            { key: "entities", label: `Entities (${caseData.entitiesCount || 28})`, icon: Users },
            { key: "network", label: "Network Graph", icon: Share2 },
            { key: "timeline", label: "Timeline", icon: Clock },
            { key: "leads", label: `Leads (${caseData.activeLeadsCount || 14})`, icon: Flame },
            { key: "evidence", label: "Evidence", icon: FileCheck },
            { key: "reports", label: "Reports", icon: FileText },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                  isActive
                    ? "bg-[#181c22] text-[#9cae9b] border border-[#28303e] font-semibold shadow-xs"
                    : "text-[#9ca3af] hover:text-white hover:bg-[#101317]"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Contents */}
      {activeTab === "overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main 2-col Content */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-[#14171c] border border-[#222731] rounded-lg p-5 space-y-3 shadow-xs">
              <h2 className="text-xs font-semibold text-white uppercase tracking-wider font-mono flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#9cae9b]" />
                Executive Case Synopsis & Operational Scope
              </h2>
              <p className="text-xs text-[#d1d5db] leading-relaxed">
                Ongoing federal intelligence investigation targeting a transnational Hawala money laundering syndicate operating in conjunction with clandestine maritime narcotics transshipments. Primary targets coordinate conveyance via encrypted VoIP bursts and disposable burner handsets rotated on 72-hour intervals.
              </p>
              <div className="p-3 bg-[#101317] rounded-md border border-[#222731] font-mono text-[11px] space-y-1 text-[#9ca3af]">
                <div>STATUTORY AUTHORITY: 18 U.S.C. § 1956, 18 U.S.C. § 1962 (RICO ACT)</div>
                <div>VENUE: U.S. District Court for Southern District of New York</div>
                <div>EVIDENTIARY VAULT: 100% SHA-256 Anchored Ledger</div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div
                onClick={() => navigate("/network")}
                className="p-4 rounded-lg bg-[#14171c] border border-[#222731] hover:border-[#2d3542] hover:bg-[#161a20] cursor-pointer transition-all shadow-xs group"
              >
                <div className="text-[11px] font-mono text-[#9cae9b] font-medium mb-1 group-hover:text-white">
                  SYNDICATE NETWORK
                </div>
                <div className="text-2xl font-bold text-white font-mono">
                  {caseData.relationshipsCount || 42} Links
                </div>
                <div className="text-[11px] text-[#9ca3af] mt-1">
                  14 core nodes isolated with Betweenness centrality &gt; 0.70
                </div>
              </div>

              <div
                onClick={() => navigate("/geo")}
                className="p-4 rounded-lg bg-[#14171c] border border-[#222731] hover:border-[#2d3542] hover:bg-[#161a20] cursor-pointer transition-all shadow-xs group"
              >
                <div className="text-[11px] font-mono text-[#dc7869] font-medium mb-1 group-hover:text-white">
                  GEO SURVEILLANCE
                </div>
                <div className="text-2xl font-bold text-white font-mono">
                  3 Hotspots
                </div>
                <div className="text-[11px] text-[#9ca3af] mt-1">
                  Pier 42 Dock, Safehouse B-4, Freight Forwarding Yard
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-4">
            <div className="bg-[#14171c] border border-[#222731] rounded-lg p-4 font-sans text-xs space-y-3 shadow-xs">
              <div className="text-[11px] uppercase tracking-wider text-[#9ca3af] font-mono font-semibold border-b border-[#222731] pb-2">
                Evidentiary Chain of Custody
              </div>
              <div className="space-y-2">
                <div className="p-2.5 rounded-md bg-[#101317] border border-[#222731] text-[11px]">
                  <div className="text-white font-medium">FRE-902-14 Sealed Telemetry</div>
                  <div className="text-[#606875] font-mono text-[10px] mt-0.5">SHA-256: 7f83b165...94c0</div>
                  <div className="text-[#8fa38d] font-mono text-[9px] mt-0.5">VERIFIED IN REPOSITORY</div>
                </div>
                <div className="p-2.5 rounded-md bg-[#101317] border border-[#222731] text-[11px]">
                  <div className="text-white font-medium">Title III Intercept Warrant</div>
                  <div className="text-[#606875] font-mono text-[10px] mt-0.5">DOCKET: WT-2024-0814</div>
                  <div className="text-[#c4a265] font-mono text-[9px] mt-0.5">ACTIVE (EXPIRES IN 14 DAYS)</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "entities" && (
        <div className="bg-[#14171c] border border-[#222731] rounded-lg p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xs font-semibold text-white font-mono uppercase tracking-wider">
              Linked Entities ({caseData.entitiesCount || 28})
            </h2>
            <button
              onClick={() => navigate("/entities")}
              className="px-3 py-1.5 rounded-md bg-[#9cae9b] text-[#0d130e] hover:bg-[#8da08c] font-medium text-xs cursor-pointer"
            >
              Open Entities Registry →
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 font-mono text-xs">
            {[
              { name: "Raj Mehta", type: "POI (PRIMARY TARGET)", score: 94, threat: "CRITICAL" },
              { name: "Vikramaditya Singhania", type: "POI (BENEFICIARY)", score: 88, threat: "HIGH" },
              { name: "+91 98201 44921", type: "BURNER TELEPHONY", score: 92, threat: "CRITICAL" },
              { name: "Black Audi A8 [MH-01-EA-9902]", type: "TARGET VEHICLE", score: 85, threat: "HIGH" },
              { name: "Pier 42 Maritime Dock", type: "SUSPECT LOCATION", score: 91, threat: "CRITICAL" },
              { name: "BlueStar Logistics Pvt. Ltd.", type: "SHELL CORPORATION", score: 79, threat: "MEDIUM" },
            ].map((ent, i) => (
              <div
                key={i}
                onClick={() => navigate(`/entities/poi-${i + 1}`)}
                className="p-3 rounded-md bg-[#101317] border border-[#222731] hover:border-[#2d3542] hover:bg-[#161a20] space-y-1 cursor-pointer transition-colors"
              >
                <div className="flex items-center justify-between text-[10px]">
                  <span className="text-[#9ca3af] font-medium">{ent.type}</span>
                  <span
                    className={`font-semibold ${
                      ent.threat === "CRITICAL" ? "text-[#dc7869]" : "text-[#c4a265]"
                    }`}
                  >
                    {ent.threat}
                  </span>
                </div>
                <div className="text-white font-medium text-sm truncate font-sans">{ent.name}</div>
                <div className="text-[10px] text-[#606875]">MATCH CONFIDENCE: {ent.score}%</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "network" && (
        <div className="bg-[#14171c] border border-[#222731] rounded-lg p-8 text-center space-y-4">
          <Share2 className="w-10 h-10 text-[#9cae9b] mx-auto" />
          <h2 className="text-sm font-semibold text-white font-mono uppercase tracking-wider">
            Syndicate Link Topology Loaded
          </h2>
          <p className="text-xs text-[#9ca3af] max-w-md mx-auto">
            {caseData.relationshipsCount || 42} validated link edges discovered across telephone intercepts, financial wire transactions, and optical ALPR hits.
          </p>
          <button
            onClick={() => navigate("/network")}
            className="px-4 py-2 rounded-md bg-[#9cae9b] text-[#0d130e] hover:bg-[#8da08c] font-semibold text-xs inline-flex items-center gap-2 cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Launch Interactive Network Graph</span>
          </button>
        </div>
      )}

      {activeTab === "timeline" && (
        <div className="bg-[#14171c] border border-[#222731] rounded-lg p-8 text-center space-y-4">
          <Clock className="w-10 h-10 text-[#9cae9b] mx-auto" />
          <h2 className="text-sm font-semibold text-white font-mono uppercase tracking-wider">
            Multi-Track Chronological Event Stream
          </h2>
          <p className="text-xs text-[#9ca3af] max-w-md mx-auto">
            Correlated multi-entity timeline of calls, financial transfers, meetings, and ALPR sightings.
          </p>
          <button
            onClick={() => navigate("/timeline")}
            className="px-4 py-2 rounded-md bg-[#9cae9b] text-[#0d130e] hover:bg-[#8da08c] font-semibold text-xs inline-flex items-center gap-2 cursor-pointer"
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Open Event Timeline</span>
          </button>
        </div>
      )}

      {activeTab === "leads" && (
        <div className="bg-[#14171c] border border-[#222731] rounded-lg p-8 text-center space-y-4">
          <Flame className="w-10 h-10 text-[#dc7869] mx-auto" />
          <h2 className="text-sm font-semibold text-white font-mono uppercase tracking-wider">
            Prioritized Investigative Leads ({caseData.activeLeadsCount || 14})
          </h2>
          <p className="text-xs text-[#9ca3af] max-w-md mx-auto">
            Actionable signals prioritized by machine models across source reliability, wiretap corroboration, and graph centrality.
          </p>
          <button
            onClick={() => navigate("/leads")}
            className="px-4 py-2 rounded-md bg-[#9cae9b] text-[#0d130e] hover:bg-[#8da08c] font-semibold text-xs inline-flex items-center gap-2 cursor-pointer"
          >
            <Flame className="w-3.5 h-3.5" />
            <span>Review Investigative Leads</span>
          </button>
        </div>
      )}

      {activeTab === "evidence" && (
        <div className="bg-[#14171c] border border-[#222731] rounded-lg p-8 text-center space-y-4">
          <FileCheck className="w-10 h-10 text-[#9cae9b] mx-auto" />
          <h2 className="text-sm font-semibold text-white font-mono uppercase tracking-wider">
            Evidence Repository & Chain of Custody
          </h2>
          <p className="text-xs text-[#9ca3af] max-w-md mx-auto">
            Cryptographically anchored exhibits, CDR extractions, bank wire receipts, and optical ALPR photos.
          </p>
          <button
            onClick={() => navigate("/evidence")}
            className="px-4 py-2 rounded-md bg-[#9cae9b] text-[#0d130e] hover:bg-[#8da08c] font-semibold text-xs inline-flex items-center gap-2 cursor-pointer"
          >
            <FileCheck className="w-3.5 h-3.5" />
            <span>Open Evidence Repository</span>
          </button>
        </div>
      )}

      {activeTab === "reports" && (
        <div className="bg-[#14171c] border border-[#222731] rounded-lg p-8 text-center space-y-4">
          <FileText className="w-10 h-10 text-[#9cae9b] mx-auto" />
          <h2 className="text-sm font-semibold text-white font-mono uppercase tracking-wider">
            Intelligence Dossiers & Export Briefings
          </h2>
          <p className="text-xs text-[#9ca3af] max-w-md mx-auto">
            Generated court-ready briefs, executive summaries, and multi-agency intelligence summaries.
          </p>
          <button
            onClick={() => navigate("/reports")}
            className="px-4 py-2 rounded-md bg-[#9cae9b] text-[#0d130e] hover:bg-[#8da08c] font-semibold text-xs inline-flex items-center gap-2 cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Open Reports Center</span>
          </button>
        </div>
      )}
    </div>
  );
};

export { CaseCockpitPage };
export default CaseCockpitPage;
