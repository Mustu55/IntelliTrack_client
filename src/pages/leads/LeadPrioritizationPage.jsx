import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ChevronRight,
  FileText,
  Clock,
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  Users
} from "lucide-react";
import toast from "react-hot-toast";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";

export const LeadPrioritizationPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [leadStatus, setLeadStatus] = useState("New");

  const handleAction = (status, label) => {
    setLeadStatus(status);
    toast.success(`Lead ${label} — Action logged to audit trail`);
  };

  return (
    <div className="space-y-4 max-w-7xl mx-auto">
      {/* Header matching LeadDetail.jpeg */}
      <div className="space-y-0.5">
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate("/leads")}
            className="text-xs text-[#8d98a5] hover:text-white flex items-center gap-1 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Leads</span>
          </button>
          <span className="text-xs text-[#6c7682]">/</span>
          <span className="text-xs font-mono text-white">LD-8821</span>
          <span className="text-xs text-[#6c7682]">·</span>
          <span className="text-xs text-[#8d98a5]">Created Nov 24</span>
          <span className="text-xs text-[#6c7682]">·</span>
          <span className="text-xs text-[#8fa38d] font-mono">Confidence 94%</span>
        </div>
        <h1 className="text-xl font-medium text-white tracking-tight pt-1">
          LD-8821 · Shared identifier pattern
        </h1>
      </div>

      {/* 2-Column Grid Layout matching LeadDetail.jpeg */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        {/* Left Primary Column (8 Cols) */}
        <div className="lg:col-span-8 space-y-4">
          {/* Main Lead Summary Card */}
          <div className="bg-[#14171c] border border-[#222731] rounded-lg p-5 space-y-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-medium bg-[#18261c] text-[#8fa38d]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8fa38d]" />
                  {leadStatus}
                </span>
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-medium bg-[#281c1c] text-[#dc7869]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#dc7869]" />
                  High Severity
                </span>
              </div>
              <span className="text-sm font-mono font-medium text-[#8fa38d]">94%</span>
            </div>

            <div>
              <h2 className="text-base font-medium text-white leading-snug">
                Same phone identifier links 3 entities across invoices, leases and gate logs.
              </h2>
              <p className="text-xs text-[#8d98a5] mt-2 leading-relaxed">
                +1 (415) 555-0132 appears on Meridian invoice batch #4471, the Northgate Unit 4 lease co-signed by J. Thorne, and the Pier 41 gate log for truck 7XQ-4419 — all within a 72-hour window. Pattern strength is high; alternate explanations (shared dispatcher line) not yet excluded.
              </p>
            </div>

            <div className="p-2.5 bg-[#101317] border border-[#222731] rounded text-[11px] text-[#8fa38d] font-sans">
              AI-generated investigative signal — requires investigator verification.
            </div>
          </div>

          {/* Supporting Evidence Card */}
          <div className="bg-[#14171c] border border-[#222731] rounded-lg p-5 space-y-3 shadow-sm">
            <div className="text-xs font-medium text-white">Supporting evidence</div>

            <div className="divide-y divide-[#222731] text-xs">
              <div
                onClick={() => navigate("/evidence")}
                className="py-3 flex items-center justify-between hover:text-white text-[#d1d7df] cursor-pointer group transition-colors"
              >
                <div className="flex items-center gap-3">
                  <FileText className="w-4 h-4 text-[#6c7682] group-hover:text-[#9cae9b] transition-colors" />
                  <span className="font-mono text-[#8d98a5]">EV-5498</span>
                  <span>Invoice batch #4471 · Pending</span>
                </div>
                <ChevronRight className="w-4 h-4 text-[#6c7682] group-hover:text-white transition-colors" />
              </div>

              <div
                onClick={() => navigate("/evidence")}
                className="py-3 flex items-center justify-between hover:text-white text-[#d1d7df] cursor-pointer group transition-colors"
              >
                <div className="flex items-center gap-3">
                  <FileText className="w-4 h-4 text-[#6c7682] group-hover:text-[#9cae9b] transition-colors" />
                  <span className="font-mono text-[#8d98a5]">EV-5441</span>
                  <span>Lease agreement · Verified</span>
                </div>
                <ChevronRight className="w-4 h-4 text-[#6c7682] group-hover:text-white transition-colors" />
              </div>

              <div
                onClick={() => navigate("/evidence")}
                className="py-3 flex items-center justify-between hover:text-white text-[#d1d7df] cursor-pointer group transition-colors"
              >
                <div className="flex items-center gap-3">
                  <FileText className="w-4 h-4 text-[#6c7682] group-hover:text-[#9cae9b] transition-colors" />
                  <span className="font-mono text-[#8d98a5]">EV-5521</span>
                  <span>Gate log export · Verified</span>
                </div>
                <ChevronRight className="w-4 h-4 text-[#6c7682] group-hover:text-white transition-colors" />
              </div>
            </div>
          </div>

          {/* Related Timeline + Locations Card */}
          <div className="bg-[#14171c] border border-[#222731] rounded-lg p-5 space-y-3 shadow-sm">
            <div className="text-xs font-medium text-white">Related timeline + locations</div>

            <div className="divide-y divide-[#222731] text-xs text-[#8d98a5]">
              <div className="py-2.5 hover:text-white cursor-pointer transition-colors" onClick={() => navigate("/timeline")}>
                Nov 18 · Call cluster — 14 calls in 72h
              </div>
              <div className="py-2.5 hover:text-white cursor-pointer transition-colors" onClick={() => navigate("/timeline")}>
                Nov 21 · Invoice batch flagged
              </div>
              <div className="py-2.5 hover:text-white cursor-pointer transition-colors" onClick={() => navigate("/timeline")}>
                Nov 24 · Night access — Pier 41, Unit 9
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar Column (4 Cols) */}
        <div className="lg:col-span-4 space-y-4">
          {/* Related Entities Card */}
          <div className="bg-[#14171c] border border-[#222731] rounded-lg p-4 space-y-3 shadow-sm">
            <div className="text-xs font-medium text-white">Related entities</div>

            <div className="divide-y divide-[#222731] text-xs">
              <div
                onClick={() => navigate("/entities/poi-1")}
                className="py-2.5 flex items-center justify-between hover:text-white text-[#d1d7df] cursor-pointer group transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#6c7682]" />
                  <span>A. Kovacs</span>
                </div>
                <span className="text-[#6c7682]">Person</span>
              </div>

              <div
                onClick={() => navigate("/entities/poi-2")}
                className="py-2.5 flex items-center justify-between hover:text-white text-[#d1d7df] cursor-pointer group transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#6c7682]" />
                  <span>J. Thorne</span>
                </div>
                <span className="text-[#6c7682]">Person</span>
              </div>

              <div
                onClick={() => navigate("/entities/org-1")}
                className="py-2.5 flex items-center justify-between hover:text-white text-[#d1d7df] cursor-pointer group transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#6c7682]" />
                  <span>Meridian Holdings</span>
                </div>
                <span className="text-[#6c7682]">Organization</span>
              </div>
            </div>
          </div>

          {/* Investigator Actions Card */}
          <div className="bg-[#14171c] border border-[#222731] rounded-lg p-4 space-y-3 shadow-sm">
            <div className="text-xs font-medium text-white">Investigator actions</div>

            <div className="space-y-2">
              <Button
                variant="secondary"
                className="w-full justify-center text-xs"
                onClick={() => handleAction("Under Review", "marked Under Review")}
              >
                Mark under review
              </Button>

              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="primary"
                  className="w-full justify-center text-xs"
                  onClick={() => handleAction("Verified", "verified")}
                >
                  Verify
                </Button>

                <Button
                  variant="danger"
                  className="w-full justify-center text-xs"
                  onClick={() => handleAction("Dismissed", "dismissed")}
                >
                  Dismiss
                </Button>
              </div>
            </div>

            <p className="text-[11px] text-[#6c7682] leading-normal pt-1">
              Verify and Dismiss require confirmation and are written to the audit trail.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadPrioritizationPage;
