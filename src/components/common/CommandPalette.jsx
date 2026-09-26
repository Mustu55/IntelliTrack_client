import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useCommandPalette } from "@/context/CommandPaletteContext";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { mockPersons, mockCases, mockLeads } from "@/constants/mockData";
import {
  Search,
  FileText,
  User,
  AlertTriangle,
  Compass,
  Shield,
  Moon,
  Sun,
  Activity,
  ArrowRight
} from "lucide-react";
import { cn } from "@/utils/cn";
const CommandPalette = () => {
  const { isOpen, closePalette } = useCommandPalette();
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();
  const { user, switchRole } = useAuth();
  const { theme, toggleTheme } = useTheme();
  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedIndex(0);
    }
  }, [isOpen]);
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const items = [];
    items.push({
      id: "cmd-theme",
      title: `Toggle Theme (Current: ${theme.toUpperCase()})`,
      subtitle: "Switch between Tactical Light and Night Ops Dark interface",
      category: "Commands",
      icon: theme === "dark" ? /* @__PURE__ */ React.createElement(Sun, { className: "w-4 h-4 text-tactical-warning-500" }) : /* @__PURE__ */ React.createElement(Moon, { className: "w-4 h-4 text-tactical-primary-500" }),
      action: () => {
        toggleTheme();
        closePalette();
      }
    });
    items.push({
      id: "cmd-switch-role",
      title: `Switch Role (Active: ${user?.role === "ADMIN" ? "Commander (Admin)" : "Investigator (Agent)"})`,
      subtitle: user?.role === "ADMIN" ? "Transition to Field Agent workspace" : "Elevate clearance to Command Admin",
      category: "Commands",
      icon: /* @__PURE__ */ React.createElement(Shield, { className: "w-4 h-4 text-tactical-danger-500" }),
      action: () => {
        switchRole(user?.role === "ADMIN" ? "AGENT" : "ADMIN");
        closePalette();
      }
    });
    const navRoutes = [
      { name: "Cockpit Dashboard", path: "/dashboard", desc: "Active Case Telemetry, KPIs & Threat Metrics" },
      { name: "Case Dockets & Vaults", path: "/cases", desc: "Case dockets, custody chains & federal warrants" },
      { name: "Data Ingestion Feeds", path: "/data/sources", desc: "RMS, CDR, ALPR & FinCEN connectors" },
      { name: "Batch Extraction Jobs", path: "/data/extraction", desc: "NLP NER entity extraction jobs & parser telemetry" },
      { name: "Normalized Schema Viewer", path: "/data/schema", desc: "Investigation schema definitions & graph edge models" },
      { name: "Entity Intelligence Directory", path: "/entities", desc: "Resolved persons, syndicates & biometric dossiers" },
      { name: "Identity Resolution Workbench", path: "/entities/resolution", desc: "Multi-vector deduplication & Jaro-Winkler diffs" },
      { name: "ForceAtlas2 Network Graph", path: "/network-graph", desc: "Syndicate topology, centrality & Louvain clustering" },
      { name: "GIS Surveillance Map", path: "/geo-temporal", desc: "Azimuth radiation sectors, heatmap & ALPR trajectories" },
      { name: "Multi-Track Event Timeline", path: "/timeline", desc: "Synchronized event chronometer & intercept logs" },
      { name: "Spatio-Temporal Patterns", path: "/patterns", desc: "Co-travel detection, burner swaps & suspicious recurrence" },
      { name: "Explainable Lead Prioritization", path: "/leads", desc: "FRE 902 compliant AI lead matrix & investigative notes" },
      { name: "Executive Intelligence Briefing", path: "/intelligence/summary", desc: "Synthesized findings, perspective switchers & PDF export" },
      { name: "General System Settings", path: "/settings/general", desc: "Node ID, retention policies & classification banners" },
      { name: "CJIS & RMS Integrations", path: "/settings/integrations", desc: "External agency feeds, NCIC & FinCEN API tokens" },
      { name: "Entity Ontology Schema", path: "/settings/schema", desc: "Custom entity types, attribute rules & link models" },
      { name: "Personnel & Clearance Access", path: "/settings/users", desc: "RBAC, CJIS clearances, PIV key provisioning" }
    ];
    navRoutes.forEach((route) => {
      if (!q || route.name.toLowerCase().includes(q) || route.desc.toLowerCase().includes(q)) {
        items.push({
          id: `nav-${route.path}`,
          title: route.name,
          subtitle: route.desc,
          category: "Navigation",
          icon: /* @__PURE__ */ React.createElement(Compass, { className: "w-4 h-4 text-tactical-primary-600" }),
          action: () => {
            navigate(route.path);
            closePalette();
          }
        });
      }
    });
    mockPersons.forEach((person) => {
      const match = !q || person.fullName.toLowerCase().includes(q) || person.aliases.some((a) => a.toLowerCase().includes(q)) || person.fbiNumber?.toLowerCase().includes(q) || person.threatLevel.toLowerCase().includes(q);
      if (match) {
        items.push({
          id: `poi-${person.id}`,
          title: `${person.fullName} (${person.primaryAlias || "No Alias"})`,
          subtitle: `FBI: ${person.fbiNumber || "PENDING"} \u2022 Threat: ${person.threatLevel} \u2022 ${person.citizenship}`,
          category: "POI Dossiers",
          icon: /* @__PURE__ */ React.createElement(User, { className: "w-4 h-4 text-tactical-danger-600" }),
          action: () => {
            navigate(`/persons`);
            closePalette();
          }
        });
      }
    });
    mockCases.forEach((c) => {
      const match = !q || c.caseNumber.toLowerCase().includes(q) || c.title.toLowerCase().includes(q) || c.classification && c.classification.toLowerCase().includes(q);
      if (match) {
        items.push({
          id: `case-${c.id}`,
          title: `${c.caseNumber}: ${c.title}`,
          subtitle: `${c.classification || "Federal Case"} \u2022 Priority: ${c.priority} \u2022 Lead: ${c.leadInvestigator}`,
          category: "Dockets",
          icon: /* @__PURE__ */ React.createElement(FileText, { className: "w-4 h-4 text-tactical-primary-500" }),
          action: () => {
            navigate(`/cases/${c.id}`);
            closePalette();
          }
        });
      }
    });
    mockLeads.forEach((lead) => {
      const match = !q || lead.leadNumber.toLowerCase().includes(q) || lead.headline.toLowerCase().includes(q) || lead.assignedTo.toLowerCase().includes(q);
      if (match) {
        items.push({
          id: `lead-${lead.id}`,
          title: `${lead.leadNumber}: ${lead.headline}`,
          subtitle: `Confidence Score: ${lead.confidenceScore}% \u2022 Action: ${lead.recommendedAction}`,
          category: "Leads",
          icon: /* @__PURE__ */ React.createElement(AlertTriangle, { className: "w-4 h-4 text-tactical-warning-500" }),
          action: () => {
            navigate(`/leads`);
            closePalette();
          }
        });
      }
    });
    return items;
  }, [query, theme, toggleTheme, user, switchRole, navigate, closePalette]);
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => prev < results.length - 1 ? prev + 1 : 0);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => prev > 0 ? prev - 1 : results.length - 1);
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (results[selectedIndex]) {
          results[selectedIndex].action();
        }
      } else if (e.key === "Escape") {
        e.preventDefault();
        closePalette();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, results, selectedIndex, closePalette]);
  if (!isOpen) return null;
  return /* @__PURE__ */ React.createElement("div", { className: "fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-navy-950/80 backdrop-blur-md animate-in fade-in duration-150" }, /* @__PURE__ */ React.createElement(
    "div",
    {
      className: "w-full max-w-2xl bg-navy-900 border border-navy-700 rounded shadow-2xl overflow-hidden flex flex-col max-h-[75vh]",
      onClick: (e) => e.stopPropagation()
    },
    /* @__PURE__ */ React.createElement("div", { className: "flex items-center px-4 py-3 border-b border-navy-800 bg-navy-950/90" }, /* @__PURE__ */ React.createElement(Search, { className: "w-5 h-5 text-steel-400 shrink-0 mr-3" }), /* @__PURE__ */ React.createElement(
      "input",
      {
        type: "text",
        className: "flex-1 bg-transparent text-sm font-mono text-slate-100 placeholder-slate-500 focus:outline-none",
        placeholder: "Search cross-jurisdictional intelligence (e.g., 'Valkov', 'Nightshade', 'FED-2026')...",
        value: query,
        onChange: (e) => {
          setQuery(e.target.value);
          setSelectedIndex(0);
        },
        autoFocus: true
      }
    ), /* @__PURE__ */ React.createElement("kbd", { className: "hidden sm:inline-block px-1.5 py-0.5 font-mono text-[10px] uppercase font-semibold bg-navy-800 text-slate-400 rounded border border-navy-700" }, "ESC to close")),
    /* @__PURE__ */ React.createElement("div", { className: "flex-1 overflow-y-auto p-2 divide-y divide-navy-800/40" }, results.length === 0 ? /* @__PURE__ */ React.createElement("div", { className: "p-8 text-center" }, /* @__PURE__ */ React.createElement(Activity, { className: "w-8 h-8 text-steel-500/50 mx-auto mb-2" }), /* @__PURE__ */ React.createElement("p", { className: "font-mono text-xs uppercase text-slate-400" }, "[NO QUERY MATCHES IDENTIFIED]"), /* @__PURE__ */ React.createElement("p", { className: "text-xs text-slate-500 mt-1" }, "Try searching for POI aliases, court dockets, FBI numbers, or tactical commands.")) : results.map((item, idx) => {
      const isSelected = idx === selectedIndex;
      return /* @__PURE__ */ React.createElement(
        "div",
        {
          key: item.id,
          onClick: item.action,
          onMouseEnter: () => setSelectedIndex(idx),
          className: cn(
            "flex items-center justify-between px-3 py-2.5 rounded cursor-pointer transition-colors",
            isSelected ? "bg-steel-600/20 border border-steel-500/50 text-white" : "hover:bg-navy-800/60 border border-transparent text-slate-300"
          )
        },
        /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-3 min-w-0 pr-2" }, /* @__PURE__ */ React.createElement(
          "div",
          {
            className: cn(
              "w-7 h-7 rounded flex items-center justify-center shrink-0 border",
              isSelected ? "bg-steel-600/30 border-steel-400 text-steel-300" : "bg-navy-800 border-navy-700 text-slate-400"
            )
          },
          item.icon
        ), /* @__PURE__ */ React.createElement("div", { className: "min-w-0" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React.createElement("span", { className: "font-mono text-xs font-semibold text-slate-100 truncate" }, item.title), /* @__PURE__ */ React.createElement("span", { className: "text-[10px] font-mono px-1.5 py-0.2 rounded bg-navy-800 text-steel-400 border border-navy-700 shrink-0" }, item.category)), /* @__PURE__ */ React.createElement("div", { className: "text-[11px] text-slate-400 truncate" }, item.subtitle))),
        /* @__PURE__ */ React.createElement(
          ArrowRight,
          {
            className: cn(
              "w-4 h-4 shrink-0 transition-opacity",
              isSelected ? "opacity-100 text-steel-400" : "opacity-0"
            )
          }
        )
      );
    })),
    /* @__PURE__ */ React.createElement("div", { className: "px-4 py-2 bg-navy-950 border-t border-navy-800 text-[11px] font-mono text-slate-400 flex items-center justify-between" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-3" }, /* @__PURE__ */ React.createElement("span", null, "\u2191\u2193 Navigate"), /* @__PURE__ */ React.createElement("span", null, "\u21B5 Select"), /* @__PURE__ */ React.createElement("span", null, "Esc Close")), /* @__PURE__ */ React.createElement("span", { className: "uppercase text-[10px] text-steel-400 font-semibold tracking-wider" }, "FIPS 140-3 COMPLIANT INDEX"))
  ));
};
export {
  CommandPalette
};
