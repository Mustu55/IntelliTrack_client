import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FileText,
  Search,
  Plus,
  Download,
  Eye,
  FileSpreadsheet,
  ArrowLeft,
  CheckCircle2
} from "lucide-react";
import toast from "react-hot-toast";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";

const MOCK_REPORTS = [
  {
    id: "R-118",
    title: "Harborview interim briefing",
    caseId: "CS-2418",
    caseName: "Harborview Logistics Network",
    createdBy: "M. Kessler",
    createdDate: "Nov 25, 2026",
    createdShort: "Nov 25",
    status: "Final",
    classification: "Restricted",
    overview: "Port-side freight forwarding using layered intermediaries; focus on invoicing anomalies and shared identifiers across Harborview and Pier 41.",
    keyEntities: "A. Kovacs (person), J. Thorne (person), Meridian Holdings LLC, truck 7XQ-4419, Pier 41 Unit 9.",
    relationshipSummary: "18 nodes · 42 edges · 3 clusters. Kovacs bridges two clusters via shared phone identifier.",
    timeline: "Nov 12 lease ↔ Nov 18 call cluster ↔ Nov 21 invoice flag ↔ Nov 24 night access.",
    geoFindings: "Recurring night windows at Pier 41 Bay C; co-presence of truck and registered fob.",
    leads: "LD-8821 (94%), LD-8819 (88%) — both pending verification.",
    evidenceRefs: "EV-5521, EV-5498, EV-5470, EV-5441 with custody intact.",
    limitations: "AI-generated findings require investigator verification. Shared-line alternate explanation not excluded; call content unavailable."
  },
  {
    id: "R-117",
    title: "Northgate link chart",
    caseId: "CS-2411",
    caseName: "Northgate Industrial Locus",
    createdBy: "D. Okafor",
    createdDate: "Nov 22, 2026",
    createdShort: "Nov 22",
    status: "Draft",
    classification: "Restricted",
    overview: "Analysis of commercial storage units and registered corporate signatories in Northgate industrial zone.",
    keyEntities: "J. Thorne, Northgate LLC, BlueStar Logistics.",
    relationshipSummary: "12 nodes · 24 edges · 2 clusters.",
    timeline: "Nov 12 lease signing -> Nov 15 unit activation.",
    geoFindings: "Cluster of physical visits recorded during non-operational hours.",
    leads: "LD-8802 (68%).",
    evidenceRefs: "EV-5441 lease agreement.",
    limitations: "Limited CCTV coverage on perimeter access gate."
  },
  {
    id: "R-116",
    title: "Meridian invoicing summary",
    caseId: "CS-2407",
    caseName: "Meridian Financial Ledger",
    createdBy: "L. Tran",
    createdDate: "Nov 19, 2026",
    createdShort: "Nov 19",
    status: "Under Review",
    classification: "Confidential",
    overview: "Forensic breakdown of structured billing transactions and duplicate invoice runs.",
    keyEntities: "Meridian Holdings LLC, Shell Freight Acct #0092.",
    relationshipSummary: "8 nodes · 16 financial flows.",
    timeline: "Nov 10 to Nov 15 transaction window.",
    geoFindings: "Bank branch teller transactions co-located with transit times.",
    leads: "LD-8819 (88%).",
    evidenceRefs: "EV-5498 invoice batch #4471.",
    limitations: "Foreign jurisdiction wire records pending subpoena response."
  },
  {
    id: "R-115",
    title: "Pier 41 movement log",
    caseId: "CS-2399",
    caseName: "Maritime Berth Surveillance",
    createdBy: "R. Alvarez",
    createdDate: "Nov 14, 2026",
    createdShort: "Nov 14",
    status: "Final",
    classification: "Restricted",
    overview: "Automated optical license plate scans and barrier fob entries across 30-day surveillance.",
    keyEntities: "Truck 7XQ-4419, Pier 41 Bay C.",
    relationshipSummary: "6 nodes · 14 access records.",
    timeline: "Bi-weekly convergence schedule.",
    geoFindings: "High-density hotspot at Unit 9 loading ramp.",
    leads: "LD-8809 (76%).",
    evidenceRefs: "EV-5521 gate logs.",
    limitations: "Optical plate camera degradation during heavy fog on Nov 10."
  }
];

export const IntelligenceReportsPage = () => {
  const navigate = useNavigate();
  const [selectedReport, setSelectedReport] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredReports = MOCK_REPORTS.filter(
    (r) =>
      r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.caseId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleExportPDF = (report) => {
    toast.success(`Exporting signed PDF dossier for ${report.id}...`);
  };

  const handleExportExcel = (report) => {
    toast.success(`Exporting telemetry workbook for ${report.id}...`);
  };

  // If viewing single report preview: Replicate ReportPreview.jpeg
  if (selectedReport) {
    return (
      <div className="space-y-4 max-w-7xl mx-auto">
        {/* Top Header */}
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedReport(null)}
              className="text-xs text-[#8d98a5] hover:text-white flex items-center gap-1 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Reports</span>
            </button>
            <span className="text-xs text-[#6c7682]">/</span>
            <span className="text-xs text-[#8d98a5]">Preview</span>
            <span className="text-xs text-[#6c7682]">·</span>
            <span className="text-xs font-mono text-white">{selectedReport.caseId}</span>
          </div>
          <h1 className="text-xl font-medium text-white tracking-tight pt-1">
            {selectedReport.id} · {selectedReport.title}
          </h1>
        </div>

        {/* 2-Column Layout matching ReportPreview.jpeg */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* Left Document Paper (8.5 Cols) */}
          <div className="lg:col-span-8 bg-white rounded-lg p-8 sm:p-12 text-[#101317] font-sans shadow-xl space-y-6 select-text">
            {/* Document Header */}
            <div className="flex items-center justify-between border-b border-neutral-200 pb-4 text-xs font-mono">
              <div className="flex items-center gap-2 font-bold tracking-wider text-black uppercase">
                <span className="w-2 h-2 rounded-full bg-black inline-block" />
                <span>INTELLITRACK</span>
              </div>
              <div className="text-neutral-500">
                {selectedReport.id} · {selectedReport.createdDate}
              </div>
            </div>

            {/* Document Title */}
            <div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-black">
                Investigation Report — {selectedReport.caseName}
              </h2>
              <p className="text-xs text-neutral-600 mt-1 font-mono">
                {selectedReport.caseId} · Prepared by {selectedReport.createdBy} · Classification: {selectedReport.classification}
              </p>
            </div>

            {/* Content Sections */}
            <div className="space-y-4 text-xs leading-relaxed text-neutral-800">
              <p>
                <strong className="text-black font-semibold">1. Case overview. </strong>
                {selectedReport.overview}
              </p>

              <p>
                <strong className="text-black font-semibold">2. Key entities. </strong>
                {selectedReport.keyEntities}
              </p>

              <p>
                <strong className="text-black font-semibold">3. Relationship summary. </strong>
                {selectedReport.relationshipSummary}
              </p>

              <p>
                <strong className="text-black font-semibold">4. Timeline. </strong>
                {selectedReport.timeline}
              </p>

              <p>
                <strong className="text-black font-semibold">5. Geo-temporal findings. </strong>
                {selectedReport.geoFindings}
              </p>

              <p>
                <strong className="text-black font-semibold">6. Investigative leads. </strong>
                {selectedReport.leads}
              </p>

              <p>
                <strong className="text-black font-semibold">7. Evidence references. </strong>
                {selectedReport.evidenceRefs}
              </p>

              {/* Highlighted Limitations Box */}
              <div className="p-3.5 border border-neutral-300 rounded bg-neutral-50 text-neutral-700">
                <strong className="text-black font-semibold">8. Confidence & limitations. </strong>
                {selectedReport.limitations}
              </div>
            </div>
          </div>

          {/* Right Action Sidebar (3.5 Cols) */}
          <div className="lg:col-span-4 bg-[#14171c] border border-[#222731] rounded-lg p-5 space-y-4 shadow-sm">
            <div className="text-xs font-medium text-white">Export</div>

            <div className="space-y-2.5">
              <Button
                variant="primary"
                className="w-full justify-center text-xs"
                onClick={() => handleExportPDF(selectedReport)}
                icon={<Download className="w-3.5 h-3.5" />}
              >
                Export PDF
              </Button>

              <Button
                variant="secondary"
                className="w-full justify-center text-xs"
                onClick={() => handleExportExcel(selectedReport)}
                icon={<FileSpreadsheet className="w-3.5 h-3.5" />}
              >
                Export Excel
              </Button>
            </div>

            <p className="text-[11px] text-[#6c7682] leading-relaxed pt-2 border-t border-[#222731]">
              Includes confidence levels, sources and audit hash on every page.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Reports Table matching Reports.jpeg
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-medium text-white tracking-tight">Intelligence Reports</h1>
          <p className="text-xs text-[#8d98a5] mt-0.5">
            Generated briefings with confidence and limitations
          </p>
        </div>

        <Button
          variant="primary"
          onClick={() => setSelectedReport(MOCK_REPORTS[0])}
          icon={<Plus className="w-3.5 h-3.5" />}
        >
          Generate report
        </Button>
      </div>

      {/* Search Input */}
      <div className="relative max-w-sm">
        <Search className="w-3.5 h-3.5 text-[#6c7682] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search reports..."
          className="w-full bg-[#14171c] border border-[#222731] text-xs text-white placeholder-[#6c7682] rounded pl-8 pr-3 py-1.5 focus:outline-none focus:border-[#9cae9b] transition-colors"
        />
      </div>

      {/* Table matching Reports.jpeg */}
      <div className="bg-[#14171c] border border-[#222731] rounded-lg overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#222731] text-[#6c7682] font-medium bg-[#101317]">
                <th className="py-2.5 px-4 font-normal">Report</th>
                <th className="py-2.5 px-4 font-normal">Title</th>
                <th className="py-2.5 px-4 font-normal">Case</th>
                <th className="py-2.5 px-4 font-normal">Created by</th>
                <th className="py-2.5 px-4 font-normal">Created</th>
                <th className="py-2.5 px-4 font-normal">Status</th>
                <th className="py-2.5 px-4 font-normal">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#222731]">
              {filteredReports.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-[#181d24] transition-colors"
                >
                  <td className="py-3 px-4 font-mono text-[#8d98a5]">
                    {item.id}
                  </td>
                  <td
                    onClick={() => setSelectedReport(item)}
                    className="py-3 px-4 font-medium text-white hover:text-[#9cae9b] cursor-pointer transition-colors"
                  >
                    {item.title}
                  </td>
                  <td className="py-3 px-4 font-mono text-[#8d98a5]">
                    {item.caseId}
                  </td>
                  <td className="py-3 px-4 text-[#8d98a5]">
                    {item.createdBy}
                  </td>
                  <td className="py-3 px-4 text-[#6c7682] font-mono">
                    {item.createdShort}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-medium ${
                        item.status === "Final"
                          ? "bg-[#18261c] text-[#8fa38d]"
                          : item.status === "Draft"
                          ? "bg-[#252016] text-[#c4a265]"
                          : "bg-[#252016] text-[#c4a265]"
                      }`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-current" />
                      {item.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => setSelectedReport(item)}
                        className="px-2 py-1 rounded bg-[#101317] border border-[#222731] hover:border-[#384152] text-[#d1d7df] hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <Eye className="w-3 h-3 text-[#6c7682]" />
                        <span>View</span>
                      </button>
                      <button
                        onClick={() => handleExportPDF(item)}
                        className="px-2 py-1 rounded bg-[#101317] border border-[#222731] hover:border-[#384152] text-[#8d98a5] hover:text-white transition-colors cursor-pointer"
                      >
                        PDF
                      </button>
                      <button
                        onClick={() => handleExportExcel(item)}
                        className="px-2 py-1 rounded bg-[#101317] border border-[#222731] hover:border-[#384152] text-[#8d98a5] hover:text-white transition-colors cursor-pointer"
                      >
                        Excel
                      </button>
                    </div>
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

export default IntelligenceReportsPage;
