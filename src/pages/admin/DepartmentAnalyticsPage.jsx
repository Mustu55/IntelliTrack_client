import React, { useState } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend
} from "recharts";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";
import {
  TrendingUp,
  ShieldCheck,
  FileDown
} from "lucide-react";
const clearanceData = [
  { month: "OCT", initiated: 18, cleared: 14, rate: 77 },
  { month: "NOV", initiated: 24, cleared: 20, rate: 83 },
  { month: "DEC", initiated: 21, cleared: 19, rate: 90 },
  { month: "JAN", initiated: 28, cleared: 23, rate: 82 },
  { month: "FEB", initiated: 32, cleared: 27, rate: 84 },
  { month: "MAR", initiated: 35, cleared: 31, rate: 88 }
];
const typologyData = [
  { typology: "Transnational Narcotics", cases: 42, color: "#2B6CB0" },
  { typology: "Hawala & Money Laundering", cases: 31, color: "#DD6B20" },
  { typology: "Racketeering (RICO)", cases: 28, color: "#38A169" },
  { typology: "Cyber & Crypto Arms", cases: 19, color: "#805AD5" },
  { typology: "Public Corruption", cases: 12, color: "#E53E3E" }
];
const evidenceVolumeData = [
  { day: "MON", cdr: 120, intercepts: 45, lpr: 450 },
  { day: "TUE", cdr: 160, intercepts: 58, lpr: 520 },
  { day: "WED", cdr: 210, intercepts: 92, lpr: 680 },
  { day: "THU", cdr: 190, intercepts: 74, lpr: 610 },
  { day: "FRI", cdr: 280, intercepts: 110, lpr: 890 },
  { day: "SAT", cdr: 140, intercepts: 32, lpr: 380 },
  { day: "SUN", cdr: 95, intercepts: 21, lpr: 290 }
];
const DepartmentAnalyticsPage = () => {
  const [timeframe, setTimeframe] = useState("6M");
  const [jurisdiction, setJurisdiction] = useState("ALL");
  return /* @__PURE__ */ React.createElement("div", { className: "space-y-6 max-w-7xl mx-auto font-mono" }, /* @__PURE__ */ React.createElement("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-tactical-neutral-200 dark:border-tactical-neutral-800" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 text-tactical-neutral-500 text-[11px] uppercase tracking-wider mb-1" }, /* @__PURE__ */ React.createElement("span", null, "EVIDENTIARY PERFORMANCE INTELLIGENCE"), /* @__PURE__ */ React.createElement("span", null, "/"), /* @__PURE__ */ React.createElement("span", { className: "text-tactical-primary-600 font-semibold" }, "DEPARTMENTAL METRICS")), /* @__PURE__ */ React.createElement("h1", { className: "text-2xl font-bold tracking-tight text-tactical-neutral-900 dark:text-tactical-neutral-100" }, "Departmental Analytics & Clearance Trends")), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React.createElement(
    Select,
    {
      value: timeframe,
      onChange: (e) => setTimeframe(e.target.value),
      options: [
        { value: "30D", label: "Last 30 Days" },
        { value: "90D", label: "Last 90 Days" },
        { value: "6M", label: "Last 6 Months" },
        { value: "1Y", label: "Current Fiscal Year" }
      ]
    }
  ), /* @__PURE__ */ React.createElement(
    Button,
    {
      variant: "secondary",
      size: "sm",
      onClick: () => alert("Exporting Analytics Intelligence Dossier (PDF/XLSX)..."),
      icon: /* @__PURE__ */ React.createElement(FileDown, { className: "w-4 h-4" })
    },
    "Export Brief"
  ))), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" }, /* @__PURE__ */ React.createElement("div", { className: "p-4 bg-white dark:bg-tactical-neutral-900 rounded border border-tactical-neutral-200 dark:border-tactical-neutral-800" }, /* @__PURE__ */ React.createElement("div", { className: "text-[10px] uppercase text-tactical-neutral-500" }, "Case Clearance Rate"), /* @__PURE__ */ React.createElement("div", { className: "text-3xl font-black text-tactical-neutral-900 dark:text-tactical-neutral-100 my-1" }, "86.4%"), /* @__PURE__ */ React.createElement("div", { className: "text-[11px] text-tactical-success-600 font-semibold flex items-center gap-1" }, /* @__PURE__ */ React.createElement(TrendingUp, { className: "w-3.5 h-3.5" }), " +4.2% vs Previous Quarter")), /* @__PURE__ */ React.createElement("div", { className: "p-4 bg-white dark:bg-tactical-neutral-900 rounded border border-tactical-neutral-200 dark:border-tactical-neutral-800" }, /* @__PURE__ */ React.createElement("div", { className: "text-[10px] uppercase text-tactical-neutral-500" }, "Mean Time to Indictment"), /* @__PURE__ */ React.createElement("div", { className: "text-3xl font-black text-tactical-primary-600 my-1" }, "18.2 Days"), /* @__PURE__ */ React.createElement("div", { className: "text-[11px] text-tactical-neutral-500" }, "From Primary Lead Ingestion")), /* @__PURE__ */ React.createElement("div", { className: "p-4 bg-white dark:bg-tactical-neutral-900 rounded border border-tactical-neutral-200 dark:border-tactical-neutral-800" }, /* @__PURE__ */ React.createElement("div", { className: "text-[10px] uppercase text-tactical-neutral-500" }, "Evidentiary Retention"), /* @__PURE__ */ React.createElement("div", { className: "text-3xl font-black text-tactical-neutral-900 dark:text-tactical-neutral-100 my-1" }, "100%"), /* @__PURE__ */ React.createElement("div", { className: "text-[11px] text-tactical-success-600 font-semibold flex items-center gap-1" }, /* @__PURE__ */ React.createElement(ShieldCheck, { className: "w-3.5 h-3.5" }), " Zero Chain Tampering")), /* @__PURE__ */ React.createElement("div", { className: "p-4 bg-white dark:bg-tactical-neutral-900 rounded border border-tactical-neutral-200 dark:border-tactical-neutral-800" }, /* @__PURE__ */ React.createElement("div", { className: "text-[10px] uppercase text-tactical-neutral-500" }, "Asset Forfeiture Seized"), /* @__PURE__ */ React.createElement("div", { className: "text-3xl font-black text-tactical-neutral-900 dark:text-tactical-neutral-100 my-1" }, "$14.8M"), /* @__PURE__ */ React.createElement("div", { className: "text-[11px] text-tactical-neutral-500" }, "Correlated Hawala Freezes"))), /* @__PURE__ */ React.createElement("div", { className: "p-5 bg-white dark:bg-tactical-neutral-900 rounded border border-tactical-neutral-200 dark:border-tactical-neutral-800 space-y-3" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between pb-2 border-b border-tactical-neutral-200 dark:border-tactical-neutral-800 text-xs" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h3", { className: "font-bold uppercase text-tactical-neutral-900 dark:text-tactical-neutral-100" }, "Docket Initiation vs Clearance Velocity"), /* @__PURE__ */ React.createElement("span", { className: "text-[11px] text-tactical-neutral-500" }, "Monthly intake and resolution trends")), /* @__PURE__ */ React.createElement("span", { className: "text-[11px] font-semibold text-tactical-primary-600" }, "Target Resolution Benchmark: > 80%")), /* @__PURE__ */ React.createElement("div", { className: "h-64 w-full" }, /* @__PURE__ */ React.createElement(ResponsiveContainer, { width: "100%", height: "100%" }, /* @__PURE__ */ React.createElement(BarChart, { data: clearanceData, margin: { top: 10, right: 10, left: -20, bottom: 0 } }, /* @__PURE__ */ React.createElement(CartesianGrid, { strokeDasharray: "3 3", stroke: "#E2E8F0", opacity: 0.5 }), /* @__PURE__ */ React.createElement(XAxis, { dataKey: "month", tick: { fontSize: 10, fill: "#718096" } }), /* @__PURE__ */ React.createElement(YAxis, { tick: { fontSize: 10, fill: "#718096" } }), /* @__PURE__ */ React.createElement(
    Tooltip,
    {
      contentStyle: {
        backgroundColor: "#1A202C",
        border: "none",
        borderRadius: "4px",
        color: "#fff",
        fontSize: "11px",
        fontFamily: "JetBrains Mono"
      }
    }
  ), /* @__PURE__ */ React.createElement(Legend, { wrapperStyle: { fontSize: "11px", paddingTop: "8px" } }), /* @__PURE__ */ React.createElement(Bar, { dataKey: "initiated", name: "Dockets Opened", fill: "#718096", radius: [2, 2, 0, 0] }), /* @__PURE__ */ React.createElement(Bar, { dataKey: "cleared", name: "Indictments / Cleared", fill: "#2B6CB0", radius: [2, 2, 0, 0] }))))), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6" }, /* @__PURE__ */ React.createElement("div", { className: "p-5 bg-white dark:bg-tactical-neutral-900 rounded border border-tactical-neutral-200 dark:border-tactical-neutral-800 space-y-3" }, /* @__PURE__ */ React.createElement("div", { className: "pb-2 border-b border-tactical-neutral-200 dark:border-tactical-neutral-800 text-xs" }, /* @__PURE__ */ React.createElement("h3", { className: "font-bold uppercase text-tactical-neutral-900 dark:text-tactical-neutral-100" }, "Syndicate Crime Typology Breakdown"), /* @__PURE__ */ React.createElement("span", { className: "text-[11px] text-tactical-neutral-500" }, "Active dockets grouped by federal offense classification")), /* @__PURE__ */ React.createElement("div", { className: "space-y-3 pt-2" }, typologyData.map((item) => /* @__PURE__ */ React.createElement("div", { key: item.typology, className: "space-y-1" }, /* @__PURE__ */ React.createElement("div", { className: "flex justify-between text-xs" }, /* @__PURE__ */ React.createElement("span", { className: "text-tactical-neutral-800 dark:text-tactical-neutral-200 font-semibold" }, item.typology), /* @__PURE__ */ React.createElement("span", { className: "text-tactical-neutral-500 font-bold" }, item.cases, " Cases")), /* @__PURE__ */ React.createElement("div", { className: "w-full bg-tactical-neutral-100 dark:bg-tactical-neutral-800 h-2 rounded-full overflow-hidden" }, /* @__PURE__ */ React.createElement(
    "div",
    {
      className: "h-full rounded-full transition-all duration-500",
      style: {
        width: `${item.cases / 42 * 100}%`,
        backgroundColor: item.color
      }
    }
  )))))), /* @__PURE__ */ React.createElement("div", { className: "p-5 bg-white dark:bg-tactical-neutral-900 rounded border border-tactical-neutral-200 dark:border-tactical-neutral-800 space-y-3" }, /* @__PURE__ */ React.createElement("div", { className: "pb-2 border-b border-tactical-neutral-200 dark:border-tactical-neutral-800 text-xs" }, /* @__PURE__ */ React.createElement("h3", { className: "font-bold uppercase text-tactical-neutral-900 dark:text-tactical-neutral-100" }, "Evidentiary Telemetry Ingestion (7-Day Cycle)"), /* @__PURE__ */ React.createElement("span", { className: "text-[11px] text-tactical-neutral-500" }, "CDR pings (k), audio intercepts, and LPR plate records")), /* @__PURE__ */ React.createElement("div", { className: "h-56 w-full" }, /* @__PURE__ */ React.createElement(ResponsiveContainer, { width: "100%", height: "100%" }, /* @__PURE__ */ React.createElement(AreaChart, { data: evidenceVolumeData, margin: { top: 10, right: 10, left: -20, bottom: 0 } }, /* @__PURE__ */ React.createElement(CartesianGrid, { strokeDasharray: "3 3", stroke: "#E2E8F0", opacity: 0.5 }), /* @__PURE__ */ React.createElement(XAxis, { dataKey: "day", tick: { fontSize: 10, fill: "#718096" } }), /* @__PURE__ */ React.createElement(YAxis, { tick: { fontSize: 10, fill: "#718096" } }), /* @__PURE__ */ React.createElement(
    Tooltip,
    {
      contentStyle: {
        backgroundColor: "#1A202C",
        border: "none",
        borderRadius: "4px",
        color: "#fff",
        fontSize: "11px",
        fontFamily: "JetBrains Mono"
      }
    }
  ), /* @__PURE__ */ React.createElement(Area, { type: "monotone", dataKey: "lpr", name: "LPR Hits", stroke: "#2B6CB0", fill: "#2B6CB0", fillOpacity: 0.2 }), /* @__PURE__ */ React.createElement(Area, { type: "monotone", dataKey: "cdr", name: "CDR Pings", stroke: "#DD6B20", fill: "#DD6B20", fillOpacity: 0.2 })))))));
};
export {
  DepartmentAnalyticsPage
};
