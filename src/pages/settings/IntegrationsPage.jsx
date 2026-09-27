import React, { useState } from "react";
import { 
  Database, 
  RefreshCw, 
  Link as LinkIcon, 
  CheckCircle2, 
  ExternalLink, 
  Plus, 
  ShieldCheck, 
  Radio, 
  FileCode 
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Link, useLocation } from "react-router-dom";
import toast from "react-hot-toast";

const INTEGRATIONS_LIST = [
  { 
    id: "int-1", 
    name: "Federal CJIS Gateway Connector", 
    category: "CJIS/NCIC Database", 
    endpoint: "https://cjis-api.fbi.gov/v2/telemetry", 
    status: "ACTIVE", 
    lastPing: "12ms",
    protocol: "REST / mTLS 1.3",
    syncRate: "Real-time stream"
  },
  { 
    id: "int-2", 
    name: "Carrier CDR Telecommunications Feed", 
    category: "Telephony VoLTE Parser", 
    endpoint: "sip://cdr-gateway.telecom-taskforce.internal", 
    status: "ACTIVE", 
    lastPing: "24ms",
    protocol: "SIP / TLS",
    syncRate: "5 min batch"
  },
  { 
    id: "int-3", 
    name: "FinCEN BSA Electronic Filing API", 
    category: "Financial Intelligence", 
    endpoint: "https://bsa.fincen.treas.gov/api/v4/sar", 
    status: "ACTIVE", 
    lastPing: "45ms",
    protocol: "HTTPS / HMAC-SHA256",
    syncRate: "Hourly poll"
  },
  { 
    id: "int-4", 
    name: "Automated License Plate Readers (ALPR)", 
    category: "Surveillance OCR Grid", 
    endpoint: "mqtt://alpr-hub.portauthority.internal:8883", 
    status: "ACTIVE", 
    lastPing: "8ms",
    protocol: "MQTT / TLS",
    syncRate: "Sub-second event"
  }
];

export const IntegrationsPage = () => {
  const [integrations, setIntegrations] = useState(INTEGRATIONS_LIST);
  const [testingId, setTestingId] = useState(null);
  const location = useLocation();

  const handleTestConnection = (id, name) => {
    setTestingId(id);
    setTimeout(() => {
      setTestingId(null);
      toast.success(`Connection verified for ${name} (200 OK · TLS 1.3)`);
    }, 800);
  };

  const navTabs = [
    { label: "General", path: "/settings" },
    { label: "Integrations", path: "/settings/integrations" },
    { label: "Schema & Ontology", path: "/settings/schema" },
    { label: "User Management", path: "/settings/users" },
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#222731]">
        <div>
          <div className="flex items-center gap-2 text-tactical-neutral-500 text-[11px] uppercase tracking-wider font-mono mb-1">
            <span>GOVERNANCE & CONFIGURATION</span>
            <span>/</span>
            <span className="text-tactical-sage-400 font-semibold">INTEGRATIONS</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            External Feed Integrations & Gateways
          </h1>
          <p className="text-xs text-tactical-neutral-400 mt-0.5">
            Cryptographically authenticated connection pipelines to CAD, RMS, CDR, ALPR, and FinCEN repositories
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="sage"
            size="sm"
            onClick={() => toast.success("New integration modal opened")}
            icon={<Plus className="w-3.5 h-3.5" />}
            className="text-xs font-mono"
          >
            Add Connector
          </Button>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-1.5 p-1 bg-[#14171c] border border-[#222731] rounded-lg text-xs font-mono w-fit">
        {navTabs.map((tab) => {
          const isActive = location.pathname === tab.path;
          return (
            <Link
              key={tab.path}
              to={tab.path}
              className={`px-3.5 py-1.5 rounded-md font-medium transition-colors ${
                isActive
                  ? "bg-[#1c222b] text-white border border-[#2e3644] shadow-sm"
                  : "text-tactical-neutral-400 hover:text-white hover:bg-[#181c22]"
              }`}
            >
              {tab.label}
            </Link>
          );
        })}
      </div>

      {/* Integrations Grid / Cards */}
      <div className="space-y-3.5">
        {integrations.map((item) => (
          <div
            key={item.id}
            className="p-5 rounded-xl bg-[#14171c] border border-[#222731] hover:border-[#2e3644] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-5"
          >
            <div className="space-y-2 flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="font-bold text-white text-sm">
                  {item.name}
                </span>
                <Badge variant="success" size="sm" className="font-mono text-[9px] uppercase">
                  ● {item.status}
                </Badge>
                <span className="text-[11px] font-mono text-tactical-neutral-400 bg-[#101317] px-2 py-0.5 rounded border border-[#222731]">
                  {item.protocol}
                </span>
              </div>

              <div className="text-xs text-tactical-neutral-400">
                {item.category} · Sync: <span className="text-tactical-neutral-300 font-mono">{item.syncRate}</span>
              </div>

              <div className="text-[11px] text-tactical-neutral-300 font-mono bg-[#101317] px-3 py-1.5 rounded-md border border-[#222731] inline-block truncate max-w-full">
                {item.endpoint}
              </div>
            </div>

            <div className="flex items-center gap-4 shrink-0 self-start sm:self-center pt-2 sm:pt-0 border-t sm:border-t-0 border-[#222731]">
              <div className="text-right font-mono">
                <div className="text-[10px] uppercase text-tactical-neutral-500">Latency</div>
                <div className="text-xs font-bold text-tactical-success-400">{item.lastPing}</div>
              </div>

              <Button
                variant="secondary"
                size="sm"
                onClick={() => handleTestConnection(item.id, item.name)}
                disabled={testingId === item.id}
                icon={<RefreshCw className={`w-3.5 h-3.5 ${testingId === item.id ? "animate-spin text-tactical-sage-400" : ""}`} />}
                className="text-xs font-mono border-[#222731] hover:border-[#2e3644]"
              >
                {testingId === item.id ? "Verifying..." : "Ping TLS"}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IntegrationsPage;
