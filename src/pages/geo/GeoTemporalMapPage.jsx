import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MapPin,
  Clock,
  Filter,
  Play,
  Pause,
  RotateCcw,
  Phone,
  DollarSign,
  Briefcase,
  Users,
  Calendar
} from "lucide-react";
const GEO_MARKERS = [
  {
    id: "m-1",
    name: "Pier 42 Maritime Dock",
    type: "LOCATION",
    x: 480,
    y: 280,
    time: "14:30 UTC",
    hour: 14,
    isRepeatedLocation: true,
    isActivityHotspot: true,
    linkedEntities: ["Raj Mehta", "Vikramaditya Singhania", "Audi A8 [MH-01-EA-9902]"],
    description: "High-density repeated meeting locus. 7 verified co-locations within 30-day window.",
    status: "SUSPICIOUS"
  },
  {
    id: "m-2",
    name: "JNPT Port Toll Plaza ALPR",
    type: "LOCATION",
    x: 340,
    y: 210,
    time: "14:15 UTC",
    hour: 14,
    isRepeatedLocation: false,
    isActivityHotspot: false,
    linkedEntities: ["Audi A8 [MH-01-EA-9902]", "Kabir Khan"],
    description: "Automated License Plate Reader camera scanned vehicle en route to dock.",
    status: "VERIFIED"
  },
  {
    id: "m-3",
    name: "Safehouse 04 (Worli Unit)",
    type: "LOCATION",
    x: 180,
    y: 350,
    time: "09:00 UTC",
    hour: 9,
    isRepeatedLocation: true,
    isActivityHotspot: false,
    linkedEntities: ["Raj Mehta", "Kabir Khan"],
    description: "Pre-meeting staging apartment. Intercepted cell tower azimuth ping.",
    status: "REVIEW_REQUIRED"
  },
  {
    id: "m-4",
    name: "BlueStar Logistics HQ (Nariman Point)",
    type: "ORGANIZATION",
    x: 230,
    y: 420,
    time: "11:30 UTC",
    hour: 11,
    isRepeatedLocation: false,
    isActivityHotspot: false,
    linkedEntities: ["Maya Patel", "BlueStar Logistics"],
    description: "Registered corporate office of freight forwarding shell entity.",
    status: "SUSPICIOUS"
  },
  {
    id: "m-5",
    name: "Mid-Harbour Vessel Rendezvous",
    type: "EVENT",
    x: 560,
    y: 380,
    time: "16:00 UTC",
    hour: 16,
    isRepeatedLocation: false,
    isActivityHotspot: true,
    linkedEntities: ["Raj Mehta", "Offshore Feeder Vessel"],
    description: "Radar track convergence between target launch and container carrier.",
    status: "SUSPICIOUS"
  },
  {
    id: "m-6",
    name: "Raj Mehta (Cell Tower Azimuth Ping)",
    type: "PERSON",
    x: 440,
    y: 260,
    time: "14:22 UTC",
    hour: 14,
    isRepeatedLocation: false,
    isActivityHotspot: false,
    linkedEntities: ["+91 98201 44921 (Burner)"],
    description: "VoLTE RF handoff recorded at Cell Sector 09 during telephone burst.",
    status: "SUSPICIOUS"
  }
];
const TIMELINE_EVENTS = [
  {
    id: "tl-1",
    time: "09:15 UTC",
    hour: 9,
    type: "LOCATION_APPEARANCE",
    title: "Location Appearance: Worli Safehouse Staging",
    description: "Cell tower ping corroborates burner handset active at Worli residential sector.",
    entity: "Raj Mehta",
    location: "Safehouse 04 (Worli Unit)",
    markerId: "m-3",
    status: "REVIEW_REQUIRED"
  },
  {
    id: "tl-2",
    time: "11:45 UTC",
    hour: 11,
    type: "TRANSACTION",
    title: "Transaction: $142,000 Hawala Escrow Wire",
    description: "NEFT remittance executed from Astraea Trading account to BlueStar Logistics escrow.",
    entity: "Maya Patel / BlueStar Logistics",
    location: "Nariman Point Financial Hub",
    markerId: "m-4",
    status: "SUSPICIOUS"
  },
  {
    id: "tl-3",
    time: "13:50 UTC",
    hour: 13,
    type: "CASE_EVENT",
    title: "Case Event: Section 91 Judicial Warrant Issued",
    description: "Court order served on telecom carrier for live packet tracing on IMEI #86129480112948.",
    entity: "Special Task Force",
    location: "Sessions Court Vault",
    status: "VERIFIED"
  },
  {
    id: "tl-4",
    time: "14:15 UTC",
    hour: 14,
    type: "LOCATION_APPEARANCE",
    title: "Location Appearance: Audi A8 Scanned at Port Toll",
    description: "ALPR optical camera match 98.2% on Black Audi A8 [MH-01-EA-9902] heading east.",
    entity: "Audi A8 [MH-01-EA-9902]",
    location: "JNPT Port Toll Plaza ALPR",
    markerId: "m-2",
    status: "VERIFIED"
  },
  {
    id: "tl-5",
    time: "14:22 UTC",
    hour: 14,
    type: "COMMUNICATION",
    title: "Communication Event: Encrypted VoLTE Burst",
    description: "14-second encrypted call from Raj Mehta burner to Vikramaditya Singhania.",
    entity: "Raj Mehta \u2194 Singhania",
    location: "Cell Tower Sector 4 (Azimuth 120\xB0)",
    markerId: "m-6",
    status: "SUSPICIOUS"
  },
  {
    id: "tl-6",
    time: "14:30 UTC",
    hour: 14,
    type: "MEETING",
    title: "Meeting: Co-Location Rendezvous at Pier 42",
    description: "Target vehicle and two persons of interest observed converging at maritime gate.",
    entity: "Raj Mehta & Singhania",
    location: "Pier 42 Maritime Dock",
    markerId: "m-1",
    status: "SUSPICIOUS"
  },
  {
    id: "tl-7",
    time: "16:00 UTC",
    hour: 16,
    type: "MEETING",
    title: "Meeting: Mid-Harbour Cargo Transfer",
    description: "Visual surveillance confirms briefcase transfer between launch and vessel escort.",
    entity: "Raj Mehta & Foreign Feeder Crew",
    location: "Mid-Harbour Maritime Anchor",
    markerId: "m-5",
    status: "SUSPICIOUS"
  }
];
const GeoTemporalMapPage = () => {
  const navigate = useNavigate();
  const [dateRangeFilter, setDateRangeFilter] = useState("Last 7 Days");
  const [entityFilter, setEntityFilter] = useState("ALL");
  const [locationFilter, setLocationFilter] = useState("ALL");
  const [eventTypeFilter, setEventTypeFilter] = useState("ALL");
  const [caseFilter] = useState("CASE #IT-2024-884");
  const [selectedMarker, setSelectedMarker] = useState(GEO_MARKERS[0]);
  const [selectedEventId, setSelectedEventId] = useState("tl-6");
  const [scrubberHour, setScrubberHour] = useState(14);
  const [isPlaying, setIsPlaying] = useState(false);
  React.useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setScrubberHour((prev) => prev >= 20 ? 8 : prev + 1);
      }, 1500);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);
  const getMarkerColor = (type) => {
    switch (type) {
      case "PERSON":
        return "#2563EB";
      // Blue
      case "LOCATION":
        return "#F59E0B";
      // Amber
      case "EVENT":
        return "#EF4444";
      // Red
      case "ORGANIZATION":
        return "#8B5CF6";
      // Purple
      default:
        return "#06B6D4";
    }
  };
  const getEventIcon = (type) => {
    switch (type) {
      case "COMMUNICATION":
        return /* @__PURE__ */ React.createElement(Phone, { className: "w-4 h-4 text-[#06B6D4]" });
      case "TRANSACTION":
        return /* @__PURE__ */ React.createElement(DollarSign, { className: "w-4 h-4 text-[#10B981]" });
      case "MEETING":
        return /* @__PURE__ */ React.createElement(Users, { className: "w-4 h-4 text-[#F59E0B]" });
      case "LOCATION_APPEARANCE":
        return /* @__PURE__ */ React.createElement(MapPin, { className: "w-4 h-4 text-[#2563EB]" });
      case "CASE_EVENT":
        return /* @__PURE__ */ React.createElement(Briefcase, { className: "w-4 h-4 text-[#EF4444]" });
      default:
        return /* @__PURE__ */ React.createElement(Calendar, { className: "w-4 h-4" });
    }
  };
  const filteredEvents = TIMELINE_EVENTS.filter((ev) => {
    const matchesEntity = entityFilter === "ALL" || ev.entity.includes(entityFilter);
    const matchesLocation = locationFilter === "ALL" || ev.location.includes(locationFilter);
    const matchesType = eventTypeFilter === "ALL" || ev.type === eventTypeFilter;
    return matchesEntity && matchesLocation && matchesType;
  });
  return /* @__PURE__ */ React.createElement("div", { className: "h-[calc(100vh-5rem)] flex flex-col font-sans select-none overflow-hidden -m-4 lg:-m-6" }, /* @__PURE__ */ React.createElement("div", { className: "bg-[#07111F] border-b border-[#263B55] px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 z-20 font-mono text-xs" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 text-white font-bold uppercase tracking-wider" }, /* @__PURE__ */ React.createElement(MapPin, { className: "w-4 h-4 text-[#06B6D4]" }), /* @__PURE__ */ React.createElement("span", null, "Geo-Temporal Pattern Intelligence")), /* @__PURE__ */ React.createElement("div", { className: "flex flex-wrap items-center gap-2" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-1 bg-[#0D1B2A] border border-[#263B55] rounded-lg px-2.5 py-1" }, /* @__PURE__ */ React.createElement(Calendar, { className: "w-3.5 h-3.5 text-[#94A3B8]" }), /* @__PURE__ */ React.createElement(
    "select",
    {
      value: dateRangeFilter,
      onChange: (e) => setDateRangeFilter(e.target.value),
      className: "bg-transparent text-white text-[11px] focus:outline-hidden cursor-pointer"
    },
    /* @__PURE__ */ React.createElement("option", { value: "Today", className: "bg-[#0D1B2A]" }, "Today (Live Track)"),
    /* @__PURE__ */ React.createElement("option", { value: "Last 7 Days", className: "bg-[#0D1B2A]" }, "Last 7 Days"),
    /* @__PURE__ */ React.createElement("option", { value: "Last 30 Days", className: "bg-[#0D1B2A]" }, "Last 30 Days"),
    /* @__PURE__ */ React.createElement("option", { value: "Full Docket", className: "bg-[#0D1B2A]" }, "Full Docket History")
  )), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-1 bg-[#0D1B2A] border border-[#263B55] rounded-lg px-2.5 py-1" }, /* @__PURE__ */ React.createElement(Users, { className: "w-3.5 h-3.5 text-[#94A3B8]" }), /* @__PURE__ */ React.createElement(
    "select",
    {
      value: entityFilter,
      onChange: (e) => setEntityFilter(e.target.value),
      className: "bg-transparent text-white text-[11px] focus:outline-hidden cursor-pointer"
    },
    /* @__PURE__ */ React.createElement("option", { value: "ALL", className: "bg-[#0D1B2A]" }, "All Entities"),
    /* @__PURE__ */ React.createElement("option", { value: "Raj Mehta", className: "bg-[#0D1B2A]" }, "Raj Mehta (POI-1)"),
    /* @__PURE__ */ React.createElement("option", { value: "Singhania", className: "bg-[#0D1B2A]" }, "Singhania (POI-2)"),
    /* @__PURE__ */ React.createElement("option", { value: "Audi A8", className: "bg-[#0D1B2A]" }, "Audi A8 [MH-01-EA-9902]")
  )), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-1 bg-[#0D1B2A] border border-[#263B55] rounded-lg px-2.5 py-1" }, /* @__PURE__ */ React.createElement(Filter, { className: "w-3.5 h-3.5 text-[#94A3B8]" }), /* @__PURE__ */ React.createElement(
    "select",
    {
      value: eventTypeFilter,
      onChange: (e) => setEventTypeFilter(e.target.value),
      className: "bg-transparent text-white text-[11px] focus:outline-hidden cursor-pointer"
    },
    /* @__PURE__ */ React.createElement("option", { value: "ALL", className: "bg-[#0D1B2A]" }, "All Event Types"),
    /* @__PURE__ */ React.createElement("option", { value: "COMMUNICATION", className: "bg-[#0D1B2A]" }, "Communication Events"),
    /* @__PURE__ */ React.createElement("option", { value: "TRANSACTION", className: "bg-[#0D1B2A]" }, "Financial Transactions"),
    /* @__PURE__ */ React.createElement("option", { value: "MEETING", className: "bg-[#0D1B2A]" }, "Physical Meetings"),
    /* @__PURE__ */ React.createElement("option", { value: "LOCATION_APPEARANCE", className: "bg-[#0D1B2A]" }, "Location Appearances"),
    /* @__PURE__ */ React.createElement("option", { value: "CASE_EVENT", className: "bg-[#0D1B2A]" }, "Case Events")
  )), /* @__PURE__ */ React.createElement("span", { className: "hidden xl:inline text-[11px] text-[#94A3B8] px-2 py-1 rounded bg-[#0D1B2A] border border-[#263B55]" }, "Docket: ", /* @__PURE__ */ React.createElement("strong", { className: "text-white" }, caseFilter)))), /* @__PURE__ */ React.createElement("div", { className: "flex-1 flex flex-col lg:flex-row overflow-hidden relative" }, /* @__PURE__ */ React.createElement("div", { className: "flex-1 flex flex-col h-full bg-[#07111F] relative overflow-hidden" }, /* @__PURE__ */ React.createElement("div", { className: "flex-1 relative overflow-hidden" }, /* @__PURE__ */ React.createElement("svg", { className: "w-full h-full", style: { backgroundColor: "#07111F" } }, /* @__PURE__ */ React.createElement("defs", null, /* @__PURE__ */ React.createElement("pattern", { id: "tacticalGrid", width: "50", height: "50", patternUnits: "userSpaceOnUse" }, /* @__PURE__ */ React.createElement("path", { d: "M 50 0 L 0 0 0 50", fill: "none", stroke: "#263B55", strokeWidth: "0.5", strokeOpacity: "0.5" }), /* @__PURE__ */ React.createElement("circle", { cx: "50", cy: "50", r: "1", fill: "#263B55" })), /* @__PURE__ */ React.createElement("radialGradient", { id: "hotspotHeat", cx: "50%", cy: "50%", r: "50%" }, /* @__PURE__ */ React.createElement("stop", { offset: "0%", stopColor: "#EF4444", stopOpacity: "0.4" }), /* @__PURE__ */ React.createElement("stop", { offset: "60%", stopColor: "#F59E0B", stopOpacity: "0.2" }), /* @__PURE__ */ React.createElement("stop", { offset: "100%", stopColor: "#07111F", stopOpacity: "0" }))), /* @__PURE__ */ React.createElement("rect", { width: "100%", height: "100%", fill: "url(#tacticalGrid)" }), /* @__PURE__ */ React.createElement(
    "path",
    {
      d: "M 50 150 Q 200 200, 320 180 T 520 280 T 700 320",
      fill: "none",
      stroke: "#12243A",
      strokeWidth: "24",
      strokeLinecap: "round",
      opacity: "0.8"
    }
  ), /* @__PURE__ */ React.createElement(
    "path",
    {
      d: "M 120 380 Q 250 320, 340 210 Q 420 250, 480 280",
      fill: "none",
      stroke: "#2563EB",
      strokeWidth: "2",
      strokeDasharray: "6 4",
      opacity: "0.7"
    }
  ), /* @__PURE__ */ React.createElement("g", { transform: "translate(480, 280)" }, /* @__PURE__ */ React.createElement("circle", { r: "70", fill: "url(#hotspotHeat)", className: "animate-pulse" }), /* @__PURE__ */ React.createElement("circle", { r: "50", fill: "none", stroke: "#EF4444", strokeWidth: "1", strokeDasharray: "4 2", opacity: "0.6" }), /* @__PURE__ */ React.createElement("circle", { r: "30", fill: "none", stroke: "#F59E0B", strokeWidth: "1", opacity: "0.8" })), /* @__PURE__ */ React.createElement("g", null, /* @__PURE__ */ React.createElement("text", { x: "210", y: "270", fill: "#06B6D4", fontSize: "9", fontFamily: "monospace", fontWeight: "bold" }, "\u25CF LINKED ENTITIES TRANSIT ROUTE (Audi A8)")), GEO_MARKERS.map((marker) => {
    const isSelected = selectedMarker?.id === marker.id;
    const markerColor = getMarkerColor(marker.type);
    return /* @__PURE__ */ React.createElement(
      "g",
      {
        key: marker.id,
        transform: `translate(${marker.x}, ${marker.y})`,
        className: "cursor-pointer group",
        onClick: () => {
          setSelectedMarker(marker);
          const relatedEvent = TIMELINE_EVENTS.find((e) => e.markerId === marker.id);
          if (relatedEvent) setSelectedEventId(relatedEvent.id);
        }
      },
      isSelected && /* @__PURE__ */ React.createElement(
        "circle",
        {
          r: "24",
          fill: "none",
          stroke: markerColor,
          strokeWidth: "1.5",
          strokeDasharray: "4 2",
          className: "animate-spin",
          style: { animationDuration: "6s" }
        }
      ),
      /* @__PURE__ */ React.createElement(
        "circle",
        {
          r: "14",
          fill: "#0D1B2A",
          stroke: markerColor,
          strokeWidth: isSelected ? 2.5 : 1.5,
          className: "shadow-xl"
        }
      ),
      /* @__PURE__ */ React.createElement("circle", { r: "6", fill: markerColor }),
      /* @__PURE__ */ React.createElement(
        "text",
        {
          textAnchor: "middle",
          y: "-18",
          fill: "#FFFFFF",
          fontSize: "9",
          fontFamily: "Inter, sans-serif",
          fontWeight: "bold",
          className: "drop-shadow-md select-none"
        },
        marker.name
      ),
      marker.isRepeatedLocation && /* @__PURE__ */ React.createElement("g", { transform: "translate(14, -10)" }, /* @__PURE__ */ React.createElement("rect", { x: "0", y: "0", width: "82", height: "13", rx: "3", fill: "#F59E0B", fillOpacity: "0.2", stroke: "#F59E0B", strokeWidth: "0.8" }), /* @__PURE__ */ React.createElement("text", { x: "4", y: "9", fill: "#F59E0B", fontSize: "7", fontFamily: "monospace", fontWeight: "bold" }, "REPEATED LOCATION")),
      marker.isActivityHotspot && /* @__PURE__ */ React.createElement("g", { transform: "translate(14, 4)" }, /* @__PURE__ */ React.createElement("rect", { x: "0", y: "0", width: "80", height: "13", rx: "3", fill: "#EF4444", fillOpacity: "0.2", stroke: "#EF4444", strokeWidth: "0.8" }), /* @__PURE__ */ React.createElement("text", { x: "4", y: "9", fill: "#EF4444", fontSize: "7", fontFamily: "monospace", fontWeight: "bold" }, "ACTIVITY HOTSPOT"))
    );
  })), /* @__PURE__ */ React.createElement("div", { className: "absolute top-4 left-4 p-3 rounded-xl bg-[#0D1B2A]/95 border border-[#263B55] shadow-2xl backdrop-blur-md z-10 text-xs font-mono" }, /* @__PURE__ */ React.createElement("div", { className: "text-[10px] uppercase font-bold text-white tracking-wider mb-2" }, "MAP MARKERS & PATTERNS"), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-2 gap-x-3 gap-y-1 text-[10px]" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-1.5 text-slate-300" }, /* @__PURE__ */ React.createElement("span", { className: "w-2.5 h-2.5 rounded-full bg-[#2563EB]" }), /* @__PURE__ */ React.createElement("span", null, "Person")), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-1.5 text-slate-300" }, /* @__PURE__ */ React.createElement("span", { className: "w-2.5 h-2.5 rounded-full bg-[#F59E0B]" }), /* @__PURE__ */ React.createElement("span", null, "Location")), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-1.5 text-slate-300" }, /* @__PURE__ */ React.createElement("span", { className: "w-2.5 h-2.5 rounded-full bg-[#EF4444]" }), /* @__PURE__ */ React.createElement("span", null, "Event")), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-1.5 text-slate-300" }, /* @__PURE__ */ React.createElement("span", { className: "w-2.5 h-2.5 rounded-full bg-[#8B5CF6]" }), /* @__PURE__ */ React.createElement("span", null, "Organization"))), /* @__PURE__ */ React.createElement("div", { className: "mt-2 pt-2 border-t border-[#263B55] space-y-1 text-[9px] text-[#94A3B8]" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-1.5 text-[#F59E0B]" }, /* @__PURE__ */ React.createElement("span", { className: "w-2 h-2 rounded-xs border border-[#F59E0B]" }), /* @__PURE__ */ React.createElement("span", null, "Repeated Location (Visited > 3x)")), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-1.5 text-[#EF4444]" }, /* @__PURE__ */ React.createElement("span", { className: "w-2 h-2 rounded-xs border border-[#EF4444]" }), /* @__PURE__ */ React.createElement("span", null, "Activity Hotspot (Convergence)")))), selectedMarker && /* @__PURE__ */ React.createElement("div", { className: "absolute bottom-20 left-4 right-4 sm:right-auto sm:w-96 p-3.5 rounded-xl bg-[#0D1B2A]/95 border border-[#263B55] shadow-2xl backdrop-blur-md z-10 text-xs font-mono space-y-2" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between" }, /* @__PURE__ */ React.createElement("span", { className: "text-[10px] uppercase text-[#06B6D4] font-bold" }, "SELECTED GEO-LOCUS"), /* @__PURE__ */ React.createElement("span", { className: "text-[10px] text-[#94A3B8]" }, selectedMarker.time)), /* @__PURE__ */ React.createElement("div", { className: "text-white font-bold text-sm" }, selectedMarker.name), /* @__PURE__ */ React.createElement("div", { className: "text-[11px] text-[#94A3B8] leading-relaxed" }, selectedMarker.description), /* @__PURE__ */ React.createElement("div", { className: "pt-1 text-[10px] text-slate-300" }, /* @__PURE__ */ React.createElement("span", { className: "text-[#94A3B8]" }, "Linked Entities: "), /* @__PURE__ */ React.createElement("span", { className: "text-cyan-300 font-semibold" }, selectedMarker.linkedEntities.join(", "))))), /* @__PURE__ */ React.createElement("div", { className: "h-16 bg-[#07111F] border-t border-[#263B55] px-4 flex items-center justify-between gap-4 font-mono text-xs z-10" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => setIsPlaying(!isPlaying),
      className: `p-2 rounded-lg font-bold transition-colors flex items-center gap-1.5 cursor-pointer ${isPlaying ? "bg-amber-500/20 text-[#F59E0B] border border-amber-500/30" : "bg-[#2563EB] text-white hover:bg-blue-600"}`
    },
    isPlaying ? /* @__PURE__ */ React.createElement(Pause, { className: "w-4 h-4" }) : /* @__PURE__ */ React.createElement(Play, { className: "w-4 h-4" }),
    /* @__PURE__ */ React.createElement("span", { className: "hidden sm:inline" }, isPlaying ? "Pause" : "Play")
  ), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => {
        setIsPlaying(false);
        setScrubberHour(8);
      },
      className: "p-2 rounded-lg bg-[#0D1B2A] border border-[#263B55] text-[#94A3B8] hover:text-white",
      title: "Reset Time"
    },
    /* @__PURE__ */ React.createElement(RotateCcw, { className: "w-3.5 h-3.5" })
  )), /* @__PURE__ */ React.createElement("div", { className: "flex-1 flex items-center gap-3" }, /* @__PURE__ */ React.createElement("span", { className: "text-[10px] text-[#94A3B8] hidden sm:inline" }, "08:00 UTC"), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "range",
      min: "8",
      max: "20",
      value: scrubberHour,
      onChange: (e) => setScrubberHour(Number(e.target.value)),
      className: "w-full accent-[#2563EB] cursor-pointer"
    }
  ), /* @__PURE__ */ React.createElement("span", { className: "text-[10px] text-[#94A3B8] hidden sm:inline" }, "20:00 UTC")), /* @__PURE__ */ React.createElement("div", { className: "px-3 py-1.5 rounded-lg bg-[#0D1B2A] border border-[#263B55] text-white font-bold text-xs shrink-0" }, scrubberHour.toString().padStart(2, "0"), ":00 UTC"))), /* @__PURE__ */ React.createElement("aside", { className: "w-full lg:w-96 bg-[#0D1B2A] border-t lg:border-t-0 lg:border-l border-[#263B55] flex flex-col z-20 shadow-2xl h-80 lg:h-full font-sans" }, /* @__PURE__ */ React.createElement("div", { className: "p-4 bg-[#07111F] border-b border-[#263B55] flex items-center justify-between" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React.createElement(Clock, { className: "w-4 h-4 text-[#06B6D4]" }), /* @__PURE__ */ React.createElement("h3", { className: "font-bold text-white text-sm tracking-tight font-mono uppercase" }, "Activity Timeline")), /* @__PURE__ */ React.createElement("span", { className: "text-[10px] font-mono px-2 py-0.5 rounded bg-[#101F33] text-cyan-300 border border-[#263B55]" }, filteredEvents.length, " Events Logged")), /* @__PURE__ */ React.createElement("div", { className: "flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar text-xs font-mono" }, filteredEvents.map((evt) => {
    const isSelected = selectedEventId === evt.id;
    return /* @__PURE__ */ React.createElement(
      "div",
      {
        key: evt.id,
        onClick: () => {
          setSelectedEventId(evt.id);
          if (evt.markerId) {
            const m = GEO_MARKERS.find((mark) => mark.id === evt.markerId);
            if (m) setSelectedMarker(m);
          }
        },
        className: `p-3 rounded-xl border transition-all cursor-pointer space-y-1.5 ${isSelected ? "bg-[#101F33] border-[#2563EB] shadow-lg" : "bg-[#07111F] border-[#263B55] hover:border-slate-400"}`
      },
      /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between text-[10px]" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-1.5" }, getEventIcon(evt.type), /* @__PURE__ */ React.createElement("span", { className: "text-white font-bold" }, evt.time)), /* @__PURE__ */ React.createElement(
        "span",
        {
          className: `px-1.5 py-0.2 rounded font-bold ${evt.status === "VERIFIED" ? "bg-emerald-500/20 text-[#10B981] border border-emerald-500/30" : evt.status === "SUSPICIOUS" ? "bg-red-500/20 text-[#EF4444] border border-red-500/30" : "bg-amber-500/20 text-[#F59E0B] border border-amber-500/30"}`
        },
        evt.status
      )),
      /* @__PURE__ */ React.createElement("div", { className: "text-white font-semibold text-[11px]" }, evt.title),
      /* @__PURE__ */ React.createElement("div", { className: "text-[10px] text-[#94A3B8] leading-relaxed" }, evt.description),
      /* @__PURE__ */ React.createElement("div", { className: "pt-1 flex items-center justify-between text-[9px] text-slate-400 border-t border-[#263B55]/50" }, /* @__PURE__ */ React.createElement("span", { className: "truncate" }, "Entity: ", /* @__PURE__ */ React.createElement("strong", { className: "text-slate-200" }, evt.entity)), /* @__PURE__ */ React.createElement("span", { className: "truncate text-cyan-400" }, evt.location))
    );
  })), /* @__PURE__ */ React.createElement("div", { className: "p-3 bg-[#07111F] border-t border-[#263B55] flex justify-between items-center text-xs font-mono" }, /* @__PURE__ */ React.createElement("span", { className: "text-[10px] text-[#94A3B8]" }, "GPS & CDR Triangulation Validated"), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => navigate("/evidence"),
      className: "text-[#06B6D4] hover:underline font-semibold"
    },
    "Examine Raw Packets \u2192"
  )))));
};
var stdin_default = GeoTemporalMapPage;
export {
  GeoTemporalMapPage,
  stdin_default as default
};
