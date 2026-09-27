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
  Calendar,
  Layers,
  ChevronDown,
  ArrowRight,
  ShieldCheck,
  Search
} from "lucide-react";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";

const GEO_MARKERS = [
  {
    id: "m-1",
    name: "Pier 41 · Unit 9",
    district: "PIER DISTRICT",
    type: "LOCATION",
    x: 615,
    y: 330,
    time: "Nov 24 · 02:14",
    hour: 2,
    eventCount: 6,
    entityCount: 2,
    eventId: "EV-5521",
    who: "A. Kovacs · Truck 7XQ-4419",
    where: "Pier 41, Unit 9 · Bay C",
    linkedLead: "LD-8821 · 94% confidence",
    description: "Night access unauthorized entry logged at security checkpoint.",
    status: "SUSPICIOUS"
  },
  {
    id: "m-2",
    name: "Harborview Depot",
    district: "HARBORVIEW",
    type: "LOCATION",
    x: 450,
    y: 380,
    time: "Nov 15 · 21:30",
    hour: 21,
    eventCount: 14,
    entityCount: 4,
    eventId: "EV-5455",
    who: "A. Kovacs · Box truck 7XQ-4419",
    where: "Harborview Freight Terminal",
    linkedLead: "LD-8819 · 88% confidence",
    description: "Automated license plate reader scan confirmed vehicle entry.",
    status: "VERIFIED"
  },
  {
    id: "m-3",
    name: "Northgate Logistics Hub",
    district: "NORTHGATE",
    type: "ORGANIZATION",
    x: 550,
    y: 375,
    time: "Nov 12 · 11:00",
    hour: 11,
    eventCount: 8,
    entityCount: 3,
    eventId: "EV-5441",
    who: "J. Thorne · Northgate LLC",
    where: "Northgate Industrial Locus",
    linkedLead: "LD-8812 · 91% confidence",
    description: "Commercial lease co-signed by target shell company.",
    status: "VERIFIED"
  },
  {
    id: "m-4",
    name: "Southpoint Gate Locus",
    district: "SOUTHPOINT",
    type: "LOCATION",
    x: 505,
    y: 368,
    time: "Nov 18 · 09:05",
    hour: 9,
    eventCount: 4,
    entityCount: 2,
    eventId: "EV-5470",
    who: "A. Kovacs ↔ J. Thorne",
    where: "Cell Tower Azimuth 120°",
    linkedLead: "LD-8815 · 82% confidence",
    description: "Burst call cluster intercepted on burner SIM.",
    status: "REVIEW_REQUIRED"
  }
];

export const GeoTemporalMapPage = () => {
  const navigate = useNavigate();
  const [dateRange, setDateRange] = useState("Nov 01 — Nov 26, 2026");
  const [entityFilter, setEntityFilter] = useState("ALL");
  const [caseFilter, setCaseFilter] = useState("CS-2418");
  const [locationTypeFilter, setLocationTypeFilter] = useState("ALL");

  const [layers, setLayers] = useState({
    caseLocations: true,
    entityMovements: true,
    events: true,
    coPresence: false
  });

  const [selectedMarker, setSelectedMarker] = useState(GEO_MARKERS[0]);
  const [scrubberIndex, setScrubberIndex] = useState(18);
  const [isPlaying, setIsPlaying] = useState(false);

  React.useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setScrubberIndex((prev) => (prev >= 26 ? 1 : prev + 1));
      }, 1200);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const toggleLayer = (layerKey) => {
    setLayers((prev) => ({ ...prev, [layerKey]: !prev[layerKey] }));
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-medium text-white tracking-tight">Geo-Temporal Intelligence</h1>
          <p className="text-xs text-[#8d98a5] mt-0.5">
            Where + when + who · Harbor District · Nov 2026
          </p>
        </div>
      </div>

      {/* Main 3-Column Layout matching InspireUI */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        {/* Left Column: Filters (3 Cols) */}
        <div className="lg:col-span-3 bg-[#14171c] border border-[#222731] rounded-lg p-4 space-y-4 shadow-sm">
          <div className="text-xs font-medium text-white">Filters</div>

          <div className="space-y-2.5">
            <div className="relative">
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="w-full bg-[#101317] border border-[#222731] text-xs text-[#d1d7df] rounded px-3 py-2 appearance-none focus:outline-none focus:border-[#9cae9b] transition-colors cursor-pointer"
              >
                <option value="Nov 01 — Nov 26, 2026">Nov 01 — Nov 26, 2026</option>
                <option value="Last 7 Days">Last 7 Days</option>
                <option value="Last 30 Days">Last 30 Days</option>
                <option value="Full Case Timeline">Full Case Timeline</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-[#6c7682] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            <div className="relative">
              <select
                value={entityFilter}
                onChange={(e) => setEntityFilter(e.target.value)}
                className="w-full bg-[#101317] border border-[#222731] text-xs text-[#d1d7df] rounded px-3 py-2 appearance-none focus:outline-none focus:border-[#9cae9b] transition-colors cursor-pointer"
              >
                <option value="ALL">Entity: All</option>
                <option value="A. Kovacs">A. Kovacs (Primary POI)</option>
                <option value="J. Thorne">J. Thorne (Associate)</option>
                <option value="Truck 7XQ-4419">Truck 7XQ-4419</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-[#6c7682] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            <div className="relative">
              <select
                value={caseFilter}
                onChange={(e) => setCaseFilter(e.target.value)}
                className="w-full bg-[#101317] border border-[#222731] text-xs text-[#d1d7df] rounded px-3 py-2 appearance-none focus:outline-none focus:border-[#9cae9b] transition-colors cursor-pointer"
              >
                <option value="CS-2418">Case: CS-2418</option>
                <option value="CS-2419">Case: CS-2419</option>
                <option value="CS-2420">Case: CS-2420</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-[#6c7682] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            <div className="relative">
              <select
                value={locationTypeFilter}
                onChange={(e) => setLocationTypeFilter(e.target.value)}
                className="w-full bg-[#101317] border border-[#222731] text-xs text-[#d1d7df] rounded px-3 py-2 appearance-none focus:outline-none focus:border-[#9cae9b] transition-colors cursor-pointer"
              >
                <option value="ALL">Location: All types</option>
                <option value="MARITIME">Maritime / Docking</option>
                <option value="WAREHOUSE">Warehouse / Depot</option>
                <option value="TELECOM">Cell Tower Sector</option>
                <option value="RESIDENTIAL">Safehouse / Locus</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-[#6c7682] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          <div className="pt-3 border-t border-[#222731] space-y-2.5">
            <div className="text-[10px] uppercase font-mono tracking-wider text-[#6c7682]">LAYERS</div>
            
            <label className="flex items-center gap-2.5 cursor-pointer text-xs text-[#d1d7df] hover:text-white select-none">
              <input
                type="checkbox"
                checked={layers.caseLocations}
                onChange={() => toggleLayer("caseLocations")}
                className="rounded bg-[#101317] border-[#222731] text-[#9cae9b] focus:ring-0 focus:ring-offset-0"
              />
              <span>Case locations</span>
            </label>

            <label className="flex items-center gap-2.5 cursor-pointer text-xs text-[#d1d7df] hover:text-white select-none">
              <input
                type="checkbox"
                checked={layers.entityMovements}
                onChange={() => toggleLayer("entityMovements")}
                className="rounded bg-[#101317] border-[#222731] text-[#9cae9b] focus:ring-0 focus:ring-offset-0"
              />
              <span>Entity movements</span>
            </label>

            <label className="flex items-center gap-2.5 cursor-pointer text-xs text-[#d1d7df] hover:text-white select-none">
              <input
                type="checkbox"
                checked={layers.events}
                onChange={() => toggleLayer("events")}
                className="rounded bg-[#101317] border-[#222731] text-[#9cae9b] focus:ring-0 focus:ring-offset-0"
              />
              <span>Events</span>
            </label>

            <label className="flex items-center gap-2.5 cursor-pointer text-xs text-[#d1d7df] hover:text-white select-none">
              <input
                type="checkbox"
                checked={layers.coPresence}
                onChange={() => toggleLayer("coPresence")}
                className="rounded bg-[#101317] border-[#222731] text-[#9cae9b] focus:ring-0 focus:ring-offset-0"
              />
              <span>Co-presence</span>
            </label>
          </div>
        </div>

        {/* Center Column: Vector Tactical Map + Bottom Scrubber (6 Cols) */}
        <div className="lg:col-span-6 bg-[#14171c] border border-[#222731] rounded-lg flex flex-col overflow-hidden shadow-sm">
          {/* Map Area */}
          <div className="h-[460px] relative bg-[#0f1216] overflow-hidden select-none">
            <svg className="w-full h-full">
              <defs>
                <pattern id="tacticalGridGeo" width="60" height="60" patternUnits="userSpaceOnUse">
                  <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#1b2028" strokeWidth="0.75" />
                </pattern>
              </defs>

              {/* Grid Background */}
              <rect width="100%" height="100%" fill="url(#tacticalGridGeo)" />

              {/* Geographic Contour Lines */}
              <path
                d="M 120 440 C 260 410, 380 320, 680 300 C 800 290, 880 340, 920 440"
                fill="none"
                stroke="#1c222b"
                strokeWidth="1.5"
              />
              <path
                d="M 220 120 C 350 180, 480 200, 750 180 C 850 170, 900 220, 960 260"
                fill="none"
                stroke="#1c222b"
                strokeWidth="1.5"
              />

              {/* District Contour Shading & Labels */}
              <path
                d="M 390 360 C 490 230, 720 240, 730 480 C 580 510, 420 480, 390 360 Z"
                fill="#161c22"
                fillOpacity="0.5"
                stroke="#242c38"
                strokeWidth="1"
              />

              <text x="470" y="250" fill="#4d5763" fontSize="10" fontFamily="monospace" letterSpacing="0.1em">
                HARBORVIEW
              </text>
              <text x="635" y="375" fill="#4d5763" fontSize="10" fontFamily="monospace" letterSpacing="0.1em">
                PIER DISTRICT
              </text>
              <text x="515" y="490" fill="#4d5763" fontSize="10" fontFamily="monospace" letterSpacing="0.1em">
                NORTHGATE
              </text>

              {/* Dashed Movement Track */}
              {layers.entityMovements && (
                <path
                  d="M 450 430 L 505 368 L 555 375 L 615 330"
                  fill="none"
                  stroke="#9cae9b"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                  strokeOpacity="0.8"
                />
              )}

              {/* Plotted Node Markers */}
              {layers.caseLocations &&
                GEO_MARKERS.map((marker) => {
                  const isSelected = selectedMarker.id === marker.id;
                  return (
                    <g
                      key={marker.id}
                      transform={`translate(${marker.x}, ${marker.y})`}
                      className="cursor-pointer group"
                      onClick={() => setSelectedMarker(marker)}
                    >
                      {/* Outer pulse ring for selected */}
                      {isSelected && (
                        <circle
                          r="14"
                          fill="none"
                          stroke="#9cae9b"
                          strokeWidth="1.5"
                          opacity="0.8"
                        />
                      )}
                      
                      {/* Base Circle */}
                      <circle
                        r="6.5"
                        fill="#101317"
                        stroke={isSelected ? "#9cae9b" : "#6c7682"}
                        strokeWidth="2"
                      />
                      <circle
                        r="2.5"
                        fill={isSelected ? "#9cae9b" : "#4d5763"}
                      />

                      {/* Tooltip on Active Marker */}
                      {isSelected && (
                        <g transform="translate(18, -24)">
                          <rect
                            x="0"
                            y="0"
                            width="110"
                            height="34"
                            rx="4"
                            fill="#161a20"
                            stroke="#2b3340"
                            strokeWidth="1"
                          />
                          <text x="8" y="14" fill="#ffffff" fontSize="9" fontWeight="600">
                            {marker.name}
                          </text>
                          <text x="8" y="26" fill="#8d98a5" fontSize="8" fontFamily="monospace">
                            {marker.eventCount} events · {marker.entityCount} entities
                          </text>
                        </g>
                      )}
                    </g>
                  );
                })}
            </svg>
          </div>

          {/* Bottom Scrubber Bar matching InspireUI */}
          <div className="p-3 bg-[#101317] border-t border-[#222731] space-y-2 font-mono text-xs select-none">
            <div className="flex items-center justify-between text-[11px] text-[#8d98a5]">
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-[#6c7682]" />
                <span>Nov 01 — Nov 26</span>
              </div>
              <div className="text-white">
                Nov {scrubberIndex.toString().padStart(2, "0")} · 09:05
              </div>
            </div>

            {/* Scrubber Track with Steps */}
            <div className="relative flex items-center pt-1 pb-1">
              <input
                type="range"
                min="1"
                max="26"
                value={scrubberIndex}
                onChange={(e) => setScrubberIndex(Number(e.target.value))}
                className="w-full accent-[#9cae9b] cursor-pointer h-1.5 bg-[#1e242d] rounded-lg appearance-none"
              />
            </div>

            {/* Discrete Activity Histogram Blocks */}
            <div className="flex items-center justify-between gap-1 pt-1">
              {Array.from({ length: 26 }).map((_, i) => {
                const day = i + 1;
                const isCurrent = day === scrubberIndex;
                const hasEvents = [4, 9, 12, 15, 18, 21, 24].includes(day);
                return (
                  <div
                    key={day}
                    onClick={() => setScrubberIndex(day)}
                    className={`h-2 flex-1 rounded-xs transition-colors cursor-pointer ${
                      isCurrent
                        ? "bg-[#9cae9b]"
                        : hasEvents
                        ? "bg-[#333d4b] hover:bg-[#4a586c]"
                        : "bg-[#181d24]"
                    }`}
                    title={`Nov ${day}`}
                  />
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Selected Event Card (3 Cols) */}
        <div className="lg:col-span-3 bg-[#14171c] border border-[#222731] rounded-lg p-4 space-y-4 shadow-sm">
          <div className="text-[10px] uppercase font-mono tracking-wider text-[#6c7682]">
            SELECTED EVENT
          </div>

          <div>
            <h3 className="text-sm font-medium text-white tracking-tight">
              {selectedMarker.name} — Night access
            </h3>
            <div className="text-[11px] font-mono text-[#6c7682] mt-0.5">
              {selectedMarker.time} · {selectedMarker.eventId}
            </div>
          </div>

          <div className="space-y-3 pt-2 border-t border-[#222731] text-xs">
            <div>
              <div className="text-[10px] text-[#6c7682] mb-0.5">Who</div>
              <div className="text-[#d1d7df] font-medium">{selectedMarker.who}</div>
            </div>

            <div>
              <div className="text-[10px] text-[#6c7682] mb-0.5">Where</div>
              <div className="text-[#d1d7df]">{selectedMarker.where}</div>
            </div>

            <div>
              <div className="text-[10px] text-[#6c7682] mb-0.5">Linked</div>
              <div className="text-[#9cae9b] font-mono font-medium">{selectedMarker.linkedLead}</div>
            </div>
          </div>

          <div className="pt-2">
            <Button
              variant="primary"
              className="w-full justify-center"
              onClick={() => navigate("/timeline")}
            >
              Jump to timeline
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeoTemporalMapPage;
