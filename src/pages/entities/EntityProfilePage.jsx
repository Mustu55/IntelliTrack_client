import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Users,
  Building,
  Phone,
  Car,
  MapPin,
  Share2,
  FileText,
  AlertTriangle,
  ChevronRight,
  Shield,
  Activity,
  CheckCircle2
} from "lucide-react";

const ENTITY_ROSTER = {
  "poi-1": {
    id: "poi-1",
    name: "Raj Mehta",
    entityType: "PERSON OF INTEREST",
    confidence: 94,
    status: "Active Surveillance",
    threatTier: "CRITICAL",
    identityInfo: {
      knownAliases: ['"The Courier"', "R.K. Mehta", "Rajiv M.", "RM-Logistics"],
      phoneNumbers: [
        { number: "+91 98201 44921", type: "Primary Burner (VoLTE)", status: "Active", imei: "86129480112948" },
        { number: "+91 98110 33491", type: "Secondary eSIM", status: "Dormant", imei: "35918204918201" }
      ],
      locations: [
        { address: "Pier 42 Maritime Dock, JNPT Harbour", role: "Observed Meeting Point", lastSeen: "2024-03-12 14:30 UTC" },
        { address: "Worli Seaface Apt 402, Mumbai", role: "Suspected Safehouse", lastSeen: "2024-03-09 21:15 UTC" },
        { address: "Sector 18 Warehouse B-4", role: "Consignment Depot", lastSeen: "2024-02-28 11:00 UTC" }
      ],
      vehicles: [
        { plate: "MH-01-EA-9902", model: "Audi A8 Black Sedan", tag: "ALPR Scanned 3x" },
        { plate: "MH-04-AZ-4102", model: "Ashok Leyland Freight 1618", tag: "Consignment Conveyance" }
      ],
      organizations: [
        { name: "BlueStar Logistics Pvt. Ltd.", role: "Operations Consultant (Beneficial Owner)", status: "Shell Entity" },
        { name: "Astraea Trading Corp", role: "Broker / Signatory", status: "Under Scrutiny" }
      ]
    },
    relationships: [
      { targetName: "Vikramaditya Singhania", targetType: "Person", relationshipType: "Co-Conspirator // Direct Financial Recipient", confidence: 94, status: "CRITICAL" },
      { targetName: "Maya Patel", targetType: "Person", relationshipType: "Escrow Account Signatory", confidence: 88, status: "HIGH" },
      { targetName: "Kabir Khan", targetType: "Person", relationshipType: "Fleet & Convoy Coordinator", confidence: 91, status: "ACTIVE" },
      { targetName: "BlueStar Logistics Pvt. Ltd.", targetType: "Organization", relationshipType: "Corporate Proxy & Shell Front", confidence: 95, status: "CRITICAL" },
      { targetName: "Astraea Trading Corp", targetType: "Organization", relationshipType: "Trade Invoice Intermediary", confidence: 86, status: "HIGH" },
      { targetName: "Wire Transfer $142,000 (#WT-9921)", targetType: "Transaction", relationshipType: "Authorized Remittance Payout", confidence: 96, status: "CRITICAL" },
      { targetName: "Pier 42 Maritime Dock", targetType: "Location", relationshipType: "Repeated Rendezvous Point (7x)", confidence: 98, status: "ACTIVE" },
      { targetName: "CASE #IT-2024-884", targetType: "Case", relationshipType: "Primary Syndicate Subject (Exhibit A)", confidence: 99, status: "ACTIVE" }
    ],
    evidence: [
      {
        id: "ev-1",
        sourceRecord: "CDR Intercept #CDR-2024-0312-8821",
        date: "2024-03-12 14:22 UTC",
        relationshipType: "Telephony Voice Burst to Hawala Terminal",
        confidence: 96,
        badgeStatus: "HIGH",
        notes: "VoLTE packet stream confirmed originating from registered IMEI #86129480112948."
      },
      {
        id: "ev-2",
        sourceRecord: "Crime Branch FIR No. 2024/098",
        date: "2024-02-18 10:00 UTC",
        relationshipType: "Named Accused under Section 420/120B",
        confidence: 99,
        badgeStatus: "HIGH",
        notes: 'Deposition statement from co-accused names "Raj Mehta / The Courier".'
      },
      {
        id: "ev-3",
        sourceRecord: "ALPR Sighting Log #CAM-JNPT-04",
        date: "2024-03-12 14:32 UTC",
        relationshipType: "Vehicle Scanned at Gate Checkpoint",
        confidence: 94,
        badgeStatus: "HIGH",
        notes: "Black Audi A8 [MH-01-EA-9902] optical OCR match 98.2%."
      },
      {
        id: "ev-4",
        sourceRecord: "Bank RTGS Slip #AXIS-TRX-9902148",
        date: "2024-03-11 16:45 UTC",
        relationshipType: "Hawala Shell Remittance Transit",
        confidence: 88,
        badgeStatus: "REVIEW",
        notes: "Transaction ledger requires forensic auditor counter-signature."
      }
    ]
  }
};

const EntityProfilePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const entityId = id && ENTITY_ROSTER[id] ? id : "poi-1";
  const entity = ENTITY_ROSTER[entityId] || ENTITY_ROSTER["poi-1"];
  const [activeTab, setActiveTab] = useState("identity");
  const [evidenceFilter, setEvidenceFilter] = useState("ALL");

  const filteredEvidence = entity.evidence.filter(
    (ev) => evidenceFilter === "ALL" || (evidenceFilter === "HIGH" ? ev.badgeStatus === "HIGH" : ev.badgeStatus !== "HIGH")
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto font-sans antialiased text-[#f3f4f6]">
      {/* Safeguard Disclaimer Notice */}
      <div className="p-3 bg-[#14171c] border border-[#222731] rounded-lg flex items-start gap-2.5 text-xs">
        <AlertTriangle className="w-4 h-4 text-[#c4a265] shrink-0 mt-0.5" />
        <div className="text-[11px] text-[#9ca3af] leading-relaxed">
          <strong className="text-white font-medium">Investigative Lead Safeguard:</strong> AI-resolved linkages represent probabilistic intelligence requiring human validation. System outputs support investigator decision-making and do not constitute judicial determinations.
        </div>
      </div>

      {/* Entity Profile Banner */}
      <div className="bg-[#14171c] border border-[#222731] rounded-xl p-6 shadow-xs relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 relative z-10">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-lg bg-[#101317] border border-[#222731] flex items-center justify-center text-[#9cae9b] shrink-0 shadow-xs">
              <Users className="w-7 h-7" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1.5 font-mono text-xs">
                <span className="px-2 py-0.5 rounded font-semibold bg-[#18261c] text-[#8fa38d] border border-[#25392b] text-[10px]">
                  {entity.entityType}
                </span>
                <span className="px-2 py-0.5 rounded font-semibold bg-[#2b1719] text-[#dc7869] border border-[#442327] text-[10px]">
                  {entity.threatTier} SEVERITY
                </span>
                <span className="px-2 py-0.5 rounded font-mono text-[#9ca3af] bg-[#101317] border border-[#222731] text-[10px]">
                  {entity.confidence}% RESOLUTION MATCH
                </span>
              </div>
              <h1 className="text-2xl font-bold text-white tracking-tight">
                {entity.name}
              </h1>
              <div className="text-xs text-[#9ca3af] font-mono mt-1">
                ID: {entity.id.toUpperCase()} · Active Docket: <strong className="text-white">CASE #IT-2024-884</strong>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 font-mono text-xs">
            <button
              onClick={() => navigate("/network")}
              className="h-8.5 px-3.5 rounded-md bg-[#9cae9b] text-[#0d130e] hover:bg-[#8da08c] font-semibold flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer font-sans"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Explore in Network Graph</span>
            </button>
            <button
              onClick={() => navigate("/geo")}
              className="h-8.5 px-3 rounded-md bg-[#101317] border border-[#222731] hover:bg-[#181c22] text-[#d1d5db] font-medium transition-colors flex items-center gap-1.5 cursor-pointer font-sans"
            >
              <MapPin className="w-3.5 h-3.5 text-[#8fa38d]" />
              <span>Surveillance Map</span>
            </button>
          </div>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center gap-1 border-t border-[#222731] mt-6 pt-3 font-mono text-xs">
          {[
            { key: "identity", label: "Identity & Dossier", icon: Users },
            { key: "relationships", label: `Relationships (${entity.relationships.length})`, icon: Share2 },
            { key: "evidence", label: `Evidence Records (${entity.evidence.length})`, icon: FileText },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-3 py-1.5 rounded-md transition-colors font-medium flex items-center gap-1.5 cursor-pointer ${
                  isActive
                    ? "bg-[#181c22] text-[#9cae9b] border border-[#28303e] shadow-xs"
                    : "text-[#9ca3af] hover:text-white hover:bg-[#101317]"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab: Identity */}
      {activeTab === "identity" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Known Aliases */}
          <div className="bg-[#14171c] border border-[#222731] rounded-lg p-5 shadow-xs space-y-3">
            <h3 className="text-xs font-semibold text-white font-mono uppercase tracking-wider flex items-center gap-2">
              <Users className="w-3.5 h-3.5 text-[#9cae9b]" />
              <span>Known Aliases & Street Monikers</span>
            </h3>
            <div className="flex flex-wrap gap-2 pt-1 font-mono text-xs">
              {entity.identityInfo.knownAliases.map((alias, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-md bg-[#101317] border border-[#222731] text-[#d1d5db] font-medium"
                >
                  {alias}
                </span>
              ))}
            </div>
            <div className="text-[11px] text-[#606875] font-mono pt-2 border-t border-[#1e232a]">
              Corroborated across telecom records, deposition logs, and trade registry.
            </div>
          </div>

          {/* Phones */}
          <div className="bg-[#14171c] border border-[#222731] rounded-lg p-5 shadow-xs space-y-3">
            <h3 className="text-xs font-semibold text-white font-mono uppercase tracking-wider flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-[#7a8ba8]" />
              <span>Phone Numbers & Subscribed IMEIs</span>
            </h3>
            <div className="space-y-2 font-mono text-xs">
              {entity.identityInfo.phoneNumbers.map((ph, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded-md bg-[#101317] border border-[#222731] flex items-center justify-between"
                >
                  <div>
                    <div className="text-white font-semibold">{ph.number}</div>
                    <div className="text-[10px] text-[#606875] mt-0.5">
                      IMEI: {ph.imei} · {ph.type}
                    </div>
                  </div>
                  <span
                    className={`text-[10px] px-2 py-0.2 rounded font-medium ${
                      ph.status === "Active"
                        ? "bg-[#18261c] text-[#8fa38d] border border-[#25392b]"
                        : "bg-[#14171c] text-[#606875] border border-[#222731]"
                    }`}
                  >
                    {ph.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Locations */}
          <div className="bg-[#14171c] border border-[#222731] rounded-lg p-5 shadow-xs space-y-3">
            <h3 className="text-xs font-semibold text-white font-mono uppercase tracking-wider flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-[#d97768]" />
              <span>Surveillance Hotspots & Safehouses</span>
            </h3>
            <div className="space-y-2 font-mono text-xs">
              {entity.identityInfo.locations.map((loc, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded-md bg-[#101317] border border-[#222731] space-y-1"
                >
                  <div className="text-white font-medium flex items-center justify-between">
                    <span>{loc.address}</span>
                    <span className="text-[10px] text-[#9cae9b]">{loc.role}</span>
                  </div>
                  <div className="text-[10px] text-[#606875]">Last Sighting: {loc.lastSeen}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Vehicles & Orgs */}
          <div className="space-y-5">
            <div className="bg-[#14171c] border border-[#222731] rounded-lg p-5 shadow-xs space-y-3">
              <h3 className="text-xs font-semibold text-white font-mono uppercase tracking-wider flex items-center gap-2">
                <Car className="w-3.5 h-3.5 text-[#c4a265]" />
                <span>Associated Vehicles</span>
              </h3>
              <div className="space-y-2 font-mono text-xs">
                {entity.identityInfo.vehicles.map((v, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-md bg-[#101317] border border-[#222731] flex items-center justify-between"
                  >
                    <div>
                      <div className="text-white font-medium">{v.plate}</div>
                      <div className="text-[10px] text-[#606875]">{v.model}</div>
                    </div>
                    <span className="text-[10px] px-2 py-0.2 rounded bg-[#181c22] text-[#c4a265] border border-[#2a313d]">
                      {v.tag}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#14171c] border border-[#222731] rounded-lg p-5 shadow-xs space-y-3">
              <h3 className="text-xs font-semibold text-white font-mono uppercase tracking-wider flex items-center gap-2">
                <Building className="w-3.5 h-3.5 text-[#8fa38d]" />
                <span>Shell Corporations & Front Companies</span>
              </h3>
              <div className="space-y-2 font-mono text-xs">
                {entity.identityInfo.organizations.map((org, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-md bg-[#101317] border border-[#222731] flex items-center justify-between"
                  >
                    <div>
                      <div className="text-white font-medium">{org.name}</div>
                      <div className="text-[10px] text-[#606875]">{org.role}</div>
                    </div>
                    <span className="text-[10px] px-2 py-0.2 rounded bg-[#282215] text-[#c4a265] border border-[#3e3420]">
                      {org.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Relationships */}
      {activeTab === "relationships" && (
        <div className="bg-[#14171c] border border-[#222731] rounded-lg p-5 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#1e232a] pb-3">
            <div>
              <h3 className="text-xs font-semibold text-white font-mono uppercase tracking-wider">
                Graph Relationships ({entity.relationships.length} Links)
              </h3>
              <p className="text-xs text-[#9ca3af]">
                Connected individuals, shell organizations, and financial transactions.
              </p>
            </div>
            <span className="text-xs font-mono text-[#8fa38d]">
              Betweenness Centrality: 0.89
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-sans">
              <thead className="bg-[#101317] text-[#9ca3af] font-mono text-[10px] uppercase tracking-wider border-b border-[#222731]">
                <tr>
                  <th className="p-3 font-semibold">Target Entity</th>
                  <th className="p-3 font-semibold">Type</th>
                  <th className="p-3 font-semibold">Relationship Type</th>
                  <th className="p-3 font-semibold">Confidence</th>
                  <th className="p-3 font-semibold">Status</th>
                  <th className="p-3 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1e232a] text-[#d1d5db]">
                {entity.relationships.map((rel, idx) => (
                  <tr key={idx} className="hover:bg-[#181c22] transition-colors">
                    <td className="p-3 text-white font-medium">{rel.targetName}</td>
                    <td className="p-3">
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#101317] text-[#9ca3af] border border-[#222731] font-mono">
                        {rel.targetType}
                      </span>
                    </td>
                    <td className="p-3 text-[#9cae9b] font-mono text-[11px]">
                      {rel.relationshipType}
                    </td>
                    <td className="p-3 text-white font-mono font-medium">{rel.confidence}%</td>
                    <td className="p-3">
                      <span
                        className={`text-[10px] font-mono px-2 py-0.2 rounded font-semibold uppercase ${
                          rel.status === "CRITICAL"
                            ? "bg-[#2b1719] text-[#dc7869] border border-[#442327]"
                            : rel.status === "HIGH"
                            ? "bg-[#282215] text-[#c4a265] border border-[#3e3420]"
                            : "bg-[#18261c] text-[#8fa38d] border border-[#25392b]"
                        }`}
                      >
                        {rel.status}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => navigate("/network")}
                        className="text-xs font-mono text-[#9cae9b] hover:underline inline-flex items-center gap-1 cursor-pointer"
                      >
                        <span>Focus</span>
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab: Evidence */}
      {activeTab === "evidence" && (
        <div className="bg-[#14171c] border border-[#222731] rounded-lg p-5 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#1e232a] pb-3">
            <div>
              <h3 className="text-xs font-semibold text-white font-mono uppercase tracking-wider">
                Evidentiary Source Records & Forensic Traces
              </h3>
              <p className="text-xs text-[#9ca3af]">
                Verified source materials anchoring identity linkages.
              </p>
            </div>
          </div>

          <div className="space-y-3 font-sans text-xs">
            {filteredEvidence.map((ev) => (
              <div
                key={ev.id}
                className="p-4 rounded-lg bg-[#101317] border border-[#222731] hover:border-[#2d3542] transition-all space-y-2"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#9cae9b] shrink-0" />
                    <span className="text-white font-semibold text-xs font-mono">{ev.sourceRecord}</span>
                  </div>
                  <div className="flex items-center gap-2 font-mono text-[10px]">
                    <span className="text-[#606875]">{ev.date}</span>
                    <span className="px-2 py-0.2 rounded bg-[#18261c] text-[#8fa38d] border border-[#25392b] font-semibold">
                      {ev.confidence}% CONFIDENCE
                    </span>
                  </div>
                </div>
                <div className="text-[#d1d5db]">
                  <span className="text-[#9ca3af]">Link Type: </span>
                  <span className="text-[#9cae9b] font-medium">{ev.relationshipType}</span>
                </div>
                <div className="text-[11px] text-[#9ca3af] bg-[#14171c] p-2.5 rounded border border-[#222731] font-mono">
                  {ev.notes}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export { EntityProfilePage };
export default EntityProfilePage;
