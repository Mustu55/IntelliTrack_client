import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
const ROUTE_LABELS = {
  dashboard: "Investigative Cockpit",
  data: "Data Integration",
  sources: "Connected Feeds",
  "extraction-jobs": "Extraction Jobs",
  schema: "Investigation Schema",
  entities: "Entities Registry",
  "entity-resolution": "Entity Resolution Workbench",
  network: "Criminal Network Graph",
  geo: "Geo-Temporal Surveillance",
  timeline: "Event Chronology",
  patterns: "Spatio-Temporal Patterns",
  leads: "Explainable AI Leads",
  intelligence: "Intelligence Synthesis",
  summary: "Dossier Executive Summary",
  cases: "Case Management",
  settings: "System Administration",
  general: "General Preferences",
  integrations: "Feed Integrations",
  users: "Personnel & Access"
};
const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);
  if (pathnames.length === 0) return null;
  return /* @__PURE__ */ React.createElement("nav", { className: "flex items-center text-[11px] font-mono tracking-wider text-slate-400 py-1.5 px-4 bg-navy-950/70 border-b border-navy-800 backdrop-blur" }, /* @__PURE__ */ React.createElement(
    Link,
    {
      to: "/dashboard",
      className: "flex items-center gap-1.5 text-steel-400 hover:text-steel-300 transition-colors"
    },
    /* @__PURE__ */ React.createElement(Home, { className: "w-3.5 h-3.5 text-steel-500" }),
    /* @__PURE__ */ React.createElement("span", { className: "uppercase font-semibold" }, "INTELLITRACK")
  ), pathnames.map((value, index) => {
    const to = `/${pathnames.slice(0, index + 1).join("/")}`;
    const isLast = index === pathnames.length - 1;
    const label = ROUTE_LABELS[value] || value.toUpperCase();
    return /* @__PURE__ */ React.createElement(React.Fragment, { key: to }, /* @__PURE__ */ React.createElement(ChevronRight, { className: "w-3.5 h-3.5 text-navy-500 mx-1.5 shrink-0" }), isLast ? /* @__PURE__ */ React.createElement("span", { className: "text-steel-300 font-semibold uppercase" }, label) : /* @__PURE__ */ React.createElement(Link, { to, className: "text-slate-400 hover:text-slate-200 uppercase transition-colors" }, label));
  }));
};
export {
  Breadcrumbs
};
