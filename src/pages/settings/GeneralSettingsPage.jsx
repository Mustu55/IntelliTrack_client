import React, { useState } from "react";
import { 
  Settings, 
  ShieldCheck, 
  Terminal, 
  Save, 
  HardDrive, 
  Key, 
  Cpu,
  Layers,
  Eye,
  Sliders,
  BellRing,
  CheckCircle2
} from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Link, useLocation } from "react-router-dom";
import toast from "react-hot-toast";

export const GeneralSettingsPage = () => {
  const { theme, setTheme } = useTheme();
  const location = useLocation();

  const [appName, setAppName] = useState("IntelliTrack · Core Intelligence");
  const [defaultDocket, setDefaultDocket] = useState("FED-2026-8812");
  const [autoPurgeDays, setAutoPurgeDays] = useState("90");
  const [cjisEnforcement, setCjisEnforcement] = useState(true);
  const [hardwareAcceleration, setHardwareAcceleration] = useState(true);
  const [autoGraphCluster, setAutoGraphCluster] = useState(true);
  const [realtimeDispatcher, setRealtimeDispatcher] = useState(true);

  const handleSave = (e) => {
    e.preventDefault();
    toast.success("System administration preferences saved under FIPS-140-3 audit");
  };

  const navTabs = [
    { label: "General", path: "/settings" },
    { label: "Integrations", path: "/settings/integrations" },
    { label: "Schema & Ontology", path: "/settings/schema" },
    { label: "User Management", path: "/settings/users" },
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#222731]">
        <div>
          <div className="flex items-center gap-2 text-tactical-neutral-500 text-[11px] uppercase tracking-wider font-mono mb-1">
            <span>GOVERNANCE & CONFIGURATION</span>
            <span>/</span>
            <span className="text-tactical-sage-400 font-semibold">GENERAL SETTINGS</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Cockpit Settings & Preferences
          </h1>
          <p className="text-xs text-tactical-neutral-400 mt-0.5">
            Configure analytical terminal behavior, UI themes, CJIS compliance defaults, and retention rules
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="sage"
            size="sm"
            onClick={handleSave}
            icon={<Save className="w-3.5 h-3.5" />}
            className="text-xs font-mono"
          >
            Save Changes
          </Button>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-1.5 p-1 bg-[#14171c] border border-[#222731] rounded-lg text-xs font-mono w-fit">
        {navTabs.map((tab) => {
          const isActive = location.pathname === tab.path;
          return (
            <Link
              key={tab.path}
              to={tab.path}
              className={`px-3.5 py-1.5 rounded-md font-medium transition-colors ${
                isActive
                  ? "bg-[#1c222b] text-white border border-[#2e3644] shadow-sm"
                  : "text-tactical-neutral-400 hover:text-white hover:bg-[#181c22]"
              }`}
            >
              {tab.label}
            </Link>
          );
        })}
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 font-mono text-xs">
        <div className="bg-[#14171c] border border-[#222731] rounded-xl p-4">
          <div className="flex items-center justify-between text-[11px] text-tactical-neutral-500 font-semibold mb-1">
            <span>COMPLIANCE TIER</span>
            <ShieldCheck className="w-3.5 h-3.5 text-tactical-sage-400" />
          </div>
          <div className="text-base font-bold text-white tracking-tight">CJIS Level 4</div>
          <div className="text-[10px] text-tactical-neutral-500 mt-0.5">Strict IP/MAC auditing</div>
        </div>

        <div className="bg-[#14171c] border border-[#222731] rounded-xl p-4">
          <div className="flex items-center justify-between text-[11px] text-tactical-neutral-500 font-semibold mb-1">
            <span>CRYPTO STANDARD</span>
            <Key className="w-3.5 h-3.5 text-tactical-neutral-400" />
          </div>
          <div className="text-base font-bold text-tactical-neutral-200 tracking-tight">FIPS 140-3</div>
          <div className="text-[10px] text-tactical-neutral-500 mt-0.5">Hardware token bound</div>
        </div>

        <div className="bg-[#14171c] border border-[#222731] rounded-xl p-4">
          <div className="flex items-center justify-between text-[11px] text-tactical-neutral-500 font-semibold mb-1">
            <span>AUTO-PURGE HOLD</span>
            <HardDrive className="w-3.5 h-3.5 text-tactical-neutral-400" />
          </div>
          <div className="text-base font-bold text-white tracking-tight">{autoPurgeDays} Days</div>
          <div className="text-[10px] text-tactical-neutral-500 mt-0.5">Evidentiary custody hold</div>
        </div>

        <div className="bg-[#14171c] border border-[#222731] rounded-xl p-4">
          <div className="flex items-center justify-between text-[11px] text-tactical-neutral-500 font-semibold mb-1">
            <span>HASH ANCHOR</span>
            <Cpu className="w-3.5 h-3.5 text-tactical-success-400" />
          </div>
          <div className="text-base font-bold text-tactical-success-400 tracking-tight">FRE 902(14)</div>
          <div className="text-[10px] text-tactical-neutral-500 mt-0.5">Continuous integrity</div>
        </div>
      </div>

      {/* Main Settings Form */}
      <form onSubmit={handleSave} className="space-y-5">
        {/* Terminal Appearance & Identity */}
        <div className="bg-[#14171c] border border-[#222731] rounded-xl p-6 space-y-5">
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-tactical-neutral-300 border-b border-[#222731] pb-3 flex items-center gap-2">
            <Terminal className="w-4 h-4 text-tactical-sage-400" />
            <span>Terminal Appearance & Environment</span>
          </div>

          <div className="space-y-4 text-xs font-mono">
            <div>
              <label className="text-tactical-neutral-400 block mb-1.5 font-medium">Terminal Instance Title</label>
              <input
                type="text"
                value={appName}
                onChange={(e) => setAppName(e.target.value)}
                className="w-full bg-[#101317] border border-[#222731] rounded-lg px-3.5 py-2 text-white focus:outline-none focus:border-tactical-sage-400/50 transition-colors"
              />
            </div>

            <div>
              <label className="text-tactical-neutral-400 block mb-1.5 font-medium">Cockpit Theme Style</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setTheme("dark")}
                  className={`p-3 rounded-lg border text-left flex items-start justify-between transition-all ${
                    theme === "dark"
                      ? "bg-[#181d24] border-tactical-sage-400/60 shadow-sm"
                      : "bg-[#101317] border-[#222731] text-tactical-neutral-400 hover:text-white"
                  }`}
                >
                  <div>
                    <div className="font-semibold text-white">Dark Analytical Minimal (Recommended)</div>
                    <div className="text-[11px] text-tactical-neutral-400 mt-0.5 font-sans">
                      Deep charcoal #0d0f11 canvas with sage green accents
                    </div>
                  </div>
                  {theme === "dark" && <CheckCircle2 className="w-4 h-4 text-tactical-sage-400 shrink-0 mt-0.5" />}
                </button>

                <button
                  type="button"
                  onClick={() => setTheme("light")}
                  className={`p-3 rounded-lg border text-left flex items-start justify-between transition-all ${
                    theme === "light"
                      ? "bg-[#181d24] border-tactical-sage-400/60 shadow-sm"
                      : "bg-[#101317] border-[#222731] text-tactical-neutral-400 hover:text-white"
                  }`}
                >
                  <div>
                    <div className="font-semibold text-white">Institutional Light Canvas</div>
                    <div className="text-[11px] text-tactical-neutral-400 mt-0.5 font-sans">
                      Clean high-contrast mode for document export
                    </div>
                  </div>
                  {theme === "light" && <CheckCircle2 className="w-4 h-4 text-tactical-sage-400 shrink-0 mt-0.5" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Analytical Engine Controls */}
        <div className="bg-[#14171c] border border-[#222731] rounded-xl p-6 space-y-4">
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-tactical-neutral-300 border-b border-[#222731] pb-3 flex items-center gap-2">
            <Sliders className="w-4 h-4 text-tactical-sage-400" />
            <span>Analytical Engine & Graph Acceleration</span>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3.5 rounded-lg bg-[#101317] border border-[#222731]">
              <div>
                <div className="text-xs font-semibold text-white">Three.js / WebGL Hardware Acceleration</div>
                <div className="text-[11px] text-tactical-neutral-400 mt-0.5 font-sans">
                  Enables GPU-accelerated node layouts and spatial particles
                </div>
              </div>
              <input
                type="checkbox"
                checked={hardwareAcceleration}
                onChange={(e) => setHardwareAcceleration(e.target.checked)}
                className="w-4 h-4 rounded bg-[#14171c] border-[#222731] accent-tactical-sage-500 cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between p-3.5 rounded-lg bg-[#101317] border border-[#222731]">
              <div>
                <div className="text-xs font-semibold text-white">Auto-Clustering Network Louvain Communities</div>
                <div className="text-[11px] text-tactical-neutral-400 mt-0.5 font-sans">
                  Automatically partition dense graph clusters into modular visual hulls
                </div>
              </div>
              <input
                type="checkbox"
                checked={autoGraphCluster}
                onChange={(e) => setAutoGraphCluster(e.target.checked)}
                className="w-4 h-4 rounded bg-[#14171c] border-[#222731] accent-tactical-sage-500 cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between p-3.5 rounded-lg bg-[#101317] border border-[#222731]">
              <div>
                <div className="text-xs font-semibold text-white">Real-Time Signal Dispatcher (WebSocket)</div>
                <div className="text-[11px] text-tactical-neutral-400 mt-0.5 font-sans">
                  Stream live evidence matches and high-confidence lead alerts instantly
                </div>
              </div>
              <input
                type="checkbox"
                checked={realtimeDispatcher}
                onChange={(e) => setRealtimeDispatcher(e.target.checked)}
                className="w-4 h-4 rounded bg-[#14171c] border-[#222731] accent-tactical-sage-500 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Compliance & Automated Retention */}
        <div className="bg-[#14171c] border border-[#222731] rounded-xl p-6 space-y-4">
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-tactical-neutral-300 border-b border-[#222731] pb-3 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-tactical-sage-400" />
            <span>Compliance & Evidentiary Retention</span>
          </div>

          <div className="space-y-4 text-xs font-mono">
            <div className="flex items-center justify-between p-3.5 rounded-lg bg-[#101317] border border-[#222731]">
              <div>
                <div className="text-xs font-semibold text-white">Enforce CJIS Standard Level 4 Controls</div>
                <div className="text-[11px] text-tactical-neutral-400 mt-0.5 font-sans">
                  Mandatory session audit trails, IP bound tokens, and multi-factor hardware signing
                </div>
              </div>
              <input
                type="checkbox"
                checked={cjisEnforcement}
                onChange={(e) => setCjisEnforcement(e.target.checked)}
                className="w-4 h-4 rounded bg-[#14171c] border-[#222731] accent-tactical-sage-500 cursor-pointer"
              />
            </div>

            <div>
              <label className="text-tactical-neutral-400 block mb-1.5 font-medium">Evidentiary Retention Period (Days)</label>
              <input
                type="number"
                value={autoPurgeDays}
                onChange={(e) => setAutoPurgeDays(e.target.value)}
                className="w-48 bg-[#101317] border border-[#222731] rounded-lg px-3.5 py-2 text-white focus:outline-none focus:border-tactical-sage-400/50 transition-colors"
              />
              <span className="text-[10px] text-tactical-neutral-500 mt-1 block">
                Evidence files are cryptographically locked until formal judicial docket close
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <Button
            type="submit"
            variant="sage"
            size="md"
            icon={<Save className="w-4 h-4" />}
            className="font-mono text-xs"
          >
            Save Configuration
          </Button>
        </div>
      </form>
    </div>
  );
};

export default GeneralSettingsPage;
