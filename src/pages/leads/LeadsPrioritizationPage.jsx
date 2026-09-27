import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronDown,
  Search,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  Eye,
  Check,
  X
} from "lucide-react";
import toast from "react-hot-toast";
import { useGetLeadsQuery, useUpdateLeadStatusMutation } from "@/store/api/apiSlice";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";
import { WhyThisLeadModal } from "@/components/common/WhyThisLeadModal";

const MOCK_LEADS = [
  {
    id: "LD-8821",
    leadId: "LD-8821",
    entity: "A. Kovacs ↔ J. Thorne",
    reason: "Shared phone identifier across invoices + leases",
    confidence: 94,
    severity: "High",
    status: "New",
    created: "Nov 23",
    caseId: "CS-2418",
    description: "+1 (415) 555-0132 appears on Meridian invoice batch #4471, the Northgate Unit 4 lease co-signed by J. Thorne, and the Pier 41 gate log for truck 7XQ-4419.",
    supportingEvidence: [
      { id: "EV-5498", label: "Invoice batch #4471 · Pending" },
      { id: "EV-5441", label: "Lease agreement · Verified" },
      { id: "EV-5521", label: "Gate log export · Verified" }
    ],
    timelineItems: [
      "Nov 18 · Call cluster — 14 calls in 72h",
      "Nov 21 · Invoice batch flagged",
      "Nov 24 · Night access — Pier 41, Unit 9"
    ],
    relatedEntities: [
      { name: "A. Kovacs", type: "Person" },
      { name: "J. Thorne", type: "Person" },
      { name: "Meridian Holdings", type: "Organization" }
    ]
  },
  {
    id: "LD-8819",
    leadId: "LD-8819",
    entity: "Meridian Holdings LLC",
    reason: "Duplicate invoice totals across 3 batches",
    confidence: 88,
    severity: "High",
    status: "Under Review",
    created: "Nov 15",
    caseId: "CS-2418",
    description: "Multiple duplicate billing hashes routed to shell company bank accounts matching Hawala settlement days.",
    supportingEvidence: [
      { id: "EV-5498", label: "Invoice batch #4471 · Pending" },
      { id: "EV-5420", label: "Wire ledger receipt · Verified" }
    ],
    timelineItems: [
      "Nov 10 · Batch 1 dispatched",
      "Nov 15 · Duplicate remittance flagged"
    ],
    relatedEntities: [
      { name: "Meridian Holdings LLC", type: "Organization" },
      { name: "Hawala Broker #4", type: "Person" }
    ]
  },
  {
    id: "LD-8814",
    leadId: "LD-8814",
    entity: "+1 (415) 555-0132",
    reason: "Burner-pattern: 14 calls in 72h window",
    confidence: 81,
    severity: "Medium",
    status: "New",
    created: "Nov 20",
    caseId: "CS-2418",
    description: "High-density burst calling followed by IMEI IMSI disconnect.",
    supportingEvidence: [
      { id: "EV-5470", label: "Call Detail Record feed · Verified" }
    ],
    timelineItems: [
      "Nov 18 · 14-call burst logged",
      "Nov 19 · IMSI unregistered"
    ],
    relatedEntities: [
      { name: "A. Kovacs", type: "Person" },
      { name: "+1 (415) 555-0132", type: "Telephony" }
    ]
  },
  {
    id: "LD-8809",
    leadId: "LD-8809",
    entity: "Box truck 7XQ-4419",
    reason: "Recurring night access, same gate + bay",
    confidence: 76,
    severity: "Medium",
    status: "Verified",
    created: "Nov 15",
    caseId: "CS-2418",
    description: "Optical ALPR scans corroborate recurring docking convergence.",
    supportingEvidence: [
      { id: "EV-5521", label: "Gate log export · Verified" },
      { id: "EV-5455", label: "Field surveillance note · Verified" }
    ],
    timelineItems: [
      "Nov 15 · Harborview scan",
      "Nov 24 · Pier 41 night access"
    ],
    relatedEntities: [
      { name: "Box truck 7XQ-4419", type: "Vehicle" },
      { name: "A. Kovacs", type: "Person" }
    ]
  },
  {
    id: "LD-8802",
    leadId: "LD-8802",
    entity: "Northgate LLC",
    reason: "Lease signed days before first shipment",
    confidence: 68,
    severity: "Low",
    status: "Dismissed",
    created: "Nov 22",
    caseId: "CS-2418",
    description: "Warehouse lease co-signed by known shell company representative.",
    supportingEvidence: [
      { id: "EV-5441", label: "Lease agreement · Verified" }
    ],
    timelineItems: [
      "Nov 12 · Lease signed"
    ],
    relatedEntities: [
      { name: "Northgate LLC", type: "Organization" },
      { name: "J. Thorne", type: "Person" }
    ]
  }
];

export const LeadsPrioritizationPage = () => {
  const navigate = useNavigate();
  const { data: backendLeads } = useGetLeadsQuery();
  const [updateStatus] = useUpdateLeadStatusMutation();

  const [leads, setLeads] = useState(MOCK_LEADS);
  const [caseFilter, setCaseFilter] = useState("ALL");
  const [minConfidence, setMinConfidence] = useState(70);
  const [severityFilter, setSeverityFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [selectedExplainLead, setSelectedExplainLead] = useState(null);

  React.useEffect(() => {
    if (backendLeads?.data?.length) {
      // integrate backend data
    }
  }, [backendLeads]);

  const filteredLeads = leads.filter((l) => {
    const matchSeverity = severityFilter === "ALL" || l.severity.toUpperCase() === severityFilter.toUpperCase();
    const matchStatus = statusFilter === "ALL" || l.status.toUpperCase() === statusFilter.toUpperCase();
    const matchConf = l.confidence >= minConfidence;
    return matchSeverity && matchStatus && matchConf;
  });

  return (
    <div className="space-y-4">
      {/* Page Header */}
      <div>
        <h1 className="text-xl font-medium text-white tracking-tight">Investigative Leads</h1>
        <p className="text-xs text-[#8d98a5] mt-0.5">
          AI-generated patterns awaiting investigator review
        </p>
      </div>

      {/* Investigator Safeguard Banner matching InspireUI */}
      <div className="p-3 bg-[#14171c] border border-[#222731] rounded-lg text-xs text-[#8fa38d] font-sans">
        AI-generated investigative signals — not conclusions. Every lead requires investigator verification.
      </div>

      {/* Filter Bar matching InspireUI */}
      <div className="flex flex-wrap items-center gap-2">
        <div className="relative">
          <select
            value={caseFilter}
            onChange={(e) => setCaseFilter(e.target.value)}
            className="bg-[#14171c] border border-[#222731] text-xs text-[#d1d7df] rounded px-3 py-1.5 pr-8 appearance-none focus:outline-none focus:border-[#9cae9b] transition-colors cursor-pointer"
          >
            <option value="ALL">Case: All</option>
            <option value="CS-2418">Case: CS-2418</option>
            <option value="CS-2419">Case: CS-2419</option>
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-[#6c7682] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        <div className="relative">
          <select
            value={minConfidence}
            onChange={(e) => setMinConfidence(Number(e.target.value))}
            className="bg-[#14171c] border border-[#222731] text-xs text-[#d1d7df] rounded px-3 py-1.5 pr-8 appearance-none focus:outline-none focus:border-[#9cae9b] transition-colors cursor-pointer"
          >
            <option value={70}>Confidence &ge; 70%</option>
            <option value={80}>Confidence &ge; 80%</option>
            <option value={90}>Confidence &ge; 90%</option>
            <option value={50}>Confidence &ge; 50%</option>
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-[#6c7682] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        <div className="relative">
          <select
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value)}
            className="bg-[#14171c] border border-[#222731] text-xs text-[#d1d7df] rounded px-3 py-1.5 pr-8 appearance-none focus:outline-none focus:border-[#9cae9b] transition-colors cursor-pointer"
          >
            <option value="ALL">Severity: All</option>
            <option value="HIGH">High Severity</option>
            <option value="MEDIUM">Medium Severity</option>
            <option value="LOW">Low Severity</option>
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-[#6c7682] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        <div className="relative">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-[#14171c] border border-[#222731] text-xs text-[#d1d7df] rounded px-3 py-1.5 pr-8 appearance-none focus:outline-none focus:border-[#9cae9b] transition-colors cursor-pointer"
          >
            <option value="ALL">Status: All</option>
            <option value="NEW">New</option>
            <option value="UNDER REVIEW">Under Review</option>
            <option value="VERIFIED">Verified</option>
            <option value="DISMISSED">Dismissed</option>
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-[#6c7682] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      {/* Leads Data Table matching InspireUI */}
      <div className="bg-[#14171c] border border-[#222731] rounded-lg overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#222731] text-[#6c7682] font-medium bg-[#101317]">
                <th className="py-2.5 px-4 font-normal">Lead ID</th>
                <th className="py-2.5 px-4 font-normal">Entity</th>
                <th className="py-2.5 px-4 font-normal">Reason</th>
                <th className="py-2.5 px-4 font-normal">Conf.</th>
                <th className="py-2.5 px-4 font-normal">Severity</th>
                <th className="py-2.5 px-4 font-normal">Status</th>
                <th className="py-2.5 px-4 font-normal">Created</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#222731]">
              {filteredLeads.map((lead) => (
                <tr
                  key={lead.id}
                  onClick={() => navigate(`/leads/${lead.id}`)}
                  className="hover:bg-[#181d24] transition-colors cursor-pointer group"
                >
                  <td className="py-3 px-4 font-mono text-[#8d98a5] group-hover:text-white transition-colors">
                    {lead.leadId}
                  </td>
                  <td className="py-3 px-4 font-medium text-white">
                    {lead.entity}
                  </td>
                  <td className="py-3 px-4 text-[#8d98a5] max-w-md truncate">
                    {lead.reason}
                  </td>
                  <td className="py-3 px-4">
                    <span className="inline-block px-1.5 py-0.5 rounded bg-[#101317] border border-[#222731] font-mono text-[11px] text-[#9cae9b]">
                      {lead.confidence}%
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-medium ${
                        lead.severity === "High"
                          ? "bg-[#281c1c] text-[#dc7869]"
                          : lead.severity === "Medium"
                          ? "bg-[#252016] text-[#c4a265]"
                          : "bg-[#181d24] text-[#8d98a5]"
                      }`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-current" />
                      {lead.severity}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-medium ${
                        lead.status === "New"
                          ? "bg-[#18261c] text-[#8fa38d]"
                          : lead.status === "Under Review"
                          ? "bg-[#252016] text-[#c4a265]"
                          : lead.status === "Verified"
                          ? "bg-[#18261c] text-[#8fa38d]"
                          : "bg-[#181d24] text-[#6c7682]"
                      }`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-current" />
                      {lead.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-[#6c7682] font-mono">
                    {lead.created}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LeadsPrioritizationPage;
