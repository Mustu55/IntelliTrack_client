import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Activity,
  Flame,
  Sparkles,
  CheckCircle2,
  Clock,
  ArrowRight
} from "lucide-react";
import toast from "react-hot-toast";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";
import Card from "../../components/ui/Card";

const PATTERNS_LIST = [
  {
    id: "PAT-01",
    title: "Bi-Weekly Co-Location Convergence at Pier 41",
    type: "CO_LOCATION",
    plainDescription: "Truck 7XQ-4419 and Burner SIM #1 consistently arrive at Pier 41 loading berth on Tuesday and Friday evenings between 19:00 and 21:00 UTC, preceding maritime cargo unloads.",
    involvedEntities: ["A. Kovacs", "Truck 7XQ-4419", "Burner +1 (555) 019-8821"],
    involvedLocations: ["Pier 41 Maritime Facility Bay C"],
    timeWindow: "Tues / Fri 19:00-21:00 UTC",
    frequency: "7 occurrences in 21 days",
    evidenceCount: 22,
    promotedToLead: true
  },
  {
    id: "PAT-02",
    title: "Systematic SIM Card Swap Rotation Every 72 Hours",
    type: "TELEPHONY_ROTATION",
    plainDescription: "IMEI Hardware device #8612-9481 systematically drops registration and re-activates with fresh prepaid IMSI tokens every 72 hours, matching encrypted logistics handoffs.",
    involvedEntities: ["Burner SIM #1", "Burner SIM #2", "J. Thorne"],
    involvedLocations: ["Northgate Sector 4", "Safehouse 04"],
    timeWindow: "Every 72 Hours (Systematic)",
    frequency: "4 consecutive swaps logged",
    evidenceCount: 16,
    promotedToLead: false
  },
  {
    id: "PAT-03",
    title: "Smurfing / Structured Cash Transfers Below $10k Threshold",
    type: "FINANCIAL_STRUCTURING",
    plainDescription: "Meridian Holdings accounts issue recurring wire transfers between $9,200 and $9,800 to multiple Hawala broker accounts within 30 minutes of physical Pier 41 departures.",
    involvedEntities: ["Meridian Holdings LLC", "Hawala Broker #4", "A. Kovacs"],
    involvedLocations: ["Atlantic Ave Financial Corridor"],
    timeWindow: "Post-Meeting +30 Minutes",
    frequency: "5 structured wires",
    evidenceCount: 19,
    promotedToLead: false
  }
];

export const PatternsPage = () => {
  const navigate = useNavigate();
  const [patterns, setPatterns] = useState(PATTERNS_LIST);

  const handlePromoteToLead = (id, title) => {
    setPatterns((prev) =>
      prev.map((p) => (p.id === id ? { ...p, promotedToLead: true } : p))
    );
    toast.success(`Pattern promoted to active lead: ${title}`);
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-medium text-white tracking-tight">Machine-Detected Patterns</h1>
          <p className="text-xs text-[#8d98a5] mt-0.5">
            Algorithmic spatial and temporal anomaly discovery · CS-2418
          </p>
        </div>
        <Button
          variant="secondary"
          onClick={() => navigate("/leads")}
          icon={<Flame className="w-3.5 h-3.5 text-[#c4a265]" />}
        >
          View Leads Queue
        </Button>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="bg-[#14171c] border border-[#222731] rounded-lg p-3.5">
          <div className="text-[10px] font-mono text-[#6c7682] uppercase tracking-wider">DISCOVERED PATTERNS</div>
          <div className="text-xl font-medium text-white mt-1">3 Patterns</div>
          <div className="text-[11px] text-[#8d98a5] mt-0.5">Autonomous recurrent heuristics</div>
        </div>
        <div className="bg-[#14171c] border border-[#222731] rounded-lg p-3.5">
          <div className="text-[10px] font-mono text-[#6c7682] uppercase tracking-wider">DETECTION CONFIDENCE</div>
          <div className="text-xl font-medium text-[#8fa38d] mt-1">98.2% Anomaly</div>
          <div className="text-[11px] text-[#8d98a5] mt-0.5">Chi-Square P-Value &lt; 0.001</div>
        </div>
        <div className="bg-[#14171c] border border-[#222731] rounded-lg p-3.5">
          <div className="text-[10px] font-mono text-[#6c7682] uppercase tracking-wider">LEAD CONVERSIONS</div>
          <div className="text-xl font-medium text-[#c4a265] mt-1">1 Active Lead</div>
          <div className="text-[11px] text-[#8d98a5] mt-0.5">Direct warrant escalation</div>
        </div>
      </div>

      {/* Pattern Cards List */}
      <div className="space-y-3">
        {patterns.map((pat) => (
          <div
            key={pat.id}
            className="bg-[#14171c] border border-[#222731] rounded-lg p-5 space-y-3 hover:border-[#384152] transition-colors"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-semibold text-white">{pat.id}</span>
                <span className="text-[#6c7682]">·</span>
                <Badge variant={pat.type === "CO_LOCATION" ? "success" : "warning"}>
                  {pat.type.replace("_", " ")}
                </Badge>
                <span className="text-xs text-[#6c7682]">· {pat.frequency}</span>
              </div>

              {pat.promotedToLead ? (
                <Badge variant="success">PROMOTED TO ACTIVE LEAD</Badge>
              ) : (
                <Button
                  size="sm"
                  variant="primary"
                  onClick={() => handlePromoteToLead(pat.id, pat.title)}
                >
                  Promote to Actionable Lead
                </Button>
              )}
            </div>

            <div className="text-sm font-medium text-white">{pat.title}</div>
            <p className="text-xs text-[#8d98a5] leading-relaxed">{pat.plainDescription}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 border-t border-[#222731] text-xs">
              <div>
                <span className="text-[10px] text-[#6c7682] uppercase block mb-1">Involved Entities</span>
                <div className="flex flex-wrap gap-1.5">
                  {pat.involvedEntities.map((ent, i) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-[#101317] border border-[#222731] text-xs text-[#d1d7df]">
                      {ent}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <span className="text-[10px] text-[#6c7682] uppercase block mb-1">Temporal Window & Logs</span>
                <div className="flex items-center gap-2 text-xs text-[#8d98a5]">
                  <span className="px-2 py-0.5 rounded bg-[#101317] border border-[#222731]">{pat.timeWindow}</span>
                  <span>{pat.evidenceCount} Corroborating Logs</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatternsPage;
