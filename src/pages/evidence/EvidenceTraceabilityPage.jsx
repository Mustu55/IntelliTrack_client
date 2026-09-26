import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FileCheck,
  ArrowDown,
  ShieldCheck,
  Lock,
  Upload,
  CheckCircle,
  AlertCircle,
  Loader2,
  Plus,
} from "lucide-react";
import toast from "react-hot-toast";
import { useGetEvidenceQuery, useUploadEvidenceMutation, useVerifyChainQuery } from "@/store/api/apiSlice";

const DEFAULT_TRACEABILITY_CHAINS = [
  {
    id: "chain-1",
    insight: {
      title: "Coordinated Hawala Cash Flow Preceding Vessel Rendezvous",
      description: "Multiple intelligence signals corroborate high-value cash remittance timed exactly 45 minutes prior to Pier 42 vessel convergence.",
      confidence: 94,
      category: "Syndicate Capital Route",
    },
    relationship: {
      source: "Raj Mehta (Logistics Broker)",
      target: "Vikramaditya Singhania (Beneficiary)",
      type: "Direct Hawala Remittance Transit",
      strength: "5 Observed Events",
      linkConfidence: 96,
    },
    entity: {
      name: "Raj Mehta",
      identifier: "POI-4409 (DOB: 1984-06-12)",
      role: "Logistics Courier & Shell Manager",
      alias: '"The Courier" / RM',
      caseStatus: "Person of Interest (Under Warrant)",
    },
    sourceRecord: {
      recordType: "Call Detail Record (CDR)",
      recordId: "CDR-TEL-2026-0312-8821",
      timestamp: "2026-03-12 14:22:09 UTC",
      caseReference: "CASE #IT-2026-NIGHTSHADE",
      confidence: 98,
      sha256Hash: "4f92b71c8901e4a38d72109841bbcefa890123901bce471092841bb920149021",
      supportingAttributes: [
        { label: "Originating Handset IMEI", value: "86129480112948" },
        { label: "Cell Tower Azimuth", value: "JNPT Port Sector B (120°)" },
        { label: "Telecom Baseband Protocol", value: "VoLTE Encrypted Stream" },
        { label: "Call Duration", value: "14 Seconds (Burst)" },
      ],
      rawSnippet: `[CDR_RAW_PACKET_DUMP]
TIMESTAMP: 2026-03-12T14:22:09.104Z
CALLER_IMSI: 404450918204918
DIALED_NUM: +919811033491
CELL_LAC: 4001 | CELL_ID: 99214
SWITCHING_OFFICE: MUMBAI-SOUTH-MSC-04
CRYPTO_SESSION_TAG: AES-GCM-256-HANDSHAKE-CONFIRMED`,
    },
  },
  {
    id: "chain-2",
    insight: {
      title: "Vehicle Escort Pattern Corroborated by Optical ANPR",
      description: "Black Audi A8 consistently serves as conveyance courier between Worli Safehouse and JNPT Maritime berths.",
      confidence: 91,
      category: "Physical Reconnaissance",
    },
    relationship: {
      source: "Raj Mehta",
      target: "Audi A8 [MH-01-EA-9902]",
      type: "Registered Operator & Primary Conveyance",
      strength: "3 Optical Hits",
      linkConfidence: 98,
    },
    entity: {
      name: "Black Audi A8 [MH-01-EA-9902]",
      identifier: "VIN: WAUZZZ4H9FN019821",
      role: "Conveyance Sedan",
      alias: "Asset-CONV-01",
      caseStatus: "Flagged for Intercept",
    },
    sourceRecord: {
      recordType: "ALPR Camera Capture",
      recordId: "ALPR-JNPT-TOLL-CAM-04",
      timestamp: "2026-03-12 14:32:44 UTC",
      caseReference: "CASE #IT-2026-NIGHTSHADE",
      confidence: 99,
      sha256Hash: "91802a4bf7e9902410a82bce78190248aef0192841029841bb92014902148190",
      supportingAttributes: [
        { label: "License Plate OCR", value: "MH-01-EA-9902 (Confidence: 99.2%)" },
        { label: "Vehicle Color & Make", value: "Black Audi A8 (Sedan)" },
        { label: "Camera Sensor ID", value: "CAM-TOLL-JNPT-GATE-B" },
        { label: "Toll FastTag Ref", value: "TAG-MH01-992140" },
      ],
      rawSnippet: `[ALPR_OCR_TELEMETRY]
SENSOR_ID: CAM-JNPT-04
TIMESTAMP: 2026-03-12T14:32:44.821Z
CONFIDENCE_OCR: 0.992
LPR_HIT: MH-01-EA-9902
VEHICLE_CLASS: M1_PASSENGER_SEDAN
OPTICAL_HASH: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855`,
    },
  },
  {
    id: "chain-3",
    insight: {
      title: "Corporate Shell Financing Conduit to BlueStar Logistics",
      description: "Formal bank statements corroborate high-volume invoice routing through offshore intermediary.",
      confidence: 89,
      category: "Commercial Entity Fraud",
    },
    relationship: {
      source: "Astraea Trading Corp",
      target: "BlueStar Logistics Pvt. Ltd.",
      type: "Shell Inter-Company Transfer",
      strength: "$142,000 NEFT Escrow",
      linkConfidence: 95,
    },
    entity: {
      name: "BlueStar Logistics Pvt. Ltd.",
      identifier: "CIN: U63090MH2019PTC329182",
      role: "Freight Forwarding Shell",
      alias: "BlueStar Exim",
      caseStatus: "Corporate Entity Under Audit",
    },
    sourceRecord: {
      recordType: "Bank Statement (RTGS)",
      recordId: "RTGS-AXIS-240718992014",
      timestamp: "2026-03-11 16:45:12 UTC",
      caseReference: "CASE #IT-2026-NIGHTSHADE",
      confidence: 96,
      sha256Hash: "a82049182049182041bb920149021481904f92b71c8901e4a38d72109841bbce",
      supportingAttributes: [
        { label: "Remitting Account", value: "Astraea Trading #0092148901" },
        { label: "Beneficiary IFSC", value: "UTIB0000042" },
        { label: "Transaction UTR", value: "AXIS240718992014" },
        { label: "Remitted Amount", value: "$142,000 USD Equivalent" },
      ],
      rawSnippet: `[BANKING_LEDGER_EXTRACT]
UTR: AXIS240718992014
SOURCE_ACC: 0092148901004 (ASTRAEA TRADING CORP)
DEST_ACC: 9912048912009 (BLUESTAR LOGISTICS PVT LTD)
TXN_VALUE: USD 142,000.00
VALUE_DATE: 2026-03-11T16:45:12Z
REMITTANCE_PURPOSE: FREIGHT_CONSIGNMENT_ESCROW_RELEASE`,
    },
  },
];

const EvidenceTraceabilityPage = () => {
  const navigate = useNavigate();
  const [selectedChainId, setSelectedChainId] = useState("chain-1");
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [evidenceType, setEvidenceType] = useState("CDR");
  const [sourceDesc, setSourceDesc] = useState("Telecom Tower Carrier Packet Dump");

  const { data: evidenceResponse, isLoading: isEvidenceLoading } = useGetEvidenceQuery();
  const { data: chainVerification } = useVerifyChainQuery("CASE-2026-NIGHTSHADE");
  const [uploadEvidenceMutation, { isLoading: isUploading }] = useUploadEvidenceMutation();

  const activeChain =
    DEFAULT_TRACEABILITY_CHAINS.find((c) => c.id === selectedChainId) || DEFAULT_TRACEABILITY_CHAINS[0];

  const handleCopyHash = (hash) => {
    navigator.clipboard.writeText(hash);
    toast.success("SHA-256 cryptographic hash copied to clipboard");
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      toast.error("Please select a file to ingest.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("caseId", "CASE-2026-NIGHTSHADE");
    formData.append("type", evidenceType);
    formData.append("source", sourceDesc);
    formData.append("description", `Sworn evidentiary ingestion of ${file.name}`);

    try {
      const res = await uploadEvidenceMutation(formData).unwrap();
      toast.success(`Evidence stamped: Hash ${res.data?.hash?.substring(0, 12)}...`);
      setIsUploadModalOpen(false);
      setFile(null);
    } catch (err) {
      toast.error(err?.data?.message || "Evidence ingestion failed.");
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto font-sans pb-16">
      {/* Header */}
      <div className="bg-[#0D1B2A] border border-[#263B55] rounded-2xl p-5 shadow-xl space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#263B55] pb-3">
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-[#06B6D4] flex items-center gap-1.5">
              <FileCheck className="w-4 h-4 text-cyan-400" />
              <span>EVIDENTIARY TRACEABILITY ENGINE // SECTION 12</span>
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight mt-0.5">
              Evidence & Record Traceability Drill-Down
            </h1>
            <p className="text-xs text-[#94A3B8]">
              Rigorous, court-ready lineage from high-level intelligence hypothesis down to immutable source records
            </p>
          </div>
          <div className="flex items-center gap-2 font-mono text-xs">
            <button
              onClick={() => setIsUploadModalOpen(true)}
              className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold flex items-center gap-1.5 shadow-md cursor-pointer transition-colors"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Ingest Evidence</span>
            </button>
            <span className="px-3 py-1.5 rounded-lg bg-[#101F33] text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#10B981]" />
              <span>Fed. R. Evid. 902(14) Certified</span>
            </span>
          </div>
        </div>

        {/* Chain Selector */}
        <div className="flex items-center gap-2 overflow-x-auto font-mono text-xs pt-1">
          <span className="text-[#94A3B8] text-[10px] mr-1">SELECT TRAIL:</span>
          {DEFAULT_TRACEABILITY_CHAINS.map((c, idx) => (
            <button
              key={c.id}
              onClick={() => setSelectedChainId(c.id)}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer shrink-0 font-semibold ${
                selectedChainId === c.id
                  ? "bg-[#2563EB] text-white shadow-md"
                  : "bg-[#101F33] text-[#94A3B8] hover:text-white border border-[#263B55]"
              }`}
            >
              Trail {idx + 1}: {c.sourceRecord.recordType.split(" ")[0]} Lineage
            </button>
          ))}
        </div>
      </div>

      {/* Merkle Chain Verification Banner */}
      {chainVerification?.data && (
        <div className="p-3 rounded-xl bg-[#0D1B2A] border border-emerald-500/30 flex items-center justify-between font-mono text-xs">
          <div className="flex items-center gap-2 text-emerald-400">
            <CheckCircle className="w-4 h-4" />
            <span>Merkle Chain-of-Custody Root:</span>
            <span className="text-white font-bold">{chainVerification.data.merkleRoot}</span>
          </div>
          <span className="text-xs text-[#10B981] font-bold">
            {chainVerification.data.verifiedCount} Exhibits Sealed & Verified
          </span>
        </div>
      )}

      {/* 4-Tier Provenance Stack */}
      <div className="space-y-4">
        {/* Tier 1 */}
        <div className="bg-[#101F33] border-l-4 border-l-[#2563EB] border border-[#263B55] rounded-xl p-5 shadow-lg space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-blue-500/20 text-[#06B6D4] font-bold text-[10px] border border-blue-500/30">
                LEVEL 1: HIGH-LEVEL INSIGHT
              </span>
              <span className="text-[#94A3B8]">{activeChain.insight.category}</span>
            </div>
            <span className="text-white font-bold">{activeChain.insight.confidence}% AI Confidence</span>
          </div>
          <h3 className="text-lg font-bold text-white tracking-tight">{activeChain.insight.title}</h3>
          <p className="text-xs text-slate-300 leading-relaxed font-sans">{activeChain.insight.description}</p>
        </div>

        <div className="flex justify-center -my-2">
          <div className="w-8 h-8 rounded-full bg-[#0D1B2A] border border-[#263B55] flex items-center justify-center text-[#06B6D4] shadow-md z-10">
            <ArrowDown className="w-4 h-4" />
          </div>
        </div>

        {/* Tier 2 */}
        <div className="bg-[#101F33] border-l-4 border-l-[#06B6D4] border border-[#263B55] rounded-xl p-5 shadow-lg space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-bold text-[10px] border border-cyan-500/30">
                LEVEL 2: DEDUCED RELATIONSHIP
              </span>
              <span className="text-[#94A3B8]">Graph Link Strength: {activeChain.relationship.strength}</span>
            </div>
            <span className="text-[#10B981] font-bold">{activeChain.relationship.linkConfidence}% Verification</span>
          </div>
          <div className="flex items-center gap-2 text-sm font-mono font-bold text-white">
            <span className="text-blue-300">{activeChain.relationship.source}</span>
            <span className="text-cyan-400">←→</span>
            <span className="text-blue-300">{activeChain.relationship.target}</span>
          </div>
          <div className="text-xs text-slate-300 font-mono">
            Relationship Type: <strong className="text-cyan-300">{activeChain.relationship.type}</strong>
          </div>
        </div>

        <div className="flex justify-center -my-2">
          <div className="w-8 h-8 rounded-full bg-[#0D1B2A] border border-[#263B55] flex items-center justify-center text-purple-400 shadow-md z-10">
            <ArrowDown className="w-4 h-4" />
          </div>
        </div>

        {/* Tier 3 */}
        <div className="bg-[#101F33] border-l-4 border-l-[#8B5CF6] border border-[#263B55] rounded-xl p-5 shadow-lg space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-bold text-[10px] border border-purple-500/30">
                LEVEL 3: RESOLVED ENTITY
              </span>
              <span className="text-amber-300 font-semibold">{activeChain.entity.caseStatus}</span>
            </div>
            <span className="text-[#94A3B8]">{activeChain.entity.identifier}</span>
          </div>
          <div className="flex items-center justify-between">
            <h4 className="text-base font-bold text-white font-mono">{activeChain.entity.name}</h4>
            <span className="text-xs font-mono text-cyan-400 font-semibold">{activeChain.entity.alias}</span>
          </div>
          <div className="text-xs text-slate-300 font-mono">
            Investigative Role: <span className="text-slate-200 font-semibold">{activeChain.entity.role}</span>
          </div>
        </div>

        <div className="flex justify-center -my-2">
          <div className="w-8 h-8 rounded-full bg-[#0D1B2A] border border-[#263B55] flex items-center justify-center text-[#10B981] shadow-md z-10">
            <ArrowDown className="w-4 h-4" />
          </div>
        </div>

        {/* Tier 4 */}
        <div className="bg-[#0D1B2A] border-l-4 border-l-[#10B981] border border-[#263B55] rounded-xl p-5 sm:p-6 shadow-2xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#263B55] pb-3 text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded bg-emerald-500/20 text-[#10B981] font-bold text-[10px] border border-emerald-500/30">
                LEVEL 4: IMMUTABLE SOURCE RECORD
              </span>
              <span className="text-white font-bold">{activeChain.sourceRecord.recordType}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#94A3B8]">Docket:</span>
              <span className="text-white font-bold">{activeChain.sourceRecord.caseReference}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs font-mono">
            <div className="p-3 rounded-lg bg-[#07111F] border border-[#263B55]">
              <div className="text-[10px] text-[#94A3B8] uppercase">Source Type</div>
              <div className="text-white font-bold mt-0.5">{activeChain.sourceRecord.recordType}</div>
            </div>
            <div className="p-3 rounded-lg bg-[#07111F] border border-[#263B55]">
              <div className="text-[10px] text-[#94A3B8] uppercase">Timestamp (UTC)</div>
              <div className="text-cyan-400 font-bold mt-0.5">{activeChain.sourceRecord.timestamp}</div>
            </div>
            <div className="p-3 rounded-lg bg-[#07111F] border border-[#263B55]">
              <div className="text-[10px] text-[#94A3B8] uppercase">Record Identifier</div>
              <div className="text-white font-bold mt-0.5">{activeChain.sourceRecord.recordId}</div>
            </div>
            <div className="p-3 rounded-lg bg-[#07111F] border border-[#263B55]">
              <div className="text-[10px] text-[#94A3B8] uppercase">Verification Confidence</div>
              <div className="text-[#10B981] font-bold mt-0.5">{activeChain.sourceRecord.confidence}% Certified</div>
            </div>
          </div>

          <div className="space-y-1.5 font-mono text-xs">
            <div className="text-[11px] font-bold uppercase text-[#94A3B8] tracking-wider">Supporting Record Attributes:</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {activeChain.sourceRecord.supportingAttributes.map((attr, idx) => (
                <div key={idx} className="p-2.5 rounded-lg bg-[#101F33] border border-[#263B55] flex items-center justify-between">
                  <span className="text-[#94A3B8] text-[11px]">{attr.label}:</span>
                  <span className="text-white font-semibold text-[11px]">{attr.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-1.5 font-mono text-xs">
            <div className="flex items-center justify-between text-[11px] text-[#94A3B8]">
              <span className="font-bold uppercase tracking-wider">Raw Telemetry Excerpt:</span>
              <span className="text-[10px] text-[#10B981]">Cryptographically Authenticated</span>
            </div>
            <pre className="p-4 rounded-xl bg-[#07111F] border border-[#263B55] text-cyan-300 font-mono text-[11px] leading-relaxed overflow-x-auto custom-scrollbar select-text">
              {activeChain.sourceRecord.rawSnippet}
            </pre>
          </div>

          <div className="p-3 rounded-xl bg-[#07111F] border border-[#263B55] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono">
            <div className="flex items-center gap-2 truncate">
              <Lock className="w-3.5 h-3.5 text-[#10B981] shrink-0" />
              <span className="text-[#94A3B8] shrink-0">SHA-256 HASH:</span>
              <span className="text-slate-300 truncate">{activeChain.sourceRecord.sha256Hash}</span>
            </div>
            <button
              onClick={() => handleCopyHash(activeChain.sourceRecord.sha256Hash)}
              className="px-3 py-1 rounded bg-[#101F33] hover:bg-[#12243A] text-slate-300 hover:text-white border border-[#263B55] shrink-0 transition-colors cursor-pointer"
            >
              Copy Hash Proof
            </button>
          </div>
        </div>
      </div>

      {/* Ingest Evidence Modal */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#0D1B2A] border border-[#263B55] rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 font-mono text-xs text-slate-200">
            <div className="flex items-center justify-between border-b border-[#263B55] pb-3">
              <div className="flex items-center gap-2 text-cyan-400 font-bold uppercase">
                <Upload className="w-4 h-4" />
                <span>Ingest Evidentiary Exhibit</span>
              </div>
              <button
                onClick={() => setIsUploadModalOpen(false)}
                className="text-slate-400 hover:text-white text-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleUpload} className="space-y-4">
              <div>
                <label className="block text-[11px] text-[#94A3B8] uppercase font-semibold mb-1">
                  Evidence Classification Type
                </label>
                <select
                  value={evidenceType}
                  onChange={(e) => setEvidenceType(e.target.value)}
                  className="w-full bg-[#07111F] border border-[#263B55] rounded-lg px-3 py-2 text-white text-xs focus:outline-none focus:border-[#2563EB]"
                >
                  <option value="CDR">Call Detail Record (CDR / VoLTE)</option>
                  <option value="DOCUMENT">Sworn Affidavit / FIR Docket</option>
                  <option value="IMAGE">ALPR / CCTV Optical Surveillance Hit</option>
                  <option value="FINANCIAL">Bank Wire / Hawala Ledger RTGS</option>
                  <option value="GEOJSON">GPS Transponder Trail / Coordinates</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] text-[#94A3B8] uppercase font-semibold mb-1">
                  Provenance Source & Sensor Tag
                </label>
                <input
                  type="text"
                  required
                  value={sourceDesc}
                  onChange={(e) => setSourceDesc(e.target.value)}
                  placeholder="e.g. Telecom Tower Carrier Packet Dump"
                  className="w-full bg-[#07111F] border border-[#263B55] rounded-lg px-3 py-2 text-white text-xs focus:outline-none focus:border-[#2563EB]"
                />
              </div>

              <div>
                <label className="block text-[11px] text-[#94A3B8] uppercase font-semibold mb-1">
                  Select Evidence File (PDF, DOCX, CSV, Image)
                </label>
                <input
                  type="file"
                  required
                  onChange={(e) => setFile(e.target.files[0])}
                  className="w-full bg-[#07111F] border border-[#263B55] rounded-lg p-2 text-slate-300 text-xs file:mr-3 file:py-1 file:px-3 file:rounded file:border-0 file:text-xs file:bg-[#2563EB] file:text-white cursor-pointer"
                />
              </div>

              <div className="p-3 bg-[#07111F] rounded border border-[#263B55] text-[11px] text-slate-400">
                🔒 Ingestion immediately stamps the file with SHA-256 and computes the Merkle root for immutable court verification.
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsUploadModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-[#101F33] hover:bg-[#12243A] border border-[#263B55] text-slate-300 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUploading}
                  className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold flex items-center gap-2 cursor-pointer shadow-md"
                >
                  {isUploading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Upload className="w-3.5 h-3.5" />}
                  <span>{isUploading ? "Stamping..." : "Ingest & Stamp"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export { EvidenceTraceabilityPage };
export default EvidenceTraceabilityPage;
