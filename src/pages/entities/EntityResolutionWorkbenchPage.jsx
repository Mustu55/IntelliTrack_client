import React, { useState } from "react";
import {
  GitBranch,
  CheckCircle2,
  HelpCircle,
  Check,
  X,
  History,
  Shield,
  Layers
} from "lucide-react";
import toast from "react-hot-toast";

const INITIAL_CANDIDATES = [
  {
    id: "CAND-01",
    sourceA: {
      recordId: "REC-NYPD-8910",
      source: "Metropolitan Booking Record (2024)",
      name: "Raj Mehta",
      alias: "The Courier",
      phone: "+91 98201 44921",
      address: "Pier 42 Dock Yard B-4, JNPT",
      vehiclePlate: "MH-01-EA-9902",
      dob: "14-MAY-1981"
    },
    sourceB: {
      recordId: "REC-FINCEN-4421",
      source: "FinCEN SAR Transaction Wire #4421",
      name: "Rajiv K. Mehta",
      alias: "R.K. Mehta / BlueStar Logistics",
      phone: "+91 98201 44921",
      address: "Pier 42 Maritime Facility, JNPT",
      vehiclePlate: "MH-01-EA-9902",
      dob: "14-MAY-1981"
    },
    confidence: 96.4,
    matchFactors: ["Identical Handset ANI (+91 98201 44921)", "Soundex Token Collision", "Vehicle Plate Match", "Exact DOB Match"],
    status: "PENDING"
  },
  {
    id: "CAND-02",
    sourceA: {
      recordId: "REC-CAD-1029",
      source: "CAD 911 Incident Dispatch #1029",
      name: "Vikramaditya Singhania",
      alias: "Director Singhania",
      phone: "+91 98110 88204",
      address: "Pier 42 Maritime Terminal Shed 3",
      vehiclePlate: "MH-04-AZ-4102",
      dob: "08-AUG-1979"
    },
    sourceB: {
      recordId: "REC-PORT-5510",
      source: "Port Cargo Customs Manifest",
      name: "V. Singhania",
      alias: "Astraea Trading Corp",
      phone: "+91 98110 88204",
      address: "Pier 42 Berth 4 Gate B",
      vehiclePlate: "MH-04-AZ-4102",
      dob: "08-AUG-1979"
    },
    confidence: 91.8,
    matchFactors: ["Shared Telecom Subscriber", "Pier 42 Co-location", "ALPR Toll Overlap"],
    status: "PENDING"
  },
  {
    id: "CAND-03",
    sourceA: {
      recordId: "REC-TEL-3310",
      source: "Cellular Tower Sector Dump",
      name: "Tariq Mansoor",
      alias: "Mansoor Escrow",
      phone: "+91 98330 11982",
      address: "Worli Seaface Apt 402, Mumbai",
      vehiclePlate: "MH-02-CD-8812",
      dob: "22-NOV-1985"
    },
    sourceB: {
      recordId: "REC-STATE-0941",
      source: "Customs Escrow Ledger Registry",
      name: "Tariq M. Mansoor",
      alias: "T. Mansoor",
      phone: "+91 98330 11982",
      address: "Worli Seaface Apartment 402",
      vehiclePlate: "UNREGISTERED",
      dob: "22-NOV-1985"
    },
    confidence: 88.5,
    matchFactors: ["Phonetic Levenshtein Distance (0.89)", "Shared Address Token", "Exact DOB Match"],
    status: "PENDING"
  }
];

const EntityResolutionWorkbenchPage = () => {
  const [candidates, setCandidates] = useState(INITIAL_CANDIDATES);
  const [auditLog, setAuditLog] = useState([]);

  const handleDecision = (id, decision) => {
    setCandidates((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: decision } : c))
    );
    const label =
      decision === "CONFIRMED"
        ? "Confirmed Same Entity (Merged)"
        : decision === "REJECTED"
        ? "Rejected Match Discrepancy"
        : "Escalated to Supervisory Review";
    toast.success(`Action applied: ${label}`);
    setAuditLog((prev) => [
      {
        id: `aud-${Date.now()}`,
        action: `${label} on pair ${id}`,
        time: new Date().toLocaleTimeString() + " UTC",
      },
      ...prev,
    ]);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto font-sans antialiased text-[#f3f4f6]">
      {/* Top Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#1e232a]">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-semibold text-white tracking-tight">
              Entity Resolution Workbench
            </h1>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#18261c] text-[#8fa38d] border border-[#25392b]">
              PROBABILISTIC DEDUPLICATION
            </span>
          </div>
          <p className="text-xs text-[#9ca3af] mt-0.5">
            Algorithmic deduplication engine pairing disparate telemetry, aliases, and biometrics with attribute-level diff verification.
          </p>
        </div>

        <button
          onClick={() => {
            candidates.forEach((c) => {
              if (c.status === "PENDING" && c.confidence > 90) {
                handleDecision(c.id, "CONFIRMED");
              }
            });
            toast.success("Bulk confirmed candidate matches > 90% confidence");
          }}
          className="h-8.5 px-3.5 rounded-md bg-[#9cae9b] text-[#0d130e] hover:bg-[#8da08c] font-semibold text-xs flex items-center gap-1.5 transition-colors shadow-xs self-start sm:self-auto cursor-pointer font-sans"
        >
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Bulk Confirm &gt; 90%</span>
        </button>
      </div>

      {/* Candidate Matches List */}
      <div className="space-y-5">
        {candidates.map((cand) => (
          <div
            key={cand.id}
            className={`bg-[#14171c] border rounded-lg overflow-hidden shadow-xs transition-all ${
              cand.status === "CONFIRMED"
                ? "border-[#25392b] bg-[#141a16]"
                : cand.status === "REJECTED"
                ? "border-[#442327] opacity-60"
                : "border-[#222731]"
            }`}
          >
            {/* Candidate Header */}
            <div className="bg-[#101317] px-4 py-3 border-b border-[#222731] flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
              <div className="flex items-center gap-2.5">
                <span className="text-[#9cae9b] font-semibold uppercase">{cand.id}</span>
                <span className="text-[#606875]">·</span>
                <span className="text-[#d1d5db]">
                  Resolution Match: <strong className="text-white">{cand.confidence}%</strong>
                </span>
              </div>
              <span
                className={`px-2 py-0.2 rounded font-semibold text-[10px] uppercase ${
                  cand.status === "CONFIRMED"
                    ? "bg-[#18261c] text-[#8fa38d] border border-[#25392b]"
                    : cand.status === "REJECTED"
                    ? "bg-[#2b1719] text-[#dc7869] border border-[#442327]"
                    : "bg-[#282215] text-[#c4a265] border border-[#3e3420]"
                }`}
              >
                ● {cand.status}
              </span>
            </div>

            {/* Diff Columns */}
            <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-5 font-mono text-xs">
              {/* Record A */}
              <div className="p-4 rounded-md bg-[#101317] border border-[#222731] space-y-2.5">
                <div className="flex justify-between items-center border-b border-[#222731] pb-2">
                  <span className="text-[#9cae9b] font-semibold text-[10px] uppercase">
                    RECORD A: {cand.sourceA.recordId}
                  </span>
                  <span className="text-[#606875] text-[10px] font-sans">{cand.sourceA.source}</span>
                </div>
                <div className="space-y-1.5 text-[#d1d5db] text-xs">
                  <div>
                    <span className="text-[#606875]">Name: </span>
                    <strong className="text-white font-sans">{cand.sourceA.name}</strong>
                  </div>
                  <div>
                    <span className="text-[#606875]">Alias: </span>
                    <span>{cand.sourceA.alias}</span>
                  </div>
                  <div>
                    <span className="text-[#606875]">Phone: </span>
                    <span className="text-[#9cae9b] bg-[#14171c] px-1.5 py-0.2 rounded border border-[#222731]">
                      {cand.sourceA.phone}
                    </span>
                  </div>
                  <div>
                    <span className="text-[#606875]">Address: </span>
                    <span className="font-sans text-[11px]">{cand.sourceA.address}</span>
                  </div>
                  <div>
                    <span className="text-[#606875]">Vehicle: </span>
                    <span className="text-[#c4a265]">{cand.sourceA.vehiclePlate}</span>
                  </div>
                </div>
              </div>

              {/* Record B */}
              <div className="p-4 rounded-md bg-[#101317] border border-[#222731] space-y-2.5">
                <div className="flex justify-between items-center border-b border-[#222731] pb-2">
                  <span className="text-[#7a8ba8] font-semibold text-[10px] uppercase">
                    RECORD B: {cand.sourceB.recordId}
                  </span>
                  <span className="text-[#606875] text-[10px] font-sans">{cand.sourceB.source}</span>
                </div>
                <div className="space-y-1.5 text-[#d1d5db] text-xs">
                  <div>
                    <span className="text-[#606875]">Name: </span>
                    <strong className="text-white font-sans">{cand.sourceB.name}</strong>
                  </div>
                  <div>
                    <span className="text-[#606875]">Alias: </span>
                    <span>{cand.sourceB.alias}</span>
                  </div>
                  <div>
                    <span className="text-[#606875]">Phone: </span>
                    <span className="text-[#9cae9b] bg-[#14171c] px-1.5 py-0.2 rounded border border-[#222731]">
                      {cand.sourceB.phone}
                    </span>
                  </div>
                  <div>
                    <span className="text-[#606875]">Address: </span>
                    <span className="font-sans text-[11px]">{cand.sourceB.address}</span>
                  </div>
                  <div>
                    <span className="text-[#606875]">Vehicle: </span>
                    <span className="text-[#c4a265]">{cand.sourceB.vehiclePlate}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Matching Factors and Decision CTAs */}
            <div className="bg-[#101317] px-5 py-3 border-t border-[#222731] flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-[#606875] text-[10px] font-mono font-semibold mr-1 uppercase">
                  Signals:
                </span>
                {cand.matchFactors.map((fac, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded bg-[#14171c] border border-[#222731] text-[#9ca3af] text-[10px] font-mono"
                  >
                    ✓ {fac}
                  </span>
                ))}
              </div>

              {cand.status === "PENDING" && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleDecision(cand.id, "REJECTED")}
                    className="px-3 py-1 rounded-md bg-[#101317] hover:bg-[#2b1719] text-[#dc7869] border border-[#442327] font-medium text-xs flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                    <span>Reject</span>
                  </button>
                  <button
                    onClick={() => handleDecision(cand.id, "CONFIRMED")}
                    className="px-3.5 py-1 rounded-md bg-[#9cae9b] hover:bg-[#8da08c] text-[#0d130e] font-semibold text-xs flex items-center gap-1 cursor-pointer transition-colors shadow-xs"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Confirm Merge</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Audit Log */}
      {auditLog.length > 0 && (
        <div className="bg-[#14171c] border border-[#222731] rounded-lg p-4 font-mono text-xs space-y-2.5 shadow-xs">
          <div className="flex items-center gap-2 text-white font-semibold text-[11px] uppercase">
            <History className="w-3.5 h-3.5 text-[#9cae9b]" />
            <span>Investigator Resolution Decision Audit Trail</span>
          </div>
          <div className="space-y-1">
            {auditLog.map((log) => (
              <div
                key={log.id}
                className="p-2 rounded bg-[#101317] border border-[#222731] flex justify-between text-[#9ca3af]"
              >
                <span className="text-white">✓ {log.action}</span>
                <span className="text-[#606875]">{log.time}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export { EntityResolutionWorkbenchPage };
export default EntityResolutionWorkbenchPage;
