import React, { useState } from "react";
import {
  Clock,
  MapPin,
  Phone,
  Car,
  ShieldCheck,
  Activity
} from "lucide-react";
import { useNavigate } from "react-router-dom";
const TIMELINE_EVENTS = [
  { id: "ev-1", time: "14:32:09 UTC", date: "Today", entity: "Viktor Sokolov", location: "Pier 42 Dock", type: "CALL", description: "Outbound VoLTE Call (2m 14s) from Burner SIM #1 to Hawala Broker #4", evidenceRef: "FRE-902-14-WT-01" },
  { id: "ev-2", time: "14:28:44 UTC", date: "Today", entity: "Audi A8 [TRK-9902]", location: "Industrial Park Gate B", type: "SURVEILLANCE", description: "ALPR Optical Scan confirmed vehicle entering fenced logistics yard", evidenceRef: "ALPR-NY-9902" },
  { id: "ev-3", time: "14:15:20 UTC", date: "Today", entity: "Astraea Trading Corp", location: "Atlantic Ave Bank", type: "FINANCE", description: "FinCEN SAR: Cash withdrawal $9,800 structured immediately under reporting threshold", evidenceRef: "SAR-2026-9941" },
  { id: "ev-4", time: "13:58:11 UTC", date: "Today", entity: "Viktor Sokolov", location: "Cell Tower Sector 4", type: "SURVEILLANCE", description: "Handset registered on Pier 42 Sector B Antenna Azimuth 140\xB0", evidenceRef: "CDR-TOWER-42" },
  { id: "ev-5", time: "21:10:00 UTC", date: "Yesterday", entity: "Dmitri Volkov", location: "Safehouse 04", type: "MEETING", description: "Visual surveillance observed physical handoff of duffel bag with Mikhail Kozlov", evidenceRef: "SURV-LOG-04" }
];
const EventTimelinePage = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState(TIMELINE_EVENTS);
  const [selectedEvent, setSelectedEvent] = useState(events[0]);
  const [typeFilter, setTypeFilter] = useState("ALL");
  const filteredEvents = events.filter(
    (e) => typeFilter === "ALL" || e.type === typeFilter
  );
  return /* @__PURE__ */ React.createElement("div", { className: "space-y-6 max-w-7xl mx-auto font-sans pb-16" }, /* @__PURE__ */ React.createElement("div", { className: "bg-[#111f15] border border-[#1a3321] rounded-xl p-6 shadow-xl shadow-lime-950/40 relative overflow-hidden" }, /* @__PURE__ */ React.createElement("div", { className: "absolute top-0 right-0 w-96 h-48 bg-lime-500/5 rounded-full blur-3xl pointer-events-none" }), /* @__PURE__ */ React.createElement("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-5 relative z-10" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-lime-950/80 border border-lime-500/40 text-lime-400 font-mono text-[11px] uppercase tracking-wider mb-2" }, /* @__PURE__ */ React.createElement(Clock, { className: "w-3.5 h-3.5 text-lime-400" }), /* @__PURE__ */ React.createElement("span", null, "CROSS-ENTITY EVENT CHRONOLOGY \u2022 ACTIVE SURVEILLANCE")), /* @__PURE__ */ React.createElement("h1", { className: "text-2xl sm:text-3xl font-bold text-white tracking-tight" }, "Synchronized Event Timeline"), /* @__PURE__ */ React.createElement("p", { className: "text-xs sm:text-sm text-lime-200/70 mt-1 max-w-2xl leading-relaxed" }, "Multi-track chronological correlation across telephony intercepts, ALPR optical scans, and financial wire transactions.")), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-3 font-mono text-xs self-start sm:self-auto" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 text-lime-200/70" }, /* @__PURE__ */ React.createElement("span", null, "Filter:"), /* @__PURE__ */ React.createElement(
    "select",
    {
      value: typeFilter,
      onChange: (e) => setTypeFilter(e.target.value),
      className: "bg-[#0a120c] border border-[#1a3321] rounded-lg px-3 py-1.5 text-lime-300 font-semibold focus:outline-none focus:border-lime-500 transition-colors"
    },
    /* @__PURE__ */ React.createElement("option", { value: "ALL" }, "All Event Types"),
    /* @__PURE__ */ React.createElement("option", { value: "CALL" }, "Calls & SMS"),
    /* @__PURE__ */ React.createElement("option", { value: "FINANCE" }, "Financial Wires"),
    /* @__PURE__ */ React.createElement("option", { value: "SURVEILLANCE" }, "ALPR & Towers"),
    /* @__PURE__ */ React.createElement("option", { value: "MEETING" }, "Physical Meetings")
  ))))), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4 font-mono" }, /* @__PURE__ */ React.createElement("div", { className: "bg-[#111f15] border border-[#1a3321] rounded-xl p-4 shadow-lg shadow-lime-950/20" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between text-[11px] text-lime-400 font-semibold mb-1" }, /* @__PURE__ */ React.createElement("span", null, "SYNCHRONIZED EVENTS"), /* @__PURE__ */ React.createElement(Activity, { className: "w-3.5 h-3.5 text-lime-400" })), /* @__PURE__ */ React.createElement("div", { className: "text-2xl font-bold text-white tracking-tight" }, "28 Events"), /* @__PURE__ */ React.createElement("div", { className: "text-[10px] text-lime-200/50 mt-1" }, "72-hour correlation window")), /* @__PURE__ */ React.createElement("div", { className: "bg-[#111f15] border border-[#1a3321] rounded-xl p-4 shadow-lg shadow-lime-950/20" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between text-[11px] text-emerald-400 font-semibold mb-1" }, /* @__PURE__ */ React.createElement("span", null, "TELEPHONY BURSTS"), /* @__PURE__ */ React.createElement(Phone, { className: "w-3.5 h-3.5 text-emerald-400" })), /* @__PURE__ */ React.createElement("div", { className: "text-2xl font-bold text-white tracking-tight" }, "14 Intercepts"), /* @__PURE__ */ React.createElement("div", { className: "text-[10px] text-emerald-200/50 mt-1" }, "VoLTE & SMS telemetry")), /* @__PURE__ */ React.createElement("div", { className: "bg-[#111f15] border border-[#1a3321] rounded-xl p-4 shadow-lg shadow-lime-950/20" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between text-[11px] text-amber-400 font-semibold mb-1" }, /* @__PURE__ */ React.createElement("span", null, "OPTICAL ALPR HITS"), /* @__PURE__ */ React.createElement(Car, { className: "w-3.5 h-3.5 text-amber-400" })), /* @__PURE__ */ React.createElement("div", { className: "text-2xl font-bold text-white tracking-tight" }, "8 Scan Logs"), /* @__PURE__ */ React.createElement("div", { className: "text-[10px] text-amber-200/50 mt-1" }, "Plate TRK-9902 collocated")), /* @__PURE__ */ React.createElement("div", { className: "bg-[#111f15] border border-[#1a3321] rounded-xl p-4 shadow-lg shadow-lime-950/20" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between text-[11px] text-lime-400 font-semibold mb-1" }, /* @__PURE__ */ React.createElement("span", null, "EVIDENCE CUSTODY"), /* @__PURE__ */ React.createElement(ShieldCheck, { className: "w-3.5 h-3.5 text-lime-400" })), /* @__PURE__ */ React.createElement("div", { className: "text-2xl font-bold text-lime-400 tracking-tight" }, "100% Hash"), /* @__PURE__ */ React.createElement("div", { className: "text-[10px] text-lime-200/50 mt-1" }, "FRE 902(14) Certified"))), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6 font-mono text-xs" }, /* @__PURE__ */ React.createElement("div", { className: "lg:col-span-2 space-y-3" }, /* @__PURE__ */ React.createElement("div", { className: "relative border-l-2 border-lime-500/40 ml-4 pl-6 space-y-5" }, filteredEvents.map((evt) => {
    const isSelected = selectedEvent?.id === evt.id;
    return /* @__PURE__ */ React.createElement(
      "div",
      {
        key: evt.id,
        onClick: () => setSelectedEvent(evt),
        className: "relative group cursor-pointer"
      },
      /* @__PURE__ */ React.createElement(
        "span",
        {
          className: `absolute -left-[31px] top-2 w-4 h-4 rounded-full border-2 transition-all ${isSelected ? "bg-lime-400 border-white ring-4 ring-lime-400/40 shadow-lg shadow-lime-500/50" : "bg-[#0a120c] border-lime-600 group-hover:scale-125"}`
        }
      ),
      /* @__PURE__ */ React.createElement(
        "div",
        {
          className: `p-4 rounded-xl border transition-all ${isSelected ? "bg-[#172b1d] border-lime-500 shadow-xl shadow-lime-950/30 ring-1 ring-lime-500/50" : "bg-[#111f15] border-[#1a3321] hover:border-lime-500/30"}`
        },
        /* @__PURE__ */ React.createElement("div", { className: "flex flex-wrap items-center justify-between gap-2 mb-2" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React.createElement("span", { className: "text-lime-300 font-bold" }, evt.time), /* @__PURE__ */ React.createElement("span", { className: "text-[#1a3321]" }, "\u2022"), /* @__PURE__ */ React.createElement("span", { className: "text-lime-200/60 font-sans" }, evt.date)), /* @__PURE__ */ React.createElement(
          "span",
          {
            className: `px-2 py-0.5 rounded-full font-bold text-[10px] uppercase border ${evt.type === "CALL" ? "bg-emerald-950/80 text-emerald-300 border-emerald-500/40" : evt.type === "SURVEILLANCE" ? "bg-amber-950/80 text-amber-300 border-amber-500/40" : evt.type === "FINANCE" ? "bg-cyan-950/80 text-cyan-300 border-cyan-500/40" : "bg-rose-950/80 text-rose-300 border-rose-500/40"}`
          },
          "\u25CF ",
          evt.type
        )),
        /* @__PURE__ */ React.createElement("div", { className: "font-sans font-bold text-white text-sm mb-1" }, evt.entity),
        /* @__PURE__ */ React.createElement("p", { className: "text-lime-100/70 text-xs font-sans leading-relaxed mb-2" }, evt.description),
        /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between text-[11px] text-lime-200/50 pt-2 border-t border-[#1a3321]" }, /* @__PURE__ */ React.createElement("span", { className: "flex items-center gap-1" }, /* @__PURE__ */ React.createElement(MapPin, { className: "w-3 h-3 text-lime-400" }), /* @__PURE__ */ React.createElement("span", null, evt.location)), /* @__PURE__ */ React.createElement("span", { className: "text-lime-400 font-bold" }, evt.evidenceRef))
      )
    );
  }))), /* @__PURE__ */ React.createElement("div", null, selectedEvent && /* @__PURE__ */ React.createElement("div", { className: "bg-[#111f15] border border-lime-500/40 rounded-xl p-5 shadow-xl shadow-lime-950/20 space-y-4 sticky top-6" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between border-b border-[#1a3321] pb-3" }, /* @__PURE__ */ React.createElement("span", { className: "text-[10px] uppercase font-bold text-lime-400 tracking-wider" }, "Event Telemetry Dossier"), /* @__PURE__ */ React.createElement("span", { className: "text-lime-200/50 text-[10px]" }, selectedEvent.time)), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", { className: "px-2.5 py-0.5 rounded-full bg-lime-950/80 text-lime-300 border border-lime-500/40 text-[10px] font-bold uppercase" }, "\u25CF ", selectedEvent.type, " EVENT"), /* @__PURE__ */ React.createElement("h3", { className: "text-base font-bold text-white font-sans mt-2" }, selectedEvent.entity), /* @__PURE__ */ React.createElement("div", { className: "text-lime-200/60 text-xs mt-0.5" }, selectedEvent.location)), /* @__PURE__ */ React.createElement("div", { className: "p-3.5 rounded-xl bg-[#0a120c] border border-[#1a3321] space-y-2" }, /* @__PURE__ */ React.createElement("div", { className: "text-[10px] font-bold text-lime-400 uppercase tracking-wider" }, "Corroborating Evidence"), /* @__PURE__ */ React.createElement("div", { className: "text-xs text-lime-100/80 font-sans" }, selectedEvent.description), /* @__PURE__ */ React.createElement("div", { className: "text-[10px] text-lime-300 font-mono pt-1 border-t border-[#1a3321]" }, "Artifact Hash ID: ", selectedEvent.evidenceRef)), /* @__PURE__ */ React.createElement("div", { className: "space-y-2 pt-2" }, /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => navigate("/geo-temporal"),
      className: "w-full py-2 rounded-lg bg-lime-600 hover:bg-lime-500 text-black font-bold text-center transition-all shadow-md"
    },
    "Locate on Vector Map"
  ), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => navigate("/entities/poi-1"),
      className: "w-full py-2 rounded-lg bg-[#0a120c] hover:bg-[#172b1d] border border-[#1a3321] text-lime-300 font-semibold text-center transition-colors"
    },
    "View Entity Profile"
  ))))));
};
var stdin_default = EventTimelinePage;
export {
  EventTimelinePage,
  stdin_default as default
};
