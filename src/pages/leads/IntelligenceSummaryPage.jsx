import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FileText,
  Download,
  Printer,
  RefreshCw,
  Sparkles,
  ShieldCheck,
  ChevronRight,
  ArrowLeft
} from "lucide-react";
import toast from "react-hot-toast";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";

export const IntelligenceSummaryPage = () => {
  const navigate = useNavigate();
  const [focusAngle, setFocusAngle] = useState("ALL");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleRegenerate = (angle) => {
    setFocusAngle(angle);
    setIsGenerating(true);
    toast.success(`Regenerating synthesis focused on ${angle} angle...`);
    setTimeout(() => {
      setIsGenerating(false);
      toast.success("Intelligence briefing updated with latest telemetry");
    }, 1000);
  };

  const handleExport = (format) => {
    toast.success(`Exporting dossier in ${format} format...`);
  };

  return (
    <div className="space-y-4 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <button
              onClick={() => navigate("/reports")}
              className="text-xs text-[#8d98a5] hover:text-white flex items-center gap-1 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Reports</span>
            </button>
            <span className="text-xs text-[#6c7682]">/</span>
            <span className="text-xs text-[#8d98a5]">CS-2418</span>
          </div>
          <h1 className="text-xl font-medium text-white tracking-tight">Case Intelligence Briefing</h1>
          <p className="text-xs text-[#8d98a5] mt-0.5">
            NLP-compiled prosecutorial and command memorandum synthesizing corroborated evidence
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => handleExport("PDF")}
            icon={<Download className="w-3.5 h-3.5" />}
          >
            Export PDF
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => handleExport("DOCX")}
            icon={<Printer className="w-3.5 h-3.5" />}
          >
            Print Dossier
          </Button>
        </div>
      </div>

      {/* Synthesis Filter Bar */}
      <div className="bg-[#14171c] border border-[#222731] rounded-lg p-2.5 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-1.5">
          <span className="text-[11px] text-[#6c7682] uppercase font-mono mr-1">Perspective:</span>
          {["ALL", "FINANCIAL", "COMMUNICATIONS"].map((angle) => (
            <button
              key={angle}
              onClick={() => handleRegenerate(angle)}
              className={`px-2.5 py-1 rounded text-xs transition-colors cursor-pointer ${
                focusAngle === angle
                  ? "bg-[#1f262e] text-[#9cae9b] border border-[#2d3744]"
                  : "text-[#8d98a5] hover:text-white"
              }`}
            >
              {angle === "ALL" ? "Unified Synthesis" : angle === "FINANCIAL" ? "Financial Angle" : "Telephony Angle"}
            </button>
          ))}
        </div>

        <button
          onClick={() => handleRegenerate(focusAngle)}
          disabled={isGenerating}
          className="text-[#9cae9b] hover:text-white flex items-center gap-1.5 text-xs font-medium cursor-pointer"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isGenerating ? "animate-spin" : ""}`} />
          <span>Regenerate Summary</span>
        </button>
      </div>

      {/* Briefing Document Container */}
      <div className="bg-[#14171c] border border-[#222731] rounded-lg p-6 sm:p-8 space-y-6 shadow-sm">
        {/* Top Header of Document */}
        <div className="border-b border-[#222731] pb-5 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono text-[#8fa38d] uppercase tracking-wider">
              LAW ENFORCEMENT SENSITIVE // OFFICIAL USE ONLY
            </span>
            <span className="text-[11px] font-mono text-[#6c7682]">
              CS-2418 · NOV 26, 2026
            </span>
          </div>
          <h2 className="text-lg font-medium text-white pt-1">
            Operation Harbor View — Executive Intelligence Briefing
          </h2>
          <p className="text-xs text-[#8d98a5]">
            Prepared for Interagency Task Force · Lead Investigator: M. Kessler (L4)
          </p>
        </div>

        {/* Section 1 */}
        <div className="space-y-2">
          <h3 className="text-xs font-mono font-medium text-white uppercase tracking-wider">
            1. Executive Overview & Case Hypothesis
          </h3>
          <p className="text-xs text-[#8d98a5] leading-relaxed">
            Investigation CS-2418 centers on structured contraband routing and logistics coordination through Harbor District maritime terminals. Analysis of 47 events, 12 entities, and 8 corroborated leads establishes recurring clandestine night access patterns coordinated by primary persons of interest A. Kovacs and J. Thorne.
          </p>
        </div>

        {/* Section 2 */}
        <div className="space-y-2">
          <h3 className="text-xs font-mono font-medium text-white uppercase tracking-wider">
            2. Key Entities & Conspiratorial Roles
          </h3>
          <div className="space-y-2 text-xs">
            <div className="p-3 bg-[#101317] border border-[#222731] rounded space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-medium text-white">A. Kovacs</span>
                <span className="font-mono text-[11px] text-[#8fa38d]">Role: Logistics Operator</span>
              </div>
              <p className="text-[#8d98a5] text-[11px] leading-relaxed">
                Observed driver of Box truck 7XQ-4419 during repeated night gate entries at Pier 41. Registered subscriber of secondary burner IMEI device.
              </p>
            </div>

            <div className="p-3 bg-[#101317] border border-[#222731] rounded space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-medium text-white">J. Thorne</span>
                <span className="font-mono text-[11px] text-[#c4a265]">Role: Corporate Facilitator</span>
              </div>
              <p className="text-[#8d98a5] text-[11px] leading-relaxed">
                Co-signatory on Northgate Unit 4 industrial lease and registered director of Meridian Holdings shell entity.
              </p>
            </div>
          </div>
        </div>

        {/* Section 3 */}
        <div className="space-y-2">
          <h3 className="text-xs font-mono font-medium text-white uppercase tracking-wider">
            3. Evidentiary Hash & Integrity
          </h3>
          <div className="p-3 bg-[#101317] border border-[#222731] rounded text-[11px] font-mono text-[#8d98a5] flex flex-wrap items-center justify-between gap-2">
            <span>SHA-256 HASH: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855</span>
            <span className="text-[#8fa38d]">CHAIN OF CUSTODY VERIFIED</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntelligenceSummaryPage;
