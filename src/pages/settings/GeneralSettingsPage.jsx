import React, { useState } from "react";
import { Settings, ShieldCheck, Terminal, Save, HardDrive, Key, Cpu } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import toast from "react-hot-toast";
const GeneralSettingsPage = () => {
  const { theme, setTheme } = useTheme();
  const [appName, setAppName] = useState("IntelliTrack (v4.8.2-FED)");
  const [defaultDocket, setDefaultDocket] = useState("FED-2026-8812");
  const [autoPurgeDays, setAutoPurgeDays] = useState("90");
  const [cjisEnforcement, setCjisEnforcement] = useState(true);
  const handleSave = (e) => {
    e.preventDefault();
    toast.success("System administration preferences saved under FIPS-140-3 audit");
  };
  return /* @__PURE__ */ React.createElement("div", { className: "space-y-6 max-w-5xl mx-auto font-sans pb-16" }, /* @__PURE__ */ React.createElement("div", { className: "bg-[#161b22] border border-[#30363d] rounded-xl p-6 shadow-xl shadow-black/40 relative overflow-hidden" }, /* @__PURE__ */ React.createElement("div", { className: "absolute top-0 right-0 w-96 h-48 bg-slate-500/5 rounded-full blur-3xl pointer-events-none" }), /* @__PURE__ */ React.createElement("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-5 relative z-10" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#1e293b] border border-[#30363d] text-slate-300 font-mono text-[11px] uppercase tracking-wider mb-2" }, /* @__PURE__ */ React.createElement(Settings, { className: "w-3.5 h-3.5 text-slate-400" }), /* @__PURE__ */ React.createElement("span", null, "SYSTEM ADMINISTRATION \u2022 PLATINUM CORE")), /* @__PURE__ */ React.createElement("h1", { className: "text-2xl sm:text-3xl font-bold text-white tracking-tight" }, "General Cockpit Preferences"), /* @__PURE__ */ React.createElement("p", { className: "text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl leading-relaxed" }, "Configure analytical terminal behavior, UI themes, CJIS compliance defaults, and cryptographic retention rules.")))), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4 font-mono text-xs" }, /* @__PURE__ */ React.createElement("div", { className: "bg-[#161b22] border border-[#30363d] rounded-xl p-4 shadow-lg" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between text-[11px] text-slate-400 font-semibold mb-1" }, /* @__PURE__ */ React.createElement("span", null, "COMPLIANCE TIER"), /* @__PURE__ */ React.createElement(ShieldCheck, { className: "w-3.5 h-3.5 text-slate-400" })), /* @__PURE__ */ React.createElement("div", { className: "text-xl font-bold text-white tracking-tight" }, "CJIS Level 4"), /* @__PURE__ */ React.createElement("div", { className: "text-[10px] text-slate-400 mt-1" }, "Strict IP/MAC auditing")), /* @__PURE__ */ React.createElement("div", { className: "bg-[#161b22] border border-[#30363d] rounded-xl p-4 shadow-lg" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between text-[11px] text-slate-400 font-semibold mb-1" }, /* @__PURE__ */ React.createElement("span", null, "CRYPTO STANDARD"), /* @__PURE__ */ React.createElement(Key, { className: "w-3.5 h-3.5 text-slate-400" })), /* @__PURE__ */ React.createElement("div", { className: "text-xl font-bold text-slate-200 tracking-tight" }, "FIPS 140-3"), /* @__PURE__ */ React.createElement("div", { className: "text-[10px] text-slate-400 mt-1" }, "Hardware token security")), /* @__PURE__ */ React.createElement("div", { className: "bg-[#161b22] border border-[#30363d] rounded-xl p-4 shadow-lg" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between text-[11px] text-slate-400 font-semibold mb-1" }, /* @__PURE__ */ React.createElement("span", null, "AUTO-PURGE"), /* @__PURE__ */ React.createElement(HardDrive, { className: "w-3.5 h-3.5 text-slate-400" })), /* @__PURE__ */ React.createElement("div", { className: "text-xl font-bold text-white tracking-tight" }, autoPurgeDays, " Days"), /* @__PURE__ */ React.createElement("div", { className: "text-[10px] text-slate-400 mt-1" }, "Evidentiary custody hold")), /* @__PURE__ */ React.createElement("div", { className: "bg-[#161b22] border border-[#30363d] rounded-xl p-4 shadow-lg" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between text-[11px] text-slate-400 font-semibold mb-1" }, /* @__PURE__ */ React.createElement("span", null, "HASH ANCHOR"), /* @__PURE__ */ React.createElement(Cpu, { className: "w-3.5 h-3.5 text-slate-400" })), /* @__PURE__ */ React.createElement("div", { className: "text-xl font-bold text-emerald-400 tracking-tight" }, "Active"), /* @__PURE__ */ React.createElement("div", { className: "text-[10px] text-slate-400 mt-1" }, "FRE 902(14) Continuous"))), /* @__PURE__ */ React.createElement("form", { onSubmit: handleSave, className: "space-y-5 font-mono text-xs" }, /* @__PURE__ */ React.createElement("div", { className: "bg-[#161b22] border border-[#30363d] rounded-xl p-6 space-y-5 shadow-xl" }, /* @__PURE__ */ React.createElement("div", { className: "text-sm font-bold text-white uppercase border-b border-[#30363d] pb-3 flex items-center gap-2" }, /* @__PURE__ */ React.createElement(Terminal, { className: "w-4 h-4 text-slate-400" }), /* @__PURE__ */ React.createElement("span", null, "Terminal Appearance & Identity")), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: "text-slate-300 block mb-1.5 font-semibold" }, "Terminal Title / Instance Badge"), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "text",
      value: appName,
      onChange: (e) => setAppName(e.target.value),
      className: "w-full bg-[#0d1117] border border-[#30363d] rounded-lg px-3.5 py-2 text-white focus:outline-none focus:border-slate-500 transition-colors"
    }
  )), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: "text-slate-300 block mb-1.5 font-semibold" }, "Cockpit Palette Mode"), /* @__PURE__ */ React.createElement("div", { className: "flex flex-wrap gap-3" }, /* @__PURE__ */ React.createElement(
    "button",
    {
      type: "button",
      onClick: () => setTheme("dark"),
      className: `px-4 py-2.5 rounded-lg border font-semibold transition-all ${theme === "dark" ? "bg-[#30363d] text-white border-slate-500 shadow-md" : "bg-[#0d1117] border-[#30363d] text-slate-400 hover:text-white"}`
    },
    "Dark Tactical Cockpit (Multi-Color Themed)"
  ), /* @__PURE__ */ React.createElement(
    "button",
    {
      type: "button",
      onClick: () => setTheme("light"),
      className: `px-4 py-2.5 rounded-lg border font-semibold transition-all ${theme === "light" ? "bg-[#30363d] text-white border-slate-500 shadow-md" : "bg-[#0d1117] border-[#30363d] text-slate-400 hover:text-white"}`
    },
    "Institutional Light Mode"
  )))), /* @__PURE__ */ React.createElement("div", { className: "bg-[#161b22] border border-[#30363d] rounded-xl p-6 space-y-5 shadow-xl" }, /* @__PURE__ */ React.createElement("div", { className: "text-sm font-bold text-white uppercase border-b border-[#30363d] pb-3 flex items-center gap-2" }, /* @__PURE__ */ React.createElement(ShieldCheck, { className: "w-4 h-4 text-slate-400" }), /* @__PURE__ */ React.createElement("span", null, "Compliance & Automated Retention")), /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between p-3.5 rounded-xl bg-[#0d1117] border border-[#30363d]" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "text-white font-bold" }, "Enforce CJIS Standard Level 4 Controls"), /* @__PURE__ */ React.createElement("div", { className: "text-[11px] text-slate-400 mt-0.5" }, "Strict IP/MAC tracking and cryptographic audit logging")), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "checkbox",
      checked: cjisEnforcement,
      onChange: (e) => setCjisEnforcement(e.target.checked),
      className: "w-4 h-4 text-slate-600 rounded bg-[#161b22] border-[#30363d] accent-slate-500 cursor-pointer"
    }
  )), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: "text-slate-300 block mb-1.5 font-semibold" }, "Evidentiary Retention Period (Days)"), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "number",
      value: autoPurgeDays,
      onChange: (e) => setAutoPurgeDays(e.target.value),
      className: "w-48 bg-[#0d1117] border border-[#30363d] rounded-lg px-3.5 py-2 text-white focus:outline-none focus:border-slate-500 transition-colors"
    }
  ))), /* @__PURE__ */ React.createElement(
    "button",
    {
      type: "submit",
      className: "px-5 py-2.5 rounded-lg bg-slate-200 hover:bg-white text-black font-bold flex items-center gap-2 shadow-lg transition-all transform active:scale-95"
    },
    /* @__PURE__ */ React.createElement(Save, { className: "w-4 h-4" }),
    /* @__PURE__ */ React.createElement("span", null, "Save Preferences")
  )));
};
var stdin_default = GeneralSettingsPage;
export {
  GeneralSettingsPage,
  stdin_default as default
};
