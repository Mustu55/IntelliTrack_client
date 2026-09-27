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
  ArrowRight,
  RotateCw
} from "lucide-react";
import { cn } from "@/utils/cn";

export const CommandPalette = () => {
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
      title: `Toggle Cockpit Theme (Current: ${theme.toUpperCase()})`,
      subtitle: "Switch between Dark Analytical Canvas and High-Contrast Light Mode",
      category: "Commands",
      icon: theme === "dark" ? <Sun className="w-4 h-4 text-tactical-warning-400" /> : <Moon className="w-4 h-4 text-tactical-sage-400" />,
      action: () => {
        toggleTheme();
        closePalette();
      }
    });

    items.push({
      id: "cmd-switch-role",
      title: `Switch Persona (Active: ${user?.role === "ADMIN" ? "Supervisor" : "Analyst"})`,
      subtitle: user?.role === "ADMIN" ? "Switch to Senior Field Analyst view" : "Elevate to Lead Supervisor Admin",
      category: "Commands",
      icon: <RotateCw className="w-4 h-4 text-tactical-sage-400" />,
      action: () => {
        switchRole(user?.role === "ADMIN" ? "AGENT" : "ADMIN");
        closePalette();
      }
    });

    const navRoutes = [
      { name: "Cockpit Dashboard", path: "/dashboard", desc: "Active investigation telemetry, KPIs & threat summary" },
      { name: "Case Dockets & Vaults", path: "/cases", desc: "Active cases, custody chains & judicial dockets" },
      { name: "Entity Intelligence", path: "/entities", desc: "Profiles, aliases, phone numbers & biometrics" },
      { name: "Network Graph Analysis", path: "/network", desc: "Interactive ForceAtlas2 graph, Louvain clustering & bridges" },
      { name: "Geo-Temporal Intelligence", path: "/geo-temporal", desc: "Contour GIS map, waypoint trails & timeline scrubber" },
      { name: "Event Timeline", path: "/timeline", desc: "Chronological event sequence, intercepts & wiretaps" },
      { name: "Investigative Leads", path: "/leads", desc: "Prioritized explainable AI signals & verification queues" },
      { name: "Evidence Repository", path: "/evidence", desc: "FRE 902(14) digital chain of custody & SHA-256 integrity" },
      { name: "Intelligence Reports", path: "/reports", desc: "Formal executive briefings & synthesized case summaries" },
      { name: "Data Sources & Ingestion", path: "/data/sources", desc: "CAD, RMS, CDR, ALPR & FinCEN connectors" },
      { name: "Batch Extraction Jobs", path: "/data/extraction", desc: "NLP entity extraction pipelines & execution logs" },
      { name: "System Settings", path: "/settings", desc: "Compliance defaults, UI theme & token retention" },
      { name: "Analyst Profile", path: "/profile", desc: "PIV token binding, active sessions & security clearance" },
      { name: "Signal Notifications", path: "/notifications", desc: "Automated alerts, entity changes & case dispatches" }
    ];

    navRoutes.forEach((route) => {
      if (!q || route.name.toLowerCase().includes(q) || route.desc.toLowerCase().includes(q)) {
        items.push({
          id: `nav-${route.path}`,
          title: route.name,
          subtitle: route.desc,
          category: "Navigation",
          icon: <Compass className="w-4 h-4 text-tactical-sage-400" />,
          action: () => {
            navigate(route.path);
            closePalette();
          }
        });
      }
    });

    mockPersons.forEach((person) => {
      const match = !q || person.fullName.toLowerCase().includes(q) || person.aliases?.some((a) => a.toLowerCase().includes(q)) || person.fbiNumber?.toLowerCase().includes(q);
      if (match) {
        items.push({
          id: `poi-${person.id}`,
          title: `${person.fullName} (${person.primaryAlias || "No Alias"})`,
          subtitle: `FBI: ${person.fbiNumber || "PENDING"} • Threat: ${person.threatLevel || "ELEVATED"}`,
          category: "Entities",
          icon: <User className="w-4 h-4 text-tactical-sage-400" />,
          action: () => {
            navigate(`/entities/${person.id}`);
            closePalette();
          }
        });
      }
    });

    mockCases.forEach((c) => {
      const match = !q || c.caseNumber.toLowerCase().includes(q) || c.title.toLowerCase().includes(q);
      if (match) {
        items.push({
          id: `case-${c.id}`,
          title: `${c.caseNumber}: ${c.title}`,
          subtitle: `${c.classification || "Federal Case"} • Priority: ${c.priority} • Lead: ${c.leadInvestigator}`,
          category: "Cases",
          icon: <FileText className="w-4 h-4 text-tactical-neutral-300" />,
          action: () => {
            navigate(`/cases/${c.id}`);
            closePalette();
          }
        });
      }
    });

    mockLeads.forEach((lead) => {
      const match = !q || lead.leadNumber.toLowerCase().includes(q) || lead.headline.toLowerCase().includes(q);
      if (match) {
        items.push({
          id: `lead-${lead.id}`,
          title: `${lead.leadNumber}: ${lead.headline}`,
          subtitle: `Confidence: ${lead.confidenceScore}% • Action: ${lead.recommendedAction}`,
          category: "Leads",
          icon: <AlertTriangle className="w-4 h-4 text-tactical-warning-400" />,
          action: () => {
            navigate(`/leads/${lead.id}`);
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
        setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : 0));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : results.length - 1));
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

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        className="w-full max-w-2xl bg-[#14171c] border border-[#222731] rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[75vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center px-4 py-3 border-b border-[#222731] bg-[#101317]">
          <Search className="w-5 h-5 text-tactical-sage-400 shrink-0 mr-3" />
          <input
            type="text"
            className="flex-1 bg-transparent text-sm font-mono text-white placeholder-tactical-neutral-500 focus:outline-none"
            placeholder="Type a command or search entities, dockets, leads (e.g. 'Vance', 'Ghost Freight', 'Leads')..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            autoFocus
          />
          <kbd className="hidden sm:inline-block px-2 py-0.5 font-mono text-[10px] uppercase font-semibold bg-[#181d24] text-tactical-neutral-400 rounded border border-[#222731]">
            ESC
          </kbd>
        </div>

        <div className="flex-1 overflow-y-auto p-2 divide-y divide-[#222731]/40">
          {results.length === 0 ? (
            <div className="p-8 text-center">
              <Activity className="w-8 h-8 text-tactical-neutral-600 mx-auto mb-2" />
              <p className="font-mono text-xs uppercase text-tactical-neutral-400">
                [No Matches Found]
              </p>
              <p className="text-xs text-tactical-neutral-500 mt-1 font-sans">
                Try searching for entity names, cases, warrants, or tactical commands.
              </p>
            </div>
          ) : (
            results.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={item.id}
                  onClick={item.action}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={cn(
                    "flex items-center justify-between px-3 py-2.5 rounded-lg cursor-pointer transition-colors",
                    isSelected
                      ? "bg-[#1c222b] border border-[#2e3644] text-white shadow-sm"
                      : "hover:bg-[#181d24] border border-transparent text-tactical-neutral-300"
                  )}
                >
                  <div className="flex items-center gap-3 min-w-0 pr-2">
                    <div
                      className={cn(
                        "w-7 h-7 rounded-lg flex items-center justify-center shrink-0 border",
                        isSelected
                          ? "bg-[#252e3b] border-tactical-sage-400/40 text-tactical-sage-400"
                          : "bg-[#101317] border-[#222731] text-tactical-neutral-400"
                      )}
                    >
                      {item.icon}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-semibold text-white truncate">
                          {item.title}
                        </span>
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#101317] text-tactical-sage-400 border border-[#222731] shrink-0">
                          {item.category}
                        </span>
                      </div>
                      <div className="text-[11px] text-tactical-neutral-400 truncate font-sans">
                        {item.subtitle}
                      </div>
                    </div>
                  </div>

                  <ArrowRight
                    className={cn(
                      "w-4 h-4 shrink-0 transition-opacity text-tactical-sage-400",
                      isSelected ? "opacity-100" : "opacity-0"
                    )}
                  />
                </div>
              );
            })
          )}
        </div>

        <div className="px-4 py-2 bg-[#101317] border-t border-[#222731] text-[11px] font-mono text-tactical-neutral-500 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>Esc Close</span>
          </div>
          <span className="uppercase text-[10px] text-tactical-sage-400 font-semibold tracking-wider">
            GLOBAL INTELLIGENCE INDEX
          </span>
        </div>
      </div>
    </div>
  );
};

export default CommandPalette;
