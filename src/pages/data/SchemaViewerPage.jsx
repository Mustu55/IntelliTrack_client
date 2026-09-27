import React, { useState } from "react";
import {
  FileSpreadsheet,
  Code2,
  Check,
  Share2,
  Layers,
  Database
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
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

export const SchemaViewerPage = () => {
  const [selectedEntity, setSelectedEntity] = useState(SCHEMA_ENTITIES[0]);

  return (
    <div className="space-y-6 max-w-7xl mx-auto font-sans pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#222731]">
        <div>
          <div className="flex items-center gap-2 text-tactical-neutral-500 text-[11px] uppercase tracking-wider font-mono mb-1">
            <span>ONTOLOGY & GRAPH MODEL</span>
            <span>/</span>
            <span className="text-tactical-sage-400 font-semibold">SCHEMA VIEWER</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Normalized Investigation Data Schema
          </h1>
          <p className="text-xs sm:text-sm text-tactical-neutral-400 mt-1 max-w-2xl leading-relaxed">
            Core entity ontology, attribute typing, cryptographic indexes, and graph edge constraints
          </p>
        </div>

        <Button
          variant="secondary"
          size="sm"
          onClick={() => toast.success("Schema specification exported under JSON-LD")}
          icon={<Code2 className="w-4 h-4" />}
          className="text-xs font-mono border-[#222731]"
        >
          Export Schema JSON
        </Button>
      </div>

      {/* 2-Column Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 font-mono text-xs">
        {/* Left Entity List */}
        <div className="space-y-2.5">
          <div className="text-[11px] uppercase text-tactical-neutral-400 font-bold mb-2 flex items-center justify-between">
            <span>Investigation Entities ({SCHEMA_ENTITIES.length})</span>
            <span className="text-[10px] text-tactical-neutral-500">Select to inspect</span>
          </div>

          {SCHEMA_ENTITIES.map((ent) => (
            <div
              key={ent.id}
              onClick={() => setSelectedEntity(ent)}
              className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                selectedEntity.id === ent.id
                  ? "bg-[#1c222b] border-tactical-sage-400/60 shadow-sm"
                  : "bg-[#14171c] border-[#222731] hover:border-[#2e3644] text-tactical-neutral-400"
              }`}
            >
              <div className="text-[10px] text-tactical-sage-400 font-bold uppercase tracking-wider">
                {ent.category}
              </div>
              <div className="text-sm font-bold text-white font-sans mt-0.5">
                {ent.name}
              </div>
              <div className="text-[11px] text-tactical-neutral-400 mt-1 line-clamp-1 font-sans">
                {ent.description}
              </div>
            </div>
          ))}
        </div>

        {/* Right Entity Schema Detail */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-[#14171c] border border-[#222731] rounded-xl p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-[#222731] pb-4">
              <div>
                <span className="text-[10px] text-tactical-sage-400 font-bold uppercase tracking-wider">
                  {selectedEntity.category} SCHEMA DEFINITION
                </span>
                <h2 className="text-xl font-bold text-white font-sans mt-0.5">
                  {selectedEntity.name}
                </h2>
              </div>
              <Badge variant="success" size="sm" className="font-mono text-[9px] uppercase">
                ● ACTIVE IN GRAPH
              </Badge>
            </div>

            <div>
              <div className="text-xs uppercase text-tactical-neutral-300 font-bold mb-2.5 flex items-center justify-between">
                <span>Normalized Entity Attributes</span>
                <span className="text-tactical-neutral-500 font-normal">{selectedEntity.attributes.length} Fields Defined</span>
              </div>

              <div className="bg-[#101317] rounded-xl border border-[#222731] overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#0d0f11] text-tactical-neutral-500 border-b border-[#222731] text-[10px] uppercase">
                    <tr>
                      <th className="py-2.5 px-3.5">Field Name</th>
                      <th className="py-2.5 px-3.5">Type</th>
                      <th className="py-2.5 px-3.5">Indexing Strategy</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#222731] text-tactical-neutral-300">
                    {selectedEntity.attributes.map((attr, idx) => (
                      <tr key={idx} className="hover:bg-[#14171c]/60 transition-colors">
                        <td className="py-2.5 px-3.5 font-bold text-tactical-sage-400 font-mono">
                          .{attr.name}
                        </td>
                        <td className="py-2.5 px-3.5 text-tactical-neutral-400">{attr.type}</td>
                        <td className="py-2.5 px-3.5">
                          {attr.isIndex ? (
                            <span className="inline-flex items-center gap-1 text-tactical-success-400 font-bold text-[10px]">
                              <Check className="w-3 h-3" />
                              <span>YES (B-TREE SEARCH)</span>
                            </span>
                          ) : (
                            <span className="text-tactical-neutral-600 text-[10px]">UNINDEXED BLOB</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <div className="text-xs uppercase text-tactical-neutral-300 font-bold mb-2.5 flex items-center gap-1.5">
                <Share2 className="w-3.5 h-3.5 text-tactical-sage-400" />
                <span>Allowed Outgoing Graph Edges</span>
              </div>

              <div className="flex flex-wrap gap-2">
                {selectedEntity.relationships.map((rel, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-lg bg-[#101317] border border-[#222731] hover:border-[#2e3644] text-tactical-sage-400 text-[11px] font-semibold transition-colors"
                  >
                    --[{rel}]--&gt;
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchemaViewerPage;
