import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Flame,
  Search,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  CreditCard,
  Phone,
  MapPin,
  Users
} from "lucide-react";
import toast from "react-hot-toast";
import { WhyThisLeadModal } from "@/components/common/WhyThisLeadModal";
const LEADS_DATA = [
  {
    id: "lead-024",
    leadNumber: "LEAD #024",
    title: "Coordinated Hawala Fund Movement & Vehicle Meeting at Pier 42",
    priority: "HIGH",
    confidence: 87,
    reason: "Multiple observed relationships across communication, transaction and location records connecting Raj Mehta, Vikramaditya Singhania, and BlueStar Logistics.",
    evidenceBreakdown: {
      linkedEntities: 4,
      communicationRecords: 3,
      transactionRecords: 2,
      sharedLocations: 2
    },
    reviewStatus: "PENDING_REVIEW",
    assignedAgent: "Special Agent Marcus Vance",
    explainability: {
      leadId: "LEAD #024",
      title: "Coordinated Hawala Fund Movement & Vehicle Meeting at Pier 42",
      confidence: 87,
      priority: "HIGH",
      summary: "Multiple observed relationships across communication, transaction and location records between Raj Mehta, Vikramaditya Singhania, and BlueStar Logistics.",
      whyPrioritized: [
        "\u2713 Shared phone number & IMEI rotation",
        "\u2713 Repeated location overlap at Pier 42",
        "\u2713 Related transaction ($142,000 NEFT)",
        "\u2713 Connected case records (FIR-2024-884)"
      ],
      supportingRelationships: [
        {
          source: "Raj Mehta",
          target: "Vikramaditya Singhania",
          relationship: "Co-Conspirator // Direct Financial Recipient",
          confidence: 94,
          status: "SUSPICIOUS"
        },
        {
          source: "Raj Mehta",
          target: "+91 98201 44921",
          relationship: "Handset Subscriber (IMEI Match)",
          confidence: 96,
          status: "VERIFIED"
        },
        {
          source: "Audi A8 [MH-01-EA-9902]",
          target: "Pier 42 Maritime Dock",
          relationship: "ALPR Optical Scan Sighting",
          confidence: 99,
          status: "VERIFIED"
        },
        {
          source: "BlueStar Logistics Pvt. Ltd.",
          target: "Astraea Trading Corp",
          relationship: "Inter-Company Wire Transit",
          confidence: 89,
          status: "REVIEW_REQUIRED"
        }
      ],
      dataSources: [
        {
          type: "Call Detail Record (CDR)",
          recordId: "CDR-2024-03-12-8821",
          date: "2024-03-12 14:22 UTC",
          snippet: "Encrypted VoLTE burst from burner phone to Hawala broker terminal prior to meeting."
        },
        {
          type: "FIR / Police Report",
          recordId: "FIR No. 2024/098 (Crime Branch)",
          date: "2024-02-18 10:00 UTC",
          snippet: "Named in maritime contraband logistics docket under Sections 420 & 120B IPC."
        },
        {
          type: "Financial Ledger",
          recordId: "RTGS-TRX-9902148",
          date: "2024-03-11 16:45 UTC",
          snippet: "$142,000 remitted through shell company account to BlueStar Logistics freight escrow."
        }
      ],
      matchingAttributes: [
        { attribute: "Handset IMEI", value: "86129480112948", matchType: "Exact Hardware Match", weight: "High" },
        { attribute: "Toll FastTag ID", value: "TAG-MH01-9921", matchType: "Corroborated Plate Hit", weight: "High" },
        { attribute: "Shell Director DIN", value: "DIN-00928174", matchType: "Registrar of Companies Match", weight: "Medium" }
      ],
      graphSignals: [
        { metric: "Betweenness Centrality", score: "0.89 (Top 1%)", description: "Acts as sole bridge between logistics cluster and offshore capital cluster." },
        { metric: "Jaccard Co-Occurrence", score: "0.74", description: "High probability of co-presence across 7 distinct investigation incidents." },
        { metric: "Shortest Path Distance", score: "1 Hop", description: "Direct communication confirmed through telecom cell tower handoff." }
      ],
      timelineEvidence: [
        { time: "14:15 UTC", event: "Burner SIM dials Vikramaditya Singhania", overlapWindow: "T - 15m" },
        { time: "14:30 UTC", event: "Audi A8 passes JNPT Port Toll Plaza", overlapWindow: "T + 0m (Event)" },
        { time: "14:45 UTC", event: "Bank Wire $142,000 confirmed executed", overlapWindow: "T + 15m" }
      ]
    }
  },
  {
    id: "lead-019",
    leadNumber: "LEAD #019",
    title: "Pre-Shipment SIM Swap Sequence on IMEI #86129480112948",
    priority: "HIGH",
    confidence: 92,
    reason: "Periodic IMSI cycling observed systematically 72 hours before container consignments clear port customs.",
    evidenceBreakdown: {
      linkedEntities: 3,
      communicationRecords: 5,
      transactionRecords: 1,
      sharedLocations: 1
    },
    reviewStatus: "UNDER_REVIEW",
    assignedAgent: "Special Agent Elena Rostova",
    explainability: {
      leadId: "LEAD #019",
      title: "Pre-Shipment SIM Swap Sequence on IMEI #86129480112948",
      confidence: 92,
      priority: "HIGH",
      summary: "Target handset IMEI detected dropping prepaid SIM and re-registering fresh IMSI in identical cell azimuth.",
      whyPrioritized: [
        "\u2713 Hardware IMEI identity continuity",
        "\u2713 Periodic 72-hour rotation schedule",
        "\u2713 High correlation with customs clearance events",
        "\u2713 Verified burner distribution channel"
      ],
      supportingRelationships: [
        { source: "IMEI 861294", target: "IMSI 310410", relationship: "Hardware Association", confidence: 99, status: "VERIFIED" },
        { source: "IMSI 310410", target: "Pier 42 Maritime", relationship: "Tower Triangulation", confidence: 94, status: "SUSPICIOUS" }
      ],
      dataSources: [
        { type: "Telecom CDR Feed", recordId: "TEL-SWAP-0091", date: "2024-03-10 18:00 UTC", snippet: "IMSI de-registration followed by immediate subscriber activation on same radio baseband." }
      ],
      matchingAttributes: [
        { attribute: "Radio Baseband ID", value: "BB-QCOM-8891", matchType: "Cryptographic Hardware Signature", weight: "High" }
      ],
      graphSignals: [
        { metric: "Degree Oscillation", score: "0.82", description: "Sharp degree centrality drop followed by immediate recovery." }
      ],
      timelineEvidence: [
        { time: "17:55 UTC", event: "Primary SIM deactivated", overlapWindow: "T - 5m" },
        { time: "18:02 UTC", event: "Secondary SIM beaconed", overlapWindow: "T + 2m" }
      ]
    }
  },
  {
    id: "lead-031",
    leadNumber: "LEAD #031",
    title: "Structured Cash Deposits Below Reporting Thresholds to BlueStar",
    priority: "MEDIUM",
    confidence: 81,
    reason: "Seven structured deposits under regulatory limits observed across 4 branch terminals matching courier vehicle movement.",
    evidenceBreakdown: {
      linkedEntities: 3,
      communicationRecords: 2,
      transactionRecords: 7,
      sharedLocations: 3
    },
    reviewStatus: "PENDING_REVIEW",
    assignedAgent: "Special Agent Marcus Vance",
    explainability: {
      leadId: "LEAD #031",
      title: "Structured Cash Deposits Below Reporting Thresholds to BlueStar",
      confidence: 81,
      priority: "MEDIUM",
      summary: "Smurfing pattern detected in shell company account, coinciding with ALPR toll plaza appearances.",
      whyPrioritized: [
        "\u2713 Structuring pattern under $10,000 threshold",
        "\u2713 Vehicle transit timeline overlap with teller deposits",
        "\u2713 Counter-party shell account linkage",
        "\u2713 Anti-Money Laundering algorithmic trigger"
      ],
      supportingRelationships: [
        { source: "BlueStar Logistics", target: "Axis Bank Branch 04", relationship: "Deposit Account Holder", confidence: 98, status: "VERIFIED" }
      ],
      dataSources: [
        { type: "FIU Suspicious Activity Report", recordId: "SAR-2024-0284", date: "2024-03-08 11:00 UTC", snippet: "Rapid succession cash deposits into current account." }
      ],
      matchingAttributes: [
        { attribute: "Account Number", value: "XXXX-XXXX-9912", matchType: "Direct Match", weight: "High" }
      ],
      graphSignals: [
        { metric: "In-Degree Financial Flow", score: "0.79", description: "High concentration of inward cash streams." }
      ],
      timelineEvidence: [
        { time: "10:30 UTC", event: "Deposit at Branch A", overlapWindow: "T - 30m" },
        { time: "11:15 UTC", event: "Deposit at Branch B", overlapWindow: "T + 15m" }
      ]
    }
  },
  {
    id: "lead-042",
    leadNumber: "LEAD #042",
    title: "Co-Location Clustering at Worli Safehouse 04",
    priority: "MEDIUM",
    confidence: 78,
    reason: "Simultaneous presence of Raj Mehta and Kabir Khan corroborated by cell tower handovers and parking sensor logs.",
    evidenceBreakdown: {
      linkedEntities: 2,
      communicationRecords: 2,
      transactionRecords: 0,
      sharedLocations: 1
    },
    reviewStatus: "PENDING_REVIEW",
    assignedAgent: "Agent David Kovic",
    explainability: {
      leadId: "LEAD #042",
      title: "Co-Location Clustering at Worli Safehouse 04",
      confidence: 78,
      priority: "MEDIUM",
      summary: "Cellular tower sector azimuth 240 degrees shows continuous co-presence over 4 hours.",
      whyPrioritized: [
        "\u2713 Tower sector azimuth co-presence",
        "\u2713 Parking RFID gate scan hit",
        "\u2713 Zero outgoing calls during window (radio silence)",
        "\u2713 Pre-meeting briefing signature"
      ],
      supportingRelationships: [
        { source: "Raj Mehta", target: "Kabir Khan", relationship: "Physical Co-Presence", confidence: 85, status: "REVIEW_REQUIRED" }
      ],
      dataSources: [
        { type: "Cell Tower Azimuth Log", recordId: "TWR-WORLI-09", date: "2024-03-09 20:00 UTC", snippet: "Simultaneous channel assignment on Sector B antenna." }
      ],
      matchingAttributes: [
        { attribute: "Cell ID", value: "LAC-4001-CID-9921", matchType: "Co-Located Sector", weight: "High" }
      ],
      graphSignals: [
        { metric: "Co-Occurrence Coefficient", score: "0.71", description: "Repeated presence at non-public coordinate." }
      ],
      timelineEvidence: [
        { time: "20:10 UTC", event: "Audi A8 enters basement", overlapWindow: "T - 10m" },
        { time: "20:22 UTC", event: "Both handsets silent", overlapWindow: "T + 2m" }
      ]
    }
  }
];
import { useGetLeadsQuery, useUpdateLeadStatusMutation } from "@/store/api/apiSlice";

const LeadsPrioritizationPage = () => {
  const navigate = useNavigate();
  const { data: leadsResponse, isLoading: isLeadsLoading } = useGetLeadsQuery();
  const [updateLeadStatusMutation] = useUpdateLeadStatusMutation();

  const [leads, setLeads] = useState(LEADS_DATA);
  const [selectedExplainLead, setSelectedExplainLead] = useState(null);
  const [priorityFilter, setPriorityFilter] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [minConfidence, setMinConfidence] = useState(70);

  // Sync backend leads if available
  React.useEffect(() => {
    if (leadsResponse?.data && leadsResponse.data.length > 0) {
      const backendMapped = leadsResponse.data.map((bl) => {
        const existing = LEADS_DATA.find((dl) => dl.leadNumber === bl.leadId || dl.id === bl.leadId);
        return {
          id: bl.leadId || bl._id,
          leadNumber: bl.leadId || "LEAD #001",
          title: bl.title || bl.reason || "Investigative Hypothesis",
          priority: bl.severity || "HIGH",
          confidence: bl.confidence || 85,
          reason: bl.reason || "Correlation detected across evidence signals.",
          evidenceBreakdown: bl.evidenceBreakdown || {
            linkedEntities: bl.entityReferences?.length || 2,
            communicationRecords: 2,
            transactionRecords: 1,
            sharedLocations: 1,
          },
          reviewStatus: bl.status === "VERIFIED" ? "VERIFIED_BY_AGENT" : bl.status === "DISMISSED" ? "DISMISSED" : bl.status || "PENDING_REVIEW",
          assignedAgent: "Special Agent In-Charge",
          explainability: existing?.explainability || {
            leadId: bl.leadId,
            title: bl.title || bl.reason,
            confidence: bl.confidence,
            priority: bl.severity,
            summary: bl.reason,
            whyPrioritized: bl.evidenceSignals || ["✓ Multi-source entity correlation"],
            supportingRelationships: [],
            dataSources: [],
            matchingAttributes: [],
            graphSignals: [],
            timelineEvidence: [],
          },
        };
      });
      setLeads(backendMapped);
    }
  }, [leadsResponse]);

  const filteredLeads = leads.filter((item) => {
    const matchesPriority = priorityFilter === "ALL" || item.priority === priorityFilter;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.leadNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.reason.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesConfidence = item.confidence >= minConfidence;
    return matchesPriority && matchesSearch && matchesConfidence;
  });

  const handleMarkForReview = async (leadId) => {
    const lead = leads.find((l) => l.id === leadId);
    if (!lead) return;

    const nextStatus =
      lead.reviewStatus === "PENDING_REVIEW"
        ? "UNDER_REVIEW"
        : lead.reviewStatus === "UNDER_REVIEW"
        ? "VERIFIED_BY_AGENT"
        : "PENDING_REVIEW";

    try {
      await updateLeadStatusMutation({
        id: leadId,
        status: nextStatus === "VERIFIED_BY_AGENT" ? "VERIFIED" : nextStatus,
        notes: "Status updated by sworn investigator in triage console.",
      }).unwrap();

      toast.success(`${lead.leadNumber} status updated to: ${nextStatus.replace(/_/g, " ")}`);
    } catch {
      // Local optimistic update fallback
      setLeads((prev) =>
        prev.map((l) => (l.id === leadId ? { ...l, reviewStatus: nextStatus } : l))
      );
      toast.success(`${lead.leadNumber} status updated to: ${nextStatus.replace(/_/g, " ")}`);
    }
  };
  return /* @__PURE__ */ React.createElement("div", { className: "space-y-6 max-w-7xl mx-auto font-sans pb-16" }, /* @__PURE__ */ React.createElement("div", { className: "p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3 shadow-md" }, /* @__PURE__ */ React.createElement(AlertTriangle, { className: "w-5 h-5 text-[#F59E0B] shrink-0 mt-0.5" }), /* @__PURE__ */ React.createElement("div", { className: "text-xs" }, /* @__PURE__ */ React.createElement("span", { className: "font-bold text-amber-200 uppercase tracking-wide" }, "Investigator Safeguard Principle:", " "), /* @__PURE__ */ React.createElement("span", { className: "text-amber-300/90 leading-relaxed font-sans" }, "AI-generated investigative lead \u2014 requires investigator verification. IntelliTrack surfaces mathematically correlated signals and graph anomalies to guide investigator attention; it never asserts definitive criminal culpability or replaces sworn judgment."))), /* @__PURE__ */ React.createElement("div", { className: "bg-[#0D1B2A] border border-[#263B55] rounded-2xl p-5 shadow-xl space-y-4" }, /* @__PURE__ */ React.createElement("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#263B55] pb-3" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "text-xs font-mono uppercase tracking-wider text-[#EF4444] flex items-center gap-1.5" }, /* @__PURE__ */ React.createElement(Flame, { className: "w-4 h-4 text-[#EF4444]" }), /* @__PURE__ */ React.createElement("span", null, "INVESTIGATIVE LEADS TRIAGE")), /* @__PURE__ */ React.createElement("h1", { className: "text-2xl font-bold text-white tracking-tight mt-0.5" }, "Explainable Lead Prioritization"), /* @__PURE__ */ React.createElement("p", { className: "text-xs text-[#94A3B8]" }, "Automated ranking of investigative hypotheses with full algorithmic explainability")), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 font-mono text-xs" }, /* @__PURE__ */ React.createElement("span", { className: "px-3 py-1.5 rounded-lg bg-[#101F33] text-white border border-[#263B55]" }, "Active Leads: ", /* @__PURE__ */ React.createElement("strong", { className: "text-cyan-400" }, filteredLeads.length), " / ", leads.length))), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-12 gap-3 font-mono text-xs items-center" }, /* @__PURE__ */ React.createElement("div", { className: "md:col-span-5 relative" }, /* @__PURE__ */ React.createElement(Search, { className: "w-4 h-4 text-[#94A3B8] absolute left-3 top-2.5" }), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "text",
      value: searchQuery,
      onChange: (e) => setSearchQuery(e.target.value),
      placeholder: "Search leads by ID, keyword, or reason...",
      className: "w-full h-9 pl-9 pr-3 rounded-lg bg-[#07111F] border border-[#263B55] text-white placeholder-[#94A3B8] text-xs focus:border-[#2563EB] focus:outline-hidden font-mono"
    }
  )), /* @__PURE__ */ React.createElement("div", { className: "md:col-span-4 flex items-center gap-1.5" }, /* @__PURE__ */ React.createElement("span", { className: "text-[10px] text-[#94A3B8] uppercase" }, "Priority:"), ["ALL", "HIGH", "MEDIUM"].map((p) => /* @__PURE__ */ React.createElement(
    "button",
    {
      key: p,
      onClick: () => setPriorityFilter(p),
      className: `px-2.5 py-1 rounded text-[11px] font-semibold transition-colors cursor-pointer ${priorityFilter === p ? p === "HIGH" ? "bg-red-500/20 text-[#EF4444] border border-red-500/40" : p === "MEDIUM" ? "bg-amber-500/20 text-[#F59E0B] border border-amber-500/40" : "bg-[#2563EB] text-white" : "bg-[#07111F] text-slate-400 hover:text-white"}`
    },
    p
  ))), /* @__PURE__ */ React.createElement("div", { className: "md:col-span-3 flex items-center gap-2" }, /* @__PURE__ */ React.createElement("span", { className: "text-[10px] text-[#94A3B8] uppercase whitespace-nowrap" }, "Min Confidence: ", /* @__PURE__ */ React.createElement("strong", { className: "text-white" }, minConfidence, "%")), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "range",
      min: "50",
      max: "95",
      value: minConfidence,
      onChange: (e) => setMinConfidence(Number(e.target.value)),
      className: "w-full accent-[#2563EB] cursor-pointer"
    }
  )))), /* @__PURE__ */ React.createElement("div", { className: "space-y-4" }, filteredLeads.map((lead) => /* @__PURE__ */ React.createElement(
    "div",
    {
      key: lead.id,
      className: "bg-[#0D1B2A] border border-[#263B55] hover:border-[#2563EB] rounded-2xl p-5 sm:p-6 transition-all shadow-xl space-y-4 group"
    },
    /* @__PURE__ */ React.createElement("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#263B55]/70 pb-3" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-3" }, /* @__PURE__ */ React.createElement("span", { className: "text-base sm:text-lg font-black font-mono text-white tracking-wider" }, lead.leadNumber), /* @__PURE__ */ React.createElement(
      "span",
      {
        className: `px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider border ${lead.priority === "HIGH" ? "bg-red-500/20 text-[#EF4444] border-red-500/40" : "bg-amber-500/20 text-[#F59E0B] border-amber-500/40"}`
      },
      lead.priority,
      " PRIORITY"
    ), /* @__PURE__ */ React.createElement(
      "span",
      {
        className: `px-2 py-0.5 rounded text-[10px] font-mono font-semibold border ${lead.reviewStatus === "VERIFIED_BY_AGENT" ? "bg-emerald-500/20 text-[#10B981] border-emerald-500/30" : lead.reviewStatus === "UNDER_REVIEW" ? "bg-amber-500/20 text-[#F59E0B] border-amber-500/30" : "bg-[#101F33] text-slate-400 border-[#263B55]"}`
      },
      lead.reviewStatus.replace(/_/g, " ")
    )), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 font-mono text-xs self-start sm:self-auto" }, /* @__PURE__ */ React.createElement("span", { className: "text-[#94A3B8]" }, "Confidence:"), /* @__PURE__ */ React.createElement("span", { className: "text-lg font-extrabold text-[#06B6D4]" }, lead.confidence, "%"), /* @__PURE__ */ React.createElement("div", { className: "w-16 h-1.5 bg-[#07111F] rounded-full overflow-hidden" }, /* @__PURE__ */ React.createElement(
      "div",
      {
        className: "h-full bg-linear-to-r from-blue-500 to-cyan-400 rounded-full",
        style: { width: `${lead.confidence}%` }
      }
    )))),
    /* @__PURE__ */ React.createElement("div", { className: "space-y-1.5" }, /* @__PURE__ */ React.createElement("h3", { className: "text-base font-bold text-white tracking-tight" }, lead.title), /* @__PURE__ */ React.createElement("div", { className: "p-3 rounded-xl bg-[#07111F] border border-[#263B55] text-xs text-slate-300 font-sans leading-relaxed" }, /* @__PURE__ */ React.createElement("span", { className: "text-[10px] font-mono font-bold uppercase text-[#94A3B8] block mb-1" }, "Reason for Prioritization:"), '"', lead.reason, '"')),
    /* @__PURE__ */ React.createElement("div", { className: "space-y-1.5" }, /* @__PURE__ */ React.createElement("span", { className: "text-[10px] font-mono font-bold uppercase text-[#94A3B8]" }, "Evidence Breakdown:"), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-xs" }, /* @__PURE__ */ React.createElement("div", { className: "p-2.5 rounded-lg bg-[#101F33] border border-[#263B55] flex items-center gap-2" }, /* @__PURE__ */ React.createElement(Users, { className: "w-3.5 h-3.5 text-blue-400" }), /* @__PURE__ */ React.createElement("span", { className: "text-white font-bold" }, lead.evidenceBreakdown.linkedEntities, " linked entities")), /* @__PURE__ */ React.createElement("div", { className: "p-2.5 rounded-lg bg-[#101F33] border border-[#263B55] flex items-center gap-2" }, /* @__PURE__ */ React.createElement(Phone, { className: "w-3.5 h-3.5 text-cyan-400" }), /* @__PURE__ */ React.createElement("span", { className: "text-white font-bold" }, lead.evidenceBreakdown.communicationRecords, " communication records")), /* @__PURE__ */ React.createElement("div", { className: "p-2.5 rounded-lg bg-[#101F33] border border-[#263B55] flex items-center gap-2" }, /* @__PURE__ */ React.createElement(CreditCard, { className: "w-3.5 h-3.5 text-emerald-400" }), /* @__PURE__ */ React.createElement("span", { className: "text-white font-bold" }, lead.evidenceBreakdown.transactionRecords, " transaction records")), /* @__PURE__ */ React.createElement("div", { className: "p-2.5 rounded-lg bg-[#101F33] border border-[#263B55] flex items-center gap-2" }, /* @__PURE__ */ React.createElement(MapPin, { className: "w-3.5 h-3.5 text-amber-400" }), /* @__PURE__ */ React.createElement("span", { className: "text-white font-bold" }, lead.evidenceBreakdown.sharedLocations, " shared locations")))),
    /* @__PURE__ */ React.createElement("div", { className: "pt-3 border-t border-[#263B55] flex flex-wrap items-center justify-between gap-3 text-xs font-mono" }, /* @__PURE__ */ React.createElement("div", { className: "text-[11px] text-[#94A3B8]" }, "Assigned: ", /* @__PURE__ */ React.createElement("span", { className: "text-slate-200" }, lead.assignedAgent)), /* @__PURE__ */ React.createElement("div", { className: "flex flex-wrap items-center gap-2" }, /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => setSelectedExplainLead(lead.explainability),
        className: "px-3.5 py-2 rounded-lg bg-blue-500/10 border border-[#2563EB] hover:bg-[#2563EB] text-[#06B6D4] hover:text-white font-bold transition-all flex items-center gap-1.5 shadow-md cursor-pointer"
      },
      /* @__PURE__ */ React.createElement(HelpCircle, { className: "w-3.5 h-3.5" }),
      /* @__PURE__ */ React.createElement("span", null, "Why this lead?")
    ), /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => navigate("/evidence"),
        className: "px-3 py-2 rounded-lg bg-[#101F33] hover:bg-[#12243A] text-slate-200 border border-[#263B55] hover:text-white transition-colors cursor-pointer"
      },
      "View Evidence"
    ), /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => navigate("/network"),
        className: "px-3 py-2 rounded-lg bg-[#101F33] hover:bg-[#12243A] text-slate-200 border border-[#263B55] hover:text-white transition-colors cursor-pointer"
      },
      "Open Network"
    ), /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => handleMarkForReview(lead.id),
        className: "px-3 py-2 rounded-lg bg-[#07111F] hover:bg-[#101F33] text-amber-300 border border-amber-500/30 transition-colors flex items-center gap-1 cursor-pointer font-semibold"
      },
      /* @__PURE__ */ React.createElement(CheckCircle2, { className: "w-3.5 h-3.5" }),
      /* @__PURE__ */ React.createElement("span", null, "Mark for Review")
    )))
  ))), /* @__PURE__ */ React.createElement(
    WhyThisLeadModal,
    {
      isOpen: !!selectedExplainLead,
      onClose: () => setSelectedExplainLead(null),
      data: selectedExplainLead
    }
  ));
};
var stdin_default = LeadsPrioritizationPage;
export {
  LeadsPrioritizationPage,
  stdin_default as default
};
