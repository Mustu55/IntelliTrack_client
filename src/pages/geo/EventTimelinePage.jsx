import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MapPin,
  FileText,
  Phone,
  Truck,
  Users,
  Calendar,
  Download,
  ChevronDown,
  Filter
} from "lucide-react";
import Button from "../../components/ui/Button";

const TIMELINE_EVENTS = [
  {
    id: "ev-1",
    time: "Nov 24 · 02:14 · Access",
    title: "Night access — Pier 41, Unit 9",
    subtitle: "A. Kovacs · Box truck 7XQ-4419",
    tag: "Gate log EV-5521 · Verified",
    tagStatus: "verified",
    icon: MapPin,
    category: "ACCESS",
    caseId: "CS-2418"
  },
  {
    id: "ev-2",
    time: "Nov 21 · 16:40 · Financial",
    title: "Invoice batch #4471 flagged duplicate",
    subtitle: "Meridian Holdings LLC",
    tag: "Records EV-5498 · Pending",
    tagStatus: "pending",
    icon: FileText,
    category: "FINANCIAL",
    caseId: "CS-2418"
  },
  {
    id: "ev-3",
    time: "Nov 18 · 09:05 · Communication",
    title: "Call cluster: Kovacs ↔ Thorne (14 calls)",
    subtitle: "+1 (415) 555-0132",
    tag: "Request EV-5470 · Verified",
    tagStatus: "verified",
    icon: Phone,
    category: "COMMUNICATION",
    caseId: "CS-2418"
  },
  {
    id: "ev-4",
    time: "Nov 15 · 21:30 · Movement",
    title: "Vehicle sighting — Harborview Depot",
    subtitle: "Box truck 7XQ-4419",
    tag: "Field note EV-5455 · Verified",
    tagStatus: "verified",
    icon: Truck,
    category: "MOVEMENT",
    caseId: "CS-2418"
  },
  {
    id: "ev-5",
    time: "Nov 12 · 11:00 · Association",
    title: "Lease co-signed — Northgate Unit 4",
    subtitle: "J. Thorne · Northgate LLC",
    tag: "Document EV-5441 · Verified",
    tagStatus: "verified",
    icon: Users,
    category: "ASSOCIATION",
    caseId: "CS-2418"
  }
];

export const EventTimelinePage = () => {
  const navigate = useNavigate();
  const [caseFilter, setCaseFilter] = useState("CS-2418");
  const [entityFilter, setEntityFilter] = useState("ALL");
  const [eventTypeFilter, setEventTypeFilter] = useState("ALL");
  const [dateFilter, setDateFilter] = useState("Oct — Nov 2026");

  const filteredEvents = TIMELINE_EVENTS.filter((e) => {
    const matchCase = caseFilter === "ALL" || e.caseId === caseFilter;
    const matchType = eventTypeFilter === "ALL" || e.category === eventTypeFilter;
    return matchCase && matchType;
  });

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-medium text-white tracking-tight">Investigation Timeline</h1>
          <p className="text-xs text-[#8d98a5] mt-0.5">
            CS-2418 · 47 events · Oct — Nov 2026
          </p>
        </div>
      </div>

      {/* Filter Bar matching InspireUI */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <select
              value={caseFilter}
              onChange={(e) => setCaseFilter(e.target.value)}
              className="bg-[#14171c] border border-[#222731] text-xs text-[#d1d7df] rounded px-3 py-1.5 pr-8 appearance-none focus:outline-none focus:border-[#9cae9b] transition-colors cursor-pointer"
            >
              <option value="CS-2418">Case: CS-2418</option>
              <option value="CS-2419">Case: CS-2419</option>
              <option value="ALL">All Cases</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-[#6c7682] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          <div className="relative">
            <select
              value={entityFilter}
              onChange={(e) => setEntityFilter(e.target.value)}
              className="bg-[#14171c] border border-[#222731] text-xs text-[#d1d7df] rounded px-3 py-1.5 pr-8 appearance-none focus:outline-none focus:border-[#9cae9b] transition-colors cursor-pointer"
            >
              <option value="ALL">Entity: All</option>
              <option value="Kovacs">A. Kovacs</option>
              <option value="Thorne">J. Thorne</option>
              <option value="Meridian">Meridian Holdings</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-[#6c7682] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          <div className="relative">
            <select
              value={eventTypeFilter}
              onChange={(e) => setEventTypeFilter(e.target.value)}
              className="bg-[#14171c] border border-[#222731] text-xs text-[#d1d7df] rounded px-3 py-1.5 pr-8 appearance-none focus:outline-none focus:border-[#9cae9b] transition-colors cursor-pointer"
            >
              <option value="ALL">Event type</option>
              <option value="ACCESS">Access Logs</option>
              <option value="FINANCIAL">Financial Wires</option>
              <option value="COMMUNICATION">Communications</option>
              <option value="MOVEMENT">Vehicle Movements</option>
              <option value="ASSOCIATION">Associations</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-[#6c7682] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          <div className="relative">
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="bg-[#14171c] border border-[#222731] text-xs text-[#d1d7df] rounded px-3 py-1.5 pr-8 appearance-none focus:outline-none focus:border-[#9cae9b] transition-colors cursor-pointer"
            >
              <option value="Oct — Nov 2026">Oct — Nov 2026</option>
              <option value="Last 30 Days">Last 30 Days</option>
              <option value="All Time">All Time</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-[#6c7682] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        <button className="flex items-center gap-1.5 text-xs text-[#8d98a5] hover:text-white px-2 py-1.5 rounded transition-colors">
          <Download className="w-3.5 h-3.5" />
          <span>Export</span>
        </button>
      </div>

      {/* Timeline Stream Container matching Timeline.jpeg */}
      <div className="bg-[#14171c] border border-[#222731] rounded-lg p-6 relative shadow-sm">
        <div className="space-y-8 relative">
          {/* Vertical Connecting Hairline Line */}
          <div className="absolute left-[17px] top-4 bottom-4 w-px bg-[#222731]" />

          {filteredEvents.map((evt, idx) => {
            const Icon = evt.icon;
            return (
              <div key={evt.id} className="relative flex items-start gap-5 group">
                {/* Left Icon Node in dark rounded box */}
                <div className="relative z-10 w-9 h-9 rounded-lg bg-[#101317] border border-[#222731] group-hover:border-[#384152] flex items-center justify-center shrink-0 transition-colors">
                  <Icon className="w-4 h-4 text-[#8d98a5] group-hover:text-white transition-colors" />
                </div>

                {/* Event Content */}
                <div className="flex-1 space-y-1.5 pt-0.5">
                  <div className="text-xs font-mono text-[#6c7682]">
                    {evt.time}
                  </div>

                  <div className="text-sm font-medium text-white group-hover:text-[#9cae9b] transition-colors cursor-pointer">
                    {evt.title}
                  </div>

                  <div className="text-xs text-[#8d98a5]">
                    {evt.subtitle}
                  </div>

                  <div className="pt-1.5">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono border ${
                        evt.tagStatus === "verified"
                          ? "bg-[#161f18] text-[#8fa38d] border-[#223526]"
                          : "bg-[#201c14] text-[#c4a265] border-[#362e1d]"
                      }`}
                    >
                      {evt.tag}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default EventTimelinePage;
