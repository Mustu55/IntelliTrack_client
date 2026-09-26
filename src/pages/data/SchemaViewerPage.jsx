import React, { useState } from "react";
import {
  FileSpreadsheet,
  Code2,
  Check,
  Share2
} from "lucide-react";
import toast from "react-hot-toast";
const SCHEMA_ENTITIES = [
  {
    id: "ent-person",
    name: "Person of Interest (POI)",
    category: "Biometric / Human",
    description: "Human subject under active investigation or surveillance.",
    attributes: [
      { name: "full_name", type: "string", isIndex: true },
      { name: "primary_alias", type: "string", isIndex: true },
      { name: "soundex_key", type: "string", isIndex: true },
      { name: "dob_timestamp", type: "datetime", isIndex: false },
      { name: "threat_tier", type: "enum(CRITICAL,HIGH,MED,LOW)", isIndex: true },
      { name: "biometric_fbi_num", type: "string", isIndex: true }
    ],
    relationships: ["COMMUNICATES_WITH", "ASSOCIATED_WITH", "OPERATES_VEHICLE", "CO_LOCATED_AT"]
  },
  {
    id: "ent-telephony",
    name: "Telephony & Hardware Device",
    category: "Signal Intelligence",
    description: "Burner mobile devices, SIM cards, IMSI/IMEI identifiers, and VoIP accounts.",
    attributes: [
      { name: "e164_phone_number", type: "string", isIndex: true },
      { name: "imei_serial", type: "string", isIndex: true },
      { name: "imsi_carrier_key", type: "string", isIndex: true },
      { name: "carrier_name", type: "string", isIndex: false },
      { name: "last_tower_azimuth", type: "geo_point", isIndex: true }
    ],
    relationships: ["REGISTERED_TO", "DIALED_CALL", "INTERCEPTED_ON_TOWER"]
  },
  {
    id: "ent-vehicle",
    name: "Tactical Vehicle & Conveyance",
    category: "Physical Asset",
    description: "Motor vehicles, maritime vessels, aircraft, and cargo containers.",
    attributes: [
      { name: "license_plate_alphanumeric", type: "string", isIndex: true },
      { name: "jurisdiction_state", type: "string", isIndex: true },
      { name: "vin_number", type: "string", isIndex: true },
      { name: "make_model_color", type: "string", isIndex: false }
    ],
    relationships: ["REGISTERED_TO", "ALPR_SCANNED_AT", "PARKED_NEAR"]
  },
  {
    id: "ent-location",
    name: "Geospatial Location / Safehouse",
    category: "Spatial Intelligence",
    description: "Meeting places, safehouses, commercial ports, and drop zones.",
    attributes: [
      { name: "street_address", type: "string", isIndex: true },
      { name: "mgrs_coordinates", type: "string", isIndex: true },
      { name: "lat_long_point", type: "geo_point", isIndex: true },
      { name: "location_type", type: "enum(SAFEHOUSE,PORT,WAREHOUSE)", isIndex: true }
    ],
    relationships: ["SCENE_OF_EVENT", "CO_LOCATED_PERSONS"]
  },
  {
    id: "ent-finance",
    name: "Financial Entity & Hawala Account",
    category: "Financial Intelligence",
    description: "Bank accounts, Hawala brokers, cryptocurrency wallets, shell companies.",
    attributes: [
      { name: "account_iban_or_hash", type: "string", isIndex: true },
      { name: "financial_institution", type: "string", isIndex: false },
      { name: "fincen_sar_ref", type: "string", isIndex: true }
    ],
    relationships: ["TRANSFERRED_FUNDS_TO", "BENEFICIARY_OWNER"]
  }
];
const SchemaViewerPage = () => {
  const [selectedEntity, setSelectedEntity] = useState(SCHEMA_ENTITIES[0]);
  return /* @__PURE__ */ React.createElement("div", { className: "space-y-6 max-w-7xl mx-auto font-sans pb-16" }, /* @__PURE__ */ React.createElement("div", { className: "bg-[#0e221c] border border-[#15382e] rounded-xl p-6 shadow-xl shadow-emerald-950/40 relative overflow-hidden" }, /* @__PURE__ */ React.createElement("div", { className: "absolute top-0 right-0 w-96 h-48 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" }), /* @__PURE__ */ React.createElement("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 font-mono text-[11px] uppercase tracking-wider mb-2" }, /* @__PURE__ */ React.createElement(FileSpreadsheet, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ React.createElement("span", null, "STANDARDIZED INVESTIGATIVE ONTOLOGY \u2022 V3.4")), /* @__PURE__ */ React.createElement("h1", { className: "text-2xl sm:text-3xl font-bold text-white tracking-tight" }, "Normalized Investigation Data Schema"), /* @__PURE__ */ React.createElement("p", { className: "text-xs sm:text-sm text-emerald-200/70 mt-1 max-w-2xl leading-relaxed" }, "Core entity ontology, attribute typing, cryptographic indexes, and graph edge specifications.")), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => toast.success("Schema specification exported under Fed Standards JSON-LD"),
      className: "px-4 py-2.5 rounded-lg bg-[#081411] hover:bg-[#132e26] border border-[#15382e] hover:border-emerald-500/40 text-emerald-300 font-mono text-xs font-semibold flex items-center gap-2 transition-all shadow-md self-start sm:self-auto"
    },
    /* @__PURE__ */ React.createElement(Code2, { className: "w-4 h-4 text-emerald-400" }),
    /* @__PURE__ */ React.createElement("span", null, "Export Schema JSON")
  ))), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6 font-mono text-xs" }, /* @__PURE__ */ React.createElement("div", { className: "space-y-2.5" }, /* @__PURE__ */ React.createElement("div", { className: "text-[11px] uppercase text-emerald-300/80 font-bold mb-2 flex items-center justify-between" }, /* @__PURE__ */ React.createElement("span", null, "Investigation Entities (", SCHEMA_ENTITIES.length, ")"), /* @__PURE__ */ React.createElement("span", { className: "text-[10px] text-emerald-200/40" }, "Select to inspect")), SCHEMA_ENTITIES.map((ent) => /* @__PURE__ */ React.createElement(
    "div",
    {
      key: ent.id,
      onClick: () => setSelectedEntity(ent),
      className: `p-3.5 rounded-xl border cursor-pointer transition-all ${selectedEntity.id === ent.id ? "bg-[#132e26] border-emerald-500 shadow-lg shadow-emerald-950/50 ring-1 ring-emerald-500/50" : "bg-[#0e221c] border-[#15382e] hover:border-emerald-500/30 text-emerald-200/70"}`
    },
    /* @__PURE__ */ React.createElement("div", { className: "text-[10px] text-emerald-400 font-bold uppercase tracking-wider" }, ent.category),
    /* @__PURE__ */ React.createElement("div", { className: "text-sm font-bold text-white font-sans mt-0.5" }, ent.name),
    /* @__PURE__ */ React.createElement("div", { className: "text-[11px] text-emerald-200/60 mt-1 line-clamp-1" }, ent.description)
  ))), /* @__PURE__ */ React.createElement("div", { className: "lg:col-span-2 space-y-4" }, /* @__PURE__ */ React.createElement("div", { className: "bg-[#0e221c] border border-[#15382e] rounded-xl p-6 space-y-5 shadow-xl shadow-emerald-950/20" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between border-b border-[#15382e] pb-4" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", { className: "text-[10px] text-emerald-400 font-bold uppercase tracking-wider" }, selectedEntity.category, " SCHEMA DEFINITION"), /* @__PURE__ */ React.createElement("h2", { className: "text-xl font-bold text-white font-sans mt-0.5" }, selectedEntity.name)), /* @__PURE__ */ React.createElement("span", { className: "px-2.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-[10px] font-bold uppercase tracking-wider" }, "\u25CF ACTIVE IN GRAPH")), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "text-xs uppercase text-emerald-300 font-bold mb-2.5 flex items-center justify-between" }, /* @__PURE__ */ React.createElement("span", null, "Normalized Entity Attributes"), /* @__PURE__ */ React.createElement("span", { className: "text-emerald-200/50 font-normal" }, selectedEntity.attributes.length, " Fields Defined")), /* @__PURE__ */ React.createElement("div", { className: "bg-[#081411] rounded-xl border border-[#15382e] overflow-hidden" }, /* @__PURE__ */ React.createElement("table", { className: "w-full text-left text-xs" }, /* @__PURE__ */ React.createElement("thead", { className: "bg-[#06100d] text-emerald-300/70 border-b border-[#15382e] text-[10px] uppercase" }, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("th", { className: "py-2.5 px-3.5" }, "Field Name"), /* @__PURE__ */ React.createElement("th", { className: "py-2.5 px-3.5" }, "Type"), /* @__PURE__ */ React.createElement("th", { className: "py-2.5 px-3.5" }, "Indexed Indexing Strategy"))), /* @__PURE__ */ React.createElement("tbody", { className: "divide-y divide-[#15382e] text-slate-200" }, selectedEntity.attributes.map((attr, idx) => /* @__PURE__ */ React.createElement("tr", { key: idx, className: "hover:bg-[#132e26]/40 transition-colors" }, /* @__PURE__ */ React.createElement("td", { className: "py-2.5 px-3.5 font-bold text-emerald-300" }, attr.name), /* @__PURE__ */ React.createElement("td", { className: "py-2.5 px-3.5 text-slate-300" }, attr.type), /* @__PURE__ */ React.createElement("td", { className: "py-2.5 px-3.5" }, attr.isIndex ? /* @__PURE__ */ React.createElement("span", { className: "inline-flex items-center gap-1 text-emerald-400 font-bold text-[10px] bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30" }, /* @__PURE__ */ React.createElement(Check, { className: "w-3 h-3" }), /* @__PURE__ */ React.createElement("span", null, "YES (B-TREE SEARCH)")) : /* @__PURE__ */ React.createElement("span", { className: "text-slate-500 text-[10px]" }, "UNINDEXED BLOB")))))))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "text-xs uppercase text-emerald-300 font-bold mb-2.5 flex items-center gap-1.5" }, /* @__PURE__ */ React.createElement(Share2, { className: "w-3.5 h-3.5 text-teal-400" }), /* @__PURE__ */ React.createElement("span", null, "Allowed Outgoing Graph Edges")), /* @__PURE__ */ React.createElement("div", { className: "flex flex-wrap gap-2" }, selectedEntity.relationships.map((rel, idx) => /* @__PURE__ */ React.createElement(
    "span",
    {
      key: idx,
      className: "px-3 py-1.5 rounded-lg bg-[#081411] border border-[#15382e] hover:border-emerald-500/40 text-emerald-300 text-[11px] font-semibold transition-colors"
    },
    "--[",
    rel,
    "]-->"
  ))))))));
};
var stdin_default = SchemaViewerPage;
export {
  SchemaViewerPage,
  stdin_default as default
};
