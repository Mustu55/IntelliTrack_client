import React from "react";
import { X, Database, Cpu, Lock, Server, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export const SystemStatusModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm select-none">
      <div className="w-full max-w-lg bg-[#14171c] border border-[#222731] rounded-2xl shadow-2xl overflow-hidden font-sans">
        <div className="bg-[#101317] px-5 py-4 border-b border-[#222731] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-2 h-2 rounded-full bg-tactical-success-400 animate-pulse" />
            <h3 className="font-bold text-xs text-white font-mono uppercase tracking-wider">
              IntelliTrack System Health & Node Status
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-tactical-neutral-400 hover:text-white hover:bg-[#181d24] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 space-y-4 text-xs font-mono">
          <div className="p-3.5 rounded-xl bg-[#101317] border border-[#222731] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-tactical-success-400" />
              <span className="text-tactical-neutral-300">Cluster Status</span>
            </div>
            <Badge variant="success" size="sm" className="font-mono text-[9px] uppercase">
              ALL SERVICES NOMINAL
            </Badge>
          </div>

          <div className="space-y-2">
            <div className="text-[10px] text-tactical-neutral-500 uppercase tracking-wider">
              Core Microservices & Pipelines
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              <div className="p-3 rounded-xl bg-[#101317] border border-[#222731]">
                <div className="flex items-center gap-1.5 text-tactical-neutral-400 mb-1">
                  <Server className="w-3.5 h-3.5 text-tactical-sage-400" />
                  <span className="text-[11px]">Graph Engine</span>
                </div>
                <div className="text-white font-bold">Neo4j Enterprise</div>
                <div className="text-[10px] text-tactical-success-400 mt-0.5">Latency: 14ms · Synced</div>
              </div>

              <div className="p-3 rounded-xl bg-[#101317] border border-[#222731]">
                <div className="flex items-center gap-1.5 text-tactical-neutral-400 mb-1">
                  <Cpu className="w-3.5 h-3.5 text-tactical-sage-400" />
                  <span className="text-[11px]">AI Extraction</span>
                </div>
                <div className="text-white font-bold">Transformer v4.8</div>
                <div className="text-[10px] text-tactical-success-400 mt-0.5">420 docs/sec</div>
              </div>

              <div className="p-3 rounded-xl bg-[#101317] border border-[#222731]">
                <div className="flex items-center gap-1.5 text-tactical-neutral-400 mb-1">
                  <Database className="w-3.5 h-3.5 text-tactical-sage-400" />
                  <span className="text-[11px]">Vault Repository</span>
                </div>
                <div className="text-white font-bold">FRE 902 Shards</div>
                <div className="text-[10px] text-tactical-success-400 mt-0.5">SHA-256 Validated</div>
              </div>

              <div className="p-3 rounded-xl bg-[#101317] border border-[#222731]">
                <div className="flex items-center gap-1.5 text-tactical-neutral-400 mb-1">
                  <Lock className="w-3.5 h-3.5 text-tactical-warning-400" />
                  <span className="text-[11px]">CJIS Compliance</span>
                </div>
                <div className="text-white font-bold">Level 4 Tier</div>
                <div className="text-[10px] text-tactical-success-400 mt-0.5">FIPS 140-3 Active</div>
              </div>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#101317] border border-[#222731] space-y-1.5 text-[11px] text-tactical-neutral-400">
            <div className="flex justify-between">
              <span>Overall Uptime:</span>
              <span className="text-white font-bold">99.98% (Last 90 Days)</span>
            </div>
            <div className="flex justify-between">
              <span>Indexed Entities:</span>
              <span className="text-tactical-sage-400 font-bold">1,482 Nodes</span>
            </div>
            <div className="flex justify-between">
              <span>Mapped Relationships:</span>
              <span className="text-white font-bold">5,839 Edges</span>
            </div>
          </div>
        </div>

        <div className="bg-[#101317] px-5 py-3 border-t border-[#222731] flex justify-end">
          <Button
            variant="secondary"
            size="sm"
            onClick={onClose}
            className="border-[#222731] text-xs"
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SystemStatusModal;
