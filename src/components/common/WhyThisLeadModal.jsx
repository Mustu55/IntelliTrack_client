import React from "react";
import {
  X,
  Sparkles,
  CheckCircle2,
  Share2,
  Database,
  Clock,
  Fingerprint,
  AlertTriangle,
  HelpCircle,
  ShieldCheck
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export const WhyThisLeadModal = ({
  isOpen,
  onClose,
  data
}) => {
  if (!isOpen || !data) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm select-none overflow-y-auto">
      <div className="w-full max-w-3xl bg-[#14171c] border border-[#222731] rounded-2xl shadow-2xl overflow-hidden font-sans my-auto">
        {/* Modal Header */}
        <div className="bg-[#101317] px-5 py-4 border-b border-[#222731] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#181d24] border border-[#222731] flex items-center justify-center text-tactical-sage-400">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-white tracking-wider">
                  EXPLAINABLE AI INVESTIGATIVE RATIONALE
                </span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold bg-[#181d24] text-tactical-sage-400 border border-[#222731]">
                  {data.leadId}
                </span>
              </div>
              <div className="text-[11px] text-tactical-neutral-400">
                Transparent algorithmic provenance & evidence synthesis (Non-Black-Box AI)
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-tactical-neutral-400 hover:text-white hover:bg-[#181d24] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 space-y-5 max-h-[75vh] overflow-y-auto custom-scrollbar">
          {/* Safeguard Banner */}
          <div className="p-3.5 rounded-xl bg-[#1a1714] border border-[#c4a265]/40 flex items-start gap-3">
            <AlertTriangle className="w-4 h-4 text-[#c4a265] shrink-0 mt-0.5" />
            <div className="text-xs">
              <span className="font-semibold text-[#c4a265]">Investigator Safeguard: </span>
              <span className="text-tactical-neutral-300">
                AI-generated investigative lead — requires human investigator verification. IntelliTrack provides explainable probabilistic indicators to assist sworn analysts; it does not replace legal evidentiary burden.
              </span>
            </div>
          </div>

          {/* Lead Hero */}
          <div className="bg-[#101317] p-4 rounded-xl border border-[#222731] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 mb-1">
                <Badge
                  variant={data.priority === "HIGH" ? "danger" : "warning"}
                  size="sm"
                  className="font-mono text-[9px] uppercase"
                >
                  {data.priority} PRIORITY
                </Badge>
                <span className="text-xs text-tactical-neutral-400 font-mono">
                  Synthesized across {data.dataSources?.length || 2} intelligence feeds
                </span>
              </div>
              <h3 className="text-base font-bold text-white">{data.title}</h3>
              <p className="text-xs text-tactical-neutral-400 leading-relaxed font-sans">{data.summary}</p>
            </div>

            <div className="shrink-0 flex sm:flex-col items-center sm:items-end justify-between border-t sm:border-t-0 pt-2 sm:pt-0 border-[#222731]">
              <div className="text-[10px] uppercase font-mono text-tactical-neutral-500">Confidence</div>
              <div className="text-2xl font-black font-mono text-tactical-sage-400">
                {data.confidence}%
              </div>
              <div className="w-24 h-1.5 bg-[#181d24] rounded-full overflow-hidden mt-1 hidden sm:block">
                <div
                  className="h-full bg-tactical-sage-400 rounded-full"
                  style={{ width: `${data.confidence}%` }}
                />
              </div>
            </div>
          </div>

          {/* Why Prioritized Pillars */}
          {data.whyPrioritized && (
            <div className="bg-[#101317] p-4 rounded-xl border border-[#222731] space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase font-mono text-white tracking-wider flex items-center gap-2">
                  <HelpCircle className="w-3.5 h-3.5 text-tactical-sage-400" />
                  WHY PRIORITIZED?
                </span>
                <span className="text-[10px] font-mono text-tactical-success-400 font-semibold">
                  ALL PILLARS VALIDATED
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 font-mono text-xs">
                {data.whyPrioritized.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 p-2 rounded-lg bg-[#14171c] border border-[#222731] text-tactical-neutral-300"
                  >
                    <CheckCircle2 className="w-4 h-4 text-tactical-success-400 shrink-0" />
                    <span className="truncate">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Supporting Relationships */}
          {data.supportingRelationships && (
            <div className="space-y-2">
              <div className="text-xs font-bold uppercase font-mono text-tactical-neutral-300 flex items-center gap-2">
                <Share2 className="w-3.5 h-3.5 text-tactical-sage-400" />
                1. SUPPORTING RELATIONSHIPS IN GRAPH
              </div>
              <div className="overflow-x-auto border border-[#222731] rounded-xl">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-[#101317] text-tactical-neutral-500 border-b border-[#222731]">
                    <tr>
                      <th className="p-2.5">Source Entity</th>
                      <th className="p-2.5">Relationship</th>
                      <th className="p-2.5">Target Entity</th>
                      <th className="p-2.5">Confidence</th>
                      <th className="p-2.5">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#222731] bg-[#14171c]">
                    {data.supportingRelationships.map((rel, idx) => (
                      <tr key={idx} className="hover:bg-[#181d24] transition-colors">
                        <td className="p-2.5 text-white font-semibold">{rel.source}</td>
                        <td className="p-2.5 text-tactical-sage-400">{rel.relationship}</td>
                        <td className="p-2.5 text-tactical-neutral-300">{rel.target}</td>
                        <td className="p-2.5 font-bold text-white">{rel.confidence}%</td>
                        <td className="p-2.5">
                          <Badge
                            variant={rel.status === "VERIFIED" ? "success" : rel.status === "SUSPICIOUS" ? "danger" : "warning"}
                            size="sm"
                            className="text-[9px]"
                          >
                            {rel.status}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-[#101317] px-5 py-3.5 border-t border-[#222731] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono">
          <div className="text-tactical-neutral-500 text-[11px] text-center sm:text-left">
            <span>AUDIT TRAIL: </span>
            <span className="text-tactical-neutral-300">INTELLITRACK-AI-v4.8 · SHA-256 LOGGED</span>
          </div>
          <Button
            variant="sage"
            size="sm"
            onClick={onClose}
            className="w-full sm:w-auto text-xs font-mono"
          >
            Acknowledge & Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WhyThisLeadModal;
