import React, { useState } from "react";
import { FileSpreadsheet, Plus, Layers } from "lucide-react";
import toast from "react-hot-toast";
const SchemaSettingsPage = () => {
  const [customAttribute, setCustomAttribute] = useState("");
  const [targetEntity, setTargetEntity] = useState("Person of Interest (POI)");
  const handleAddAttribute = (e) => {
    e.preventDefault();
    if (!customAttribute.trim()) return;
    toast.success(`Custom attribute '${customAttribute}' mapped to ${targetEntity}`);
    setCustomAttribute("");
  };
  return /* @__PURE__ */ React.createElement("div", { className: "space-y-6 max-w-5xl mx-auto font-sans pb-16" }, /* @__PURE__ */ React.createElement("div", { className: "bg-[#161b22] border border-[#30363d] rounded-xl p-6 shadow-xl shadow-black/40 relative overflow-hidden" }, /* @__PURE__ */ React.createElement("div", { className: "absolute top-0 right-0 w-96 h-48 bg-slate-500/5 rounded-full blur-3xl pointer-events-none" }), /* @__PURE__ */ React.createElement("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-5 relative z-10" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#1e293b] border border-[#30363d] text-slate-300 font-mono text-[11px] uppercase tracking-wider mb-2" }, /* @__PURE__ */ React.createElement(FileSpreadsheet, { className: "w-3.5 h-3.5 text-slate-400" }), /* @__PURE__ */ React.createElement("span", null, "SCHEMA EXTENSIONS & ONTOLOGY ENGINE")), /* @__PURE__ */ React.createElement("h1", { className: "text-2xl sm:text-3xl font-bold text-white tracking-tight" }, "Custom Schema & Entity Mappings"), /* @__PURE__ */ React.createElement("p", { className: "text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl leading-relaxed" }, "Extend default federal investigation ontology with agency-specific field definitions, cryptographic indexes, and edge constraints.")))), /* @__PURE__ */ React.createElement("div", { className: "bg-[#161b22] border border-[#30363d] rounded-xl p-6 font-mono text-xs space-y-5 shadow-xl" }, /* @__PURE__ */ React.createElement("h2", { className: "text-sm font-bold text-white uppercase border-b border-[#30363d] pb-3 flex items-center gap-2" }, /* @__PURE__ */ React.createElement(Layers, { className: "w-4 h-4 text-slate-400" }), /* @__PURE__ */ React.createElement("span", null, "Add Custom Attribute Mapping")), /* @__PURE__ */ React.createElement("form", { onSubmit: handleAddAttribute, className: "space-y-4" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: "text-slate-300 block mb-1.5 font-semibold" }, "Target Entity Type"), /* @__PURE__ */ React.createElement(
    "select",
    {
      value: targetEntity,
      onChange: (e) => setTargetEntity(e.target.value),
      className: "w-full bg-[#0d1117] border border-[#30363d] rounded-lg px-3.5 py-2 text-white focus:outline-none focus:border-slate-500 transition-colors"
    },
    /* @__PURE__ */ React.createElement("option", { value: "Person of Interest (POI)" }, "Person of Interest (POI)"),
    /* @__PURE__ */ React.createElement("option", { value: "Telephony Device" }, "Telephony Device"),
    /* @__PURE__ */ React.createElement("option", { value: "Tactical Vehicle" }, "Tactical Vehicle"),
    /* @__PURE__ */ React.createElement("option", { value: "Geospatial Safehouse" }, "Geospatial Safehouse"),
    /* @__PURE__ */ React.createElement("option", { value: "Hawala Financial Account" }, "Hawala Financial Account")
  )), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: "text-slate-300 block mb-1.5 font-semibold" }, "Attribute Name (snake_case)"), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "text",
      placeholder: "e.g., custom_border_crossing_seal_id",
      value: customAttribute,
      onChange: (e) => setCustomAttribute(e.target.value),
      className: "w-full bg-[#0d1117] border border-[#30363d] rounded-lg px-3.5 py-2 text-white focus:outline-none focus:border-slate-500 transition-colors"
    }
  )), /* @__PURE__ */ React.createElement(
    "button",
    {
      type: "submit",
      className: "px-4 py-2.5 rounded-lg bg-slate-200 hover:bg-white text-black font-bold flex items-center gap-1.5 shadow-md transition-all transform active:scale-95"
    },
    /* @__PURE__ */ React.createElement(Plus, { className: "w-4 h-4" }),
    /* @__PURE__ */ React.createElement("span", null, "Map Attribute to Ontology")
  ))));
};
var stdin_default = SchemaSettingsPage;
export {
  SchemaSettingsPage,
  stdin_default as default
};
