import React, { useState } from "react";
import { 
  FileSpreadsheet, 
  Plus, 
  Layers, 
  Database, 
  CheckCircle2, 
  Table as TableIcon,
  Sparkles,
  Trash2
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Link, useLocation } from "react-router-dom";
import toast from "react-hot-toast";

const EXISTING_EXTENSIONS = [
  { id: "ext-1", entity: "Person of Interest (POI)", attribute: "burner_imei_history", type: "Array<String>", indexed: true, required: false },
  { id: "ext-2", entity: "Tactical Vehicle", attribute: "license_plate_state_code", type: "String", indexed: true, required: true },
  { id: "ext-3", entity: "Financial Account", attribute: "swift_bic_routing", type: "String", indexed: true, required: true },
  { id: "ext-4", entity: "Geospatial Safehouse", attribute: "surveillance_camera_installed", type: "Boolean", indexed: false, required: false }
];

export const SchemaSettingsPage = () => {
  const [customAttribute, setCustomAttribute] = useState("");
  const [targetEntity, setTargetEntity] = useState("Person of Interest (POI)");
  const [attrType, setAttrType] = useState("String");
  const [extensions, setExtensions] = useState(EXISTING_EXTENSIONS);
  const location = useLocation();

  const handleAddAttribute = (e) => {
    e.preventDefault();
    if (!customAttribute.trim()) return;

    const newExt = {
      id: `ext-${Date.now()}`,
      entity: targetEntity,
      attribute: customAttribute.toLowerCase().replace(/\s+/g, "_"),
      type: attrType,
      indexed: true,
      required: false
    };

    setExtensions([...extensions, newExt]);
    toast.success(`Custom attribute '${customAttribute}' mapped to ${targetEntity}`);
    setCustomAttribute("");
  };

  const handleDeleteExt = (id) => {
    setExtensions(extensions.filter(e => e.id !== id));
    toast.success("Attribute extension removed");
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
            <span className="text-tactical-sage-400 font-semibold">ONTOLOGY SCHEMA</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Custom Schema & Entity Mappings
          </h1>
          <p className="text-xs text-tactical-neutral-400 mt-0.5">
            Extend default federal investigation ontology with agency-specific field definitions and cryptographic indexes
          </p>
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

      {/* Add Attribute Card */}
      <div className="bg-[#14171c] border border-[#222731] rounded-xl p-6 font-mono text-xs space-y-4">
        <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-tactical-neutral-300 border-b border-[#222731] pb-3 flex items-center gap-2">
          <Layers className="w-4 h-4 text-tactical-sage-400" />
          <span>Add Custom Attribute Mapping</span>
        </h2>

        <form onSubmit={handleAddAttribute} className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
          <div>
            <label className="text-tactical-neutral-400 block mb-1.5 font-medium">Target Entity Node</label>
            <select
              value={targetEntity}
              onChange={(e) => setTargetEntity(e.target.value)}
              className="w-full bg-[#101317] border border-[#222731] rounded-lg px-3.5 py-2 text-white focus:outline-none focus:border-tactical-sage-400/50 transition-colors"
            >
              <option value="Person of Interest (POI)">Person of Interest (POI)</option>
              <option value="Telephony Device">Telephony Device</option>
              <option value="Tactical Vehicle">Tactical Vehicle</option>
              <option value="Geospatial Safehouse">Geospatial Safehouse</option>
              <option value="Financial Account">Financial Account</option>
            </select>
          </div>

          <div>
            <label className="text-tactical-neutral-400 block mb-1.5 font-medium">Attribute Name (snake_case)</label>
            <input
              type="text"
              placeholder="e.g. border_seal_id"
              value={customAttribute}
              onChange={(e) => setCustomAttribute(e.target.value)}
              className="w-full bg-[#101317] border border-[#222731] rounded-lg px-3.5 py-2 text-white placeholder-tactical-neutral-600 focus:outline-none focus:border-tactical-sage-400/50 transition-colors"
            />
          </div>

          <div>
            <Button
              type="submit"
              variant="sage"
              size="md"
              icon={<Plus className="w-4 h-4" />}
              className="w-full justify-center text-xs"
            >
              Extend Ontology
            </Button>
          </div>
        </form>
      </div>

      {/* Existing Schema Extensions Table */}
      <div className="bg-[#14171c] border border-[#222731] rounded-xl overflow-hidden font-mono text-xs">
        <div className="p-4 border-b border-[#222731] flex items-center justify-between">
          <div className="flex items-center gap-2 text-white font-bold">
            <TableIcon className="w-4 h-4 text-tactical-sage-400" />
            <span>Active Ontology Schema Extensions ({extensions.length})</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[#101317] text-tactical-neutral-500 text-[11px] uppercase tracking-wider border-b border-[#222731]">
              <tr>
                <th className="py-3 px-4">Target Entity</th>
                <th className="py-3 px-4">Field Name</th>
                <th className="py-3 px-4">Data Type</th>
                <th className="py-3 px-4">Indexed</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#222731]/60 text-tactical-neutral-300">
              {extensions.map((ext) => (
                <tr key={ext.id} className="hover:bg-[#181d24]/50 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-white">{ext.entity}</td>
                  <td className="py-3.5 px-4 font-mono text-tactical-sage-400">.{ext.attribute}</td>
                  <td className="py-3.5 px-4 text-tactical-neutral-400">{ext.type}</td>
                  <td className="py-3.5 px-4">
                    <Badge variant="success" size="sm" className="text-[9px]">INDEXED</Badge>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => handleDeleteExt(ext.id)}
                      className="p-1.5 rounded-lg text-tactical-neutral-500 hover:text-tactical-danger-400 transition-colors"
                      title="Delete attribute extension"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SchemaSettingsPage;
