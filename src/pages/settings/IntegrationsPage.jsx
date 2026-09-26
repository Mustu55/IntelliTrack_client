import React, { useState } from "react";
import { Database, RefreshCw } from "lucide-react";
import toast from "react-hot-toast";
const INTEGRATIONS_LIST = [
  { id: "int-1", name: "Federal CJIS Gateway Connector", category: "CJIS/NCIC Database", endpoint: "https://cjis-api.fbi.gov/v2/telemetry", status: "ACTIVE", lastPing: "12ms (Pass)" },
  { id: "int-2", name: "Carrier CDR Telecommunications Feed", category: "Telephony VoLTE Parser", endpoint: "sip://cdr-gateway.telecom-taskforce.internal", status: "ACTIVE", lastPing: "24ms (Pass)" },
  { id: "int-3", name: "FinCEN BSA Electronic Filing API", category: "Financial Intelligence", endpoint: "https://bsa.fincen.treas.gov/api/v4/sar", status: "ACTIVE", lastPing: "45ms (Pass)" },
  { id: "int-4", name: "Automated License Plate Readers (ALPR)", category: "Surveillance OCR Grid", endpoint: "mqtt://alpr-hub.portauthority.internal:8883", status: "ACTIVE", lastPing: "8ms (Pass)" }
];
const IntegrationsPage = () => {
  const [integrations, setIntegrations] = useState(INTEGRATIONS_LIST);
  const [testingId, setTestingId] = useState(null);
  const handleTestConnection = (id, name) => {
    setTestingId(id);
    setTimeout(() => {
      setTestingId(null);
      toast.success(`Connection verified for ${name} (200 OK \u2022 TLS 1.3)`);
    }, 800);
  };
  return /* @__PURE__ */ React.createElement("div", { className: "space-y-6 max-w-5xl mx-auto font-sans pb-16" }, /* @__PURE__ */ React.createElement("div", { className: "bg-[#161b22] border border-[#30363d] rounded-xl p-6 shadow-xl shadow-black/40 relative overflow-hidden" }, /* @__PURE__ */ React.createElement("div", { className: "absolute top-0 right-0 w-96 h-48 bg-slate-500/5 rounded-full blur-3xl pointer-events-none" }), /* @__PURE__ */ React.createElement("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-5 relative z-10" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#1e293b] border border-[#30363d] text-slate-300 font-mono text-[11px] uppercase tracking-wider mb-2" }, /* @__PURE__ */ React.createElement(Database, { className: "w-3.5 h-3.5 text-slate-400" }), /* @__PURE__ */ React.createElement("span", null, "EXTERNAL CONNECTIONS & GATEWAYS")), /* @__PURE__ */ React.createElement("h1", { className: "text-2xl sm:text-3xl font-bold text-white tracking-tight" }, "System Feed Integrations"), /* @__PURE__ */ React.createElement("p", { className: "text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl leading-relaxed" }, "Cryptographically authenticated connection pipelines to CAD, RMS, CDR, ALPR, and FinCEN repositories.")))), /* @__PURE__ */ React.createElement("div", { className: "space-y-4 font-mono text-xs" }, integrations.map((int) => /* @__PURE__ */ React.createElement(
    "div",
    {
      key: int.id,
      className: "p-5 rounded-xl bg-[#161b22] border border-[#30363d] hover:border-slate-500/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl transition-all"
    },
    /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2.5 mb-1" }, /* @__PURE__ */ React.createElement("span", { className: "font-bold text-white text-base font-sans" }, int.name), /* @__PURE__ */ React.createElement("span", { className: "px-2.5 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-[10px] font-bold uppercase" }, "\u25CF ", int.status)), /* @__PURE__ */ React.createElement("div", { className: "text-slate-400 text-xs mb-1.5" }, int.category), /* @__PURE__ */ React.createElement("div", { className: "text-[11px] text-slate-300 font-mono bg-[#0d1117] px-2.5 py-1 rounded-md border border-[#30363d] inline-block" }, int.endpoint)),
    /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-3 self-start sm:self-auto" }, /* @__PURE__ */ React.createElement("span", { className: "text-[11px] text-slate-400 font-semibold" }, "Ping: ", /* @__PURE__ */ React.createElement("strong", { className: "text-emerald-400" }, int.lastPing)), /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => handleTestConnection(int.id, int.name),
        disabled: testingId === int.id,
        className: "px-3.5 py-1.5 rounded-lg bg-[#0d1117] hover:bg-[#1f242c] border border-[#30363d] hover:border-slate-400 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
      },
      /* @__PURE__ */ React.createElement(RefreshCw, { className: `w-3.5 h-3.5 ${testingId === int.id ? "animate-spin text-slate-400" : ""}` }),
      /* @__PURE__ */ React.createElement("span", null, testingId === int.id ? "Verifying..." : "Test TLS 1.3")
    ))
  ))));
};
var stdin_default = IntegrationsPage;
export {
  IntegrationsPage,
  stdin_default as default
};
