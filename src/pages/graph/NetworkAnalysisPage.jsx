import React, { useState } from "react";
import { mockGraphNodes, mockGraphEdges } from "@/constants/mockData";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
  Network,
  ZoomIn,
  ZoomOut,
  Maximize2,
  X,
  User,
  Phone,
  Home,
  Car,
  CreditCard,
  ArrowRight,
  Sparkles
} from "lucide-react";
const NetworkAnalysisPage = () => {
  const [nodes, setNodes] = useState(mockGraphNodes);
  const [edges, setEdges] = useState(mockGraphEdges);
  const [selectedNode, setSelectedNode] = useState(nodes[0]);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [centralityMetric, setCentralityMetric] = useState("degree");
  const [communityClustering, setCommunityClustering] = useState(false);
  const filteredNodes = nodes.filter((n) => activeFilter === "ALL" || n.type === activeFilter);
  const getNodeColor = (type) => {
    switch (type) {
      case "PERSON":
        return { fill: "#1A202C", stroke: "#E53E3E", text: "#FFFFFF" };
      case "BURNER_PHONE":
        return { fill: "#EBF8FF", stroke: "#2B6CB0", text: "#2B6CB0" };
      case "SAFEHOUSE":
        return { fill: "#FFFAF0", stroke: "#DD6B20", text: "#DD6B20" };
      case "FINANCIAL_ACCOUNT":
        return { fill: "#F0FFF4", stroke: "#38A169", text: "#38A169" };
      case "VEHICLE":
        return { fill: "#FAF5FF", stroke: "#805AD5", text: "#805AD5" };
      default:
        return { fill: "#EDF2F7", stroke: "#718096", text: "#4A5568" };
    }
  };
  const getNodeIcon = (type) => {
    switch (type) {
      case "PERSON":
        return /* @__PURE__ */ React.createElement(User, { className: "w-3.5 h-3.5" });
      case "BURNER_PHONE":
        return /* @__PURE__ */ React.createElement(Phone, { className: "w-3.5 h-3.5" });
      case "SAFEHOUSE":
        return /* @__PURE__ */ React.createElement(Home, { className: "w-3.5 h-3.5" });
      case "FINANCIAL_ACCOUNT":
        return /* @__PURE__ */ React.createElement(CreditCard, { className: "w-3.5 h-3.5" });
      case "VEHICLE":
        return /* @__PURE__ */ React.createElement(Car, { className: "w-3.5 h-3.5" });
      default:
        return /* @__PURE__ */ React.createElement(Network, { className: "w-3.5 h-3.5" });
    }
  };
  return /* @__PURE__ */ React.createElement("div", { className: "h-[calc(100vh-6rem)] flex flex-col font-mono max-w-7xl mx-auto space-y-4" }, /* @__PURE__ */ React.createElement("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-tactical-neutral-200 dark:border-tactical-neutral-800" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 text-tactical-neutral-500 text-[11px] uppercase tracking-wider mb-0.5" }, /* @__PURE__ */ React.createElement("span", null, "RELATIONAL SYNDICATE TOPOLOGY"), /* @__PURE__ */ React.createElement("span", null, "/"), /* @__PURE__ */ React.createElement("span", { className: "text-tactical-primary-600 font-semibold" }, "FORCEATLAS2 PHYSICS ENGINE")), /* @__PURE__ */ React.createElement("h1", { className: "text-xl font-bold tracking-tight text-tactical-neutral-900 dark:text-tactical-neutral-100" }, "Syndicate Link Chart & Network Analysis")), /* @__PURE__ */ React.createElement("div", { className: "flex flex-wrap items-center gap-2 text-xs" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center bg-tactical-neutral-100 dark:bg-tactical-neutral-800 p-0.5 rounded border border-tactical-neutral-300 dark:border-tactical-neutral-700" }, /* @__PURE__ */ React.createElement(
    "button",
    {
      type: "button",
      onClick: () => setCentralityMetric("degree"),
      className: `px-2 py-1 rounded text-[10px] font-bold uppercase transition-all ${centralityMetric === "degree" ? "bg-tactical-primary-700 text-white" : "text-tactical-neutral-500"}`
    },
    "Degree"
  ), /* @__PURE__ */ React.createElement(
    "button",
    {
      type: "button",
      onClick: () => setCentralityMetric("betweenness"),
      className: `px-2 py-1 rounded text-[10px] font-bold uppercase transition-all ${centralityMetric === "betweenness" ? "bg-tactical-primary-700 text-white" : "text-tactical-neutral-500"}`
    },
    "Betweenness"
  )), /* @__PURE__ */ React.createElement(
    Button,
    {
      variant: communityClustering ? "primary" : "secondary",
      size: "sm",
      onClick: () => setCommunityClustering(!communityClustering),
      icon: /* @__PURE__ */ React.createElement(Sparkles, { className: "w-3.5 h-3.5" }),
      className: "text-[11px]"
    },
    communityClustering ? "Louvain Clustered" : "Auto-Cluster Louvain"
  ), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-1 bg-white dark:bg-tactical-neutral-900 border border-tactical-neutral-300 dark:border-tactical-neutral-700 rounded p-0.5" }, /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => setZoomLevel(Math.min(zoomLevel + 0.15, 2)),
      className: "p-1 hover:bg-tactical-neutral-100 dark:hover:bg-tactical-neutral-800 rounded",
      title: "Zoom In"
    },
    /* @__PURE__ */ React.createElement(ZoomIn, { className: "w-3.5 h-3.5" })
  ), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => setZoomLevel(Math.max(zoomLevel - 0.15, 0.5)),
      className: "p-1 hover:bg-tactical-neutral-100 dark:hover:bg-tactical-neutral-800 rounded",
      title: "Zoom Out"
    },
    /* @__PURE__ */ React.createElement(ZoomOut, { className: "w-3.5 h-3.5" })
  ), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => setZoomLevel(1),
      className: "p-1 hover:bg-tactical-neutral-100 dark:hover:bg-tactical-neutral-800 rounded",
      title: "Reset View"
    },
    /* @__PURE__ */ React.createElement(Maximize2, { className: "w-3.5 h-3.5" })
  )))), /* @__PURE__ */ React.createElement("div", { className: "flex-1 flex overflow-hidden rounded border border-tactical-neutral-300 dark:border-tactical-neutral-800 bg-tactical-neutral-50 dark:bg-tactical-neutral-950 relative" }, /* @__PURE__ */ React.createElement("div", { className: "absolute top-3 left-3 z-10 flex flex-wrap gap-1.5 p-1 bg-white/90 dark:bg-tactical-neutral-900/90 backdrop-blur-xs rounded border border-tactical-neutral-300 dark:border-tactical-neutral-700 text-[10px]" }, ["ALL", "PERSON", "BURNER_PHONE", "SAFEHOUSE", "FINANCIAL_ACCOUNT", "VEHICLE"].map((t) => /* @__PURE__ */ React.createElement(
    "button",
    {
      key: t,
      onClick: () => setActiveFilter(t),
      className: `px-2 py-0.5 rounded font-bold uppercase transition-all ${activeFilter === t ? "bg-tactical-neutral-900 text-white dark:bg-tactical-neutral-100 dark:text-tactical-neutral-900" : "text-tactical-neutral-600 dark:text-tactical-neutral-400 hover:text-tactical-neutral-900"}`
    },
    t.replace("_", " ")
  ))), /* @__PURE__ */ React.createElement("div", { className: "flex-1 h-full overflow-hidden flex items-center justify-center cursor-grab active:cursor-grabbing p-4" }, /* @__PURE__ */ React.createElement(
    "svg",
    {
      className: "w-full h-full transition-transform duration-200",
      viewBox: "0 0 900 550",
      style: { transform: `scale(${zoomLevel})` }
    },
    communityClustering && /* @__PURE__ */ React.createElement("g", { className: "transition-opacity duration-500" }, /* @__PURE__ */ React.createElement("ellipse", { cx: "450", cy: "220", rx: "200", ry: "150", fill: "rgba(43, 108, 176, 0.08)", stroke: "#3182CE", strokeDasharray: "4 4", strokeWidth: "1.5" }), /* @__PURE__ */ React.createElement("text", { x: "320", y: "90", fill: "#3182CE", fontSize: "10", fontWeight: "bold" }, "COMMUNITY #1: VALKOV EXECUTIVE CORE"), /* @__PURE__ */ React.createElement("ellipse", { cx: "700", cy: "380", rx: "140", ry: "90", fill: "rgba(221, 107, 32, 0.08)", stroke: "#DD6B20", strokeDasharray: "4 4", strokeWidth: "1.5" }), /* @__PURE__ */ React.createElement("text", { x: "600", y: "320", fill: "#DD6B20", fontSize: "10", fontWeight: "bold" }, "COMMUNITY #2: FINANCIAL HAWALA")),
    /* @__PURE__ */ React.createElement("g", { className: "edges" }, edges.map((edge) => {
      const source = nodes.find((n) => n.id === edge.source);
      const target = nodes.find((n) => n.id === edge.target);
      if (!source || !target) return null;
      const isSelected = selectedNode && (selectedNode.id === source.id || selectedNode.id === target.id);
      return /* @__PURE__ */ React.createElement("g", { key: edge.id }, /* @__PURE__ */ React.createElement(
        "line",
        {
          x1: source.x,
          y1: source.y,
          x2: target.x,
          y2: target.y,
          stroke: isSelected ? "#2B6CB0" : "#CBD5E0",
          strokeWidth: isSelected ? 2.5 : edge.weight || 1.5,
          strokeDasharray: edge.type === "COMMUNICATION" ? "3 3" : void 0,
          className: "transition-all"
        }
      ), /* @__PURE__ */ React.createElement(
        "text",
        {
          x: (source.x + target.x) / 2,
          y: (source.y + target.y) / 2 - 4,
          fill: "#718096",
          fontSize: "8",
          textAnchor: "middle",
          className: "select-none pointer-events-none"
        },
        edge.relationship
      ));
    })),
    /* @__PURE__ */ React.createElement("g", { className: "nodes" }, filteredNodes.map((node) => {
      const colors = getNodeColor(node.type);
      const isSelected = selectedNode?.id === node.id;
      const radius = node.type === "PERSON" ? 24 : 18;
      return /* @__PURE__ */ React.createElement(
        "g",
        {
          key: node.id,
          transform: `translate(${node.x}, ${node.y})`,
          onClick: () => setSelectedNode(node),
          className: "cursor-pointer group"
        },
        isSelected && /* @__PURE__ */ React.createElement(
          "circle",
          {
            r: radius + 6,
            fill: "none",
            stroke: "#2B6CB0",
            strokeWidth: "2.5",
            strokeDasharray: "4 2",
            className: "animate-spin",
            style: { transformOrigin: "center" }
          }
        ),
        /* @__PURE__ */ React.createElement(
          "circle",
          {
            r: radius,
            fill: colors.fill,
            stroke: colors.stroke,
            strokeWidth: isSelected ? 3 : 2,
            className: "group-hover:stroke-tactical-primary-500 transition-all shadow-md"
          }
        ),
        /* @__PURE__ */ React.createElement(
          "text",
          {
            y: 4,
            fill: colors.text,
            fontSize: node.type === "PERSON" ? "9" : "7.5",
            fontWeight: "bold",
            textAnchor: "middle",
            className: "select-none pointer-events-none font-mono"
          },
          node.label.length > 12 ? node.label.slice(0, 10) + ".." : node.label
        ),
        /* @__PURE__ */ React.createElement(
          "text",
          {
            y: radius + 12,
            fill: "#4A5568",
            fontSize: "8",
            fontWeight: "600",
            textAnchor: "middle",
            className: "select-none pointer-events-none font-mono"
          },
          node.type
        )
      );
    }))
  )), selectedNode && /* @__PURE__ */ React.createElement("aside", { className: "w-80 sm:w-96 bg-white dark:bg-tactical-neutral-900 border-l border-tactical-neutral-200 dark:border-tactical-neutral-800 p-5 flex flex-col justify-between overflow-y-auto z-20 shadow-xl" }, /* @__PURE__ */ React.createElement("div", { className: "space-y-4" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between pb-2 border-b border-tactical-neutral-200 dark:border-tactical-neutral-800" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React.createElement("div", { className: "w-6 h-6 rounded bg-tactical-primary-100 dark:bg-tactical-primary-950 text-tactical-primary-700 flex items-center justify-center" }, getNodeIcon(selectedNode.type)), /* @__PURE__ */ React.createElement("span", { className: "font-bold text-xs uppercase text-tactical-neutral-900 dark:text-tactical-neutral-100" }, "Node Inspector")), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => setSelectedNode(null),
      className: "p-1 rounded text-tactical-neutral-400 hover:text-tactical-neutral-700 dark:hover:text-tactical-neutral-200"
    },
    /* @__PURE__ */ React.createElement(X, { className: "w-4 h-4" })
  )), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", { className: "text-[10px] text-tactical-neutral-500 uppercase block" }, "Entity Label"), /* @__PURE__ */ React.createElement("h3", { className: "text-base font-bold text-tactical-neutral-900 dark:text-tactical-neutral-100" }, selectedNode.label), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 mt-1" }, /* @__PURE__ */ React.createElement(Badge, { variant: "primary", size: "sm" }, selectedNode.type), /* @__PURE__ */ React.createElement("span", { className: "text-[10px] text-tactical-neutral-500" }, "ID: ", selectedNode.id))), /* @__PURE__ */ React.createElement("div", { className: "p-3 bg-tactical-neutral-50 dark:bg-tactical-neutral-800/60 rounded border border-tactical-neutral-200 dark:border-tactical-neutral-700 text-xs space-y-1.5" }, /* @__PURE__ */ React.createElement("div", { className: "flex justify-between" }, /* @__PURE__ */ React.createElement("span", { className: "text-tactical-neutral-500" }, "Degree Centrality:"), /* @__PURE__ */ React.createElement("span", { className: "font-bold text-tactical-neutral-900 dark:text-tactical-neutral-100" }, edges.filter((e) => e.source === selectedNode.id || e.target === selectedNode.id).length, " Connected Links")), /* @__PURE__ */ React.createElement("div", { className: "flex justify-between" }, /* @__PURE__ */ React.createElement("span", { className: "text-tactical-neutral-500" }, "Betweenness Score:"), /* @__PURE__ */ React.createElement("span", { className: "font-bold text-tactical-primary-600" }, "0.892 (High Brokerage)")), /* @__PURE__ */ React.createElement("div", { className: "flex justify-between" }, /* @__PURE__ */ React.createElement("span", { className: "text-tactical-neutral-500" }, "Associated Dockets:"), /* @__PURE__ */ React.createElement("span", { className: "font-bold text-tactical-neutral-900 dark:text-tactical-neutral-100" }, "FED-2026-0042"))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h4", { className: "text-xs font-bold uppercase text-tactical-neutral-700 dark:text-tactical-neutral-300 mb-2" }, "Correlated Entity Links"), /* @__PURE__ */ React.createElement("div", { className: "space-y-1.5" }, edges.filter((e) => e.source === selectedNode.id || e.target === selectedNode.id).map((edge) => {
    const otherNodeId = edge.source === selectedNode.id ? edge.target : edge.source;
    const neighbor = nodes.find((n) => n.id === otherNodeId);
    return /* @__PURE__ */ React.createElement(
      "div",
      {
        key: edge.id,
        onClick: () => neighbor && setSelectedNode(neighbor),
        className: "p-2 rounded bg-tactical-neutral-50 dark:bg-tactical-neutral-800 hover:bg-tactical-primary-50 dark:hover:bg-tactical-primary-950/60 border border-tactical-neutral-200 dark:border-tactical-neutral-700 cursor-pointer flex items-center justify-between text-xs transition-colors"
      },
      /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "font-semibold text-tactical-neutral-800 dark:text-tactical-neutral-200 truncate max-w-[170px]" }, neighbor?.label || otherNodeId), /* @__PURE__ */ React.createElement("div", { className: "text-[10px] text-tactical-neutral-500" }, "REL: ", edge.relationship)),
      /* @__PURE__ */ React.createElement(ArrowRight, { className: "w-3.5 h-3.5 text-tactical-neutral-400 shrink-0" })
    );
  })))), /* @__PURE__ */ React.createElement("div", { className: "pt-4 border-t border-tactical-neutral-200 dark:border-tactical-neutral-800 space-y-2" }, /* @__PURE__ */ React.createElement(
    Button,
    {
      variant: "primary",
      size: "sm",
      className: "w-full text-xs",
      onClick: () => alert(`Centering map on geo coordinates for node ${selectedNode.label}`)
    },
    "Trace Geo-Spatial Location"
  )))));
};
export {
  NetworkAnalysisPage
};
