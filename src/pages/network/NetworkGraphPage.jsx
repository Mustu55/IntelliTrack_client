import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Share2,
  Search,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  ChevronRight,
  Users,
  Phone,
  Car,
  MapPin,
  Building,
  CreditCard,
  Calendar,
  Briefcase,
  X,
  FileText,
  ExternalLink,
  Layers,
  Sparkles
} from "lucide-react";
import { useGetCaseNetworkQuery } from "@/store/api/apiSlice";

const INITIAL_NODES = [
  {
    id: "poi-1",
    label: "Raj Mehta",
    subLabel: "Person of Interest · Broker",
    type: "PERSON",
    x: 420,
    y: 280,
    confidence: 94,
    status: "CRITICAL",
    cluster: 1,
    betweenness: 0.89,
    degree: 7,
    primaryIdentifier: "POI-4409 (DOB: 1984-06-12)",
    supportingRecords: ["FIR No. 2024/098", "CDR-Tower-JNPT-09", "Passport Z-992140"],
    relatedCases: ["CASE #IT-2024-884", "CASE #IT-2023-512"]
  },
  {
    id: "poi-2",
    label: "Vikramaditya Singhania",
    subLabel: "Person of Interest · Director",
    type: "PERSON",
    x: 620,
    y: 190,
    confidence: 88,
    status: "HIGH",
    cluster: 2,
    betweenness: 0.74,
    degree: 5,
    primaryIdentifier: "POI-1022 (DIN: 00928174)",
    supportingRecords: ["ROC Filing 2023", "Bank Wire Escrow #8821"],
    relatedCases: ["CASE #IT-2024-884"]
  },
  {
    id: "poi-3",
    label: "Maya Patel",
    subLabel: "Accounts Custodian",
    type: "PERSON",
    x: 750,
    y: 340,
    confidence: 84,
    status: "HIGH",
    cluster: 2,
    betweenness: 0.52,
    degree: 4,
    primaryIdentifier: "POI-7819 (PAN: ABCPP9912K)",
    supportingRecords: ["NEFT Statement #9910", "Custody Deposition"],
    relatedCases: ["CASE #IT-2024-884"]
  },
  {
    id: "poi-4",
    label: "Kabir Khan",
    subLabel: "Transport Coordinator",
    type: "PERSON",
    x: 230,
    y: 200,
    confidence: 90,
    status: "ACTIVE",
    cluster: 1,
    betweenness: 0.61,
    degree: 4,
    primaryIdentifier: "POI-3310 (License MH-03-2011)",
    supportingRecords: ["Toll Plaza FastTag", "Freight Consignment"],
    relatedCases: ["CASE #IT-2024-884"]
  },
  {
    id: "phn-1",
    label: "+91 98201 44921",
    subLabel: "Burner SIM (VoLTE)",
    type: "PHONE",
    x: 350,
    y: 150,
    confidence: 96,
    status: "CRITICAL",
    cluster: 1,
    betweenness: 0.79,
    degree: 5,
    primaryIdentifier: "IMEI: 86129480112948",
    supportingRecords: ["CDR Telecom Dump (14 Calls)", "Tower JNPT Sector 4"],
    relatedCases: ["CASE #IT-2024-884"]
  },
  {
    id: "phn-2",
    label: "+91 98110 33491",
    subLabel: "Secondary eSIM",
    type: "PHONE",
    x: 520,
    y: 110,
    confidence: 91,
    status: "ACTIVE",
    cluster: 2,
    betweenness: 0.45,
    degree: 3,
    primaryIdentifier: "IMEI: 35918204918201",
    supportingRecords: ["Signal Ping", "Roaming Record"],
    relatedCases: ["CASE #IT-2024-884"]
  },
  {
    id: "veh-1",
    label: "Audi A8 [MH-01-EA-9902]",
    subLabel: "Conveyance Sedan",
    type: "VEHICLE",
    x: 270,
    y: 380,
    confidence: 98,
    status: "ACTIVE",
    cluster: 1,
    betweenness: 0.58,
    degree: 4,
    primaryIdentifier: "VIN: WAUZZZ4H9FN019821",
    supportingRecords: ["ALPR Toll Hit (3x)", "CCTV Sighting Pier 42"],
    relatedCases: ["CASE #IT-2024-884"]
  },
  {
    id: "org-1",
    label: "BlueStar Logistics Pvt. Ltd.",
    subLabel: "Freight Forwarding Shell",
    type: "ORGANIZATION",
    x: 580,
    y: 360,
    confidence: 94,
    status: "CRITICAL",
    cluster: 2,
    betweenness: 0.82,
    degree: 6,
    primaryIdentifier: "CIN: U63090MH2019PTC329182",
    supportingRecords: ["Customs Waybill", "Corporate Registrar RoC"],
    relatedCases: ["CASE #IT-2024-884"]
  },
  {
    id: "org-2",
    label: "Astraea Trading Corp",
    subLabel: "Export Intermediary",
    type: "ORGANIZATION",
    x: 760,
    y: 180,
    confidence: 86,
    status: "ACTIVE",
    cluster: 2,
    betweenness: 0.41,
    degree: 3,
    primaryIdentifier: "IEC: 0319028471",
    supportingRecords: ["Port Bill of Lading", "Bank Wire Escrow"],
    relatedCases: ["CASE #IT-2024-884"]
  },
  {
    id: "loc-1",
    label: "Pier 42 Maritime Dock",
    subLabel: "Meeting Point Hotspot",
    type: "LOCATION",
    x: 420,
    y: 450,
    confidence: 97,
    status: "CRITICAL",
    cluster: 1,
    betweenness: 0.88,
    degree: 6,
    primaryIdentifier: "GIS: 18.9482° N, 72.9510° E",
    supportingRecords: ["Gate Pass Log", "Surveillance Memo"],
    relatedCases: ["CASE #IT-2024-884"]
  },
  {
    id: "loc-2",
    label: "Safehouse 04 (Worli)",
    subLabel: "Observation Address",
    type: "LOCATION",
    x: 180,
    y: 320,
    confidence: 89,
    status: "ACTIVE",
    cluster: 1,
    betweenness: 0.35,
    degree: 3,
    primaryIdentifier: "Worli Seaface Apt 402",
    supportingRecords: ["Power Surge Record", "Reconnaissance Log"],
    relatedCases: ["CASE #IT-2024-884"]
  },
  {
    id: "trx-1",
    label: "Wire Transfer $142,000",
    subLabel: "Remittance #WT-9921",
    type: "TRANSACTION",
    x: 680,
    y: 270,
    confidence: 95,
    status: "CRITICAL",
    cluster: 2,
    betweenness: 0.65,
    degree: 4,
    primaryIdentifier: "UTR: AXIS240718992014",
    supportingRecords: ["FIU Suspicious Transaction Report", "Bank Statement"],
    relatedCases: ["CASE #IT-2024-884"]
  },
  {
    id: "evt-1",
    label: "Midnight Rendezvous",
    subLabel: "Event Incident 03-12",
    type: "EVENT",
    x: 320,
    y: 270,
    confidence: 91,
    status: "HIGH",
    cluster: 1,
    betweenness: 0.72,
    degree: 5,
    primaryIdentifier: "INC-2024-0312-004",
    supportingRecords: ["Patrol Intercept Log", "Tower Co-Presence"],
    relatedCases: ["CASE #IT-2024-884"]
  },
  {
    id: "case-1",
    label: "CASE #IT-2024-884",
    subLabel: "Syndicate Docket Alpha",
    type: "CASE",
    x: 480,
    y: 30,
    confidence: 100,
    status: "ACTIVE",
    cluster: 1,
    betweenness: 0.95,
    degree: 6,
    primaryIdentifier: "DOCKET-FED-IT-884",
    supportingRecords: ["Primary Charge Sheet", "Judicial Warrant"],
    relatedCases: ["CASE #IT-2024-884"]
  }
];

const INITIAL_EDGES = [
  { id: "e1", source: "poi-1", target: "phn-1", label: "SUBSCRIBER // IMEI", weight: 5, type: "COMMUNICATION" },
  { id: "e2", source: "phn-1", target: "phn-2", label: "VOLTE CALLS (14x)", weight: 4, type: "COMMUNICATION" },
  { id: "e3", source: "phn-2", target: "poi-2", label: "ASSOCIATED WITH", weight: 4, type: "VERIFIED" },
  { id: "e4", source: "poi-2", target: "trx-1", label: "ORDERING PARTY", weight: 5, type: "SUSPICIOUS" },
  { id: "e5", source: "trx-1", target: "org-1", label: "BENEFICIARY WIRE", weight: 5, type: "SUSPICIOUS" },
  { id: "e6", source: "org-1", target: "org-2", label: "CONSIGNMENT CONTRACT", weight: 3, type: "REVIEW" },
  { id: "e7", source: "poi-1", target: "veh-1", label: "REGISTERED OPERATOR", weight: 4, type: "VERIFIED" },
  { id: "e8", source: "veh-1", target: "loc-1", label: "ALPR SCANNED (3x)", weight: 4, type: "VERIFIED" },
  { id: "e9", source: "poi-1", target: "loc-1", label: "REPEATED CO-LOCATION", weight: 5, type: "SUSPICIOUS" },
  { id: "e10", source: "evt-1", target: "loc-1", label: "OCCURRED AT DOCK", weight: 4, type: "VERIFIED" },
  { id: "e11", source: "evt-1", target: "poi-1", label: "ATTENDEE OBSERVED", weight: 4, type: "SUSPICIOUS" },
  { id: "e12", source: "evt-1", target: "poi-4", label: "CONVOY ESCORT", weight: 3, type: "REVIEW" },
  { id: "e13", source: "poi-4", target: "loc-2", label: "RESIDENTIAL LEASE", weight: 3, type: "VERIFIED" },
  { id: "e14", source: "poi-3", target: "trx-1", label: "AUTHORIZED SIGNATORY", weight: 4, type: "AI_INFERRED" },
  { id: "e15", source: "poi-3", target: "org-1", label: "DIRECTOR & CUSTODIAN", weight: 4, type: "VERIFIED" },
  { id: "e16", source: "case-1", target: "poi-1", label: "PRIMARY TARGET", weight: 5, type: "VERIFIED" },
  { id: "e17", source: "case-1", target: "poi-2", label: "CO-CONSPIRATOR", weight: 4, type: "VERIFIED" },
  { id: "e18", source: "case-1", target: "org-1", label: "EVIDENTIARY EXHIBIT", weight: 4, type: "VERIFIED" }
];

const NetworkGraphPage = () => {
  const navigate = useNavigate();
  const { data: networkResponse } = useGetCaseNetworkQuery();

  const [nodes, setNodes] = useState(INITIAL_NODES);
  const [edges, setEdges] = useState(INITIAL_EDGES);
  const [selectedNode, setSelectedNode] = useState(INITIAL_NODES[0]);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [searchQuery, setSearchQuery] = useState("");
  const [draggingNodeId, setDraggingNodeId] = useState(null);
  const [activeTypeFilters, setActiveTypeFilters] = useState({
    PERSON: true,
    ORGANIZATION: true,
    PHONE: true,
    VEHICLE: true,
    LOCATION: true,
    TRANSACTION: true,
    EVENT: true,
    CASE: true
  });

  const svgRef = useRef(null);

  const visibleNodes = nodes.filter((n) => activeTypeFilters[n.type]);
  const visibleNodeIds = new Set(visibleNodes.map((n) => n.id));
  const visibleEdges = edges.filter(
    (e) => visibleNodeIds.has(e.source) && visibleNodeIds.has(e.target)
  );

  const getEntityIcon = (type, className = "w-3.5 h-3.5") => {
    switch (type) {
      case "PERSON":
        return <Users className={className} />;
      case "PHONE":
        return <Phone className={className} />;
      case "ORGANIZATION":
        return <Building className={className} />;
      case "VEHICLE":
        return <Car className={className} />;
      case "LOCATION":
        return <MapPin className={className} />;
      case "TRANSACTION":
        return <CreditCard className={className} />;
      case "EVENT":
        return <Calendar className={className} />;
      case "CASE":
        return <Briefcase className={className} />;
      default:
        return <Share2 className={className} />;
    }
  };

  const getNodeColor = (type) => {
    switch (type) {
      case "PERSON":
        return "#9cae9b";
      case "PHONE":
        return "#7a8ba8";
      case "ORGANIZATION":
        return "#c4a265";
      case "VEHICLE":
        return "#8fa38d";
      case "LOCATION":
        return "#d97768";
      case "TRANSACTION":
        return "#52627d";
      case "EVENT":
        return "#c4a265";
      case "CASE":
        return "#9cae9b";
      default:
        return "#9cae9b";
    }
  };

  const handleMouseDown = (e) => {
    if (e.target.tagName === "svg" || e.target.id === "graph-bg") {
      setIsDragging(true);
      setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      setPan({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
    } else if (draggingNodeId) {
      const rect = svgRef.current?.getBoundingClientRect();
      if (!rect) return;
      const mouseX = (e.clientX - rect.left - pan.x) / zoomLevel;
      const mouseY = (e.clientY - rect.top - pan.y) / zoomLevel;
      setNodes((prev) =>
        prev.map((n) => (n.id === draggingNodeId ? { ...n, x: mouseX, y: mouseY } : n))
      );
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setDraggingNodeId(null);
  };

  const connectedEdges = selectedNode
    ? edges.filter((e) => e.source === selectedNode.id || e.target === selectedNode.id)
    : [];
  const connectedNodes = selectedNode
    ? nodes.filter((n) =>
        connectedEdges.some(
          (e) =>
            (e.source === selectedNode.id && e.target === n.id) ||
            (e.target === selectedNode.id && e.source === n.id)
        )
      )
    : [];

  const toggleTypeFilter = (type) => {
    setActiveTypeFilters((prev) => ({ ...prev, [type]: !prev[type] }));
  };

  const isNodeSearched = (node) => {
    if (!searchQuery.trim()) return false;
    return (
      node.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      node.subLabel.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  return (
    <div className="h-[calc(100vh-5rem)] flex flex-col font-sans select-none overflow-hidden -m-4 lg:-m-6 bg-[#0d0f11]">
      {/* Top Header Controls Bar */}
      <div className="bg-[#101317] border-b border-[#1e232a] px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 z-20">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Share2 className="w-4 h-4 text-[#9cae9b]" />
            <h1 className="font-semibold text-white text-xs tracking-wider font-mono uppercase">
              Network Analysis Workspace
            </h1>
          </div>

          <div className="relative">
            <Search className="w-3.5 h-3.5 text-[#606875] absolute left-2.5 top-2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search graph node..."
              className="w-40 sm:w-52 h-7.5 pl-8 pr-3 rounded-md bg-[#14171c] border border-[#222731] text-xs text-white placeholder-[#606875] focus:border-[#9cae9b] focus:outline-none font-sans"
            />
          </div>
        </div>

        {/* Category toggles */}
        <div className="hidden xl:flex items-center gap-1.5 text-[10px] font-mono">
          <span className="text-[#606875] uppercase font-semibold mr-1">Types:</span>
          {["PERSON", "PHONE", "ORGANIZATION", "VEHICLE", "LOCATION", "TRANSACTION"].map(
            (type) => {
              const active = activeTypeFilters[type];
              return (
                <button
                  key={type}
                  onClick={() => toggleTypeFilter(type)}
                  className={`px-2 py-0.5 rounded transition-all cursor-pointer flex items-center gap-1 ${
                    active
                      ? "bg-[#14171c] text-white border border-[#222731]"
                      : "bg-transparent text-[#606875] hover:text-[#9ca3af]"
                  }`}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: getNodeColor(type) }}
                  />
                  <span>{type}</span>
                </button>
              );
            }
          )}
        </div>

        {/* Zoom and view reset */}
        <div className="flex items-center gap-2 font-mono text-xs">
          <div className="flex items-center bg-[#14171c] rounded-md border border-[#222731] p-0.5">
            <button
              onClick={() => setZoomLevel((z) => Math.min(z + 0.15, 2.5))}
              className="p-1 rounded hover:bg-[#181c22] text-[#9ca3af] hover:text-white transition-colors cursor-pointer"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setZoomLevel((z) => Math.max(z - 0.15, 0.4))}
              className="p-1 rounded hover:bg-[#181c22] text-[#9ca3af] hover:text-white transition-colors cursor-pointer"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => {
                setZoomLevel(1);
                setPan({ x: 0, y: 0 });
              }}
              className="p-1 rounded hover:bg-[#181c22] text-[#9ca3af] hover:text-white transition-colors cursor-pointer"
              title="Reset View"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
          <span className="text-[10px] text-[#9ca3af] px-2 py-1 rounded bg-[#14171c] border border-[#222731]">
            {Math.round(zoomLevel * 100)}%
          </span>
        </div>
      </div>

      {/* Main Canvas & Inspector Area */}
      <div className="flex-1 flex overflow-hidden relative bg-[#0d0f11]">
        {/* Interactive SVG Canvas */}
        <div
          className="flex-1 h-full cursor-grab active:cursor-grabbing relative overflow-hidden"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        >
          <svg ref={svgRef} className="w-full h-full" style={{ backgroundColor: "#0d0f11" }}>
            <defs>
              <pattern id="graphGrid" width="36" height="36" patternUnits="userSpaceOnUse">
                <path d="M 36 0 L 0 0 0 36" fill="none" stroke="#1e232a" strokeWidth="0.5" strokeOpacity="0.6" />
                <circle cx="36" cy="36" r="1" fill="#222731" />
              </pattern>
            </defs>

            <rect id="graph-bg" width="100%" height="100%" fill="url(#graphGrid)" />

            <g transform={`translate(${pan.x}, ${pan.y}) scale(${zoomLevel})`}>
              {/* Edges */}
              {visibleEdges.map((edge) => {
                const sourceNode = nodes.find((n) => n.id === edge.source);
                const targetNode = nodes.find((n) => n.id === edge.target);
                if (!sourceNode || !targetNode) return null;

                const isConnected =
                  selectedNode &&
                  (selectedNode.id === edge.source || selectedNode.id === edge.target);
                const midX = (sourceNode.x + targetNode.x) / 2;
                const midY = (sourceNode.y + targetNode.y) / 2;

                return (
                  <g key={edge.id}>
                    {isConnected && (
                      <line
                        x1={sourceNode.x}
                        y1={sourceNode.y}
                        x2={targetNode.x}
                        y2={targetNode.y}
                        stroke="#9cae9b"
                        strokeWidth={3}
                        strokeOpacity={0.25}
                      />
                    )}
                    <line
                      x1={sourceNode.x}
                      y1={sourceNode.y}
                      x2={targetNode.x}
                      y2={targetNode.y}
                      stroke={isConnected ? "#9cae9b" : "#2d3542"}
                      strokeWidth={isConnected ? 1.5 : 1}
                      strokeDasharray={edge.type === "AI_INFERRED" ? "4 3" : undefined}
                      opacity={isConnected ? 0.9 : 0.45}
                    />
                    <g transform={`translate(${midX}, ${midY})`}>
                      <rect
                        x="-32"
                        y="-7"
                        width="64"
                        height="14"
                        rx="3"
                        fill="#101317"
                        stroke="#222731"
                        strokeWidth="0.75"
                        opacity="0.95"
                      />
                      <text
                        textAnchor="middle"
                        y="3"
                        fill="#9ca3af"
                        fontSize="6.5"
                        fontFamily="monospace"
                        fontWeight="500"
                      >
                        {edge.label.slice(0, 12)}
                      </text>
                    </g>
                  </g>
                );
              })}

              {/* Nodes */}
              {visibleNodes.map((node) => {
                const isSelected = selectedNode?.id === node.id;
                const isSearched = isNodeSearched(node);
                const nodeColor = getNodeColor(node.type);

                return (
                  <g
                    key={node.id}
                    transform={`translate(${node.x}, ${node.y})`}
                    className="cursor-pointer"
                    onMouseDown={(e) => {
                      e.stopPropagation();
                      setDraggingNodeId(node.id);
                      setSelectedNode(node);
                    }}
                  >
                    {(isSelected || isSearched) && (
                      <circle
                        r="28"
                        fill="none"
                        stroke={isSearched ? "#dc7869" : "#9cae9b"}
                        strokeWidth="1.5"
                        strokeDasharray="3 2"
                      />
                    )}

                    <circle
                      r="20"
                      fill="#14171c"
                      stroke={isSelected ? "#9cae9b" : "#222731"}
                      strokeWidth={isSelected ? 2.5 : 1.5}
                    />

                    <circle r="14" fill={nodeColor} fillOpacity={0.15} />

                    <foreignObject x="-8" y="-8" width="16" height="16">
                      <div
                        className="w-full h-full flex items-center justify-center"
                        style={{ color: nodeColor }}
                      >
                        {getEntityIcon(node.type, "w-3.5 h-3.5")}
                      </div>
                    </foreignObject>

                    <text
                      textAnchor="middle"
                      y="30"
                      fill="#ffffff"
                      fontSize="9"
                      fontFamily="Inter, sans-serif"
                      fontWeight="600"
                    >
                      {node.label}
                    </text>
                    <text
                      textAnchor="middle"
                      y="40"
                      fill="#606875"
                      fontSize="7.5"
                      fontFamily="monospace"
                    >
                      {node.subLabel}
                    </text>
                  </g>
                );
              })}
            </g>
          </svg>

          {/* Bottom Graph Metric Legend */}
          <div className="absolute bottom-4 left-4 p-3 rounded-lg bg-[#14171c]/95 border border-[#222731] shadow-2xl backdrop-blur-xs z-10 max-w-xs text-xs font-mono">
            <div className="text-[10px] uppercase font-semibold text-white tracking-wider mb-1.5 flex items-center justify-between">
              <span>Network Legend</span>
              <span className="text-[#8fa38d]">Top Hub: Raj Mehta (0.89)</span>
            </div>
            <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-[10px] text-[#9ca3af]">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#9cae9b]" />
                <span>Person of Interest</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#7a8ba8]" />
                <span>Phone / CDR</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#c4a265]" />
                <span>Shell Organization</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#8fa38d]" />
                <span>Vehicle / ALPR</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Inspector Panel */}
        {selectedNode && (
          <aside className="w-80 sm:w-96 bg-[#14171c] border-l border-[#222731] flex flex-col z-20 shadow-2xl overflow-hidden font-sans">
            <div className="p-4 bg-[#101317] border-b border-[#222731] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className="w-7 h-7 rounded-md flex items-center justify-center"
                  style={{
                    backgroundColor: `${getNodeColor(selectedNode.type)}15`,
                    color: getNodeColor(selectedNode.type),
                  }}
                >
                  {getEntityIcon(selectedNode.type, "w-4 h-4")}
                </div>
                <div>
                  <div className="text-[10px] font-mono uppercase text-[#9cae9b] font-semibold">
                    ENTITY INSPECTOR
                  </div>
                  <h3 className="text-xs font-semibold text-white truncate max-w-[200px]">
                    {selectedNode.label}
                  </h3>
                </div>
              </div>
              <button
                onClick={() => setSelectedNode(null)}
                className="p-1 rounded text-[#606875] hover:text-white hover:bg-[#181c22]"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar text-xs font-mono">
              <div className="p-3 rounded-md bg-[#101317] border border-[#222731] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-[#9ca3af] uppercase">Classification</span>
                  <span className="px-1.5 py-0.2 rounded text-[10px] font-semibold bg-[#18261c] text-[#8fa38d] border border-[#25392b]">
                    {selectedNode.type}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-[#9ca3af] uppercase">Match Confidence</span>
                  <span className="text-xs font-bold text-[#8fa38d]">
                    {selectedNode.confidence}% RESOLVED
                  </span>
                </div>
                <div className="w-full h-1 bg-[#14171c] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#9cae9b] rounded-full"
                    style={{ width: `${selectedNode.confidence}%` }}
                  />
                </div>
                <div className="text-[10px] text-[#606875] pt-1 truncate">
                  ID: <span className="text-white">{selectedNode.primaryIdentifier}</span>
                </div>
              </div>

              {/* Connected Nodes */}
              <div className="space-y-2">
                <div className="text-[10px] font-semibold text-white uppercase tracking-wider flex items-center justify-between">
                  <span>Connected Nodes ({connectedNodes.length})</span>
                  <span className="text-[#9cae9b]">SELECT TO FOCUS</span>
                </div>
                <div className="space-y-1 max-h-48 overflow-y-auto custom-scrollbar">
                  {connectedNodes.map((cn) => {
                    const edgeBetween = connectedEdges.find(
                      (e) =>
                        (e.source === cn.id && e.target === selectedNode.id) ||
                        (e.target === cn.id && e.source === selectedNode.id)
                    );
                    return (
                      <div
                        key={cn.id}
                        onClick={() => setSelectedNode(cn)}
                        className="p-2 rounded-md bg-[#101317] border border-[#222731] hover:border-[#2d3542] hover:bg-[#181c22] transition-all cursor-pointer flex items-center justify-between group"
                      >
                        <div className="truncate">
                          <div className="text-white font-medium truncate group-hover:text-[#9cae9b]">
                            {cn.label}
                          </div>
                          <div className="text-[10px] text-[#606875] truncate">
                            {edgeBetween?.label || cn.subLabel}
                          </div>
                        </div>
                        <ChevronRight className="w-3.5 h-3.5 text-[#606875] group-hover:text-white shrink-0" />
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Supporting Records */}
              <div className="space-y-1.5">
                <div className="text-[10px] font-semibold text-white uppercase tracking-wider">
                  Supporting Records
                </div>
                <div className="space-y-1">
                  {selectedNode.supportingRecords.map((rec, idx) => (
                    <div
                      key={idx}
                      className="p-2 rounded bg-[#101317] border border-[#222731] text-[11px] text-[#9ca3af] flex items-center gap-2"
                    >
                      <FileText className="w-3 h-3 text-[#9cae9b] shrink-0" />
                      <span className="truncate">{rec}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="p-3 bg-[#101317] border-t border-[#222731] space-y-2">
              <button
                onClick={() => navigate(`/entities/${selectedNode.id}`)}
                className="w-full py-2 px-3 rounded-md bg-[#9cae9b] hover:bg-[#8da08c] text-[#0d130e] font-semibold text-xs transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer font-sans"
              >
                <span>View Full Entity Profile</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => navigate("/evidence")}
                className="w-full py-1.5 px-3 rounded-md bg-[#14171c] hover:bg-[#181c22] text-[#d1d5db] border border-[#222731] text-xs font-mono transition-colors cursor-pointer"
              >
                Trace Evidentiary Chain →
              </button>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
};

export { NetworkGraphPage };
export default NetworkGraphPage;
