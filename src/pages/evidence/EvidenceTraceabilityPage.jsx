import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FileText,
  Upload,
  Search,
  ChevronDown,
  MoreHorizontal,
  ArrowLeft,
  CheckCircle2,
  Download,
  ShieldCheck,
  Eye,
  FileCheck
} from "lucide-react";
import toast from "react-hot-toast";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";

const MOCK_EVIDENCE = [
  {
    id: "EV-5521",
    title: "Gate log export",
    type: "Document",
    format: "PDF",
    size: "2.4 MB",
    pages: "6 pages",
    caseId: "CS-2418",
    caseName: "CS-2418 Harborview Logistics",
    uploadedBy: "M. Kessler",
    date: "Nov 24",
    verification: "Verified",
    sha256: "9f2c...a41d",
    fullSha256: "9f2c7104b901e4a38d72109841bbcefa890123901bce471092841bb92014a41d",
    source: "Port authority request #88",
    excerpt: `PIER 41 — GATE ACCESS LOG · NOV 24, 2026

02:14:07 · ENTRY · Plate 7XQ-4419 · Bay C · Unit 9
02:31:52 · EXIT · Plate 7XQ-4419 · Bay C
02:14:11 · FOB #2214 · A. Kovacs (registered)
— end of excerpt · pages 1/6 —`,
    relatedEntities: "A. Kovacs · Truck 7XQ-4419",
    relatedTimeline: "Nov 24 · Night access — Pier 41",
    relatedLead: "LD-8821",
    leadConfidence: "94%",
    auditHistory: [
      { action: "Verified by L. Tran", date: "Nov 25" },
      { action: "Linked to LD-8821", date: "Nov 24" },
      { action: "Uploaded by M. Kessler", date: "Nov 24" }
    ]
  },
  {
    id: "EV-5498",
    title: "Invoice batch #4471",
    type: "Records",
    format: "CSV",
    size: "1.1 MB",
    pages: "12 records",
    caseId: "CS-2418",
    caseName: "CS-2418 Harborview Logistics",
    uploadedBy: "L. Tran",
    date: "Nov 21",
    verification: "Pending",
    sha256: "8e1b...c92a",
    fullSha256: "8e1b40284910248aef0192841029841bb920149021481904f92b71c8901ec92a",
    source: "Grand jury subpoena #104",
    excerpt: `MERIDIAN HOLDINGS LLC — INVOICE BATCH #4471

INV-4471-01: $9,450.00 -> Shell Freight Acct #0092
INV-4471-02: $9,800.00 -> BlueStar Logistics Escrow
INV-4471-03: $9,200.00 -> Hawala Broker Settlement
— end of excerpt · 3 of 12 lines shown —`,
    relatedEntities: "Meridian Holdings · J. Thorne",
    relatedTimeline: "Nov 21 · Invoice batch flagged",
    relatedLead: "LD-8819",
    leadConfidence: "88%",
    auditHistory: [
      { action: "Ingestion queue passed", date: "Nov 21" },
      { action: "Uploaded by L. Tran", date: "Nov 21" }
    ]
  },
  {
    id: "EV-5470",
    title: "Call record request",
    type: "Document",
    format: "PDF",
    size: "4.8 MB",
    pages: "18 pages",
    caseId: "CS-2418",
    caseName: "CS-2418 Harborview Logistics",
    uploadedBy: "D. Okafor",
    date: "Nov 18",
    verification: "Verified",
    sha256: "3d4f...991e",
    fullSha256: "3d4f890123901bce471092841bb920149021481904f92b71c8901e4a38d7991e",
    source: "Section 2703(d) judicial order",
    excerpt: `CARRIER CDR EXTRACT — IMEI #86129480112948

14 Calls recorded within 72h window between Kovacs and Thorne.
Antenna Sector Azimuth: 120° Harborview.
— end of excerpt · pages 1/18 —`,
    relatedEntities: "A. Kovacs · J. Thorne",
    relatedTimeline: "Nov 18 · Call cluster 14 calls",
    relatedLead: "LD-8814",
    leadConfidence: "81%",
    auditHistory: [
      { action: "Verified by D. Okafor", date: "Nov 19" },
      { action: "Uploaded by D. Okafor", date: "Nov 18" }
    ]
  },
  {
    id: "EV-5455",
    title: "Depot field photos",
    type: "Images",
    format: "JPEG",
    size: "18.2 MB",
    pages: "8 photos",
    caseId: "CS-2411",
    caseName: "CS-2411 Regional Intercept",
    uploadedBy: "R. Alvarez",
    date: "Nov 15",
    verification: "Verified",
    sha256: "6a9c...10fe",
    fullSha256: "6a9c4f92b71c8901e4a38d72109841bbcefa890123901bce471092841bb910fe",
    source: "Field surveillance team unit 4",
    excerpt: `SURVEILLANCE LOG — HARBORVIEW DEPOT

Target vehicle Box truck 7XQ-4419 observed backed into Loading Dock 3.
Two individuals observed transferring sealed crates.
— optical surveillance log summary —`,
    relatedEntities: "Truck 7XQ-4419 · A. Kovacs",
    relatedTimeline: "Nov 15 · Vehicle sighting",
    relatedLead: "LD-8809",
    leadConfidence: "76%",
    auditHistory: [
      { action: "Verified by R. Alvarez", date: "Nov 16" },
      { action: "Uploaded by R. Alvarez", date: "Nov 15" }
    ]
  },
  {
    id: "EV-5441",
    title: "Lease agreement",
    type: "Document",
    format: "PDF",
    size: "3.2 MB",
    pages: "14 pages",
    caseId: "CS-2411",
    caseName: "CS-2411 Regional Intercept",
    uploadedBy: "S. Patel",
    date: "Nov 12",
    verification: "Under Review",
    sha256: "1f8b...773a",
    fullSha256: "1f8b72109841bbcefa890123901bce471092841bb920149021481904f92b773a",
    source: "Commercial property registry query",
    excerpt: `COMMERCIAL LEASE CONTRACT — NORTHGATE UNIT 4

Lessor: Northgate Industrial Holdings
Lessee: Meridian Holdings LLC
Authorized Signatory: J. Thorne
— end of excerpt · pages 1/14 —`,
    relatedEntities: "J. Thorne · Northgate LLC",
    relatedTimeline: "Nov 12 · Lease co-signed",
    relatedLead: "LD-8802",
    leadConfidence: "68%",
    auditHistory: [
      { action: "Flagged for manual signature audit", date: "Nov 13" },
      { action: "Uploaded by S. Patel", date: "Nov 12" }
    ]
  }
];

export const EvidenceTraceabilityPage = () => {
  const navigate = useNavigate();
  const [selectedEvidence, setSelectedEvidence] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("ALL");
  const [caseFilter, setCaseFilter] = useState("ALL");
  const [verificationFilter, setVerificationFilter] = useState("ALL");

  const filteredEvidence = MOCK_EVIDENCE.filter((e) => {
    const matchSearch =
      e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchType = typeFilter === "ALL" || e.type.toUpperCase() === typeFilter.toUpperCase();
    const matchCase = caseFilter === "ALL" || e.caseId === caseFilter;
    const matchVerif = verificationFilter === "ALL" || e.verification.toUpperCase() === verificationFilter.toUpperCase();
    return matchSearch && matchType && matchCase && matchVerif;
  });

  const handleUploadModal = () => {
    toast.success("Select a file to calculate cryptographic SHA-256 hash stamp");
  };

  // If viewing details: Replicate EvidenceDetail.jpeg
  if (selectedEvidence) {
    return (
      <div className="space-y-4 max-w-7xl mx-auto">
        {/* Breadcrumb / Top Header */}
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedEvidence(null)}
              className="text-xs text-[#8d98a5] hover:text-white flex items-center gap-1 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Evidence</span>
            </button>
            <span className="text-xs text-[#6c7682]">/</span>
            <span className="text-xs font-mono text-white">{selectedEvidence.id}</span>
            <span className="text-xs text-[#6c7682]">·</span>
            <span className="text-xs text-[#8d98a5]">{selectedEvidence.caseName}</span>
          </div>
          <h1 className="text-xl font-medium text-white tracking-tight pt-1">
            {selectedEvidence.id} · {selectedEvidence.title}
          </h1>
        </div>

        {/* 2-Column Layout matching EvidenceDetail.jpeg */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
          {/* Left Primary Column (8 Cols) */}
          <div className="lg:col-span-8 space-y-4">
            {/* Main File Box */}
            <div className="bg-[#14171c] border border-[#222731] rounded-lg p-5 space-y-4 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-mono text-[#8d98a5]">
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-medium bg-[#18261c] text-[#8fa38d]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8fa38d]" />
                  {selectedEvidence.verification}
                </span>
                <span>{selectedEvidence.format}</span>
                <span>·</span>
                <span>{selectedEvidence.size}</span>
                <span>·</span>
                <span>{selectedEvidence.pages}</span>
              </div>

              {/* Raw Excerpt Container */}
              <div className="p-4 bg-[#101317] border border-[#222731] rounded-lg">
                <pre className="text-xs font-mono text-[#d1d7df] leading-relaxed whitespace-pre-wrap">
                  {selectedEvidence.excerpt}
                </pre>
              </div>

              {/* 3 Metric Mini Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                <div className="bg-[#101317] border border-[#222731] rounded p-3 text-xs font-mono">
                  <div className="text-[10px] text-[#6c7682] uppercase mb-0.5">SHA-256</div>
                  <div className="text-white font-medium">{selectedEvidence.sha256}</div>
                </div>

                <div className="bg-[#101317] border border-[#222731] rounded p-3 text-xs font-mono">
                  <div className="text-[10px] text-[#6c7682] uppercase mb-0.5">Uploaded by</div>
                  <div className="text-white">{selectedEvidence.uploadedBy} · {selectedEvidence.date}</div>
                </div>

                <div className="bg-[#101317] border border-[#222731] rounded p-3 text-xs font-mono">
                  <div className="text-[10px] text-[#6c7682] uppercase mb-0.5">Source</div>
                  <div className="text-white truncate">{selectedEvidence.source}</div>
                </div>
              </div>
            </div>

            {/* Audit History Card */}
            <div className="bg-[#14171c] border border-[#222731] rounded-lg p-5 space-y-3 shadow-sm">
              <div className="text-xs font-medium text-white">Audit history</div>

              <div className="divide-y divide-[#222731] text-xs font-mono text-[#8d98a5]">
                {selectedEvidence.auditHistory.map((item, idx) => (
                  <div key={idx} className="py-2.5 flex items-center justify-between">
                    <span>{item.action}</span>
                    <span className="text-[#6c7682]">{item.date}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar Column (4 Cols) */}
          <div className="lg:col-span-4 space-y-4">
            {/* Related Intelligence Card */}
            <div className="bg-[#14171c] border border-[#222731] rounded-lg p-4 space-y-3.5 shadow-sm text-xs">
              <div className="text-xs font-medium text-white">Related intelligence</div>

              <div className="space-y-3 divide-y divide-[#222731]">
                <div className="pt-1">
                  <div className="text-[10px] uppercase font-mono text-[#6c7682] mb-1">ENTITIES</div>
                  <div className="text-[#d1d7df] font-medium">{selectedEvidence.relatedEntities}</div>
                </div>

                <div className="pt-3">
                  <div className="text-[10px] uppercase font-mono text-[#6c7682] mb-1">TIMELINE</div>
                  <div className="text-[#d1d7df]">{selectedEvidence.relatedTimeline}</div>
                </div>

                <div className="pt-3">
                  <div className="text-[10px] uppercase font-mono text-[#6c7682] mb-1">LEADS</div>
                  <div className="text-[#9cae9b] font-mono">{selectedEvidence.relatedLead} · {selectedEvidence.leadConfidence}</div>
                </div>

                <div className="pt-3">
                  <div className="text-[10px] uppercase font-mono text-[#6c7682] mb-1">CASE</div>
                  <div className="text-[#d1d7df] font-mono">{selectedEvidence.caseName}</div>
                </div>
              </div>
            </div>

            {/* Verification & Download Card */}
            <div className="bg-[#14171c] border border-[#222731] rounded-lg p-4 space-y-3 shadow-sm">
              <div className="text-xs font-medium text-white">Verification</div>

              <div className="flex items-center gap-2 text-xs text-[#8fa38d]">
                <CheckCircle2 className="w-4 h-4 text-[#8fa38d] shrink-0" />
                <span>Hash verified · custody intact</span>
              </div>

              <div className="pt-1">
                <Button
                  variant="secondary"
                  className="w-full justify-center text-xs"
                  onClick={() => toast.success(`Downloading sealed file ${selectedEvidence.title}`)}
                >
                  Download original
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Repository List matching EvidenceRepository.jpeg
  return (
    <div className="space-y-4">
      {/* Header */}
      <div>
        <h1 className="text-xl font-medium text-white tracking-tight">Evidence Repository</h1>
        <p className="text-xs text-[#8d98a5] mt-0.5">
          312 items · chain-of-custody enforced
        </p>
      </div>

      {/* Upload Dropzone Hero Card matching EvidenceRepository.jpeg */}
      <div className="bg-[#14171c] border border-[#222731] rounded-lg p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-lg bg-[#101317] border border-[#222731] flex items-center justify-center shrink-0">
            <Upload className="w-5 h-5 text-[#8d98a5]" />
          </div>
          <div>
            <div className="text-sm font-medium text-white">Drag files here, or browse</div>
            <div className="text-xs text-[#6c7682] mt-0.5">
              PDF · images · CSV · audio — hashed and logged on upload
            </div>
          </div>
        </div>

        <Button
          variant="primary"
          onClick={handleUploadModal}
          className="self-start sm:self-auto"
        >
          Upload evidence
        </Button>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center gap-2">
        <div className="relative flex-1 min-w-[240px] max-w-sm">
          <Search className="w-3.5 h-3.5 text-[#6c7682] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search evidence..."
            className="w-full bg-[#14171c] border border-[#222731] text-xs text-white placeholder-[#6c7682] rounded pl-8 pr-3 py-1.5 focus:outline-none focus:border-[#9cae9b] transition-colors"
          />
        </div>

        <div className="relative">
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="bg-[#14171c] border border-[#222731] text-xs text-[#d1d7df] rounded px-3 py-1.5 pr-8 appearance-none focus:outline-none focus:border-[#9cae9b] transition-colors cursor-pointer"
          >
            <option value="ALL">Type: All</option>
            <option value="DOCUMENT">Document</option>
            <option value="RECORDS">Records</option>
            <option value="IMAGES">Images</option>
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-[#6c7682] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        <div className="relative">
          <select
            value={caseFilter}
            onChange={(e) => setCaseFilter(e.target.value)}
            className="bg-[#14171c] border border-[#222731] text-xs text-[#d1d7df] rounded px-3 py-1.5 pr-8 appearance-none focus:outline-none focus:border-[#9cae9b] transition-colors cursor-pointer"
          >
            <option value="ALL">Case: All</option>
            <option value="CS-2418">Case: CS-2418</option>
            <option value="CS-2411">Case: CS-2411</option>
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-[#6c7682] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        <div className="relative">
          <select
            value={verificationFilter}
            onChange={(e) => setVerificationFilter(e.target.value)}
            className="bg-[#14171c] border border-[#222731] text-xs text-[#d1d7df] rounded px-3 py-1.5 pr-8 appearance-none focus:outline-none focus:border-[#9cae9b] transition-colors cursor-pointer"
          >
            <option value="ALL">Verification: All</option>
            <option value="VERIFIED">Verified</option>
            <option value="PENDING">Pending</option>
            <option value="UNDER REVIEW">Under Review</option>
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-[#6c7682] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      {/* Table matching EvidenceRepository.jpeg */}
      <div className="bg-[#14171c] border border-[#222731] rounded-lg overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#222731] text-[#6c7682] font-medium bg-[#101317]">
                <th className="py-2.5 px-4 font-normal">ID</th>
                <th className="py-2.5 px-4 font-normal">Title</th>
                <th className="py-2.5 px-4 font-normal">Type</th>
                <th className="py-2.5 px-4 font-normal">Case</th>
                <th className="py-2.5 px-4 font-normal">Uploaded by</th>
                <th className="py-2.5 px-4 font-normal">Date</th>
                <th className="py-2.5 px-4 font-normal">Verification</th>
                <th className="py-2.5 px-4 font-normal"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#222731]">
              {filteredEvidence.map((item) => (
                <tr
                  key={item.id}
                  onClick={() => setSelectedEvidence(item)}
                  className="hover:bg-[#181d24] transition-colors cursor-pointer group"
                >
                  <td className="py-3 px-4 font-mono text-[#8d98a5] group-hover:text-white transition-colors">
                    {item.id}
                  </td>
                  <td className="py-3 px-4 font-medium text-white flex items-center gap-2">
                    <FileText className="w-3.5 h-3.5 text-[#6c7682] group-hover:text-[#9cae9b] transition-colors" />
                    <span>{item.title}</span>
                  </td>
                  <td className="py-3 px-4 text-[#8d98a5]">
                    {item.type}
                  </td>
                  <td className="py-3 px-4 font-mono text-[#8d98a5]">
                    {item.caseId}
                  </td>
                  <td className="py-3 px-4 text-[#8d98a5]">
                    {item.uploadedBy}
                  </td>
                  <td className="py-3 px-4 text-[#6c7682] font-mono">
                    {item.date}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-medium ${
                        item.verification === "Verified"
                          ? "bg-[#18261c] text-[#8fa38d]"
                          : item.verification === "Pending"
                          ? "bg-[#252016] text-[#c4a265]"
                          : "bg-[#252016] text-[#c4a265]"
                      }`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-current" />
                      {item.verification}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button className="text-[#6c7682] hover:text-white transition-colors">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
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

export default EvidenceTraceabilityPage;
