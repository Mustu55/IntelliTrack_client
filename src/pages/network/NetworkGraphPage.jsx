import React, { useState, useRef } from "react";
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
  ExternalLink
} from "lucide-react";
const INITIAL_NODES = [
  {
    id: "poi-1",
    label: "Raj Mehta",
    subLabel: "Person of Interest \u2022 Logistics",
    type: "PERSON",
    x: 420,
    y: 280,
    confidence: 92,
    status: "SUSPICIOUS",
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
    subLabel: "Person of Interest \u2022 Beneficiary",
    type: "PERSON",
    x: 620,
    y: 190,
    confidence: 88,
    status: "REVIEW_REQUIRED",
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
    subLabel: "Person of Interest \u2022 Accounts Custodian",
    type: "PERSON",
    x: 750,
    y: 340,
    confidence: 84,
    status: "REVIEW_REQUIRED",
    cluster: 2,
    betweenness: 0.52,
    degree: 4,
    primaryIdentifier: "POI-7819 (PAN: ABCPP9912K)",
    supportingRecords: ["NEFT Statement #9910", "Offshore Custody Deposition"],
    relatedCases: ["CASE #IT-2024-884"]
  },
  {
    id: "poi-4",
    label: "Kabir Khan",
    subLabel: "Linked Entity \u2022 Transport Coordinator",
    type: "PERSON",
    x: 230,
    y: 200,
    confidence: 90,
    status: "VERIFIED",
    cluster: 1,
    betweenness: 0.61,
    degree: 4,
    primaryIdentifier: "POI-3310 (Driver License MH-03-2011)",
    supportingRecords: ["Toll Plaza FastTag", "Freight Waybill Consignment"],
    relatedCases: ["CASE #IT-2024-884"]
  },
  {
    id: "phn-1",
    label: "+91 98201 44921",
    subLabel: "Burner SIM (VoLTE Handset)",
    type: "PHONE",
    x: 350,
    y: 150,
    confidence: 96,
    status: "SUSPICIOUS",
    cluster: 1,
    betweenness: 0.79,
    degree: 5,
    primaryIdentifier: "IMEI: 86129480112948",
    supportingRecords: ["CDR Telecom Dump (14 Calls)", "Tower Azimuth JNPT Sector 4"],
    relatedCases: ["CASE #IT-2024-884"]
  },
  {
    id: "phn-2",
    label: "+91 98110 33491",
    subLabel: "Encrypted App Handset",
    type: "PHONE",
    x: 520,
    y: 110,
    confidence: 91,
    status: "REVIEW_REQUIRED",
    cluster: 2,
    betweenness: 0.45,
    degree: 3,
    primaryIdentifier: "IMEI: 35918204918201",
    supportingRecords: ["Signal Verification Ping", "Roaming Telemetry Record"],
    relatedCases: ["CASE #IT-2024-884"]
  },
  {
    id: "veh-1",
    label: "Black Audi A8 [MH-01-EA-9902]",
    subLabel: "Conveyance Sedan",
    type: "VEHICLE",
    x: 270,
    y: 380,
    confidence: 98,
    status: "VERIFIED",
    cluster: 1,
    betweenness: 0.58,
    degree: 4,
    primaryIdentifier: "VIN: WAUZZZ4H9FN019821",
    supportingRecords: ["ALPR Optical Toll Hit (3x)", "CCTV Sighting Pier 42"],
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
    status: "SUSPICIOUS",
    cluster: 2,
    betweenness: 0.82,
    degree: 6,
    primaryIdentifier: "CIN: U63090MH2019PTC329182",
    supportingRecords: ["Customs Clearance Waybill", "Corporate Registrar RoC Filing"],
    relatedCases: ["CASE #IT-2024-884"]
  },
  {
    id: "org-2",
    label: "Astraea Trading Corp",
    subLabel: "Export-Import Intermediary",
    type: "ORGANIZATION",
    x: 760,
    y: 180,
    confidence: 86,
    status: "REVIEW_REQUIRED",
    cluster: 2,
    betweenness: 0.41,
    degree: 3,
    primaryIdentifier: "IEC: 0319028471",
    supportingRecords: ["Port Bill of Lading", "Bank Wire NEFT Escrow"],
    relatedCases: ["CASE #IT-2024-884"]
  },
  {
    id: "loc-1",
    label: "Pier 42 Maritime Dock",
    subLabel: "Repeated Meeting Point",
    type: "LOCATION",
    x: 420,
    y: 450,
    confidence: 97,
    status: "SUSPICIOUS",
    cluster: 1,
    betweenness: 0.88,
    degree: 6,
    primaryIdentifier: "GIS: 18.9482\xB0 N, 72.9510\xB0 E",
    supportingRecords: ["Port Gate Pass Log", "Surveillance Unit 4 Photographic Memo"],
    relatedCases: ["CASE #IT-2024-884"]
  },
  {
    id: "loc-2",
    label: "Safehouse 04 (Worli Unit)",
    subLabel: "Observation Address",
    type: "LOCATION",
    x: 180,
    y: 320,
    confidence: 89,
    status: "REVIEW_REQUIRED",
    cluster: 1,
    betweenness: 0.35,
    degree: 3,
    primaryIdentifier: "Worli Seaface Apt 402",
    supportingRecords: ["Utility Power Surge Record", "Physical Reconnaissance Log"],
    relatedCases: ["CASE #IT-2024-884"]
  },
  {
    id: "trx-1",
    label: "Wire Transfer $142,000",
    subLabel: "Financial Remittance #WT-9921",
    type: "TRANSACTION",
    x: 680,
    y: 270,
    confidence: 95,
    status: "SUSPICIOUS",
    cluster: 2,
    betweenness: 0.65,
    degree: 4,
    primaryIdentifier: "UTR: AXIS240718992014",
    supportingRecords: ["FIU Suspicious Transaction Report", "Bank Statement Audit"],
    relatedCases: ["CASE #IT-2024-884"]
  },
  {
    id: "evt-1",
    label: "Midnight Dock Rendezvous",
    subLabel: "Event Incident 03-12",
    type: "EVENT",
    x: 320,
    y: 270,
    confidence: 91,
    status: "SUSPICIOUS",
    cluster: 1,
    betweenness: 0.72,
    degree: 5,
    primaryIdentifier: "INC-2024-0312-004",
    supportingRecords: ["Patrol Vessel Intercept Log", "Cell Tower Co-Presence Ping"],
    relatedCases: ["CASE #IT-2024-884"]
  },
  {
    id: "case-1",
    label: "CASE #IT-2024-884",
    subLabel: "Hawala Syndicate Docket",
    type: "CASE",
    x: 480,
    y: 20,
    confidence: 100,
    status: "VERIFIED",
    cluster: 1,
    betweenness: 0.95,
    degree: 6,
    primaryIdentifier: "DOCKET-FED-IT-884",
    supportingRecords: ["Primary Charge Sheet", "Judicial Warrant Section 91"],
    relatedCases: ["CASE #IT-2024-884"]
  }
];
const INITIAL_EDGES = [
  // Person A -> Phone X (communication)
  { id: "e1", source: "poi-1", target: "phn-1", label: "SUBSCRIBER // IMEI MATCH", weight: 5, type: "COMMUNICATION" },
  // Phone X -> Phone Y (communication)
  { id: "e2", source: "phn-1", target: "phn-2", label: "VOLTE CALLS (14x)", weight: 4, type: "COMMUNICATION" },
  // Phone Y -> Person B (associated with)
  { id: "e3", source: "phn-2", target: "poi-2", label: "ASSOCIATED WITH", weight: 4, type: "VERIFIED" },
  // Person B -> Transaction (transaction)
  { id: "e4", source: "poi-2", target: "trx-1", label: "ORDERING CUSTOMER", weight: 5, type: "SUSPICIOUS" },
  // Transaction -> Organization C
  { id: "e5", source: "trx-1", target: "org-1", label: "BENEFICIARY REMITTANCE", weight: 5, type: "SUSPICIOUS" },
  // Organization C -> Org 2
  { id: "e6", source: "org-1", target: "org-2", label: "CONSIGNMENT CONTRACT", weight: 3, type: "REVIEW" },
  // Person A -> Vehicle
  { id: "e7", source: "poi-1", target: "veh-1", label: "REGISTERED OPERATOR", weight: 4, type: "VERIFIED" },
  // Vehicle -> Location 1
  { id: "e8", source: "veh-1", target: "loc-1", label: "ALPR SCANNED (3x)", weight: 4, type: "VERIFIED" },
  // Person A -> Location 1
  { id: "e9", source: "poi-1", target: "loc-1", label: "REPEATED CO-LOCATION", weight: 5, type: "SUSPICIOUS" },
  // Event -> Location 1 & Person A & Kabir Khan
  { id: "e10", source: "evt-1", target: "loc-1", label: "OCCURRED AT PIER", weight: 4, type: "VERIFIED" },
  { id: "e11", source: "evt-1", target: "poi-1", label: "OBSERVED ATTENDEE", weight: 4, type: "SUSPICIOUS" },
  { id: "e12", source: "evt-1", target: "poi-4", label: "CONVOY ESCORT", weight: 3, type: "REVIEW" },
  // Kabir Khan -> Safehouse 04
  { id: "e13", source: "poi-4", target: "loc-2", label: "RESIDENTIAL LEASE", weight: 3, type: "VERIFIED" },
  // Maya Patel -> Transaction
  { id: "e14", source: "poi-3", target: "trx-1", label: "AUTHORIZED SIGNATORY", weight: 4, type: "AI_INFERRED" },
  // Maya Patel -> Org 1
  { id: "e15", source: "poi-3", target: "org-1", label: "DIRECTOR & CUSTODIAN", weight: 4, type: "VERIFIED" },
  // Case connections
  { id: "e16", source: "case-1", target: "poi-1", label: "PRIMARY TARGET POI", weight: 5, type: "VERIFIED" },
  { id: "e17", source: "case-1", target: "poi-2", label: "CO-CONSPIRATOR DOCKET", weight: 4, type: "VERIFIED" },
  { id: "e18", source: "case-1", target: "org-1", label: "EVIDENTIARY EXHIBIT A", weight: 4, type: "VERIFIED" }
];
import { useGetCaseNetworkQuery } from "@/store/api/apiSlice";

const NetworkGraphPage = () => {
  const navigate = useNavigate();
  const { data: networkResponse, isLoading: isGraphLoading } = useGetCaseNetworkQuery();

  const [nodes, setNodes] = useState(INITIAL_NODES);
  const [edges, setEdges] = useState(INITIAL_EDGES);
  const [selectedNode, setSelectedNode] = useState(INITIAL_NODES[0]);

  // Sync backend network if available
  React.useEffect(() => {
    if (networkResponse?.data?.nodes && networkResponse.data.nodes.length > 0) {
      const backendNodes = networkResponse.data.nodes.map((bn, idx) => {
        const existing = INITIAL_NODES.find((inNode) => inNode.id === bn.id || inNode.label === bn.label);
        const angle = (idx / networkResponse.data.nodes.length) * 2 * Math.PI;
        const radius = 220;
        return {
          id: bn.id,
          label: bn.label,
          subLabel: bn.subLabel || `${bn.type} Node`,
          type: bn.type || "PERSON",
          x: existing?.x || 500 + Math.cos(angle) * radius,
          y: existing?.y || 260 + Math.sin(angle) * radius,
          confidence: bn.confidence || 85,
          status: bn.status || "VERIFIED",
          cluster: bn.community || 1,
          betweenness: bn.betweenness || 0.5,
          degree: bn.degree || 3,
          primaryIdentifier: bn.primaryIdentifier || `ID: ${bn.id}`,
          supportingRecords: bn.supportingRecords || ["FIR-2026", "Cell Tower Data"],
          relatedCases: bn.relatedCases || ["CASE #IT-2026-NIGHTSHADE"],
        };
      });

      const backendEdges = (networkResponse.data.edges || []).map((be, idx) => ({
        id: be.id || `be-${idx}`,
        source: be.source,
        target: be.target,
        label: be.label || be.relationshipType || "LINKED",
        weight: Math.round((be.confidence || 80) / 20),
        type: be.type || "VERIFIED",
      }));

      setNodes(backendNodes);
      if (backendEdges.length > 0) {
        setEdges(backendEdges);
      }
      if (backendNodes.length > 0 && !selectedNode) {
        setSelectedNode(backendNodes[0]);
      }
    }
  }, [networkResponse]);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [searchQuery, setSearchQuery] = useState("");
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
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [isPhysicsActive, setIsPhysicsActive] = useState(false);
  const [draggingNodeId, setDraggingNodeId] = useState(null);
  const svgRef = useRef(null);
  const visibleNodes = nodes.filter((n) => {
    const typeAllowed = activeTypeFilters[n.type];
    const statusAllowed = statusFilter === "ALL" || n.status === statusFilter;
    return typeAllowed && statusAllowed;
  });
  const visibleNodeIds = new Set(visibleNodes.map((n) => n.id));
  const visibleEdges = edges.filter(
    (e) => visibleNodeIds.has(e.source) && visibleNodeIds.has(e.target)
  );
  const getEntityIcon = (type, className = "w-4 h-4") => {
    switch (type) {
      case "PERSON":
        return /* @__PURE__ */ React.createElement(Users, { className });
      case "PHONE":
        return /* @__PURE__ */ React.createElement(Phone, { className });
      case "ORGANIZATION":
        return /* @__PURE__ */ React.createElement(Building, { className });
      case "VEHICLE":
        return /* @__PURE__ */ React.createElement(Car, { className });
      case "LOCATION":
        return /* @__PURE__ */ React.createElement(MapPin, { className });
      case "TRANSACTION":
        return /* @__PURE__ */ React.createElement(CreditCard, { className });
      case "EVENT":
        return /* @__PURE__ */ React.createElement(Calendar, { className });
      case "CASE":
        return /* @__PURE__ */ React.createElement(Briefcase, { className });
      default:
        return /* @__PURE__ */ React.createElement(Share2, { className });
    }
  };
  const getNodeColor = (type) => {
    switch (type) {
      case "PERSON":
        return "#2563EB";
      // Blue
      case "PHONE":
        return "#06B6D4";
      // Cyan
      case "ORGANIZATION":
        return "#8B5CF6";
      // Purple
      case "VEHICLE":
        return "#10B981";
      // Green
      case "LOCATION":
        return "#F59E0B";
      // Amber
      case "TRANSACTION":
        return "#38BDF8";
      // Light Blue/Cyan
      case "EVENT":
        return "#F97316";
      // Orange
      case "CASE":
        return "#EF4444";
      // Red
      default:
        return "#2563EB";
    }
  };
  const getEdgeColor = (type) => {
    switch (type) {
      case "COMMUNICATION":
        return "#06B6D4";
      // Cyan
      case "VERIFIED":
        return "#10B981";
      // Green
      case "REVIEW":
        return "#F59E0B";
      // Amber
      case "SUSPICIOUS":
        return "#EF4444";
      // Red
      case "AI_INFERRED":
        return "#8B5CF6";
      // Purple
      default:
        return "#263B55";
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
      setNodes(
        (prev) => prev.map(
          (n) => n.id === draggingNodeId ? { ...n, x: mouseX, y: mouseY } : n
        )
      );
    }
  };
  const handleMouseUp = () => {
    setIsDragging(false);
    setDraggingNodeId(null);
  };
  const handleResetZoom = () => {
    setZoomLevel(1);
    setPan({ x: 0, y: 0 });
  };
  const connectedEdges = selectedNode ? edges.filter((e) => e.source === selectedNode.id || e.target === selectedNode.id) : [];
  const connectedNodes = selectedNode ? nodes.filter(
    (n) => connectedEdges.some(
      (e) => e.source === selectedNode.id && e.target === n.id || e.target === selectedNode.id && e.source === n.id
    )
  ) : [];
  const toggleTypeFilter = (type) => {
    setActiveTypeFilters((prev) => ({ ...prev, [type]: !prev[type] }));
  };
  const isNodeSearched = (node) => {
    if (!searchQuery.trim()) return false;
    return node.label.toLowerCase().includes(searchQuery.toLowerCase()) || node.subLabel.toLowerCase().includes(searchQuery.toLowerCase()) || node.primaryIdentifier.toLowerCase().includes(searchQuery.toLowerCase());
  };
  return /* @__PURE__ */ React.createElement("div", { className: "h-[calc(100vh-5rem)] flex flex-col font-sans select-none overflow-hidden -m-4 lg:-m-6" }, /* @__PURE__ */ React.createElement("div", { className: "bg-[#07111F] border-b border-[#263B55] px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 z-20" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-3" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React.createElement(Share2, { className: "w-5 h-5 text-[#06B6D4]" }), /* @__PURE__ */ React.createElement("h1", { className: "font-bold text-white text-sm tracking-tight font-mono uppercase" }, "Syndicate Link Analysis Graph")), /* @__PURE__ */ React.createElement("div", { className: "relative" }, /* @__PURE__ */ React.createElement(Search, { className: "w-3.5 h-3.5 text-[#94A3B8] absolute left-2.5 top-2.5" }), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "text",
      value: searchQuery,
      onChange: (e) => setSearchQuery(e.target.value),
      placeholder: "Search node...",
      className: "w-40 sm:w-56 h-8 pl-8 pr-3 rounded-lg bg-[#0D1B2A] border border-[#263B55] text-xs text-white placeholder-[#94A3B8] focus:border-[#2563EB] focus:outline-hidden font-mono"
    }
  ))), /* @__PURE__ */ React.createElement("div", { className: "hidden xl:flex items-center gap-1.5 text-[11px] font-mono" }, /* @__PURE__ */ React.createElement("span", { className: "text-[#94A3B8] text-[10px] mr-1" }, "FILTER:"), ["PERSON", "PHONE", "ORGANIZATION", "VEHICLE", "LOCATION", "TRANSACTION", "EVENT", "CASE"].map((type) => {
    const active = activeTypeFilters[type];
    return /* @__PURE__ */ React.createElement(
      "button",
      {
        key: type,
        onClick: () => toggleTypeFilter(type),
        className: `px-2 py-0.5 rounded transition-all cursor-pointer flex items-center gap-1 ${active ? "bg-[#101F33] text-white border border-[#263B55]" : "bg-transparent text-slate-500 hover:text-slate-300"}`
      },
      /* @__PURE__ */ React.createElement("span", { className: "w-1.5 h-1.5 rounded-full", style: { backgroundColor: getNodeColor(type) } }),
      /* @__PURE__ */ React.createElement("span", null, type)
    );
  })), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 font-mono text-xs" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center bg-[#0D1B2A] rounded-lg border border-[#263B55] p-0.5" }, /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => setZoomLevel((z) => Math.min(z + 0.15, 2.5)),
      className: "p-1.5 rounded hover:bg-[#101F33] text-slate-300 hover:text-white transition-colors",
      title: "Zoom In"
    },
    /* @__PURE__ */ React.createElement(ZoomIn, { className: "w-4 h-4" })
  ), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => setZoomLevel((z) => Math.max(z - 0.15, 0.4)),
      className: "p-1.5 rounded hover:bg-[#101F33] text-slate-300 hover:text-white transition-colors",
      title: "Zoom Out"
    },
    /* @__PURE__ */ React.createElement(ZoomOut, { className: "w-4 h-4" })
  ), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: handleResetZoom,
      className: "p-1.5 rounded hover:bg-[#101F33] text-slate-300 hover:text-white transition-colors",
      title: "Reset View"
    },
    /* @__PURE__ */ React.createElement(RotateCcw, { className: "w-4 h-4" })
  )), /* @__PURE__ */ React.createElement("span", { className: "text-[11px] text-[#94A3B8] px-2 py-1 rounded bg-[#0D1B2A] border border-[#263B55]" }, Math.round(zoomLevel * 100), "%"))), /* @__PURE__ */ React.createElement("div", { className: "flex-1 flex overflow-hidden relative bg-[#07111F]" }, /* @__PURE__ */ React.createElement(
    "div",
    {
      className: "flex-1 h-full cursor-grab active:cursor-grabbing relative overflow-hidden",
      onMouseDown: handleMouseDown,
      onMouseMove: handleMouseMove,
      onMouseUp: handleMouseUp
    },
    /* @__PURE__ */ React.createElement(
      "svg",
      {
        ref: svgRef,
        className: "w-full h-full",
        style: { backgroundColor: "#07111F" }
      },
      /* @__PURE__ */ React.createElement("defs", null, /* @__PURE__ */ React.createElement("pattern", { id: "graphGrid", width: "40", height: "40", patternUnits: "userSpaceOnUse" }, /* @__PURE__ */ React.createElement("path", { d: "M 40 0 L 0 0 0 40", fill: "none", stroke: "#263B55", strokeWidth: "0.5", strokeOpacity: "0.4" }), /* @__PURE__ */ React.createElement("circle", { cx: "40", cy: "40", r: "1", fill: "#263B55", fillOpacity: "0.8" })), /* @__PURE__ */ React.createElement("marker", { id: "arrowhead", markerWidth: "8", markerHeight: "6", refX: "24", refY: "3", orient: "auto" }, /* @__PURE__ */ React.createElement("polygon", { points: "0 0, 8 3, 0 6", fill: "#06B6D4", opacity: "0.8" }))),
      /* @__PURE__ */ React.createElement("rect", { id: "graph-bg", width: "100%", height: "100%", fill: "url(#graphGrid)" }),
      /* @__PURE__ */ React.createElement("g", { transform: `translate(${pan.x}, ${pan.y}) scale(${zoomLevel})` }, visibleEdges.map((edge) => {
        const sourceNode = nodes.find((n) => n.id === edge.source);
        const targetNode = nodes.find((n) => n.id === edge.target);
        if (!sourceNode || !targetNode) return null;
        const isConnectedToSelected = selectedNode && (selectedNode.id === edge.source || selectedNode.id === edge.target);
        const edgeStrokeColor = getEdgeColor(edge.type);
        const midX = (sourceNode.x + targetNode.x) / 2;
        const midY = (sourceNode.y + targetNode.y) / 2;
        return /* @__PURE__ */ React.createElement("g", { key: edge.id, className: "transition-all" }, isConnectedToSelected && /* @__PURE__ */ React.createElement(
          "line",
          {
            x1: sourceNode.x,
            y1: sourceNode.y,
            x2: targetNode.x,
            y2: targetNode.y,
            stroke: edgeStrokeColor,
            strokeWidth: 4,
            strokeOpacity: 0.3
          }
        ), /* @__PURE__ */ React.createElement(
          "line",
          {
            x1: sourceNode.x,
            y1: sourceNode.y,
            x2: targetNode.x,
            y2: targetNode.y,
            stroke: edgeStrokeColor,
            strokeWidth: isConnectedToSelected ? 2.5 : 1.5,
            strokeDasharray: edge.type === "AI_INFERRED" ? "4 3" : void 0,
            opacity: isConnectedToSelected ? 1 : 0.65
          }
        ), /* @__PURE__ */ React.createElement("g", { transform: `translate(${midX}, ${midY})` }, /* @__PURE__ */ React.createElement(
          "rect",
          {
            x: "-38",
            y: "-8",
            width: "76",
            height: "16",
            rx: "4",
            fill: "#0D1B2A",
            stroke: "#263B55",
            strokeWidth: "0.8",
            opacity: "0.9"
          }
        ), /* @__PURE__ */ React.createElement(
          "text",
          {
            textAnchor: "middle",
            y: "3",
            fill: "#94A3B8",
            fontSize: "7",
            fontFamily: "monospace",
            fontWeight: "600"
          },
          edge.label.slice(0, 14)
        )));
      }), visibleNodes.map((node) => {
        const isSelected = selectedNode?.id === node.id;
        const isSearched = isNodeSearched(node);
        const nodeColor = getNodeColor(node.type);
        return /* @__PURE__ */ React.createElement(
          "g",
          {
            key: node.id,
            transform: `translate(${node.x}, ${node.y})`,
            className: "cursor-pointer",
            onMouseDown: (e) => {
              e.stopPropagation();
              setDraggingNodeId(node.id);
              setSelectedNode(node);
            }
          },
          (isSelected || isSearched) && /* @__PURE__ */ React.createElement(
            "circle",
            {
              r: "32",
              fill: "none",
              stroke: isSearched ? "#EF4444" : "#06B6D4",
              strokeWidth: "2",
              strokeDasharray: "4 2",
              className: "animate-spin",
              style: { animationDuration: "8s" }
            }
          ),
          /* @__PURE__ */ React.createElement(
            "circle",
            {
              r: "22",
              fill: "#0D1B2A",
              stroke: isSelected ? "#06B6D4" : nodeColor,
              strokeWidth: isSelected ? 3 : 2,
              className: "shadow-xl"
            }
          ),
          /* @__PURE__ */ React.createElement(
            "circle",
            {
              r: "16",
              fill: nodeColor,
              fillOpacity: 0.2
            }
          ),
          /* @__PURE__ */ React.createElement("foreignObject", { x: "-10", y: "-10", width: "20", height: "20" }, /* @__PURE__ */ React.createElement("div", { className: "w-full h-full flex items-center justify-center", style: { color: nodeColor } }, getEntityIcon(node.type, "w-4 h-4"))),
          node.status === "SUSPICIOUS" && /* @__PURE__ */ React.createElement(
            "circle",
            {
              cx: "14",
              cy: "-14",
              r: "4",
              fill: "#EF4444",
              stroke: "#07111F",
              strokeWidth: "1.5"
            }
          ),
          /* @__PURE__ */ React.createElement(
            "text",
            {
              textAnchor: "middle",
              y: "34",
              fill: "#FFFFFF",
              fontSize: "10",
              fontFamily: "Inter, sans-serif",
              fontWeight: "700",
              className: "drop-shadow-md select-none"
            },
            node.label
          ),
          /* @__PURE__ */ React.createElement(
            "text",
            {
              textAnchor: "middle",
              y: "45",
              fill: "#94A3B8",
              fontSize: "8",
              fontFamily: "monospace",
              className: "select-none"
            },
            node.subLabel
          )
        );
      }))
    ),
    /* @__PURE__ */ React.createElement("div", { className: "absolute bottom-4 left-4 p-3 rounded-xl bg-[#0D1B2A]/95 border border-[#263B55] shadow-2xl backdrop-blur-md z-10 max-w-xs text-xs font-mono" }, /* @__PURE__ */ React.createElement("div", { className: "text-[10px] uppercase font-bold text-white tracking-wider mb-2 flex items-center justify-between" }, /* @__PURE__ */ React.createElement("span", null, "NETWORK LEGEND"), /* @__PURE__ */ React.createElement("span", { className: "text-[#06B6D4]" }, "COLOR SYSTEM")), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-2 gap-x-3 gap-y-1 text-[10px] text-[#94A3B8]" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-1.5" }, /* @__PURE__ */ React.createElement("span", { className: "w-2.5 h-2.5 rounded-full bg-[#2563EB]" }), /* @__PURE__ */ React.createElement("span", { className: "text-white" }, "Blue:"), " Person (POI)"), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-1.5" }, /* @__PURE__ */ React.createElement("span", { className: "w-2.5 h-2.5 rounded-full bg-[#06B6D4]" }), /* @__PURE__ */ React.createElement("span", { className: "text-white" }, "Cyan:"), " Phone / CDR"), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-1.5" }, /* @__PURE__ */ React.createElement("span", { className: "w-2.5 h-2.5 rounded-full bg-[#8B5CF6]" }), /* @__PURE__ */ React.createElement("span", { className: "text-white" }, "Purple:"), " Organization"), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-1.5" }, /* @__PURE__ */ React.createElement("span", { className: "w-2.5 h-2.5 rounded-full bg-[#10B981]" }), /* @__PURE__ */ React.createElement("span", { className: "text-white" }, "Green:"), " Vehicle / Verified"), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-1.5" }, /* @__PURE__ */ React.createElement("span", { className: "w-2.5 h-2.5 rounded-full bg-[#F59E0B]" }), /* @__PURE__ */ React.createElement("span", { className: "text-white" }, "Amber:"), " Location / Review"), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-1.5" }, /* @__PURE__ */ React.createElement("span", { className: "w-2.5 h-2.5 rounded-full bg-[#EF4444]" }), /* @__PURE__ */ React.createElement("span", { className: "text-white" }, "Red:"), " Suspicious / Alert")), /* @__PURE__ */ React.createElement("div", { className: "mt-2 pt-2 border-t border-[#263B55] text-[9px] text-[#94A3B8] leading-tight" }, 'Terminology strictly neutral: "Person of Interest", "Entity", "Relationship Under Review".'))
  ), selectedNode && /* @__PURE__ */ React.createElement("aside", { className: "w-80 sm:w-96 bg-[#0D1B2A] border-l border-[#263B55] flex flex-col z-20 shadow-2xl overflow-hidden font-sans" }, /* @__PURE__ */ React.createElement("div", { className: "p-4 bg-[#07111F] border-b border-[#263B55] flex items-center justify-between" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React.createElement(
    "div",
    {
      className: "w-7 h-7 rounded-lg flex items-center justify-center",
      style: {
        backgroundColor: `${getNodeColor(selectedNode.type)}20`,
        color: getNodeColor(selectedNode.type)
      }
    },
    getEntityIcon(selectedNode.type, "w-4 h-4")
  ), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "text-[10px] font-mono uppercase text-[#06B6D4] font-bold" }, "ENTITY INSPECTOR"), /* @__PURE__ */ React.createElement("h3", { className: "text-sm font-bold text-white truncate max-w-[200px]" }, selectedNode.label))), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => setSelectedNode(null),
      className: "p-1 rounded-lg text-[#94A3B8] hover:text-white hover:bg-[#101F33]"
    },
    /* @__PURE__ */ React.createElement(X, { className: "w-4 h-4" })
  )), /* @__PURE__ */ React.createElement("div", { className: "flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar text-xs font-mono" }, /* @__PURE__ */ React.createElement("div", { className: "p-3 rounded-xl bg-[#101F33] border border-[#263B55] space-y-2" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between" }, /* @__PURE__ */ React.createElement("span", { className: "text-[10px] text-[#94A3B8] uppercase" }, "Entity Classification"), /* @__PURE__ */ React.createElement("span", { className: "px-2 py-0.5 rounded text-[10px] font-bold bg-blue-500/20 text-[#06B6D4] border border-blue-500/30" }, selectedNode.type)), /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between" }, /* @__PURE__ */ React.createElement("span", { className: "text-[10px] text-[#94A3B8] uppercase" }, "AI Confidence"), /* @__PURE__ */ React.createElement("span", { className: "text-sm font-black text-[#10B981]" }, selectedNode.confidence, "% MATCH")), /* @__PURE__ */ React.createElement("div", { className: "w-full h-1.5 bg-[#07111F] rounded-full overflow-hidden" }, /* @__PURE__ */ React.createElement(
    "div",
    {
      className: "h-full bg-linear-to-r from-blue-500 to-emerald-400 rounded-full",
      style: { width: `${selectedNode.confidence}%` }
    }
  )), /* @__PURE__ */ React.createElement("div", { className: "text-[10px] text-[#94A3B8] pt-1" }, "ID: ", /* @__PURE__ */ React.createElement("span", { className: "text-white" }, selectedNode.primaryIdentifier))), /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between p-2.5 rounded-lg bg-[#101F33] border border-[#263B55]" }, /* @__PURE__ */ React.createElement("span", { className: "text-[#94A3B8]" }, "Review Status:"), /* @__PURE__ */ React.createElement(
    "span",
    {
      className: `px-2 py-0.5 rounded text-[10px] font-bold ${selectedNode.status === "VERIFIED" ? "bg-emerald-500/20 text-[#10B981] border border-emerald-500/30" : selectedNode.status === "SUSPICIOUS" ? "bg-red-500/20 text-[#EF4444] border border-red-500/30" : "bg-amber-500/20 text-[#F59E0B] border border-amber-500/30"}`
    },
    selectedNode.status
  )), /* @__PURE__ */ React.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ React.createElement("div", { className: "text-[11px] font-bold text-white uppercase tracking-wider flex items-center justify-between" }, /* @__PURE__ */ React.createElement("span", null, "Connected Entities (", connectedNodes.length, ")"), /* @__PURE__ */ React.createElement("span", { className: "text-[10px] text-[#06B6D4]" }, "CLICK TO FOCUS")), /* @__PURE__ */ React.createElement("div", { className: "space-y-1.5 max-h-40 overflow-y-auto custom-scrollbar" }, connectedNodes.map((cn) => {
    const edgeBetween = connectedEdges.find(
      (e) => e.source === cn.id && e.target === selectedNode.id || e.target === cn.id && e.source === selectedNode.id
    );
    return /* @__PURE__ */ React.createElement(
      "div",
      {
        key: cn.id,
        onClick: () => setSelectedNode(cn),
        className: "p-2 rounded-lg bg-[#101F33] border border-[#263B55] hover:border-[#06B6D4] transition-all cursor-pointer flex items-center justify-between group"
      },
      /* @__PURE__ */ React.createElement("div", { className: "truncate" }, /* @__PURE__ */ React.createElement("div", { className: "text-white font-semibold truncate group-hover:text-[#06B6D4]" }, cn.label), /* @__PURE__ */ React.createElement("div", { className: "text-[10px] text-[#94A3B8] truncate" }, edgeBetween?.label || cn.subLabel)),
      /* @__PURE__ */ React.createElement(ChevronRight, { className: "w-3.5 h-3.5 text-[#94A3B8] group-hover:text-white shrink-0" })
    );
  }))), /* @__PURE__ */ React.createElement("div", { className: "space-y-1.5" }, /* @__PURE__ */ React.createElement("div", { className: "text-[11px] font-bold text-white uppercase tracking-wider" }, "Supporting Records & Proofs"), /* @__PURE__ */ React.createElement("div", { className: "space-y-1" }, selectedNode.supportingRecords.map((rec, idx) => /* @__PURE__ */ React.createElement(
    "div",
    {
      key: idx,
      className: "p-2 rounded bg-[#07111F] border border-[#263B55] text-[11px] text-slate-300 flex items-center gap-2"
    },
    /* @__PURE__ */ React.createElement(FileText, { className: "w-3.5 h-3.5 text-cyan-400 shrink-0" }),
    /* @__PURE__ */ React.createElement("span", { className: "truncate" }, rec)
  )))), /* @__PURE__ */ React.createElement("div", { className: "space-y-1.5" }, /* @__PURE__ */ React.createElement("div", { className: "text-[11px] font-bold text-white uppercase tracking-wider" }, "Related Cases"), /* @__PURE__ */ React.createElement("div", { className: "space-y-1" }, selectedNode.relatedCases.map((rc, idx) => /* @__PURE__ */ React.createElement(
    "div",
    {
      key: idx,
      className: "p-2 rounded bg-[#07111F] border border-[#263B55] text-[11px] text-amber-300 flex items-center gap-2"
    },
    /* @__PURE__ */ React.createElement(Briefcase, { className: "w-3.5 h-3.5 text-amber-400 shrink-0" }),
    /* @__PURE__ */ React.createElement("span", { className: "truncate" }, rc)
  ))))), /* @__PURE__ */ React.createElement("div", { className: "p-3 bg-[#07111F] border-t border-[#263B55] space-y-2" }, /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => navigate(`/entities/${selectedNode.id}`),
      className: "w-full py-2 px-3 rounded-lg bg-[#2563EB] hover:bg-blue-600 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2 shadow-md cursor-pointer"
    },
    /* @__PURE__ */ React.createElement("span", null, "View Full Entity Profile"),
    /* @__PURE__ */ React.createElement(ExternalLink, { className: "w-3.5 h-3.5" })
  ), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => navigate("/evidence"),
      className: "w-full py-1.5 px-3 rounded-lg bg-[#101F33] hover:bg-[#12243A] text-slate-300 border border-[#263B55] text-xs font-mono transition-colors cursor-pointer"
    },
    "Trace Evidentiary Chain \u2192"
  )))));
};
var stdin_default = NetworkGraphPage;
export {
  NetworkGraphPage,
  stdin_default as default
};
